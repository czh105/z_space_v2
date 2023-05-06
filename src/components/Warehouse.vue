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
import { ElMessage } from 'element-plus'
import Result from "../hooks/result";
import ThinkingSelect from "./ThinkingSelect.vue";
import $store from '../store/index'
// import { setTimeout } from "timers/promises";
export default defineComponent({
  name: "warehouse",
  components: {
    ThinkingSelect,
  },
  props: {
    player: Object,
  },
  setup(props, { emit }) {
    let nowType = ref("");
    let btnType = ref("");
    let topicNum = ref(0);
    let speed = ref(0.01);
    let runState: any = [];
    let leftContent = ref("仓库单元调试实训任务");
    let topic = ref((window as any).topic);
    let showMenu = ref(false);
    let waitPageShow = ref(false);
    let questionPageShow = ref(false);
    let showHelp = ref(false);
    let showlr = ref(false);

    let animateSwitch = ref(false);
    let bigType = $store.state.bigType

    // function goTest(num: number) {
    //     console.log('gotest')
    //     emit('my-emit', num)
    // }
    function goBack() {
      let p = {
        name: "仓库单元调试",
        score: score.value,
      };
      console.log("上传", p,topic.value);
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
    let robot: any = player.scene.getObjectByName("robot2");
    let cang1 = player.scene.getObjectByName(`cang1`);
    let cangitem1 = player.scene.getObjectByName(`cangitem1`);
    let j62 = player.scene.getObjectByName(`j6-2`);
    let cangitemtou = player.scene.getObjectByName(`cangitemtou`);
    let Object832 = player.scene.getObjectByName(`Object832`);
    // let j63: any = player.scene.getObjectByName("j6-3");
    let home: any = player.scene.getObjectByName("home");

    const changeNum = (num: number): void => {
      topicNum.value = num;
    };

    // debugger
    onMounted(() => {
      nowType.value = "A";
      topicNum.value++;
      emit("changeTopicNum", topicNum.value);

      let scene = player.scene;

      let redBbox = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
      let blueBbox = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
      let greenBbox = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
      let a885 = player.scene.getObjectByName("Object885");

      const redBox = new THREE.Mesh(
        new THREE.BoxGeometry(100, 100, 100),
        new THREE.MeshBasicMaterial({ color: 0xffffff }) //red box
      );
      redBox.name = "redBox";
      redBox.material.transparent = true;
      redBox.material.opacity = 0.01;
      redBbox.setFromObject(a885); //Object885

      player.redBbox = redBbox;

      j6.add(redBox);

      player.blueBbox = blueBbox;
      player.greenBbox = greenBbox;
    });
    const m = new THREE.Matrix4();

m.set(1, 0, 0, 650,
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
  var result = Calculate_Robot(1, 16, offset);
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
    j5.rotation.x = -i_EndPosture[4];
    j6.rotation.y = i_EndPosture[5];
  }

  //务必释放内存
  Module._free(offset);
}

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
            mz += 5
            m.makeTranslation(mx, my, mz)
            transformRobot(m.elements)
            break;
          case "down":
            // actionsNum--;
            // if (actionsNum < 0) {
            //   actionsNum = 0;
            // }
            // animateState(arrX[actionsNum], 500);
            mz -= 5
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

    function calcRota(meshRota: any, gap: number, type: string) {
      let Rota = 0;

      if (type === "add") {
        meshRota = meshRota < 0 ? 3 : meshRota;
        Rota = (Math.PI / 180) * meshRota + gap;
      } else if (type === "sub") {
        meshRota = meshRota > 0 ? -3 : meshRota;
        Rota = (Math.PI / 180) * meshRota - gap;
      }
      return Rota;
    }

    const switchTypeImg = computed(() => {
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

    const topicOneImg = computed(() => {
      console.log(topicNum.value);
      switch (topicNum.value) {
        case 2:
          return `background-image: url( "./warehouse/a1.png"  )`;
          break;
        case 4:
          return `background-image: url( "./warehouse/a2.png"  )`;
          break;
        case 6:
          return `background-image: url( "./warehouse/a3.png"  )`;
          break;
        case 7:
          return `background-image: url( "./warehouse/a4.png"  )`;
          break;
        case 8:
          return `background-image: url( "./warehouse/a5.png"  )`;
          break;
        case 9:
          return `background-image: url( "./warehouse/a6.png"  )`;
          break;
        case 10:
          return `background-image: url( "./warehouse/a7.png"  )`;
          break;
        case 10.5:
          return `background-image: url( "./warehouse/pp.png"  )`;
          break;
        case 11:
          return `background-image: url( "./warehouse/a8.png"  )`;
          break;
        case 12:
          return `background-image: url( "./warehouse/a9.png"  )`;
          break;
        case 12.5:
          return `background-image: url( "./warehouse/pp.png"  )`;
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
      // if (type === "D") {
      //   topicNum.value = 34
      // }
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
    // function run(arr: Array<Array<number>>, during: number) {
    //   setState(arr, 0);
    //   setTimeout(() => {
    //     animateState(arr, 1, during);
    //   }, 1000);
    // }
    function setState(arr: Array<number>) {
      j1.rotation.z = arr[0];
      j2.rotation.x = arr[1];
      j3.rotation.x = arr[2];
      j4.rotation.y = arr[3];
      j5.rotation.x = arr[4];
      j6.rotation.y = arr[5];
      player.renderer.render(player.scene, player.camera);
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

    let timer: any = null;
    watch(animateSwitch, (newValue, oldValue) => {
      if (animateSwitch.value) {
        // upDown(btnType.value)
        timer = setInterval(() => {
          upDown(btnType.value);
        }, 50);
      } else {
        clearInterval(timer);

        let redBox: any = player.scene.getObjectByName("redBox");
        let blueBox: any = player.scene.getObjectByName("blueBox");
        let greenBox: any = player.scene.getObjectByName("greenBox");
        player.redBbox.setFromObject(redBox);
        player.blueBbox.setFromObject(Object832);
        player.greenBbox.setFromObject(home);

        if (topicNum.value === 3) {
          if (player.redBbox.intersectsBox(player.greenBbox)) {
            console.log("相交");
            animateState([-2.73, 0.13, 0.22, 0, -1.65, 0.08], 1000, () => {});
            // nowAllowClick.value[topicNum.value] = true;
          } else {
            console.log("不相交");
            // nowAllowClick.value[topicNum.value] = false;
          }
        }

        if (topicNum.value === 5) {
          if (player.redBbox.intersectsBox(player.blueBbox)) {
            console.log("相交");
            animateState([-2.81, -0.66, 0.78, 0, -1.64, 0], 1000, () => {});
            // nowAllowClick.value[topicNum.value] = true;
          } else {
            console.log("不相交");
            // nowAllowClick.value[topicNum.value] = false;
          }
        }
      }
    });

    function topicNext(bool: boolean) {
      // if (!nowAllowClick.value[topicNum.value]) return

      topicNum.value++;

      // console.log(runState);
    }

    function choseAnswer(type: string) {
      questionPageShow.value = false;
    }

    // 初始化位置视角
    function startFree(
      arr?: Array<number>,
      posObj?: Object,
      conObj?: Object
    ): void {
      // j65.visible = true
      // setLeftContent('操作机器人')
      if (arr) animateState(arr, 2000);

      if (posObj) {
        new TWEEN.Tween(player.camera.position)
          .to(posObj, 2000)
          .easing(TWEEN.Easing.Linear.None)
          .start();
      }
      if (conObj) {
        new TWEEN.Tween(player.controls.target)
          .to(conObj, 2000)
          .easing(TWEEN.Easing.Linear.None)
          .start();
      }
    }
    let arr1 = [
      [-2.73, 0.13, 0.22, 0, -1.65, 0.08],
      [-2.74, -0.55, 0.96, 0, -1.81, 0.08],
      [-2.81, -0.66, 0.78, 0, -1.64, 0],
    ];
    watch(topicNum, () => {
      console.log(topicNum.value);
      emit("changeTopicNum", topicNum.value);
      home.visible = false;
      if (topicNum.value === 1) {
        showlr.value = false;
        showHelp.value = false;
        actionfun(1, "缩回");
        new TWEEN.Tween(robot.position)
          .to({ x: -8 }, 1000)
          .easing(TWEEN.Easing.Linear.None)
          .start();
        startFree(
          getRobotPosition(),
          { x: -9.87, y: 18.39, z: -6.31 },
          { x: -16.1, y: 11.82, z: 4.16 }
        );
      }

      if (topicNum.value === 2) {
        showHelp.value = true;
        showlr.value = false;
        //     // cangitem1.visible = true
        j62.visible = true;
        //     // cangitemtou.visible = true
        actionfun(1, "伸出");
        new TWEEN.Tween(robot.position)
          .to({ x: -14 }, 1000)
          .easing(TWEEN.Easing.Linear.None)
          .start();
        startFree(
          [0.23, -0.68, 0.4, -0.03, -1.19, 0.02],
          { x: -1.02, y: 19.8, z: -6.26 },
          { x: -16.9, y: 11.04, z: 1.71 }
        );
        //     startFree(getRobotPosition(), { x: -9.87, y: 18.39, z: -6.31 }, { x: -16.10, y: 11.82, z: 4.16 })

        //     new TWEEN.Tween(cang1.position)
        //         .to({ y: 125 }, 500)
        //         .easing(TWEEN.Easing.Linear.None)
        //         .start();
      }
      if (topicNum.value === 3) {
        if(bigType !== '教学演示') return
        home.visible = true;
        home.position.set(770, -420, 330);
      }

      if (topicNum.value === 5) {
        if(bigType !== '教学演示') return
        home.visible = true;
        home.position.set(838, -620, 219);
      }

      if (topicNum.value === 10.5) {
        animateState(arr1[0], 1000, () => {
          animateState(arr1[1], 1000, () => {
            actionfun(1, "伸出");
            animateState(arr1[2], 1000, () => {
              cangitem1.visible = false;
              cangitemtou.visible = true;
              animateState(arr1[1], 1000, () => {});
            });
          });
        });
      }

      if (topicNum.value === 12.5) {
        animateState(arr1[2], 1000, () => {
          cangitem1.visible = true;
          cangitemtou.visible = false;

          animateState(arr1[1], 1000, () => {
            actionfun(1, "缩回");
            animateState(arr1[0], 1000, () => {});
          });
        });
      }
      // if (topicNum.value === 23) {
      // if (topicNum.value === 38) {
      //     startFree(getRobotPosition(), { x: -26.32, y: 28.22, z: -18.77 }, { x: -32.24, y: 19.28, z: 3.09 })
      // }
    });
    let lightUp:any = ref([-1,-1,-1,-1,-1,-1])
    function actionfun(item: number, type: string) {
      let obj = player.scene.getObjectByName(`cang${item}`);
      if (type === "伸出") {
        new TWEEN.Tween(obj.position)
          .to({ y: 125 }, 500)
          .easing(TWEEN.Easing.Linear.None)
          .start();
          lightUp.value[item] = item
      } else if (type === "缩回") {
        new TWEEN.Tween(obj.position)
          .to({ y: 0 }, 500)
          .easing(TWEEN.Easing.Linear.None)
          .start();
          lightUp.value[item] = -1
      }
    }
    let score = ref(14);
    function changeData(params: any) {
      score.value = score.value + params.value;
    }
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
      topicOneImg,
      topicNum,
      upDown,
      nowType,
      start,
      end,
      animateSwitch,
      showMenu,
      leftContent,
      setLeftContent,
      topicNext,
      changeData,
      waitPageShow,
      questionPageShow,
      choseAnswer,
      actionfun,
      showHelp,
      showlr,
      changeNum,
      lightUp
      // runOfState
    };
  },
});
</script>

<template>
  <div class="controls_box">
    <div class="helppage" v-if="showHelp">
      <img v-if="topicNum === 2" src="/warehouse/a1.png" />
      <!-- <img v-if="topicNum === 13" src="/implement/b1.png" />
            <img v-if="topicNum === 24" src="/implement/c1.png" />-->
      <div
        class="nextb"
        @click="
          topicNum++,
            setLeftContent('操作机器人'),
            (showlr = true),
            (showHelp = false)
        "
      >
        下一步
      </div>
    </div>

    <div class="touchpage" v-if="topicNum === 1">
      <div class="screen" style="left: 62px; top: 59px">
        <div class="daogui"></div>
        <div class="name">仓储</div>
        <div class="c_box">
          <div class="c_title">
            <div style="width: 50px">仓号</div>
            <div style="width: 100px">动作</div>
            <div style="width: 50px">检测</div>
          </div>
          <div class="c_list">
            <div class="c_item" v-for="n in 6" :key="n">
              <div class="num">
                <div class="num_value">{{ n }}</div>
              </div>
              <div class="btn_box">
                <div class="on" @click="actionfun(n, '伸出')">伸出</div>
                <div class="on" @click="actionfun(n, '缩回')">缩回</div>
              </div>
              <div class="deng">
                <div class="deng_value" :class="[lightUp[n] === n?'light':'unlight']"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="pBtn" @click="topicNum++, (showHelp = true)">下一步</div>
      <!-- <img src="/topic1/t1-0.png" /> -->
      <!-- <div class="nextb" v-if="topicNum === 0" @click="topicNum++">开始</div> -->
    </div>
    <div class="left_box" v-if="showlr">
      <!-- 操作机器人 -->
      <div
        class="robot_opt"
        :style="switchTypeImg"
        v-if="leftContent === '操作机器人'"
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
          v-if="topicNum === 3"
          @click="setLeftContent('仓库单元调试实训任务'), topicNext(true)"
        >
          下一步
        </div>
        <div
          class="t1-1 conBtn"
          v-if="topicNum === 5"
          @click="setLeftContent('仓库单元调试实训任务'), topicNext(true)"
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
      </div>
      <!-- 仓库单元调试实训任务 -->
      <div
        class="robot_opt"
        :style="topicOneImg"
        v-if="leftContent === '仓库单元调试实训任务'"
      >
        <!-- <div class="waitpage" v-if="topicNum === 0">
                    <div class="start_btn" @click="topicNum++">开始实训</div>
                </div>-->

        <!-- 取放料 -->

        <div
          class="conBtn"
          style="width: 94px; height: 25px; left: 194px; top: 268px"
          v-if="topicNum === 4"
          @click="topicNum++, setLeftContent('操作机器人')"
        ></div>
        <div
          class="conBtn"
          style="width: 94px; height: 25px; left: 194px; top: 268px"
          v-if="topicNum === 6"
          @click="topicNum++"
        ></div>

        <div class="codepage" v-if="topicNum === 7">
          <div
            class="conBtn"
            style="width: 153px; height: 14px; left: 95px; top: 102px"
          >
            <thinking-select
              :list="[
                { label: 'TOpStoragecylinder1', value: 0 },
                { label: 'ToTDigGrip', value: 1 },
              ]"
              @changeData="changeData"
            ></thinking-select>
          </div>
          <div
            class="conBtn"
            style="width: 157px; height: 14px; left: 91px; top: 237px"
          >
            <thinking-select
              :list="[
                { label: 'TOpStoragecylinder1', value: 1 },
                { label: 'ToTDigGrip', value: 0 },
              ]"
              @changeData="changeData"
            ></thinking-select>
          </div>

          <div
            class="conBtn"
            style="width: 90px; height: 34px; left: 200px; top: 292px"
            @click="topicNum++"
          ></div>
        </div>

        <div class="codepage" v-if="topicNum === 8">
          <div
            class="conBtn"
            style="width: 148px; height: 14px; left: 123px; top: 145px"
          >
            <thinking-select
              :list="[
                { label: 'TOpStoragecylinder1', value: 0 },
                { label: 'ToTDigGrip', value: 1 },
              ]"
              @changeData="changeData"
            ></thinking-select>
          </div>
          <div
            class="conBtn"
            style="width: 148px; height: 14px; left: 124px; top: 189px"
          >
            <thinking-select
              :list="[
                { label: 'TOpStoragecylinder1', value: 1 },
                { label: 'ToTDigGrip', value: 0 },
              ]"
              @changeData="changeData"
            ></thinking-select>
          </div>
          <div
            class="conBtn"
            style="width: 90px; height: 34px; left: 200px; top: 292px"
            @click="topicNum++"
          ></div>
        </div>
        <div
          class="conBtn"
          style="width: 96px; height: 23px; left: 276px; top: 102px"
          v-if="topicNum === 9"
          @click="topicNum++"
        ></div>
        <div
          class="conBtn"
          style="
            width: 40px;
            height: 36px;
            left: 518px;
            top: 249px;
            z-index: 999;
          "
          v-if="topicNum === 10"
          @click="topicNum = 10.5"
        ></div>
        <div
          class="nextb"
          v-if="topicNum === 10.5"
          @click="topicNum = topicNum + 0.5"
        >
          下一步
        </div>
        <div
          class="conBtn"
          style="width: 96px; height: 23px; left: 276px; top: 102px"
          v-if="topicNum === 11"
          @click="topicNum++"
        ></div>
        <!-- <div
          class="conBtn"
          style="width: 96px; height: 29px; left: 286px; top: 292px"
          v-if="topicNum === 12"
          @click="topicNext(false), (showHelp = false), (showlr = false)"
        ></div> -->
        <div
          class="conBtn"
          style="
            width: 40px;
            height: 36px;
            left: 518px;
            top: 249px;
            z-index: 999;
          "
          v-if="topicNum === 12"
          @click="topicNum = 12.5"
        ></div>
        <div
          class="nextb"
          v-if="topicNum === 12.5"
          @click="
            (topicNum = topicNum + 0.5), (showHelp = false), (showlr = false)
          "
        >
          下一步
        </div>
      </div>
    </div>
    <div class="right_box" v-if="showlr">
      <div class="btn up" @mousedown="start('up')" @mouseup="end()"></div>
      <div class="btn down" @mousedown="start('down')" @mouseup="end()"></div>
      <div class="btn left" @mousedown="start('left')" @mouseup="end()"></div>
      <div class="btn right" @mousedown="start('right')" @mouseup="end()"></div>
      <div
        class="btn leftTop"
        @mousedown="start('leftTop')"
        @mouseup="end()"
      ></div>
      <div
        class="btn rightTop"
        @mousedown="start('rightTop')"
        @mouseup="end()"
      ></div>
      <div
        class="btn leftBottom"
        @mousedown="start('leftBottom')"
        @mouseup="end()"
      ></div>
      <div
        class="btn rightBottom"
        @mousedown="start('rightBottom')"
        @mouseup="end()"
      ></div>
      <div class="btn r1" @mousedown="start('r1')" @mouseup="end()"></div>
      <div class="btn r2" @mousedown="start('r2')" @mouseup="end()"></div>
    </div>
    <div class="overbtn" v-if="topicNum === 13" @click="goBack">实训结束</div>
  </div>
</template>

<style scoped lang="less">
.controls_box {
  position: absolute;
  right: 47px;
  bottom: 119px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  .overbtn {
    right: 780px;
    bottom: -60px;
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
    width: 490px;
    height: 370px;
    right: -35px;
    bottom: 0;
    background-color: #ffffff;
    z-index: 1;

    img {
      width: 100%;
      height: 100%;
    }

    .nextb {
      right: 130px;
      bottom: -70px;
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
  }

  .touchpage {
    position: absolute;
    width: 460px;
    height: 320px;
    right: -10px;
    bottom: -40px;
    background: url(../chukongping.png) no-repeat;
    background-size: 100% 100%;
    .screen {
      position: absolute;
      width: 334px;
      height: 173px;
      border: 2px solid #ff6900;
      background-color: #fff;
      .daogui {
        position: absolute;
        left: 11px;
        top: 7px;
        width: 110px;
        height: 118px;
        background: url(../warehouse/cangchu.png) no-repeat;
        background-size: 100% 100%;
      }
      .name {
        position: absolute;
        left: 50px;
        top: 132px;
        font-size: 18px;
        color: #ff8d00;
        font-weight: bold;
      }

      .c_box {
        position: absolute;
        left: 131px;
        top: 1px;
        .c_title {
          width: 100%;
          font-size: 16px;
          display: flex;
          flex-flow: row nowrap;
          align-items: center;
          /* background-color: #ffb130; */
          color: #fff;
          justify-content: space-between;
          div {
            text-align: center;
            background-color: #2cd0f0;
          }
        }

        .c_list {
          width: 100%;

          .c_item {
            width: 100%;
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            margin-top: 5px;

            .num {
              text-align: center;
              width: 50px;
              height: 20px;

              .num_value {
                width: 40px;
                margin: 0 auto;
                font-size: 16px;
                line-height: 20px;
                text-align: center;
                color: #fff;
                cursor: pointer;
                /* border-radius: 5px; */
                background-color: #61d35d;
              }
            }
            .btn_box {
              width: 100px;
              display: flex;
              flex-flow: row nowrap;
              align-items: center;
              /* text-align: center; */
              justify-content: space-evenly;
              .on {
                font-size: 14px;
                width: 40px;
                height: 20px;
                line-height: 20px;
                text-align: center;
                color: #fff;
                cursor: pointer;
                /* border-radius: 5px; */
                background-color: #f8b60e;
              }
            }
            .deng {
              width: 50px;
              height: 20px;
              text-align: center;

              .light{
                background-color: #d3655d;
              }
              .unlight{
                background-color: #61d35d;
              }

              .deng_value {
                width: 30px;
                height: 20px;
                line-height: 20px;
                text-align: center;
                /* border-radius: 50px; */
                border-radius: 50%;
                color: #fff;
                cursor: pointer;
                /* border-radius: 15px 13px; */
                
                margin: 0 auto;
              }
            }
          }
        }
      }
    }
    .pBtn {
      left: -550px;
      top: 260px;
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
      background-color: #ffff0066;
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

      .nextb {
        right: 130px;
        bottom: -70px;
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

      .action_btn1 {
        width: 200px;
        height: 20px;
        position: absolute;
        left: 10px;
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
      .initpage {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background-color: #00000033;

        // .el-input--mini .el-input__inner {
        //     height: 20px;
        //     line-height: 20px;
        // }

        .conBtn {
          position: absolute;
          // background-color: #00ccff66;
          cursor: pointer;

          input {
            width: 100%;
            height: 100%;
          }
        }

        .t1-0-0 {
          width: 80px;
          height: 16px;
          left: 12px;
          top: 99px;
        }
        .t1-0-1 {
          width: 80px;
          height: 16px;
          left: 12px;
          top: 122px;
        }
        .t1-0-2 {
          width: 80px;
          height: 16px;
          left: 12px;
          top: 145px;
        }
        .t1-0-3 {
          width: 80px;
          height: 16px;
          left: 12px;
          top: 190px;
        }
        .t1-0-4 {
          width: 80px;
          height: 16px;
          left: 12px;
          top: 213px;
        }
        .t1-0-5 {
          width: 80px;
          height: 15px;
          left: 12px;
          top: 258px;
        }
        .t1-0-6 {
          width: 80px;
          height: 15px;
          left: 12px;
          top: 280px;
        }
      }

      .codepage {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        // .conBtn {
        //     position: absolute;
        //     background-color: #00ccff66;
        //     cursor: pointer;
        // }
      }

      .conBtn {
        position: absolute;
        background-color: #00ccff66;
        cursor: pointer;
      }

      .t1-1 {
        right: 585px;
        bottom: -70px;
        width: 190px;
        height: 35px;
        text-align: center;
        line-height: 35px;
        border-radius: 25px;
        color: #fff;
        background-color: #ffaf4c;
      }
    }

    .waitpage {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      text-align: center;
      line-height: 340px;
      color: #fff;
      font-size: 16px;
      background-color: #00000099;
      z-index: 1;

      .start_btn {
        position: absolute;
        background-color: #ff7c00;
        color: #fff;
        cursor: pointer;
        width: 69px;
        height: 32px;
        left: 209px;
        top: 318px;
        text-align: center;
        line-height: 32px;
      }

      .answer {
        width: 100%;
        height: 112%;
        position: absolute;
        left: 0;
        top: -37px;
        background-color: #383838;

        p {
          font-size: 16px;
          /* height: 4px; */
          position: absolute;
          left: 47px;
          width: 390px;
        }

        .an_box {
          width: 100%;
          height: 120px;
          display: flex;
          flex-flow: row wrap;
          align-items: center;
          justify-content: space-evenly;
          .an_item {
            /* flex: 1; */
            width: 170px;
            height: 20px;
            font-size: 16px;
            cursor: pointer;
          }
        }
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
        background-color: #ffff0066;
      }
      .btn2 {
        width: 100px;
        height: 30px;
        position: absolute;
        left: 20px;
        top: 195px;
        cursor: pointer;
        background-color: #ffff0066;
      }
    }
  }
  .right_box {
    width: 195px;
    height: 417px;
    position: relative;
    background: url("../shijiaoqi.png") center / contain no-repeat;
    background-size: 100% 100%;
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
