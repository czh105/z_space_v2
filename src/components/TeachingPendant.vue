<script lang="ts">
import {
  defineComponent,
  computed,
  watch,
  onMounted,
  ref,
  reactive,
  onBeforeUnmount,
} from "vue";

import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";

import Result from "../hooks/result";
import $store from "../store/index";
import Bridge from "../hooks/bridge";
import ThinkingSelect from "../components/ThinkingSelect.vue";
import { ElMessage } from 'element-plus'
export default defineComponent({
  name: "TeachingPendant",
  components: {
    ThinkingSelect,
  },
  props: {
    player: Object,
    // propNum: Number
  },
  setup(props, { emit }) {
    let nowType = ref("");
    let btnType = ref("");
    let topicNum = ref(-1);
    let leftContent = ref("示教器操作");
    let topic = ref((window as any).topic);
    let showMenu = ref(false);
    let animateSwitch = ref(false);
    let showSub = ref(false);
    let alp = 0.01;
    let blp = 0.01;
    let kongzhi = ref(false);
    let onoff = ref(false);
    let bigType = $store.state.bigType;

    function goBack() {
      let p = {
        name: "示教器操作",
        score: score.value,
      };
      console.log("上传", p);
      if(bigType !== "教学演示"){
        alert(`您本次实训成绩为：${p.score}分`,)
      }
      emit("back", p);
    }
    let player: any = (window as any).player;
    let j1: any = player.scene.getObjectByName("j1");
    let j2: any = player.scene.getObjectByName("j2");
    let j3: any = player.scene.getObjectByName("j3");
    let j4: any = player.scene.getObjectByName("j4");
    let j5: any = player.scene.getObjectByName("j5");
    let j6: any = player.scene.getObjectByName("j6");

    let actionsNum = 2;
    const m = new THREE.Matrix4();

    m.set(1, 0, 0, 750,
      0, 1, 0, 0,
      0, 0, 1, 1250,
      0, 0, 0, 1);

    let mx = 750
    let my = 0
    let mz = 1250
    let mxx = 0;
    let myx = 0;
    let mzx = 0;
    let m12 = 0
    let m13 = 0
    let m14 = 0

    onMounted(() => {
      // debugger
      nowType.value = "A";
      emit("changeTopicNum", topicNum.value);


      // let obj:any = player.scene.getObjectByName("___NONE");

      // const url = 'http://121.5.221.47:4000'

      // fetch(url + '/robot', {
      //   method: 'POST',
      //   // credentials: 'include',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   // 0.307, 0.349, 0.885, 0, 0.144, -0.936, 0.319, 0, 0.94, 0.03, -0.33, 0, 378.789, -124.737, 688.849, 1
      //   mode: 'cors',
      //   body: JSON.stringify({ values: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.22, 38.87, 21.24, 1] })
      // }).then(res => {
      //   return res.json()
      // })
      //   .catch(error => console.error('Error:', error))
      //   .then(response => console.log('Success666:', response));
      //   // [90.32428445837223, 114.14556618586737, 30.922382204491793, 0, 124.93205160964087, -90.32428445837223]
    });

    let arrY = [
      [-0.23, 0.02, -0.03, -0.56, 0.19, 0.04],
      [-0.12, -0, -0, -0.38, 0.04, 0],
      [-0, -0, -0, 0, -0, 0],
      [0.14, 0, -0.01, 0.23, 0.19, 0.04],
      [0.26, 0.04, -0.06, 0.57, 0.28, 0.04],
    ];
    let arrX = [
      [-0, -0.23, 0.21, 0, -0, 0],
      [-0, -0.12, 0.12, 0, -0, 0],
      [-0, -0, -0, 0, -0, 0],
      [-0, 0.13, -0.14, 0, -0, 0],
      [-0, 0.26, -0.29, 0, -0, 0],
    ];
    let arrZ = [
      [-0, 0.03, 0.22, -0.01, 0.02, 0],
      [-0, 0.01, 0.12, -0.01, 0.02, 0],
      [-0, -0, -0, 0, -0, 0],
      [-0, 0.01, -0.14, 0, 0.1, 0],
      [-0, 0.03, -0.3, 0, 0.24, 0],
    ];

    let arrCX = [
      [-0.04, 0.01, -0.07, -0.68, 0.49, 0.06],
      [-0.02, 0, -0.05, -0.36, 0.42, 0.06],
      [-0, -0, -0, 0, -0, 0],
      [0.01, 0, -0.02, 0.34, 0.15, 0.02],
      [0.03, 0, -0.05, 0.49, 0.42, 0.06],
    ];
    let arrCY = [
      [-0, 0.04, 0.05, 0, -0.62, 0],
      [-0, 0.03, -0, 0, -0.17, 0],
      [-0, -0, -0, 0, -0, 0],
      [-0, 0.02, -0.08, 0, 0.39, 0],
      [-0, 0.03, -0.13, 0, 0.63, 0],
    ];

    function upDown(type: string) {
      // debugger
      if (nowType.value === "A") {
        // debugger
        switch (type) {
          case "left":
            if (j1.rotation.z > 2) return;
            j1.rotation.z = j1.rotation.z - 0.01;
            break;
          case "right":
            if (j1.rotation.z < -2) return;
            j1.rotation.z = j1.rotation.z + 0.01;
            break;
          case "up":
            if (j2.rotation.x > 0.87) return;
            j2.rotation.x = j2.rotation.x + 0.01;
            break;
          case "down":
            if (j2.rotation.x < -0.87) return;
            j2.rotation.x = j2.rotation.x - 0.01;
            break;
          //new
          case "leftTop":
            if (j1.rotation.z > 2 || j2.rotation.x > 0.87) return;
            j1.rotation.z = j1.rotation.z + 0.01;
            j2.rotation.x = j2.rotation.x + 0.01;
            break;
          case "rightTop":
            if (j1.rotation.z < -2 || j2.rotation.x > 0.87) return;
            j1.rotation.z = j1.rotation.z - 0.01;
            j2.rotation.x = j2.rotation.x + 0.01;
            break;
          case "leftBottom":
            if (j1.rotation.z > 2 || j2.rotation.x < -0.87) return;
            j1.rotation.z = j1.rotation.z + 0.01;
            j2.rotation.x = j2.rotation.x - 0.01;
            break;
          case "rightBottom":
            if (j1.rotation.z < -2 || j2.rotation.x < -0.87) return;
            j1.rotation.z = j1.rotation.z - 0.01;
            j2.rotation.x = j2.rotation.x - 0.01;
            break;

          case "r1":
            if (j3.rotation.x > 1) return;
            j3.rotation.x = j3.rotation.x - 0.01;
            break;
          case "r2":
            if (j3.rotation.x < -1) return;
            j3.rotation.x = j3.rotation.x + 0.01;
            break;
        }
      } else if (nowType.value === "B") {
        switch (type) {
          case "left":
            if (j4.rotation.y > 1) return;
            j4.rotation.y = j4.rotation.y + 0.01;
            break;
          case "right":
            if (j4.rotation.y < -1) return;
            j4.rotation.y = j4.rotation.y - 0.01;
            break;
          case "up":
            // if (j5.rotation.x > 2) return
            j5.rotation.x = j5.rotation.x + 0.01;
            break;
          case "down":
            // if (j5.rotation.x < -0.05) return
            j5.rotation.x = j5.rotation.x - 0.01;
            break;

          case "leftTop":
            if (j4.rotation.y > 1 || j5.rotation.x > 1.6) return;
            j4.rotation.y = j4.rotation.y + 0.01;
            j5.rotation.x = j5.rotation.x + 0.01;
            break;
          case "rightTop":
            if (j4.rotation.y < -1 || j5.rotation.x > 1.6) return;
            j4.rotation.y = j4.rotation.y - 0.01;
            j5.rotation.x = j5.rotation.x + 0.01;
            break;
          case "leftBottom":
            if (j4.rotation.y > 1 || j5.rotation.x < -0.05) return;
            j4.rotation.y = j4.rotation.y + 0.01;
            j5.rotation.x = j5.rotation.x - 0.01;
            break;
          case "rightBottom":
            if (j4.rotation.y < -1 || j5.rotation.x < -0.05) return;
            j4.rotation.y = j4.rotation.y - 0.01;
            j5.rotation.x = j5.rotation.x - 0.01;
            break;

          case "r1":
            if (j6.rotation.y > 2) return;
            j6.rotation.y = j6.rotation.y + 0.01;
            break;
          case "r2":
            if (j6.rotation.y < -2) return;
            j6.rotation.y = j6.rotation.y - 0.01;
            break;
        }
      } else if (nowType.value === "C") {

        // let mx = 750
        // let my = 0
        // let mz = 1250



        console.log('m.elements', m.elements)

        switch (type) {
          case "left":
            // actionsNum--;
            // if (actionsNum < 0) {
            //   actionsNum = 0;
            // }
            // animateState(arrY[actionsNum], 500);
            my -= 5
            m.makeTranslation(mx, my, mz)
            transformRobot(m.elements)
            break;
          case "right":
            // actionsNum++;
            // if (actionsNum > 4) {
            //   actionsNum = 4;
            // }
            // animateState(arrY[actionsNum], 500);
            my += 5
            m.makeTranslation(mx, my, mz)
            transformRobot(m.elements)

            break;
          case "up":
            // actionsNum++;
            // if (actionsNum > 4) {
            //   actionsNum = 4;
            // }
            // animateState(arrX[actionsNum], 500);
            mz -= 5
            m.makeTranslation(mx, my, mz)
            transformRobot(m.elements)
            break;
          case "down":
            // actionsNum--;
            // if (actionsNum < 0) {
            //   actionsNum = 0;
            // }
            // animateState(arrX[actionsNum], 500);
            mz += 5
            m.makeTranslation(mx, my, mz)
            transformRobot(m.elements)
            break;

          case "leftTop":
            break;
          case "rightTop":
            break;
          case "leftBottom":
            break;
          case "rightBottom":
            break;

          case "r1":
            // actionsNum--;
            // if (actionsNum < 0) {
            //   actionsNum = 0;
            // }
            // animateState(arrZ[actionsNum], 500);
            mx -= 5
            m.makeTranslation(mx, my, mz)
            transformRobot(m.elements)
            break;
            break;
          case "r2":
            // actionsNum++;
            // if (actionsNum > 4) {
            //   actionsNum = 4;
            // }
            // animateState(arrZ[actionsNum], 500);
            mx += 5
            m.makeTranslation(mx, my, mz)
            transformRobot(m.elements)
            break;
            break;
        }
      } else if (nowType.value === "D") {
        switch (type) {
          case "left":
            // actionsNum--;
            // if (actionsNum < 0) {
            //   actionsNum = 0;
            // }
            // animateState(arrCY[actionsNum], 500);
            mxx -= 0.01
            m12 = m.elements[12]
            m13 = m.elements[13]
            m14 = m.elements[14]
            m.makeRotationX(mxx)
            m.elements[12] = m12
            m.elements[13] = m13
            m.elements[14] = m14
            // let pingyiM = m.makeTranslation(mx, my, mz)
            // xuanzhuanM.copyPosition(pingyiM)
            // console.log('+++++++++++++++++', xuanzhuanM)
            transformRobot(m.elements)
            break;
          case "right":
            // actionsNum++;
            // if (actionsNum > 4) {
            //   actionsNum = 4;
            // }
            // animateState(arrCY[actionsNum], 500);
            mxx += 0.01
            m12 = m.elements[12]
            m13 = m.elements[13]
            m14 = m.elements[14]
            m.makeRotationX(mxx)
            m.elements[12] = m12
            m.elements[13] = m13
            m.elements[14] = m14
            transformRobot(m.elements)
            break;
          case "up":
            // actionsNum++;
            // if (actionsNum > 4) {
            //   actionsNum = 4;
            // }
            // animateState(arrCX[actionsNum], 500);
            myx += 0.01
            m12 = m.elements[12]
            m13 = m.elements[13]
            m14 = m.elements[14]
            m.makeRotationY(myx)
            m.elements[12] = m12
            m.elements[13] = m13
            m.elements[14] = m14
            transformRobot(m.elements)
            break;
          case "down":
            // actionsNum--;
            // if (actionsNum < 0) {
            //   actionsNum = 0;
            // }
            // animateState(arrCX[actionsNum], 500);
            myx -= 0.01
            m12 = m.elements[12]
            m13 = m.elements[13]
            m14 = m.elements[14]
            m.makeRotationY(myx)
            m.elements[12] = m12
            m.elements[13] = m13
            m.elements[14] = m14
            transformRobot(m.elements)
            break;

          case "leftTop":
            break;
          case "rightTop":
            break;
          case "leftBottom":
            break;
          case "rightBottom":
            break;

          case "r1":
            // if (j6.rotation.y > 2) return;
            // j6.rotation.y = j6.rotation.y + 0.01;
            mzx += 0.01
            m12 = m.elements[12]
            m13 = m.elements[13]
            m14 = m.elements[14]
            m.makeRotationZ(mzx)
            m.elements[12] = m12
            m.elements[13] = m13
            m.elements[14] = m14
            transformRobot(m.elements) 
            break;
          case "r2":
            // if (j6.rotation.y < -2) return;
            // j6.rotation.y = j6.rotation.y - 0.01;
            mzx -= 0.01
            m12 = m.elements[12]
            m13 = m.elements[13]
            m14 = m.elements[14]
            m.makeRotationZ(mzx)
            m.elements[12] = m12
            m.elements[13] = m13
            m.elements[14] = m14
            transformRobot(m.elements)
            break;
        }
      }

      // console.log( j4.rotation.x)
      player.renderer.render(player.scene, player.camera);
    }
    const changeNum = (num: number): void => {
      if (num === 21) {
        showSub.value = false;
      } else {
        showSub.value = false;
      }
      topicNum.value = num;
    };

    function calcRota(meshRota: any, gap: number, type: string) {
      let Rota = 0;
      console.log(meshRota, (Math.PI / 180) * meshRota);
      if (type === "add") {
        meshRota = meshRota < 0 ? 3 : meshRota;
        Rota = (Math.PI / 180) * meshRota + gap;
      } else if (type === "sub") {
        meshRota = meshRota > 0 ? -3 : meshRota;
        Rota = (Math.PI / 180) * meshRota - gap;
      }
      return Rota;
    }

    const actionTypeImg = computed(() => {
      switch (nowType.value) {
        case "A":
          return `background-image: url( "./clickOpen1-3.png" )`;
          break;
        case "B":
          return `background-image: url( "./clickOpen4-6.png" )`;
          break;
        case "C":
          return `background-image: url( "./clickOpenxian.png" )`;
          break;
        case "D":
          return `background-image: url( "./clickOpenchong.png" )`;
          break;
        case "Ato":
          return `background-image: url( "./actionMode1-3.png" )`;
          break;
        case "Bto":
          return `background-image: url( "./actionMode4-6.png" )`;
          break;
        case "Cto":
          return `background-image: url( "./actionModexian.png" )`;
          break;
        case "Dto":
          return `background-image: url( "./actionModechong.png" )`;
          break;
      }
    });

    const switchTypeImg = computed(() => {
      switch (topicNum.value) {
        case 0:
          return `background-image: url( "./topic0/t0-2.png" )`;
          break;
        case 1:
          return `background-image: url( "./topic0/t0-1.png" )`;
          break;
        case 2:
          return `background-image: url( "./topic0/t0-2.png" )`;
          break;
        case 3:
          return `background-image: url( "./topic0/t1-0.png" )`;
          break;
        case 4:
          return `background-image: url( "./topic0/t1-1.png" )`;
          break;
        case 5:
          return `background-image: url( "./topic0/t1-2.png" )`;
          break;
        case 6:
          return `background-image: url( "./topic0/t1-3.png" )`;
          break;
        case 7:
          return `background-image: url( "./topic0/t1-4.png" )`;
          break;
        case 8:
          return `background-image: url( "./topic0/t1-5.png" )`;
          break;
        case 9:
          return `background-image: url( "./topic0/t1-6.png" )`;
          break;
        case 10:
          return `background-image: url( "./topic0/t1-7.png" )`;
          break;
        case 11:
          return `background-image: url( "./topic0/t1-8.png" )`;
          break;
        case 12:
          return `background-image: url( "./topic0/t1-9.png" )`;
          break;
        case 13:
          return `background-image: url( "./topic0/t1-10.png" )`;
          break;
        case 14:
          return `background-image: url( "./topic0/t1-11.png" )`;
          break;
        case 15:
          return `background-image: url( "./topic0/t1-12.png" )`;
          break;
        case 16:
          return `background-image: url( "./topic0/t1-13.png" )`;
          break;
        case 17:
          return `background-image: url( "./topic0/t1-14.png" )`;
          break;
        case 18:
          return `background-image: url( "./topic0/t1-15.png" )`;
          break;
        case 19:
          return `background-image: url( "./topic0/t1-16.png" )`;
          break;
        case 20:
          return `background-image: url( "./topic0/t1-16.png" )`;
          break;
        // 新改
        case 21:
          return `background-image: url( "./topic0/n21.png" )`;
          break;
        case 22:
          return `background-image: url( "./topic0/n22.png" )`;
          break;
        case 23:
          return `background-image: url( "./topic0/n23.png" )`;
          break;
        case 24:
          return `background-image: url( "./topic0/n24.png" )`;
          break;
        case 25:
          return `background-image: url( "./topic0/n25.png" )`;
          break;
        // case 26:
        //   return `background-image: url( "./topic0/t1-20.png" )`;
        //   break;
        // case 27:
        //   return `background-image: url( "./topic0/t1-21.png" )`;
        //   break;
        // case 28:
        //   return `background-image: url( "./topic0/t1-22.png" )`;
        //   break;
        // case 29:
        //   return `background-image: url( "./topic0/t1-23.png" )`;
        //   break;
        // case 30:
        //   return `background-image: url( "./topic0/t0-2.png" )`;
        //   break;
        case 31:
          return `background-image: url( "./topic0/n31.png" )`;
          break;
        case 31.5:
          return `background-image: url( "./topic0/n31.5.png" )`;
          break;
        case 32:
          return `background-image: url( "./topic0/n32.png" )`;
          break;
        case 32.5:
          return `background-image: url( "./topic0/n32.5.png" )`;
          break;
        case 33:
          return `background-image: url( "./topic0/n34.1.png" )`;
          break;
        // case 34:
        //   return `background-image: url( "./topic0/t1-25.png" )`;
        //   break;
        case 34.1:
          return `background-image: url( "./topic0/n34.2.png" )`;
          break;
        case 34.2:
          return `background-image: url( "./topic0/n34.2.png" )`;
          break;
        case 34.3:
          return `background-image: url( "./topic0/n34.3.png" )`;
          break;
        case 34.4:
          return `background-image: url( "./topic0/n34.4.png" )`;
          break;
        case 34.5:
          if (nowType.value === "A") {
            return `background-image: url( "./topic0/n34.6.png" )`;
          } else if (nowType.value === "B") {
            return `background-image: url( "./topic0/n34.7.png" )`;
          } else if (nowType.value === "C") {
            return `background-image: url( "./topic0/n34.5.png" )`;
          } else if (nowType.value === "D") {
            return `background-image: url( "./topic0/n34.8.png" )`;
          }
          break;
        case 34.6:
          return `background-image: url( "./topic0/n34.6.png" )`;
          break;
        case 34.7:
          return `background-image: url( "./topic0/n34.7.png" )`;
          break;
        case 34.8:
          return `background-image: url( "./topic0/n34.8.png" )`;
          break;
        case 35:
          return `background-image: url( "./topic0/t1-26.png" )`;
          break;
        case 36:
          return `background-image: url( "./topic0/t1-27.png" )`;
          break;
        case 37:
          return `background-image: url( "./topic0/t1-28.png" )`;
          break;
        case 38:
          return `background-image: url( "./topic0/t1-29.png" )`;
          break;
        case 39:
          return `background-image: url( "./topic0/n39.png" )`;
          break;
        case 40:
          return `background-image: url( "./topic0/n40.png" )`;
          break;
        case 41:
          return `background-image: url( "./topic0/n41.png" )`;
          break;
        case 42:
          return `background-image: url( "./topic0/n42.png" )`;
          break;
        case 43:
          return `background-image: url( "./topic0/n43.png" )`;
          break;
        case 44:
          return `background-image: url( "./topic0/n44.png" )`;
          break;
        case 45:
          return `background-image: url( "./topic0/n39.png" )`;
          break;
        case 46:
          return `background-image: url( "./topic0/n46.png" )`;
          break;
        case 47:
          return `background-image: url( "./topic0/n47.png" )`;
          break;
        case 48:
          return `background-image: url( "./topic0/n48.png" )`;
          break;
        case 49:
          return `background-image: url( "./topic0/n49.png" )`;
          break;
        case 50:
          return `background-image: url( "./topic0/n50.png" )`;
          break;
        case 51:
          return `background-image: url( "./topic0/n51.png" )`;
          break;
        case 52:
          return `background-image: url( "./topic0/n39.png" )`;
          break;
      }
    });

    const switchOtherImg = computed(() => {
      switch (topicNum.value) {
        case 45:
          return `background-image: url( "./topic0/o45.png" )`;
          break;
        case 46:
          return `background-image: url( "./topic0/o46.png" )`;
          break;
        case 47:
          return `background-image: url( "./topic0/o47.png" )`;
          break;
        case 48:
          return `background-image: url( "./topic0/o48.png" )`;
          break;
        case 49:
          return `background-image: url( "./topic0/o49.png" )`;
          break;
        case 50:
          return `background-image: url( "./topic0/o50.png" )`;
          break;
        case 51:
          return `background-image: url( "./topic0/o51.png" )`;
          break;
      }
    });

    function switchAction() {
      if (nowType.value === "A") {
        nowType.value = "Ato";
      } else if (nowType.value === "B") {
        nowType.value = "Bto";
      } else if (nowType.value === "C") {
        nowType.value = "Cto";
      } else if (nowType.value === "D") {
        nowType.value = "Dto";
      }
    }

    function switchZhou(type: string) {
      nowType.value = type;
      if (type === "C") {
        // let newM = new THREE.Matrix4()
        // newM.extractRotation ( m ) 
        m.makeTranslation(mx, my, mz)
        // m.extractRotation ( newM ) 
        transformRobot(m.elements)
        console.log('初始化')
        // actionsNum = 2;
        // animateState(arrY[2], 500);
      }
      if (type === "D") {
        // actionsNum = 2;
        // animateState(arrY[2], 500);
        // topicNum.value = 34;
        // m12 = m.elements[12]
        //     m13 = m.elements[13]
        //     m14 = m.elements[14]
        // m.makeTranslation(mx, my, mz)
        // transformRobot(m.elements)
        console.log('初始化')
      }
    }

    function transformRobot(arr: any) {
      //先申请内存，后面务必释放。
      let Module = (window as any).Module
      var offset = Module._malloc(8 * 16);
      var i_EndPosture = Module.HEAPF64.subarray(offset / 8, offset / 8 + 16);
      //testing values
      i_EndPosture[0] = arr[0];
      i_EndPosture[1] = arr[1];
      i_EndPosture[2] = arr[2];
      i_EndPosture[3] = arr[3];
      i_EndPosture[4] = arr[4];
      i_EndPosture[5] = arr[5];
      i_EndPosture[6] = arr[6];
      i_EndPosture[7] = arr[7];
      i_EndPosture[8] = arr[8];
      i_EndPosture[9] = arr[9];
      i_EndPosture[10] = arr[10];
      i_EndPosture[11] = arr[11];
      i_EndPosture[12] = arr[12];
      i_EndPosture[13] = arr[13];
      i_EndPosture[14] = arr[14];
      i_EndPosture[15] = arr[15];


      let Calculate_Robot = Module.cwrap('Calculate_Robot', 'number', ['number']);

      //数组大小固定为16
      // if(topic.value === '工业机器人集成应用'){
      //   var result = Calculate_Robot(0, 16, offset);
      // }else{
        var result = Calculate_Robot(1, 16, offset);
      // }
      
      //打印结果。结果还是存放在原来的数组中，前6位就是
      console.log(`The result  is ${result}`);
      console.log(`The arr  is ${arr}`)
      console.log(`This 1st joint is ${i_EndPosture[0]}`);
      console.log(`This 2nd joint is ${i_EndPosture[1]}`);
      console.log(`This 3rd joint is ${i_EndPosture[2]}`);
      console.log(`This 4th joint is ${i_EndPosture[3]}`);
      console.log(`This 5th joint is ${i_EndPosture[4]}`);
      console.log(`This 6th joint is ${i_EndPosture[5]}`);
      if (result === 0) {
        ElMessage.error('超出机器人可达范围!')

      } else {
        j1.rotation.z = i_EndPosture[0];
        j2.rotation.x = i_EndPosture[1];
        j3.rotation.x = i_EndPosture[2];
        j4.rotation.y = i_EndPosture[3];
        if(topic.value === '工业机器人集成应用'){
          j5.rotation.x = -i_EndPosture[4];
        }
        j6.rotation.y = i_EndPosture[5];
      }

      //务必释放内存
      Module._free(offset);
    }

    function start(type: string) {
      btnType.value = type;
      animateSwitch.value = true;
    }
    function end() {
      animateSwitch.value = false;
    }

    function setLeftContent(type: string) {
      leftContent.value = type;
      showMenu.value = false;
    }

    let timer: any = null;
    watch(animateSwitch, (newValue, oldValue) => {
      if (animateSwitch.value) {
        // upDown(btnType.value)
        timer = setInterval(() => {
          upDown(btnType.value);
        }, 50);
      } else {
        clearInterval(timer);
      }
    });
    watch(topicNum, () => {
      console.log("topicNum", topicNum.value);
      switch (topicNum.value) {
        case 0:
          (kongzhi.value = false), blink(true), (onoff.value = false);
          break;
        case 1:
          (kongzhi.value = false), blink(false), (onoff.value = false);
          break;
        case 2:
          (kongzhi.value = false), blink(true), (onoff.value = false);
          break;
        case 3:
          (kongzhi.value = true), blink(false), (onoff.value = false);
          break;
        case 4:
          (kongzhi.value = true), blink(true), (onoff.value = false);
          break;
        case 5:
          (kongzhi.value = true), blink(true), (onoff.value = false);
          break;
        case 6:
          (kongzhi.value = false), blink(false), (onoff.value = false);
          break;
        case 21:
          (kongzhi.value = true),
            blink(false),
            (onoff.value = false),
            (leftContent.value = "示教器操作");
          break;
        case 22:
          (kongzhi.value = false), blink(true), (onoff.value = false);
          break;
        case 23:
          (kongzhi.value = true), blink(true), (onoff.value = false);
          break;
        case 24:
          (kongzhi.value = true), blink(false), (onoff.value = true);
          break;
        case 25:
          (kongzhi.value = true), blink(false), (onoff.value = false);
          break;
        case 31:
          (kongzhi.value = false), blink(false), (onoff.value = true);
          break;
        case 33:
          (kongzhi.value = false), blink(true), (onoff.value = false);
          break;
      }
      // if (topicNum.value > 20) {
      //   showSub.value = true;
      // } else {
      //   showSub.value = false;
      // }
      emit("changeTopicNum", topicNum.value);
    });
    let blinkTimer: any = null;
    function blink(bool: boolean) {
      if (bool) {
        if (blinkTimer) clearInterval(blinkTimer);
        blinkTimer = setInterval(() => {
          onoff.value = !onoff.value;
        }, 500);
      }
      if (!bool) {
        clearInterval(blinkTimer);
      }
    }
    function newNextTopic() {
      if (topicNum.value > -1 && topicNum.value < 3) {
        topicNum.value = 3;
        return;
      }
      if (topicNum.value > 2 && topicNum.value < 6) {
        topicNum.value = 6;
        return;
      }
      if (topicNum.value > 20 && topicNum.value < 31) {
        topicNum.value = 31;
        return;
      }
    }
    // let ayNum = ref(props.propNum)
    // console.log
    // watch(ayNum, () => {
    //   console.log('成了',ayNum.value)
    // });

    function shinengSwitch() {
      if (topicNum.value < 2) {
        topicNum.value++;
      } else {
        topicNum.value = 0;
      }
    }
    function closeSwitch() {
      topicNum.value++;
    }
    function handEvent() {
      if (topicNum.value === 24) return;
      topicNum.value++;
    }
    function nextTopic() {
      if (topicNum.value === 30 || topicNum.value === 24) {
        topicNum.value++;
        showSub.value = false;
      }
    }
    function animateState(
      arr: Array<number>,
      during: number,
      complete?: Function
    ) {
      new TWEEN.Tween(j1.rotation)
        .to({ z: arr[0] }, during)
        .easing(TWEEN.Easing.Linear.None)
        .start();
      new TWEEN.Tween(j2.rotation)
        .to({ x: arr[1] }, during)
        .easing(TWEEN.Easing.Linear.None)
        .start();
      new TWEEN.Tween(j3.rotation)
        .to({ x: arr[2] }, during)
        .easing(TWEEN.Easing.Linear.None)
        .start();
      new TWEEN.Tween(j4.rotation)
        .to({ y: arr[3] }, during)
        .easing(TWEEN.Easing.Linear.None)
        .start();
      new TWEEN.Tween(j5.rotation)
        .to({ x: arr[4] }, during)
        .easing(TWEEN.Easing.Linear.None)
        .start();
      new TWEEN.Tween(j6.rotation)
        .to({ y: arr[5] }, during)
        .easing(TWEEN.Easing.Linear.None)
        .onComplete(() => {
          if (complete) complete();
        })
        .start();
    }

    function getRobotPosition() {
      let arr = [];
      arr = [
        j1.rotation.z,
        j2.rotation.x,
        j3.rotation.x,
        j4.rotation.y,
        j5.rotation.x,
        j6.rotation.y,
      ];
      console.log(arr);
      return arr;
    }
    (window as any).getRobotPosition = getRobotPosition;

    let score = ref(40);

    onBeforeUnmount(() => {
      console.log("分数", score.value);
    });

    return {
      topic,
      // goTest,
      goBack,
      switchAction,
      switchZhou,
      switchTypeImg,
      switchOtherImg,
      actionTypeImg,
      topicNum,
      upDown,
      nowType,
      start,
      end,
      animateSwitch,
      showMenu,
      leftContent,
      setLeftContent,
      shinengSwitch,
      closeSwitch,
      showSub,
      handEvent,
      nextTopic,
      changeNum,
      kongzhi,
      onoff,
      newNextTopic,
      blink,
      // runOfState
    };
  },
});
</script>

<template>
  <div>
    <div class="controls_box" v-if="!showSub">
      <div class="shineng op1" v-if="topicNum === 33" @click="(topicNum = 34.1), setLeftContent('手动模式')">
        <span>使能按钮</span>
      </div>
      <div class="shineng op2" v-if="topicNum > 34 && topicNum < 35">
        <span>使能按钮</span>
      </div>
      <div class="shineng op1" v-if="topicNum > 34.9 && topicNum < 39">
        <span>使能按钮</span>
      </div>

      <div class="startb" v-if="topicNum === -1" @click="topicNum++">继续</div>
      <div class="startb" v-if="topicNum === 6" @click="topicNum = 21">
        继续
      </div>
      <!-- <div class="startb" v-if="topicNum > 38 && topicNum<51">
        继续
      </div> -->
      <div class="helppage" v-if="topicNum === -1 || topicNum === 6">
        <div class="help1" v-if="topicNum === -1">
          <img src="/topic0/help10.png" />
        </div>
        <div class="help2" v-if="topicNum === 6">
          <img src="/topic0/help11.jpg" />
        </div>
        <!-- <div class="text t1">
          <div class="text_item">A 连接器</div>
          <div class="text_item">B 触摸屏</div>
          <div class="text_item">C 紧急停止按钮</div>
          <div class="text_item">D 控制杆</div>
          <div class="text_item">E USB端口</div>
          <div class="text_item">F 使动装置</div>
          <div class="text_item">G 触摸笔</div>
          <div class="text_item">H 重置按钮</div>
        </div> -->
        <!-- <div class="help2">
          <img src="/topic0/help2.png" />
        </div>
        <div class="text t2">
          <div class="text_item">A - D：预设按键</div>
          <div class="text_item">E 选择机械单元</div>
          <div class="text_item">F 切换运动模式</div>
          <div class="text_item">G 切换运动模式</div>
          <div class="text_item">H 切换增量</div>
          <div class="text_item">J 步退按钮</div>
          <div class="text_item">K 启动按钮</div>
          <div class="text_item">L 步进按钮</div>
          <div class="text_item">M 停止按钮</div>
        </div> -->
      </div>
      <div class="left_box" v-if="topicNum >= 0 && topicNum !== 6">
        <!-- 菜单 -->
        <div class="menu_btn" v-if="topicNum === 34" @click="showMenu = !showMenu"></div>
        <div class="control_menu" v-if="showMenu && topicNum === 34">
          <div class="btn1" @click="setLeftContent('手动模式')"></div>
        </div>
        <!-- 手动模式 -->
        <!-- <div
          class="robot_opt"
          :style="actionTypeImg"
          v-if="leftContent === '手动模式'"
        >
          <div
            v-if="
              nowType === 'A' ||
              nowType === 'B' ||
              nowType === 'C' ||
              nowType === 'D'
            "
            class="action_btn1"
            @click="switchAction()"
          ></div>
          <div
            class="t1-1 conBtn"
            v-if="topicNum > 33 && topicNum < 35"
            @click="(topicNum = 35), setLeftContent('示教器操作')"
          >
            下一步
          </div>
          <div
            v-if="
              nowType !== 'A' &&
              nowType !== 'B' &&
              nowType !== 'C' &&
              nowType !== 'D'
            "
            class="action_btn_box"
          >
            <div class="b1" @click="switchZhou('A')"></div>
            <div class="b2" @click="switchZhou('B')"></div>
            <div class="b3" @click="switchZhou('C')"></div>
            <div class="b4" @click="switchZhou('D')"></div>
          </div>
        </div> -->
        <!-- 示教器操作 -->
        <div class="robot_opt" :style="switchTypeImg">
          <div class="t1-1 conBtn" v-if="topicNum === 6" @click="topicNum = 21">
            下一步
          </div>
          <div class="queren" v-if="topicNum === 23" @click="topicNum++"></div>
          <!-- <div class="t1-1 conBtn" v-if="topicNum === 8" @click="topicNum++">
            下一步
          </div>
          <div class="t1-1 conBtn" v-if="topicNum === 10" @click="topicNum++">
            下一步
          </div>
          <div class="t1-1 conBtn" v-if="topicNum === 12" @click="topicNum++">
            下一步
          </div> -->
          <!-- <div
            class="conBtn"
            style="width: 200px; height: 30px; left: 20px; top: 165px"
            v-if="topicNum === 13"
            @click="topicNum++"
          ></div>
          <div
            class="conBtn"
            style="width: 70px; height: 34px; left: 216px; top: 290px"
            v-if="topicNum === 14"
            @click="topicNum++"
          ></div>
          <div
            class="conBtn"
            style="width: 100px; height: 24px; left: 273px; top: 77px"
            v-if="topicNum === 15"
            @click="topicNum++"
          ></div>
          <div
            class="conBtn"
            style="
              width: 33px;
              height: 35px;
              left: 522px;
              top: 250px;
              z-index: 9;
            "
            v-if="topicNum === 16"
            @click="topicNum++"
          ></div>
          <div
            class="conBtn"
            style="
              width: 30px;
              height: 36px;
              left: 519px;
              top: 288px;
              z-index: 9;
            "
            v-if="topicNum === 17"
            @click="topicNum++"
          ></div>
          <div
            class="conBtn"
            style="
              width: 30px;
              height: 37px;
              left: 549px;
              top: 271px;
              z-index: 9;
            "
            v-if="topicNum === 18"
            @click="topicNum++"
          ></div>
          <div
            class="conBtn"
            style="
              right: -43px;
              bottom: 56px;
              width: 30px;
              height: 39px;
              z-index: 9;
            "
            v-if="topicNum === 19"
            @click="topicNum++"
          ></div> -->
          <!-- <div class="t1-20" v-if="topicNum === 20" @click="topicNum++"></div> -->

          <!-- <div class="tishi" v-if="topicNum === 21">请将电源拨到on，开启ABB机器人</div>
          <div class="tishi" v-if="topicNum === 22">请将模式切换成“手动”，电机灯“闪烁”</div>-->

          <div class="t1-1 conBtn" v-if="topicNum === 25" @click="topicNum++">
            下一步
          </div>
          <div class="t1-1 conBtn" v-if="topicNum > 43 && topicNum < 52" @click="topicNum++">
            下一步
          </div>
          <div class="conBtn" style="width: 58px; height: 30px; left: 7px; top: 3px; z-index: 9" v-if="topicNum === 39"
            @click="topicNum++"></div>
          <div class="conBtn" style="
              width: 200px;
              height: 30px;
              left: 21px;
              top: 165px;
              z-index: 9;
            " v-if="topicNum === 40" @click="topicNum++"></div>
          <div class="conBtn" style="
              width: 103px;
              height: 30px;
              left: 4px;
              top: 293px;
              z-index: 9;
            " v-if="topicNum === 41" @click="topicNum++"></div>
          <div class="conBtn" style="
              width: 107px;
              height: 30px;
              left: 99px;
              top: 293px;
              z-index: 9;
            " v-if="topicNum === 42" @click="topicNum++"></div>
          <div class="conBtn" style="
              width: 98px;
              height: 30px;
              left: 193px;
              top: 293px;
              z-index: 9;
            " v-if="topicNum === 43" @click="topicNum++"></div>
          <!-- <div
            class="conBtn"
            style="
              width: 200px;
              height: 30px;
              left: 221px;
              top: 282px;
              z-index: 9;
            "
            v-if="topicNum === 44"
            @click="topicNum++"
          ></div> -->
          <!-- <div
            class="conBtn"
            style="
              width: 200px;
              height: 30px;
              left: 221px;
              top: 282px;
              z-index: 9;
            "
            v-if="topicNum === 26"
            @click="topicNum++"
          ></div>
          <div
            class="conBtn"
            style="width: 92px; height: 30px; left: 4px; top: 293px; z-index: 9"
            v-if="topicNum === 27"
            @click="topicNum++"
          ></div>
          <div
            class="conBtn"
            style="
              width: 96px;
              height: 30px;
              left: 285px;
              top: 292px;
              z-index: 9;
            "
            v-if="topicNum === 28"
            @click="topicNum++"
          ></div>
          <div
            class="conBtn"
            style="
              width: 96px;
              height: 30px;
              left: 285px;
              top: 293px;
              z-index: 9;
            "
            v-if="topicNum === 29"
            @click="topicNum++"
          ></div> -->
          <!-- <div class="tishi" v-if="topicNum === 30">
            请将电源拨到off，电机灯“不亮”
          </div> -->
          <!-- <div class="t1-1 conBtn" v-if="topicNum === 31" @click="topicNum++">
            下一步
          </div> -->
          <div class="conBtn" style="
              width: 31px;
              height: 31px;
              left: 445px;
              top: 325px;
              z-index: 9;
            " v-if="topicNum === 31" @click="topicNum = 31.5"></div>
          <div class="conBtn" style="
              width: 45px;
              height: 44px;
              left: 432px;
              top: 201px;
              z-index: 9;
            " v-if="topicNum === 31.5" @click="topicNum = 32"></div>
          <div class="conBtn" style="
              width: 45px;
              height: 50px;
              left: 282px;
              top: 253px;
              z-index: 9;
            " v-if="topicNum === 32" @click="topicNum = 32.5"></div>

          <div class="conBtn" style="width: 56px; height: 31px; left: 8px; top: 3px; z-index: 9"
            v-if="topicNum === 34.1" @click="topicNum = 34.3"></div>
          <div class="conBtn" style="
              width: 200px;
              height: 29px;
              left: 22px;
              top: 106px;
              z-index: 9;
            " v-if="topicNum === 34.3" @click="topicNum = 34.4"></div>

          <div class="conBtn" style="
              width: 155px;
              height: 25px;
              left: 142px;
              top: 115px;
              z-index: 9;
            " v-if="topicNum === 34.4" @click="(topicNum = 34.5), switchZhou('C')"></div>

          <div class="new_opp" v-if="topicNum === 34.5">
            <div class="b1" @click="switchZhou('A')"></div>
            <div class="b2" @click="switchZhou('B')"></div>
            <div class="b3" @click="switchZhou('C')"></div>
            <div class="b4" @click="switchZhou('D')"></div>
          </div>

          <div class="conBtn" style="
              width: 131px;
              height: 24px;
              left: 10px;
              top: 160px;
              z-index: 9;
            " v-if="topicNum === 35" @click="topicNum++"></div>
          <div class="conBtn" style="
              width: 466px;
              height: 24px;
              left: 5px;
              top: 169px;
              z-index: 9;
            " v-if="topicNum === 36" @click="topicNum++"></div>
          <div class="conBtn" style="
              width: 286px;
              height: 24px;
              left: 12px;
              top: 183px;
              z-index: 9;
            " v-if="topicNum === 37" @click="topicNum++"></div>
          <div class="conBtn" style="
              width: 466px;
              height: 24px;
              left: 3px;
              top: 265px;
              z-index: 9;
            " v-if="topicNum === 38" @click="topicNum++"></div>

          <!-- <div
          class="conBtn"
          style="    width: 286px;
    height: 24px;
    left: 12px;
    top: 183px;
    z-index: 9;"
          v-if="topicNum === 39"
          @click="topicNum++"
          ></div>-->
          <div class="t1-1 conBtn" v-if="topicNum === 52" @click="goBack">
            实训结束
          </div>
        </div>
      </div>
      <div class="right_box" v-if="topicNum >= 0 && topicNum !== 6">
        <div v-if="topicNum < 34 || topicNum > 34.9">
          <!-- <div class="right_st" v-if="leftContent !== '手动模式'"> -->
          <div class="right_st">
            <div class="shineng" v-if="topicNum < 3" :class="{
              op1: topicNum === 0,
              op2: topicNum === 1,
              op3: topicNum === 2,
            }" @click="shinengSwitch">
              <span>使能按钮</span>
            </div>

            <div class="close hongkuang" v-if="topicNum === 3 || topicNum === 4" @click="topicNum++"></div>
            <!-- <div
              class="dianjideng"
              v-if="topicNum === 5"
              @click="topicNum++"
            ></div> -->
            <!-- <div
              class="chongxian hongkuang"
              v-if="topicNum === 7"
              @click="topicNum++"
            ></div>
            <div
              class="zhou hongkuang"
              v-if="topicNum === 9"
              @click="topicNum++"
            ></div>
            <div
              class="zengliang hongkuang"
              v-if="topicNum === 11"
              @click="topicNum++"
            ></div> -->
          </div>
        </div>
        <div class="right_op" v-if="topicNum > 34 && topicNum < 35">
          <div class="btn up" @mousedown="start('up')" @mouseup="end()"></div>
          <div class="btn down" @mousedown="start('down')" @mouseup="end()"></div>
          <div class="btn left" @mousedown="start('left')" @mouseup="end()"></div>
          <div class="btn right" @mousedown="start('right')" @mouseup="end()"></div>
          <div class="btn leftTop" @mousedown="start('leftTop')" @mouseup="end()"></div>
          <div class="btn rightTop" @mousedown="start('rightTop')" @mouseup="end()"></div>
          <div class="btn leftBottom" @mousedown="start('leftBottom')" @mouseup="end()"></div>
          <div class="btn rightBottom" @mousedown="start('rightBottom')" @mouseup="end()"></div>
          <div class="btn r1" @mousedown="start('r1')" @mouseup="end()"></div>
          <div class="btn r2" @mousedown="start('r2')" @mouseup="end()"></div>
        </div>
        <div class="pBtn" v-if="topicNum < 6" @click="newNextTopic">下一步</div>
        <div class="pBtn" v-if="topicNum === 32.5" @click="topicNum = 33">
          下一步
        </div>
        <div class="pBtn" v-if="topicNum > 20 && topicNum < 31" @click="newNextTopic">
          下一步
        </div>
        <div class="pBtn" v-if="topicNum > 34.4 && topicNum < 34.9" @click="topicNum = 35">
          下一步
        </div>
      </div>
    </div>
    <div class="otherpage" :class="{
      shoubi: !kongzhi && onoff,
      shoukai: !kongzhi && !onoff,
      zibi: kongzhi && onoff,
      zikai: kongzhi && !onoff,
    }" v-if="
      topicNum >= 0 &&
      topicNum != 6 &&
      (topicNum < 30 || topicNum > 34.9) &&
      topicNum < 39
    ">
      <div class="dianjideng" v-if="topicNum === 5" @click="topicNum = 3"></div>
      <div class="kongzhi" v-if="topicNum === 21" @click="topicNum++"></div>
      <div class="kongzhi" v-if="topicNum === 22" @click="topicNum++"></div>

      <div class="dianjideng" v-if="topicNum === 24" @click="topicNum = 21"></div>
      <div class="dianyuan" v-if="topicNum === 30" @click="topicNum++"></div>
    </div>
    <div class="shuoming_box" :style="switchOtherImg" v-if="topicNum > 44 && topicNum < 52"></div>
  </div>
</template>

<style scoped lang="less">
.shoubi {
  background: url(../topic0/shoubi.png) no-repeat;
  background-size: 100% 100%;
}

.shoukai {
  background: url(../topic0/shoukai.png) no-repeat;
  background-size: 100% 100%;
}

.zibi {
  background: url(../topic0/zibi.png) no-repeat;
  background-size: 100% 100%;
}

.zikai {
  background: url(../topic0/zikai.png) no-repeat;
  background-size: 100% 100%;
}

.shuoming_box {
  position: absolute;
  width: 480px;
  height: 360px;
  bottom: 498px;
  left: 1125px;
  background-position: center;
  background-size: contain;
  background-color: #fff;
  background-repeat: no-repeat;
  border: 2px solid #000;
}

.otherpage {
  position: absolute;
  width: 320px;
  height: 360px;
  bottom: 11%;
  right: 829px;
  border: 2px solid #000;

  // background-color: #fff;
  .kongzhi {
    position: absolute;
    width: 116px;
    height: 118px;
    top: 22px;
    left: 29px;
    /* border-radius: 50%; */
    cursor: pointer;
    /* background-color: #ccc; */
    border: 1px solid red;
  }

  .dianyuan {
    position: absolute;
    width: 116px;
    height: 118px;
    top: 15px;
    left: 177px;
    /* border-radius: 50%; */
    cursor: pointer;
    /* background-color: #ccc; */
    border: 1px solid red;
  }

  .dianjideng {
    position: absolute;
    width: 70px;
    height: 70px;
    top: 182px;
    left: 197px;
    /* border-radius: 50%; */
    cursor: pointer;
    border: 2px solid red;
  }

  .liang {
    background-color: #ffb100;
  }

  @keyframes blink {
    0% {
      background-color: #ccc;
    }

    50% {
      background-color: #ffb100;
    }

    100% {
      background-color: #ccc;
    }
  }

  .shan {
    animation: blink 0.5s linear infinite;
  }

  .kaiguan {
    position: absolute;
    width: 136px;
    height: 80px;
    top: 10px;
    left: 90px;
    border: 1px solid #ffb100;

    .off {
      position: absolute;
      left: 10px;
      top: 25px;
      width: 50px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      color: #fff;
      background-color: #ccc;
      cursor: pointer;
    }

    .on {
      position: absolute;
      left: 75px;
      top: 25px;
      width: 50px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      color: #fff;
      background-color: #ccc;
      cursor: pointer;
    }

    .active {
      background-color: #ff7000a9;
    }

    .text {
      position: absolute;
      font-size: 14px;
      top: 0;
      left: 0;
      width: 100%;
      text-align: center;
    }
  }

  .tie {
    position: absolute;
    width: 220px;
    height: 210px;
    top: 100px;
    left: 10px;
    // background: url(../topic0/tie.png) no-repeat;
    // background-size: 100% 100%;

    .hand {
      position: absolute;
      width: 60px;
      height: 60px;
      top: 80px;
      left: 76px;
      background: url(../topic0/pointhand.png) no-repeat;
      background-size: 100% 100%;
      transform: rotateZ(-38deg);
    }

    .shou {
      transform: rotateZ(0);
    }

    .zi {
      transform: rotateZ(-72deg);
    }
  }
}

.controls_box {
  position: absolute;
  right: 6%;
  bottom: 10%;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;

  .op1 {
    color: #fff;
  }

  .op2 {
    color: rgb(110, 245, 133);
  }

  .shineng {
    width: 50px;
    height: 140px;
    padding: 10;
    position: absolute;
    right: -40px;
    top: 150px;
    z-index: 0;
    /* opacity: 0.8; */
    cursor: pointer;
    font-size: 16px;
    // color: #fff;
    background-color: #6e6e6e;
    border-radius: 0 20px 20px 0;

    span {
      display: inline-block;
      width: 20px;
      font-size: 16px;
      margin-left: 16px;
      margin-top: 22px;
    }
  }

  .startb {
    left: -880px;
    top: -40px;
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

  .helppage {
    position: absolute;
    width: 600px;
    height: 450px;
    right: 460px;
    bottom: 160px;
    background-color: #fff;
    border: 2px solid #f90;
    z-index: 1;
    user-select: none;

    .help1 {
      position: absolute;
      left: 30px;
      top: 25px;
      /* width: 650px; */
      /* height: 440px; */

      img {
        width: 100%;
        // height: 100%;
      }
    }

    .help2 {
      position: absolute;
      left: 30px;
      // top: 25px;

      img {
        width: 100%;
        // height: 100%;
      }
    }

    .text {
      position: absolute;
      width: 90px;

      .text_item {
        font-size: 16px;
        margin: 5px 0;
      }
    }

    .t1 {
      left: 60px;
      top: 50px;
      margin: 10px 0;
    }

    .t2 {
      left: 580px;
      top: 60px;
      width: 120px;
    }
  }

  .left_box {
    width: 480px;
    height: 359px;
    /* float: left; */
    position: relative;
    top: 14px;
    border: 4px solid #666;

    .menu_btn {
      width: 71px;
      height: 36px;
      position: absolute;
      left: 0;
      top: 0;
      background-color: #00ccff66;
      cursor: pointer;
      z-index: 2;
    }

    .robot_opt {
      background: center / contain no-repeat;
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;

      .action_btn1 {
        width: 100px;
        height: 25px;
        position: absolute;
        left: 130px;
        top: 112px;
        cursor: pointer;
        background-color: #00ccff66;
      }

      .action_btn_box {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;

        .b1 {
          width: 50px;
          height: 60px;
          position: absolute;
          left: 36px;
          top: 186px;
          cursor: pointer;
        }

        .b2 {
          width: 50px;
          height: 60px;
          position: absolute;
          left: 121px;
          top: 186px;
          cursor: pointer;
        }

        .b3 {
          width: 50px;
          height: 60px;
          position: absolute;
          left: 204px;
          top: 186px;
          cursor: pointer;
        }

        .b4 {
          width: 50px;
          height: 60px;
          position: absolute;
          left: 287px;
          top: 186px;
          cursor: pointer;
        }
      }

      .small_next {
        width: 80px;
        height: 24px;
        left: 202px;
        top: 320px;
        text-align: center;
        color: #fff;
        background-color: #ea9412;
        font-size: 16px;
      }

      .queren {
        position: absolute;
        width: 116px;
        height: 38px;
        top: 254px;
        right: 180px;
        /* border-radius: 50%; */
        cursor: pointer;
        /* background-color: #ccc; */
        border: 1px solid red;
        z-index: 9;
      }

      .conBtn {
        position: absolute;
        background-color: #00ccff66;
        cursor: pointer;
      }

      .new_opp {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;

        .b1 {
          width: 50px;
          height: 60px;
          position: absolute;
          left: 36px;
          top: 186px;
          cursor: pointer;
        }

        .b2 {
          width: 50px;
          height: 60px;
          position: absolute;
          left: 121px;
          top: 186px;
          cursor: pointer;
        }

        .b3 {
          width: 50px;
          height: 60px;
          position: absolute;
          left: 204px;
          top: 186px;
          cursor: pointer;
        }

        .b4 {
          width: 50px;
          height: 60px;
          position: absolute;
          left: 287px;
          top: 186px;
          cursor: pointer;
        }
      }

      .t1-1 {
        right: 135px;
        bottom: -70px;
        width: 190px;
        height: 35px;
        text-align: center;
        line-height: 35px;
        border-radius: 25px;
        color: #fff;
        background-color: #ffaf4c;
      }

      .t1-20 {
        position: absolute;
        width: 350px;
        height: 250px;
        left: 70px;
        top: 50px;
        background: url(../topic0/sp1.png) no-repeat;
        background-size: 100% 100%;
      }

      .tishi {
        position: absolute;
        width: 100%;
        height: 100%;
        line-height: 350px;
        color: #fff;
        text-align: center;
        background-color: #00000099;
      }
    }

    .control_menu {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 1;
      background: url(../controlMenu.png) center/contain no-repeat;

      .btn1 {
        width: 100px;
        height: 30px;
        position: absolute;
        left: 18px;
        top: 104px;
        cursor: pointer;
        background-color: #00ccff66;
      }

      .btn2 {
        width: 100px;
        height: 30px;
        position: absolute;
        left: 20px;
        top: 195px;
        cursor: pointer;
        background-color: #00ccff66;
      }
    }
  }

  .right_box {
    position: relative;

    /* float: right; */
    /* top: 50px; */
    .pBtn {
      left: -280px;
      top: 420px;
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

    .right_st {
      width: 195px;
      height: 417px;
      background: url("../shijiaoqi.png") center / contain no-repeat;
      background-size: 100% 100%;

      .op1 {
        color: #fff;
      }

      .op2 {
        color: rgb(110, 245, 133);
      }

      .op3 {
        color: rgb(248, 95, 95);
      }

      .shineng {
        width: 50px;
        height: 140px;
        padding: 10;
        position: absolute;
        right: -40px;
        top: 150px;
        z-index: 0;
        /* opacity: 0.8; */
        cursor: pointer;
        font-size: 16px;

        background-color: #757575;
        border-radius: 0 20px 20px 0;

        span {
          display: inline-block;
          width: 20px;
          font-size: 16px;
          margin-left: 16px;
          margin-top: 22px;
        }
      }

      .hongkuang {
        position: absolute;
        cursor: pointer;
        /* background-color: #f00; */
        border: 2px solid #f00;
      }

      .close {
        width: 67px;
        height: 50px;
        right: 44px;
        top: -2px;
      }

      .dianjideng {
        width: 69px;
        height: 40px;
        position: absolute;
        right: -30px;
        top: 374px;
        cursor: pointer;
        background: url(../dianjideng.png) center / contain no-repeat;
      }

      .chongxian {
        width: 30px;
        height: 34px;
        right: 155px;
        top: 184px;
      }

      .zhou {
        width: 30px;
        height: 35px;
        right: 154px;
        top: 221px;
      }

      .zengliang {
        width: 30px;
        height: 29px;
        right: 154px;
        top: 260px;
      }
    }

    .right_op {
      width: 195px;
      height: 417px;
      background: url("../shijiaoqi.png") center / contain no-repeat;
      background-size: 100% 100%;
    }
  }

  .btn {
    width: 28px;
    height: 24px;
    cursor: pointer;
    position: absolute;
  }

  .up {
    left: 118px;
    top: 170px;
    background: url("../jiantou.png") center / contain no-repeat;
  }

  .down {
    left: 119px;
    top: 246px;
    background: url("../jiantou.png") center / contain no-repeat;
    transform: rotateZ(180deg);
  }

  .left {
    left: 79px;
    top: 206px;
    background: url("../jiantou.png") center / contain no-repeat;
    transform: rotateZ(-90deg);
  }

  .right {
    left: 156px;
    top: 205px;
    background: url("../jiantou.png") center / contain no-repeat;
    transform: rotateZ(90deg);
  }

  //新加的
  .leftTop {
    left: 90px;
    top: 179px;
    background: url("../jiantou.png") center / contain no-repeat;
    transform: rotateZ(-45deg);
  }

  .rightTop {
    left: 147px;
    top: 179px;
    background: url("../jiantou.png") center / contain no-repeat;
    transform: rotateZ(45deg);
  }

  .leftBottom {
    left: 90px;
    top: 237px;
    background: url("../jiantou.png") center / contain no-repeat;
    transform: rotateZ(-135deg);
  }

  .rightBottom {
    left: 149px;
    top: 237px;
    background: url("../jiantou.png") center / contain no-repeat;
    transform: rotateZ(135deg);
  }

  .r1 {
    left: 110px;
    top: 208px;
    background: url("../xuanzhuanjiantou.png") center / contain no-repeat;
  }

  .r2 {
    left: 129px;
    top: 208px;
    background: url("../xuanzhuanjiantou.png") center / contain no-repeat;
    transform: rotateZ(0deg) rotateY(180deg);
  }
}
</style>
