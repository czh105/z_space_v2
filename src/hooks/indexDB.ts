import { AnyFunction } from "element-plus/es/utils/types";
import $store from "../store/index";

const indexDB = window.indexedDB;

export default class IndexDBCache {
  _db: IDBDatabase | null;
  _transaction: null;
  _request: IDBOpenDBRequest | null;
  _cacheTableName: string;
  _dbversion: number;
  _progressValue:string;
  constructor(callback: any) {
    this._db = null;
    this._transaction = null;
    this._request = null;
    this._cacheTableName = "modelcache";
    this._dbversion = 1;
    this._progressValue = ''
    this.initDB(callback);
  }
  initDB(callback: () => void) {
    this._request = indexDB.open("cacheModel", this._dbversion);
    this._request.onsuccess = (event: any) => {
      this._db = this._request!.result;
      console.log("success db", this._db);
      if (typeof callback === "function") callback();
    };
    this._request.onerror = (event: any) => {
      console.log("indexdb初始化失败");
      if (typeof callback === "function") callback();
    };
    this._request.onupgradeneeded = (event: any) => {
      console.log("upgradeneeded");

      let db = this._request!.result;
      // console.log('dfsdfs');
      let store = db.createObjectStore(this._cacheTableName, { keyPath: "id" });
      store.createIndex("INDEX_ID", "id", { unique: true });
    };
  }
  // loadNetSource(url: RequestInfo) {
  //   return new Promise((resolve,reject)=>{
  //     fetch(url).then(res => {
  //       if(res.status === 200){
  //         res.blob().then(blob => {
  //           let transaction = this._db!.transaction(this._cacheTableName, 'readwrite');
  //           let store = transaction.objectStore(this._cacheTableName);
  //           let storeReq = store.add({ id: url, blob });
  //           storeReq.onerror = (event: any) => {
  //             console.log('缓存失败');
  //             reject(url);
  //           }
  //           storeReq.onsuccess = (event: any) => {
  //             console.log(`创建${url}缓存成功`);
  //             resolve(blob);
  //           }
  //         })
  //       }else{
  //         console.log('未找到缓存资源');
  //         reject(url);
  //       }

  //     })
  //   })

  // }
  loadNetSource(url: RequestInfo) {
    return new Promise(async (resolve, reject) => {
      // Step 1：启动 fetch，并获得一个 reader
      let response = await fetch(url);
      const reader = response.body!.getReader();
      // Step 2：获得总长度（length）
      const contentLength:any = response.headers!.get("Content-Length")?.toString();
      // Step 3：读取数据
      let receivedLength = 0; // 当前接收到了这么多字节
      let chunks: any = []; // 接收到的二进制块的数组（包括 body）
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }
        chunks.push(value);
        receivedLength = receivedLength + value!.length;
        console.log(`Received ${receivedLength} of ${contentLength}`);
        // this._progressValue = (receivedLength/contentLength).toFixed(2)
        // await $store.dispatch("setProgressValue", (parseFloat((receivedLength/contentLength).toFixed(2)))*100+'%');
        this._progressValue = ''+receivedLength/contentLength
        await $store.dispatch("setProgressValue", Math.floor((receivedLength/contentLength)*100)+'%');
      }

      let blob = new Blob(chunks);

      let transaction = this._db!.transaction(
        this._cacheTableName,
        "readwrite"
      );
      let store = transaction.objectStore(this._cacheTableName);
      let storeReq = store.add({ id: url, blob });
      storeReq.onerror = (event: any) => {
        console.log("缓存失败");
        reject(url);
      };
      storeReq.onsuccess = (event: any) => {
        console.log(`创建${url}缓存成功`);
        resolve(blob);
      };
    });
  }
  cacheModel(url: any) {
    return new Promise((resolve, reject) => {
      // console.log(this._db)
      let transaction = this._db!.transaction(
        this._cacheTableName,
        "readwrite"
      );
      let store = transaction.objectStore(this._cacheTableName);
      let response = store.get(url);
      response.onsuccess = (e: any) => {
        if (!response.result) {
          this.loadNetSource(url)
            .then((blob:any) => {
              let _url = URL.createObjectURL(blob);
              resolve(_url);
            })
            .catch((err) => {
              resolve(url);
            });
          return;
        }
        let _url = URL.createObjectURL(response.result.blob);
        resolve(_url);
      };
      response.onerror = () => {
        resolve(url);
      };
    });
  }
  deleteModel(url: any) {
    return new Promise((resolve, reject) => {
      let transaction = this._db!.transaction(
        this._cacheTableName,
        "readwrite"
      );
      let store = transaction.objectStore(this._cacheTableName);
      let response = store.get(url);
      response.onsuccess = () => {
        console.log("删除成功");
        resolve("删除成功");
      };
      response.onerror = (event: any) => {
        console.log("删除失败");
        reject(event);
      };
    });
  }
}
