<script lang="ts">
import {
  defineComponent,
  computed,
  watch,
  onMounted,
  onBeforeUnmount,
  ref,
  nextTick,
  reactive,
} from "vue";
import { useRouter, useRoute } from "vue-router";
import ThreePlayer from "../hooks/threePlayer";
import * as THREE from "three";
import TeachingPendant from "../components/TeachingPendant.vue";
import Gluing from "../components/Gluing.vue";
import Palletizing from "../components/Palletizing.vue";
import Process from "../components/Process.vue";
import Bssembling from "../components/Bssembling.vue";
import Implement from "../components/Implement.vue";
import Warehouse from "../components/Warehouse.vue";
import Polish from "../components/Polish.vue";
import Pressfit from "../components/Pressfit.vue";
import NumericalControl from "../components/NumericalControl.vue";
import Scara from "../components/Scara.vue";
import Layouta from "../components/Layouta.vue";
import Layoutb from "../components/Layoutb.vue";
import Hmia from "../components/Hmia.vue";
import Hmib from "../components/Hmib.vue";

import IndexDB from "../hooks/indexDB";

import $store from "../store/index";

import Tips from "../hooks/tips";
import Bridge from "../hooks/bridge";
// todo: 新增 跳转对应值
const enumList = {
  mode: ["教学演示", "实训练习", "在线考核"],
  bigType: ["教学演示", "实训练习", "在线考核"],
  type: ["工业机器人集成应用(1+X)", "工业机器人操作与运维(1+x)"],
  topic: [["工作站布局A", "示教器操作", "执行单元调试", "仓库单元调试", "打磨单元调试", "压装单元调试", "数控单元调试", "HMI模拟A", "SCARA机器人"], ["工作站布局B", "示教器操作", "涂胶调试", "码垛调试", "多工艺调试", "装配调试", "HMI模拟B", "视频"]],
};
// todo:end


export default defineComponent({
  components: {
    TeachingPendant,
    Gluing,
    Palletizing,
    Process,
    Bssembling,
    Implement,
    Warehouse,
    Polish,
    Pressfit,
    Layoutb,
    Layouta,
    Scara,
    NumericalControl,
    Hmia,
    Hmib,
  },
  setup() {
    let fullscreenLoading = ref(true);
    const box = ref();
    const title = ref("test");
    const router = useRouter();
    const route = useRoute();
    let loadingNum = ref("");
    let newNum = ref();
    (window as any).listNum= 0

    // todo： 新增、增加页面跳转功能
    var topic: string = "",
      mode: string = "",
      type: string = "",
      bigType: string = "",
      topicsValue: string = "",
      appId: string = "", // 实验资源集成唯一标识
      projectStudyId: string = "", // 实验记录id
      isFromUnity = ref("false"),
      isCheckFormUnity = ref("false");
    // 判断是否是从unity端跳转到web端，如果是的话，
    // 全部隐藏掉结束考核按钮
    [topicsValue, appId, projectStudyId] = getParams();
    [mode, bigType, type, topic, isFromUnity.value] = init();

    function init() {
      let topic: string = "",
        mode: string = "",
        type: string = "",
        bigType: string = "",
        isFromUnity: string = "false";
      if (topicsValue && appId && projectStudyId) {
        let vals: string[] = [];
        vals = spiltParamValue(topicsValue) as string[];
        let secondNumber: number = 0;
        for (let i = 0; i < 3; i++) {
          let index: number = Number(vals[i]);
          if (i == 1) {
            secondNumber = index;
          }
          let val: string = queryCurrentParamValue(i, index, secondNumber);
          if (val) {
            // 错误
            if (i == 0) {
              // mode的值等于bigType
              mode = val;
              bigType = val;
            } else if (i == 1) {
              type = val;
            } else {
              topic = val;
            }
          }
        }
        isFromUnity = "true";
      } else {
        isFromUnity = "false";
        topic = ((window as any).topic = route.params.topic).toString();
        mode = ((window as any).mode = route.params.mode).toString();
        type = ((window as any).topic = route.params.type).toString();
        bigType = $store.state.bigType;
      }
      return [mode, bigType, type, topic, isFromUnity];
    }
    // 获取页面的参数
    function getParams() {
      const href = window.location.href;
      // 获取参数——topics
      let topicsNumber = queryParamByParamName("topic", href);
      // 获取appid
      let appId = queryParamByParamName("appId", href);
      // 获取projectStudyId
      let projectStudyId = queryParamByParamName("projectStudyId", href);
      if (!appId || !topicsNumber || !projectStudyId) {
        return [];
      }
      return [topicsNumber, appId, projectStudyId];
    }
    // 获取对应名称的参数
    function queryParamByParamName(paramName: string, queryStr: string) {
      var reg = new RegExp('(^|&|)' + paramName + "=([^&]*)(&|$)", 'i');
      var str = queryStr.substr(1).match(reg);
      if (str) return unescape(str[2]);
      return null;
    }
    // 划分参数的值
    function spiltParamValue(value: string) {
      if (!value) return;
      var str: string[] = value.split('_');
      return str;
    }
    // 根据参数获取值
    function queryCurrentParamValue(type: number, value: number, secondNumber: number) {
      var list = new Array();
      switch (type) {
        case 0:
          list = enumList.mode;
          break;
        case 1:
          list = enumList.type;
          break;
        case 2:
          list = enumList.topic[secondNumber];
          break;
        default:
          break;
      }
      if (value < list.length && value >= 0) return list[value];
      return null;
    }
    // 将h5RenderData方法绑定到window下面，提供给外部调用
    // h5 -> unity
    (window as any).H5ToUnity = (data: any) => {
      console.log("h5 to unity:", data);
    }
    // unity -> h5 检查unity是否调用该方法， 如果没有，
    // 说明不是unity内置浏览器打开的
    (window as any).UnityToH5 = (data: any) => {
      console.log("UnityToH5:" + data);
      isCheckFormUnity.value = "true";
      console.log("isCheckFormUnity:" + isCheckFormUnity.value + "isFromUnity:" + isFromUnity.value);
    }

    // let topic: any = ((window as any).topic = route.params.topic);
    // let mode = ((window as any).mode = route.params.mode);
    // let type = ((window as any).topic = route.params.type);
    // const bigType = $store.state.bigType;
    // console.log("bigType", $store);
    // console.log("模式：", mode);
    // console.log("类型：", type);
    // console.log("题目：", topic);

    let topicNum = ref(-2);
    // let showAction = ref(false)
    let showControls = ref(false);

    let player: any = null;
    let hour: any = ref(0);
    let min: any = ref(0);
    let sec: any = ref(0);
    let timer: any = 0;
    let timeinter: any = null;

    const tujiao = ref();
    const shijiaoqi = ref();
    const maduo = ref();
    const duogongyi = ref();
    const zhuangpei = ref();
    const zhixing = ref();
    const cangku = ref();
    const damo = ref();
    const yazhuang = ref();
    const shukong = ref();
    const scara = ref();
    const hmia = ref();
    const hmib = ref();
    const layouta = ref();
    const layoutb = ref();

    function timeRun(): void {
      timer++;
      sec.value = returnNum(timer % 60);
      min.value = returnNum(parseInt(((timer / 60) % 60).toString()));
      hour.value = returnNum(parseInt((timer / 60 / 60).toString()));
    }
    function returnNum(num: any) {
      if (num < 10) {
        return "0" + num;
      }
      return num;
    }
    // let progressNum = ref('')
    const progressValue = computed(() => $store.state.progressValue);
    let sourceNum = ref(0);
    let sourceNums = ref(0);
    let showSource = ref(true);

    onMounted(() => {
      player = new ThreePlayer(box.value);

      // window.player = player
      (window as any).player = player;
      // console.log(player);

      let m1: unknown = null;
      let m2 = null;
      let m3 = null;
      let m4 = null;
      let m5 = null;
      let m6 = null;
      let m7 = null;
      let m8 = null;
      let m9 = null;
      let m10 = null;

      const myDB = new IndexDB(async () => {
        // 视角缩放限制
        player.controls.maxDistance = 140;
        player.controls.minDistance = 20;
        // progressNum.value = myDB._progressValue
        if (type === "工业机器人操作与运维") {
          if (topic !== "工作站布局B") {
            sourceNums.value = 4;
            player.camera.position.set(-22, 86, 123);
            player.camera.lookAt(0.66, 9.26, 8.98);
            player.camera.updateProjectionMatrix();

            m1 = await myDB.cacheModel("./changfang.json");
            sourceNum.value++;
            m2 = await myDB.cacheModel("./table.json");
            sourceNum.value++;
            m3 = await myDB.cacheModel("./zhuoshang.json");
            sourceNum.value++;
            m4 = await myDB.cacheModel("./robot.json");
            sourceNum.value++;
            showSource.value = false;

            player.load(m1, (obj: any, resolve: () => void) => {
              let scene = player.scene;
              scene.add(obj);
              // let yunwei: any = obj.getObjectByName("运维衬托改");
              // yunwei.visible = false;
              resolve();
            });

            player.load(m2, (obj: any, resolve: () => void) => {
              let scene = player.scene;
              scene.add(obj);
              resolve();
            });

            player.load(
              m3,
              (obj: any, resolve: () => void) => {
                let scene = player.scene;
                scene.add(obj);
                resolve();
                fullscreenLoading.value = false;
              },
              (xhr: any) => {
                loadingNum.value =
                  ((xhr.loaded / xhr.total) * 100).toFixed(0) + "% ";
              }
            );

            player.load(m4, async (obj: any, resolve: () => void) => {
              let scene = player.scene;
              scene.add(obj);

              //初始化坐标
              let j60: any = scene.getObjectByName("j6-0");

              let redBbox = new THREE.Box3(
                new THREE.Vector3(),
                new THREE.Vector3()
              );
              let blueBbox = new THREE.Box3(
                new THREE.Vector3(),
                new THREE.Vector3()
              );

              redBbox.setFromObject(j60);
              const redBoxHelper = new THREE.BoxHelper(j60, 0xffffff);
              // redBoxHelper.material.transparent = true
              player.redBbox = redBbox;
              // j60.add(redBoxHelper);

              const blueBox = new THREE.Mesh(
                new THREE.BoxGeometry(0.5, 0.5, 0.5),
                new THREE.MeshBasicMaterial({ color: 0xffffff }) //BLUE box
              );
              blueBox.name = "blueBox";
              blueBbox.setFromObject(blueBox);
              const blueBoxHelper = new THREE.BoxHelper(blueBox, 0x000000);
              player.blueBbox = blueBbox;
              // blueBox.add(blueBoxHelper);
              if (topic === "涂胶调试实训任务") {
                blueBox.position.set(-23.53, 23.22, 17.12);
              }

              scene.add(blueBox);

              resolve();
            });
          } else {
            //工作站布局B
            sourceNums.value = 3;
            player.camera.position.set(-22, 86, 123);
            player.camera.lookAt(0.66, 9.26, 8.98);
            player.camera.updateProjectionMatrix();

            m1 = await myDB.cacheModel("./changfang.json");
            sourceNum.value++;
            m4 = await myDB.cacheModel("./robot.json");
            sourceNum.value++;
            m5 = await myDB.cacheModel("./buju.json");
            sourceNum.value++;
            showSource.value = false;

            player.load(m1, (obj: any, resolve: () => void) => {
              let scene = player.scene;
              // let yunwei: any = obj.getObjectByName("运维衬托改");
              // yunwei.visible = false;
              scene.add(obj);
              resolve();
            });

            player.load(m4, (obj: any, resolve: () => void) => {
              let scene = player.scene;
              scene.add(obj);
              resolve();
            });
            player.load(
              m5,
              async (obj: any, resolve: () => void) => {
                let scene = player.scene;
                scene.add(obj);
                fullscreenLoading.value = false;

                resolve();
              },
              (xhr: any) => {
                loadingNum.value =
                  ((xhr.loaded / xhr.total) * 100).toFixed(0) + "% ";
              }
            );
          }
        } else {
          // 视角缩放限制
          player.controls.maxDistance = 60;
          player.controls.minDistance = 10;
          if (topic === "示教器操作") {
            sourceNums.value = 4;
            player.camera.position.set(1.59, 17.9, -12.4);
            player.camera.lookAt(-10.51, 10.15, 1.03);
            player.controls.target.set(-10.51, 10.15, 1.03);
            player.camera.updateProjectionMatrix();

            m1 = await myDB.cacheModel("./changfang.json");
            sourceNum.value++;
            // m6 = await myDB.cacheModel("./zhuoshang2a.json");
            // sourceNum.value++;
            // m7 = await myDB.cacheModel("./zhuoshang2b.json");
            // sourceNum.value++;
            m8 = await myDB.cacheModel("./robot2.json");
            sourceNum.value++;
            showSource.value = false;

            player.load(m1, (obj: any, resolve: () => void) => {
              let scene = player.scene;
              scene.add(obj);
              obj.position.set(75, 2.137, -31.941);
              obj.rotation.x = -3.14;
              obj.rotation.z = 3.14;
              obj.scale.set(0.35, 0.35, 0.35);
              let jicheng: any = obj.getObjectByName("集成衬托改");
              jicheng.visible = false;

              resolve();
            });
            // player.load(m6, (obj: any, resolve: () => void) => {
            //   let scene = player.scene;
            //   scene.add(obj);
            // });
            // player.load(
            //   m7,
            //   (obj: any, resolve: () => void) => {
            //     let scene = player.scene;
            //     fullscreenLoading.value = false;
            //     scene.add(obj);
            //   },
            //   (xhr: any) => {
            //     loadingNum.value =
            //       ((xhr.loaded / xhr.total) * 100).toFixed(0) + "% ";
            //   }
            // );
            player.load(
              m8,
              (obj: any, resolve: () => void) => {
                let scene = player.scene;
                obj.position.set(-8, 8.4, 0);
                let dz: any = obj.getObjectByName("dz-2");
                dz.visible = false;
                let zz: any = obj.getObjectByName("桌子-5");
                zz.visible = true;
                scene.add(obj);
                fullscreenLoading.value = false;
                resolve();
              },
              (xhr: any) => {
                loadingNum.value =
                  ((xhr.loaded / xhr.total) * 100).toFixed(0) + "% ";
              }
            );
          } else if (topic === "工作站布局A") {
            sourceNums.value = 3;

            player.camera.position.set(31.19, 34.26, -40.2);
            player.camera.lookAt(20.75, 1.43, 7.96);
            player.controls.target.set(20.75, 1.43, 7.96);
            player.camera.updateProjectionMatrix();

            m1 = await myDB.cacheModel("./changfang.json");
            sourceNum.value++;
            m9 = await myDB.cacheModel("./zuo.json");
            sourceNum.value++;
            m10 = await myDB.cacheModel("./you.json");
            sourceNum.value++;
            showSource.value = false;

            player.load(m1, (obj: any, resolve: () => void) => {
              let scene = player.scene;
              obj.position.set(90, 2.137, -31.941);
              obj.rotation.x = -3.14;
              obj.rotation.z = 3.14;
              obj.scale.set(0.35, 0.35, 0.35);
              let jicheng: any = obj.getObjectByName("集成衬托改");
              jicheng.visible = false;
              scene.add(obj);
              resolve();
            });
            player.load(m9, (obj: any, resolve: () => void) => {
              let scene = player.scene;
              obj.scale.set(0.01, 0.01, 0.01);
              scene.add(obj);
            });
            player.load(
              m10,
              (obj: any, resolve: () => void) => {
                let scene = player.scene;
                obj.scale.set(0.01, 0.01, 0.01);
                fullscreenLoading.value = false;
                scene.add(obj);
              },
              (xhr: any) => {
                loadingNum.value =
                  ((xhr.loaded / xhr.total) * 100).toFixed(0) + "% ";
              }
            );
          } else {
            sourceNums.value = 4;
            player.camera.position.set(9.46, 35.5, -40.66);
            player.camera.lookAt(-3.78, 5.23, 3.72);
            player.controls.target.set(-3.78, 5.23, 3.72);
            player.camera.updateProjectionMatrix();

            m1 = await myDB.cacheModel("./changfang.json");
            sourceNum.value++;
            m6 = await myDB.cacheModel("./zhuoshang2a.json");
            sourceNum.value++;
            m7 = await myDB.cacheModel("./zhuoshang2b.json");
            sourceNum.value++;
            m8 = await myDB.cacheModel("./robot2.json");
            sourceNum.value++;
            showSource.value = false;

            player.load(m1, (obj: any, resolve: () => void) => {
              let scene = player.scene;
              scene.add(obj);
              obj.position.set(75, 2.137, -31.941);
              obj.rotation.x = -3.14;
              obj.rotation.z = 3.14;
              obj.scale.set(0.35, 0.35, 0.35);
              let jicheng: any = obj.getObjectByName("集成衬托改");
              jicheng.visible = false;
              resolve();
            });
            player.load(m6, (obj: any, resolve: () => void) => {
              let scene = player.scene;
              scene.add(obj);
            });
            player.load(
              m7,
              (obj: any, resolve: () => void) => {
                let scene = player.scene;
                fullscreenLoading.value = false;
                scene.add(obj);
              },
              (xhr: any) => {
                loadingNum.value =
                  ((xhr.loaded / xhr.total) * 100).toFixed(0) + "% ";
              }
            );
            player.load(m8, (obj: any, resolve: () => void) => {
              let scene = player.scene;
              let zz: any = obj.getObjectByName("桌子-5");
              zz.visible = false;
              scene.add(obj);
              resolve();
            });
          }
        }
      });
    });

    function reset() {
      player.camera.position.set(-22, 86, 123);
      player.camera.lookAt(0.66, 9.26, 8.98);
      player.controls.target.set(0.66, 9.26, 8.98);
      player.camera.updateProjectionMatrix();
      player.renderer.render(player.scene, player.camera);
    }

    function getNowFormatDate() {
      var now = new Date();
      var year = now.getFullYear(); //年
      var month = now.getMonth() + 1; //月
      var day = now.getDate(); //日
      var hh = now.getHours(); //时
      var mm = now.getMinutes(); //分
      var ss = now.getSeconds(); //秒
      var clock = year + "-";
      if (month < 10) clock += "0";
      clock += month + "-";
      if (day < 10) clock += "0";
      clock += day + " ";
      if (hh < 10) clock += "0";
      clock += hh + ":";
      if (mm < 10) clock += "0";
      clock += mm + ":";
      if (ss < 10) clock += "0";
      clock += ss;
      return clock;
    }

    let showExit = ref(false);

    let startTime = "";
    function startTest() {
      showControls.value = true;
      startTime = getNowFormatDate();
    }

    function backHome() {
      // let p = {
      // 	name: "sadn",
      // 	score: 76
      // }
      // 未点击开始
      if (showControls.value) {
        showExit.value = true;
      }
      else {
        // 点击开始
        // gotoExit();
        router.push("/home/topics")
      }
    }
    function gotoExit() {
      if (isFromUnity.value == "true" && isFromUnity.value == isCheckFormUnity.value) {
        // 发送成绩
        (window as any).H5ToUnity(-1);
        return;
      }
      router.push("/home/topics");
      switch (topic) {
        case "工作站布局A":
          layouta.value.goBack();
          break;
        case "工作站布局B":
          layoutb.value.goBack();
          break;
        case "涂胶调试":
          tujiao.value.goBack();
          break;
        case "示教器操作":
          shijiaoqi.value.goBack();
          break;
        case "码垛调试":
          maduo.value.goBack();
          break;
        case "多工艺调试":
          duogongyi.value.goBack();
          break;
        case "装配调试":
          zhuangpei.value.goBack();
          break;
        case "执行单元调试":
          zhixing.value.goBack();
          break;
        case "仓库单元调试":
          cangku.value.goBack();
          break;
        case "打磨单元调试":
          damo.value.goBack();
          break;
        case "压装单元调试":
          yazhuang.value.goBack();
          break;
        case "数控单元调试":
          shukong.value.goBack();
          break;
        case "SCARA机器人":
          scara.value.goBack();
          break;
        case "工作站布局A":
          layouta.value.goBack();
          break;
        case "工作站布局B":
          layoutb.value.goBack();
          break;
        case "HMI模拟A":
          hmia.value.goBack();
          break;
        case "HMI模拟B":
          hmib.value.goBack();
          break;
      }
    }
    async function itemExit(p: any) {
      // console.log("上传成绩并退出");
      showExit.value = false;
      if (bigType === "教学演示") {
      } else if (bigType === "实训练习") {
      } else if (bigType === "在线考核") {
        // let result:object = {
        //     "moduleFlag": p.name,
        //     "questionNumber": 1,
        //     "questionStem": p.name,
        //     "score": p.score * 2,
        //     "trueOrFalse": "True"
        //   }
        // await $store.dispatch("setResultValue", result);
        // alert("考核成绩上传成功！");
        // let url = "";
        // let data = null;
        // // url = "http://jhc.owvlab.net/openapi/data_upload"
        // let ishttps = "https:" === document.location.protocol ? true : false;
        // if (ishttps) {
        //   url = "https://10.8.15.102/openapi/data_upload";
        // } else {
        //   url = "http://10.8.15.102/openapi/data_upload";
        // }
        //  let params = getParamByUrl(window.location.href);
        //  if(params.token){
        //     let loginArr = params.token.split("_");
        //   data = {
        //   "appId": loginArr[0],
        //   "projectStudyId": loginArr[1],
        //   "currentStartTime": startTime,
        //   "currentEndTime": getNowFormatDate(),
        //   "expScoreDetails": [{
        //     "moduleFlag": p.name,
        //     "questionNumber": 1,
        //     "questionStem": p.name,
        //     "score": p.score * 2,
        //     "trueOrFalse": "True"
        //   }],
        // }
        //  }

        // let response = await fetch(url, {
        //   method: "POST",
        //   // credentials: 'include',
        //   headers: {
        //     "Content-Type": 'application/json;charset=utf-8',
        //   },
        //   mode: "cors",
        //   body: JSON.stringify(data),
        // });
        // // console.log('response', response)
        // let res = await response.json();
        // if (res.code === 200) {
        //   alert('结果上传成功！')
        // }
      }
      if (isFromUnity.value == "true" && isFromUnity.value == isCheckFormUnity.value) {
        console.log("itemExit");
        // 发送成绩
        (window as any).H5ToUnity(-1);
      }
      else {
        router.push("/home/topics");
      }
      router.push("/home/topics");
    }
    // const changeRightTips = async (value: any) => {
    //     rightTips = Tips[topic].filter((item: any) => item.num === value)[0].name
    //     // await nextTick()
    //     // console.log('Now DOM is updated')
    //   }
    function getParamByUrl(url: any) {
      var theRequest: any = new Object();
      var index = url.indexOf("?");
      if (index != -1) {
        // debugger
        let str = url.substr(index + 1);
        let strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
          theRequest[strs[i].split("=")[0]] = strs[i].split("=")[1];
        }
      }
      return theRequest;
    }
    // 步骤更新并监听
    function changeTopicNum(num: number) {
      topicNum.value = num;
      // paperShow.value = false
      if (num === 1 && topic.includes("工作站布局")) {
        paperShow.value = false;
      }
      if (num === 2 && topic.includes("工作站布局")) {
        paperShow.value = true;
      }
    }
    function runtonum(type: string, num: number, name: string) {
      console.log('++++++',type,num,name)
      if (bigType !== "教学演示") return;
      if (type === "a") {
        if (name === "实训开始") {
          showControls.value = false;
        }

        newNum.value = num;
        switch (topic) {
          case "工作站布局A":
            layouta.value.changeNum(newNum.value);
            break;
          case "工作站布局B":
            layoutb.value.changeNum(newNum.value);
            break;
          case "涂胶调试":
            tujiao.value.changeNum(newNum.value);
            break;
          case "示教器操作":
            shijiaoqi.value.changeNum(newNum.value);
            break;
          case "码垛调试":
            maduo.value.changeNum(newNum.value);
            break;
          case "多工艺调试":
            duogongyi.value.changeNum(newNum.value);
            break;
          case "装配调试":
            zhuangpei.value.changeNum(newNum.value);
            break;
          case "执行单元调试":
            zhixing.value.changeNum(newNum.value);
            break;
          case "仓库单元调试":
            cangku.value.changeNum(newNum.value);
            break;
          case "打磨单元调试":
            damo.value.changeNum(newNum.value);
            break;
          case "压装单元调试":
            yazhuang.value.changeNum(newNum.value);
            break;
          case "数控单元调试":
            shukong.value.changeNum(newNum.value);
            break;
          case "SCARA机器人":
            scara.value.changeNum(newNum.value);
            break;
          case "HMI模拟A":
            hmia.value.changeNum(newNum.value);
            break;
          case "HMI模拟B":
            hmib.value.changeNum(newNum.value);
            break;
        }
        // console.log("点击的", newNum.value);
      }
    }
    let rightTips = computed(() => {
      // if (topic.includes("工作站布局")) return;
      let arr = Tips[topic].filter((item: any) => {
        return item.num === topicNum.value;
      });
      // console.log(arr);
      return arr.length === 0 ? [{ name: "请按提示进行操作" }] : arr;
    });

    watch(showControls, () => {
      // if (!topic.includes("工作站布局")) return;
      hour.value = 0;
      min.value = 0;
      sec.value = 0;
      timer = 0;
      if (timeinter) {
        clearInterval(timeinter);
      }
      timeinter = setInterval(() => {
        timeRun();
      }, 1000);
    });

    watch(topicNum, () => {
      // console.log("父组件更新", topicNum.value);
      //更新tips

      // rightTips = Tips[topic].filter((item: any) => item.num === topicNum.value)[0].name
      // nextTick()

      // console.log(rightTips)

      hour.value = 0;
      min.value = 0;
      sec.value = 0;
      timer = 0;
      if (timeinter) {
        clearInterval(timeinter);
      }
      timeinter = setInterval(() => {
        timeRun();
      }, 1000);
    });
    let paperShow = ref(false);
    let bjbSwitch = ref(1);

    onBeforeUnmount(async () => {
      (window as any).player = null;
      await $store.dispatch("setshixun", false);
      await $store.dispatch("setkaohe", false);
    });
    return {
      defineComponent,
      onMounted,
      ref,
      useRouter,
      useRoute,
      ThreePlayer,
      box,
      paperShow,
      bjbSwitch,
      type,
      router,
      backHome,
      showControls,
      reset,
      topic,
      fullscreenLoading,
      changeTopicNum,
      hour,
      min,
      sec,
      Tips,
      rightTips,
      topicNum,
      bigType,
      newNum,
      mode,
      loadingNum,
      runtonum,
      tujiao,
      shijiaoqi,
      maduo,
      duogongyi,
      zhuangpei,
      zhixing,
      cangku,
      damo,
      yazhuang,
      shukong,
      scara,
      hmia,
      hmib,
      showExit,
      itemExit,
      gotoExit,
      layouta,
      layoutb,
      startTest,
      progressValue,
      sourceNum,
      sourceNums,
      showSource,
      isFromUnity,
      isCheckFormUnity,
    };
  },
});
</script>

<template>
  <div class="main">
    <div class="loadingPage" v-if="fullscreenLoading">
      <div class="text" v-if="showSource">
        首次进入正在下载更新资源，耗时较长，请耐心等待
        <br />
        ({{ sourceNum }}/{{ sourceNums }})({{ progressValue }})
      </div>
      <div class="text" v-if="!showSource">
        正在加载资源，请稍候({{ loadingNum }})
      </div>
    </div>
    <!-- todo: 新增判断是否是从unity端跳转过来的 -->
    <div class="backbtn" v-if="bigType === '教学演示'" @click="backHome()">结束演示</div>
    <div class="backbtn" v-if="bigType === '实训练习'" @click="backHome()">结束实训</div>
    <div class="backbtn" v-if="bigType === '在线考核'" @click="backHome()">结束考核</div>
    <!-- todo： end -->

    <div class="tip_box" v-if="showExit">
      <p v-if="bigType === '教学演示'">确定要结束本次教学吗？</p>
      <p v-if="bigType === '实训练习'">
        确定要结束本次实训吗？已完成的步骤将会上传至后台
      </p>
      <p v-if="bigType === '在线考核'">
        确定要结束本次考核并提交成绩吗？（未完成的步骤将不会计入成绩）
      </p>
      <div class="btn1" @click="gotoExit()">确定</div>
      <div class="btn2" @click="showExit = false">取消</div>
    </div>

    <div class="three_box" ref="box"></div>
    <!-- <div class="typeTitle">[{{ bigType }}]</div> -->
    <div class="title">{{ type }}</div>
    <div class="sub_title">{{ topic }}{{ bigType }}</div>
    <div class="right_tips" v-if="showControls && !topic.includes('工作站布局')">
      <div class="t" v-for="t in rightTips" :key="t">{{ t.name }}</div>
    </div>
    <!-- <div class="list_box" v-if="!topic.includes('工作站布局')"> -->
    <div class="list_box" v-if="bigType !== '在线考核'">
      <div class="tips_box">
        <div class="tips_item" v-for="tip in Tips[topic]" :key="tip" @click="runtonum(tip.type, tip.nums[0], tip.name)"
          :class="{
            tip1: tip.type === 'a',
            tip2: tip.type === 'b',
            tip3: tip.type === 'c',
            active: tip.type !== 'c' && tip.nums.includes(topicNum),
          }">
          {{ tip.name }}
        </div>
      </div>
    </div>
    <div class="buzhou" v-if="!topic.includes('工作站布局')"></div>
    <div class="buzhou_title" v-if="!topic.includes('工作站布局')&&bigType !== '在线考核'">
      实训步骤总览
    </div>
    <!-- <div class="voice"></div> -->
    <div class="right_top_box">
      <div class="time">
        时间：{{ hour === 0 ? "00" : hour }}：{{ min === 0 ? "00" : min }}：{{
        sec === 0 ? "00" : sec
        }}
      </div>
      <!-- <div class="btn1" @click="paperShow = !paperShow"></div> -->
      <div class="btn2"></div>
    </div>
    <div class="paperPage" v-if="paperShow">
      <div style="position: relative" v-if="topic.includes('工作站布局B')">
        <div class="close" @click="runtonum('a', 1, '工作站布局操作')">+</div>
        <div class="page" v-if="bjbSwitch === 1">
          <img src="/buju/q1.png" />
        </div>
        <div class="page" v-if="bjbSwitch === 2">
          <img src="/buju/q2.png" />
        </div>
        <div class="swtich">
          <div class="s_btn" :class="{ active: bjbSwitch === 1 }" @click="bjbSwitch = 1">
            1
          </div>
          <div class="s_btn" :class="{ active: bjbSwitch === 2 }" @click="bjbSwitch = 2">
            2
          </div>
        </div>
      </div>
      <div style="position: relative" v-if="topic.includes('工作站布局A')">
        <div class="close" @click="runtonum('a', 1, '工作站布局操作')">+</div>
        <div class="page" v-if="bjbSwitch === 1">
          <img src="/buju/o1.png" />
        </div>
        <div class="page" v-if="bjbSwitch === 2">
          <img src="/buju/o2.png" />
        </div>
        <div class="page" v-if="bjbSwitch === 3">
          <img src="/buju/o3.png" />
        </div>
        <div class="swtich">
          <div class="s_btn" :class="{ active: bjbSwitch === 1 }" @click="bjbSwitch = 1">
            1
          </div>
          <div class="s_btn" :class="{ active: bjbSwitch === 2 }" @click="bjbSwitch = 2">
            2
          </div>
          <div class="s_btn" :class="{ active: bjbSwitch === 3 }" @click="bjbSwitch = 3">
            3
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="right_bottom_box">
      <div class="btn1" @click="showControls = !showControls"></div>
      <div class="btn2" @click="reset"></div>
    </div>-->
    <div v-if="showControls">
      <!-- 运维 -->
      <gluing ref="tujiao" v-if="topic === '涂胶调试'" @back="itemExit" @changeTopicNum="changeTopicNum"></gluing>
      <teaching-pendant ref="shijiaoqi" v-if="topic === '示教器操作'" @back="itemExit" @changeTopicNum="changeTopicNum">
      </teaching-pendant>
      <palletizing ref="maduo" v-if="topic === '码垛调试'" @back="itemExit" @changeTopicNum="changeTopicNum"></palletizing>
      <process ref="duogongyi" v-if="topic === '多工艺调试'" @back="itemExit" @changeTopicNum="changeTopicNum"></process>
      <bssembling ref="zhuangpei" v-if="topic === '装配调试'" @back="itemExit" @changeTopicNum="changeTopicNum">
      </bssembling>
      <!-- 集成 -->
      <implement ref="zhixing" v-if="topic === '执行单元调试'" @back="itemExit" @changeTopicNum="changeTopicNum"></implement>
      <warehouse ref="cangku" v-if="topic === '仓库单元调试'" @back="itemExit" @changeTopicNum="changeTopicNum"></warehouse>
      <polish ref="damo" v-if="topic === '打磨单元调试'" @back="itemExit" @changeTopicNum="changeTopicNum"></polish>
      <pressfit ref="yazhuang" v-if="topic === '压装单元调试'" @back="itemExit" @changeTopicNum="changeTopicNum"></pressfit>
      <numerical-control ref="shukong" v-if="topic === '数控单元调试'" @back="itemExit" @changeTopicNum="changeTopicNum">
      </numerical-control>
      <scara ref="scara" v-if="topic === 'SCARA机器人'" @back="itemExit" @changeTopicNum="changeTopicNum"></scara>
      <layouta ref="layouta" v-if="topic === '工作站布局A'" @back="itemExit" @changeTopicNum="changeTopicNum"></layouta>
      <layoutb ref="layoutb" v-if="topic === '工作站布局B'" @back="itemExit" @changeTopicNum="changeTopicNum"></layoutb>
      <hmia ref="hmia" v-if="topic === 'HMI模拟A'" @back="itemExit" @changeTopicNum="changeTopicNum"></hmia>
      <hmib ref="hmib" v-if="topic === 'HMI模拟B'" @back="itemExit" @changeTopicNum="changeTopicNum"></hmib>
    </div>
    <!-- todo: 新增，判断存在参数而且unity调用了方法 -->
    <!-- <div v-if="!showControls && isCheckFormUnity === isFromUnity" class="startb" @click="startTest">开始{{ bigType }}</div> -->
    <div v-if="!showControls && isCheckFormUnity === isFromUnity" class="startb" @click="startTest">开始{{ bigType }}
    </div>
    <!-- todo: end -->

    <!-- <router-link to="/">Go to Home</router-link> -->
  </div>
</template>

<style scoped lang="less">
.main {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;

  .loadingPage {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 999;
    background-color: #000000e6;

    .text {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 16px;
      color: #fb9b09;
      text-align: center;
    }
  }

  .paperPage {
    position: absolute;
    /* width: 1410px; */
    /* height: 640px; */
    left: 50%;
    top: 50%;
    /* overflow: auto; */
    transform: translate(-50%, -50%);
    border: 4px solid #fb9b09;
    background-color: #fff;
    z-index: 9999;

    .close {
      position: absolute;
      /* width: 30px; */
      /* height: 50px; */
      right: 10px;
      top: -10px;
      font-size: 39px;
      transform: rotateZ(45deg);
      color: #fb9b09;
      text-align: center;
      cursor: pointer;
      z-index: 9;
    }

    .page {
      position: relative;
      width: 1410px;
      height: 600px;
      overflow: auto;

      &::-webkit-scrollbar {
        width: 8px;
      }

      &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background: #ffb100a3;
      }

      &::-webkit-scrollbar-track {
        background: #ffffff1a;
      }

      img {
        width: 100%;
        /* height: 100%; */
      }
    }

    .swtich {
      position: absolute;
      left: 50%;
      bottom: -50px;
      transform: translateX(-50%);
      background-color: #fff;
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      justify-content: space-between;

      .s_btn {
        width: 30px;
        height: 30px;
        line-height: 30px;
        border: 1px solid #fb9b09;
        color: #fb9b09;
        cursor: pointer;
        text-align: center;
      }

      .active {
        background-color: #fb9b09;
        color: #fff;
      }
    }
  }

  .startb {
    left: 50%;
    transform: translateX(-50%);
    bottom: 60px;
    position: absolute;
    width: 200px;
    height: 45px;
    margin: 20px auto 0;
    font-size: 18px;
    text-align: center;
    line-height: 45px;
    border-radius: 25px;
    color: #fff;
    cursor: pointer;
    background-color: #ffaf4c;
  }

  .tip_box {
    width: 400px;
    height: 250px;
    padding: 50px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border: 4px solid #fb9b09;
    z-index: 99999;
    box-sizing: border-box;

    p {
      line-height: 30px;
      font-size: 16px;
      text-align: center;
    }

    .btn1 {
      width: 100px;
      height: 30px;
      line-height: 30px;
      background-color: #fb9b09;
      border: 2px solid transparent;
      color: #fff;
      position: absolute;
      top: 170px;
      left: 80px;
      text-align: center;
      font-size: 16px;
      cursor: pointer;
    }

    .btn2 {
      width: 100px;
      height: 30px;
      line-height: 30px;
      background-color: #fff;
      border: 2px solid #fb9b09;
      color: #fb9b09;
      position: absolute;
      top: 170px;
      left: 220px;
      text-align: center;
      font-size: 16px;
      cursor: pointer;
    }
  }

  .backbtn {
    color: #fff;
    position: absolute;
    width: 100px;
    text-align: center;
    left: 1%;
    bottom: 2%;
    /* border-radius: 10px; */
    cursor: pointer;
    font-size: 16px;
    padding: 5px 0px 5px 20px;
    background-color: #ffaf4cd6;

    span {
      color: #ffffff;
    }

    &::before {
      content: "";
      /* display: inline-block; */
      position: absolute;
      width: 20px;
      height: 20px;
      /* margin-top: 20px; */
      top: 6px;
      left: 10px;
      background: url(../newbackbtn.png) no-repeat;
      background-size: 100% 100%;
      mix-blend-mode: screen;
    }
  }

  .typeTitle {
    position: absolute;
    left: 168px;
    top: 79px;
    color: #ffffff;
    font-size: 24px;
    color: #f90;
    font-weight: bold;
    /* width: 80px; */
    /* background-color: white; */
    /* text-shadow: 1px 1px 2px #9f9f9f; */
  }

  .title {
    position: absolute;
    left: 1%;
    top: 15px;
    font-size: 30px;
    font-weight: bold;
    color: #fb9b09;
    text-shadow: 2px 2px 0px #767676;
  }

  .sub_title {
    position: absolute;
    left: 1%;
    top: 65px;
    color: orange;
    font-size: 24px;
    font-weight: bold;
    text-shadow: 2px 2px 0px #787878;
  }

  .right_tips {
    position: absolute;
    max-width: 420px;
    /* height: 70%; */
    right: 2%;
    top: 10%;
    padding: 20px;
    border-radius: 10px;
    background-color: #fb9b09;
    /* color: #dd4646; */

    .t {
      font-size: 18px;
      color: #fff;
      /* font-weight: bold; */
    }
  }

  .list_box {
    position: absolute;
    width: 18%;
    max-width: 300px;
    min-width: 270px;
    // height: 70%;
    left: 1%;
    top: 155px;
    background-color: #00000014;

    .tips_box {
      position: absolute;
      width: 100%;
      left: 0;
      max-height: 700px;
      top: 0;
      overflow: auto;
      padding-right: 4px;
      background-color: #ffffff2b;

      &::-webkit-scrollbar {
        width: 4px;
      }

      &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background: #ffb100a3;
      }

      &::-webkit-scrollbar-track {
        background: #ffffff1a;
      }

      .tips_item {
        padding: 5px 10px;
        font-size: 14px;
        height: 37px;
        box-sizing: border-box;
        position: relative;
        margin-bottom: 3px;
        border: 4px solid transparent;
      }

      .tip1 {
        background-color: #ffffff;
        /* text-align: center; */
        color: #f90;
        font-weight: bold;
        padding-left: 20px;
        cursor: pointer;

        &::before {
          content: "";
          position: absolute;
          left: 10px;
          top: 10px;
          width: 0px;
          height: 0px;
          border-top: 5px solid transparent;
          border-right: 10px solid transparent;
          border-bottom: 5px solid transparent;
          border-left: 5px solid #f90;
        }
      }

      .none {
        display: none;
      }

      .tip2 {
        color: #ffffff;
        background-color: #7c7c7ca6;
        padding-left: 20px;
        /* width: 290px; */
        /* float: right; */
        margin-left: 39px;

        &::before {
          content: "";
          position: absolute;
          left: -19px;
          top: 10px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #ffffff;
        }

        &::after {
          content: "";
          position: absolute;
          left: -16px;
          top: 11px;
          width: 2px;
          height: 40px;
          border-radius: 50%;
          background-color: #fff;
        }
      }

      .tip3 {
        color: #fff;
        display: none;
        /* background-color: #00000033; */
        font-size: 14px;
        padding-left: 50px;

        &::before {
          content: "";
          position: absolute;
          width: 5px;
          height: 5px;
          top: 12px;
          left: 40px;
          border-radius: 5px;
          background-color: #fff;
        }
      }

      .active {
        color: #ffbc00;
        font-weight: bold;
        border: 4px solid #ffbc00;
      }
    }
  }

  .buzhou {
    position: absolute;
    left: 3%;
    top: 113px;
    width: 45px;
    height: 40px;
    background: url(../buzhou.png) no-repeat;
    background-size: 100% 100%;
    z-index: 1;
  }

  .buzhou_title {
    position: absolute;
    left: 1%;
    top: 112px;
    color: #f90;
    font-size: 18px;
    width: 18%;
    min-width: 270px;
    max-width: 300px;
    font-weight: bold;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background-color: #fff;
  }

  .voice {
    position: absolute;
    left: 5%;
    bottom: 2%;
    width: 30px;
    height: 30px;
    background: url(../voice.png) no-repeat;
    background-size: 100% 100%;
  }

  .right_top_box {
    position: absolute;
    right: 2%;
    top: 3%;
    width: 350px;
    height: 40px;
    background-color: #e4e4e4d6;
    border-radius: 30px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-evenly;
    align-items: center;

    .time {
      width: 170px;
      font-size: 16px;
      color: #ff9900;
      font-weight: bold;
    }

    .btn1 {
      width: 30px;
      height: 30px;
      background: url(../doc.png) no-repeat;
      background-size: 100% 100%;
      cursor: pointer;
    }

    .btn2 {
      width: 30px;
      height: 30px;
      background: url(../help.png) no-repeat;
      background-size: 100% 100%;
      cursor: pointer;
    }
  }

  .right_bottom_box {
    position: absolute;
    right: 30px;
    bottom: 40px;
    width: 200px;
    height: 62px;
    background-color: #ffffff66;
    /* padding-top: 20px; */
    /* background-color: #00000066; */
    border-radius: 30px;

    .btn1 {
      width: 37px;
      height: 37px;
      cursor: pointer;
      position: absolute;
      left: 40px;
      top: 0;
      background: url(../shijiaoqiicon.png) no-repeat;
      background-size: 100% 100%;

      &::after {
        content: "示教器";
        position: absolute;
        bottom: -18px;
        left: -4px;
        font-size: 16px;
        color: #f90;
        width: 50px;
        font-weight: bold;
      }
    }

    .btn2 {
      width: 30px;
      height: 30px;
      cursor: pointer;
      position: absolute;
      left: 120px;
      top: 4px;
      background: url(../fuyuan.png) no-repeat;
      background-size: 100% 100%;

      &::after {
        content: "重置设置";
        position: absolute;
        bottom: -22px;
        left: -13px;
        font-size: 16px;
        color: #f90;
        font-weight: bold;
        width: 70px;
      }
    }

    // .text1 {
    //   position: absolute;
    //   cursor: pointer;
    //   bottom: -10px;
    //   left: 30px;
    //   font-size: 16px;
    //   color: #f90;
    //   font-weight: bold;
    // }
    // .text2 {
    //   position: absolute;
    //   cursor: pointer;
    //   bottom: -10px;
    //   left: 90px;
    //   font-size: 16px;
    //   color: #f90;
    //   font-weight: bold;
    // }
  }
}
</style>
