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
import $store from "../store/index";
import { ElMessage } from 'element-plus'
import Result from "../hooks/result";
import ThinkingSelect from "./ThinkingSelect.vue";
// import { setTimeout } from "timers/promises";
export default defineComponent({
  name: "pressfit",
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
    let leftContent = ref("压装单元调试实训任务");
    let topic = ref((window as any).topic);
    let showMenu = ref(false);
    let waitPageShow = ref(false);
    let questionPageShow = ref(false);
    let showHelp = ref(false);
    let showlr = ref(false);
    let bigType = $store.state.bigType;

    let animateSwitch = ref(false);
	//todo: 增加示教器面板折叠功能
	let isFold = ref(false);
    const changeNum = (num: number): void => {
      topicNum.value = num;
      //   TWEEN.removeAll()
    };

    function goBack() {
      let p = {
        name: "压装单元调试",
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

    let tuo: any = player.scene.getObjectByName("tuo");
    let g1: any = player.scene.getObjectByName("G-1");
    let g2: any = player.scene.getObjectByName("G-2");
    let j66: any = player.scene.getObjectByName("j6-6");
    let aoditou: any = player.scene.getObjectByName("aoditou");
    let aodi: any = player.scene.getObjectByName("aodi2");
    let tuoitem: any = player.scene.getObjectByName("tuoitem");
    tuoitem.visible = false;
    let xiaaodi: any = player.scene.getObjectByName("xiaaodi");
    xiaaodi.visible = false;
    let robot: any = player.scene.getObjectByName("robot2");
    let home: any = player.scene.getObjectByName("home");

    // let h7: any = player.scene.getObjectByName("h-7")

    // let j63: any = player.scene.getObjectByName("j6-3");

    // let j63: any = player.scene.getObjectByName("j6-3");

    // debugger
    onMounted(() => {
      nowType.value = "A";
      topicNum.value++;
      emit("changeTopicNum", topicNum.value);

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
        case 3:
          return `background-image: url( "./pressfit/a1.png"  )`;
          break;
        case 5:
          return `background-image: url( "./pressfit/a2.png"  )`;
          break;
        case 7:
          return `background-image: url( "./pressfit/a3.png"  )`;
          break;
        case 8:
          return `background-image: url( "./pressfit/a4.png"  )`;
          break;
        case 9:
          return `background-image: url( "./pressfit/a5.png"  )`;
          break;
        case 10:
          return `background-image: url( "./pressfit/a6.png"  )`;
          break;
        case 11:
          return `background-image: url( "./pressfit/a7.png"  )`;
          break;
        case 11.5:
          return `background-image: url( "./pressfit/pp.png"  )`;
          break;
        case 12:
          return `background-image: url( "./pressfit/a8.png"  )`;
          break;
        case 13:
          return `background-image: url( "./pressfit/a9.png"  )`;
          break;
        case 13.5:
          return `background-image: url( "./pressfit/pp.png"  )`;
          break;
        // 吹屑
        case 14:
          return `background-image: url( "./pressfit/b1.png"  )`;
          break;

        case 15:
          return `background-image: url( "./pressfit/b2.png"  )`;
          break;
        case 16:
          return `background-image: url( "./pressfit/b3.png"  )`;
          break;
        case 17:
          return `background-image: url( "./pressfit/b4.png"  )`;
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
        // player.blueBbox.setFromObject(Object832);
        player.greenBbox.setFromObject(home);

        if (topicNum.value === 4) {
          if (player.redBbox.intersectsBox(player.greenBbox)) {
            console.log("相交");
            animateState(
              [-1.93, -0.94, 0.1, -0.04, -0.72, -0.02],
              1000,
              () => {}
            );
          } else {
            console.log("不相交");
          }
        }

        if (topicNum.value === 6) {
          if (player.redBbox.intersectsBox(player.greenBbox)) {
            console.log("相交");
            animateState(
              [-1.65, -1.45, 0.31, -0.04, -0.47, -0.02],
              1000,
              () => {}
            );
          } else {
            console.log("不相交");
          }
        }
      }
    });

    function topicNext(bool: boolean) {
      // if (!nowAllowClick.value[topicNum.value]) return

      topicNum.value++;

      if (bool) {
        runState.push(getRobotPosition());
        // console.log(runState)
      }
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
      [-1.5, -0.16, 0, 0, -1.41, 0],
      [-1.93, -0.94, 0.1, -0.04, -0.72, -0.02],
      [-1.55, -0.7, 0.25, -0.04, -1.09, -0.02],
      [-1.65, -1.45, 0.31, -0.04, -0.47, -0.02],
    ];
    watch(topicNum, () => {
      console.log(topicNum.value);
      home.visible = false;
      emit("changeTopicNum", topicNum.value);
      if (topicNum.value === 1) {
        startFree(
          [0, 0, 0, 0, 0, 0],
          { x: -8.66, y: 12.73, z: -2.87 },
          { x: -2.12, y: 10.17, z: 0.56 }
        );
      }
      if (topicNum.value === 2) {
        switchAll("t1");
      }
      if (topicNum.value === 3) {
        showHelp.value = true;
        showlr.value = false;
      }
      if (topicNum.value === 4) {
        robot.position.x = -8;
        j66.visible = true;
        tuoitem.visible = true;
        if (bigType === "教学演示") {
        home.visible = true;
        home.position.set(-1450, -45, 180);
        }
        startFree(
          [-1.5, -0.16, 0, 0, -1.41, 0],
          { x: -6.82, y: 18.59, z: -9.13 },
          { x: -3.69, y: 10.36, z: 1.42 }
        );
      }
      if (topicNum.value === 6) {
        if (bigType === "教学演示") {
        home.visible = true;
        home.position.set(-1380, 60, 21.4);
        }
      }

      if (topicNum.value === 11.5) {
        animateState(arr1[0], 1500, () => {
          animateState(arr1[1], 1500, () => {
            aodi.visible = false;
            aoditou.visible = true;
            animateState(arr1[2], 1500, () => {});
          });
        });
      }
      if (topicNum.value === 13.5) {
        animateState(arr1[3], 1500, () => {
          aoditou.visible = false;
          xiaaodi.visible = true;
          animateState(arr1[2], 1500, () => {});
        });
      }

      //   if (topicNum.value === 14) {
      //     showHelp.value = true;
      //     showlr.value = false;
      //     new TWEEN.Tween(tuo.position)
      //       .to({ x: -997 }, 1000)
      //       .easing(TWEEN.Easing.Linear.None)
      //       .onComplete(() => {
      //         new TWEEN.Tween(g1.position)
      //           .to({ z: -186 }, 1000)
      //           .easing(TWEEN.Easing.Linear.None)
      //           .onComplete(() => {
      //             new TWEEN.Tween(g1.position)
      //               .to({ z: -81 }, 1000)
      //               .easing(TWEEN.Easing.Linear.None)
      //               .onComplete(() => {
      //                 new TWEEN.Tween(tuo.position)
      //                   .to({ x: -1140 }, 1000)
      //                   .easing(TWEEN.Easing.Linear.None)
      //                   .start();
      //               })
      //               .start();
      //           })
      //           .start();
      //       })
      //       .start();
      //   }

      // if (topicNum.value === 38) {
      //     startFree(getRobotPosition(), { x: -26.32, y: 28.22, z: -18.77 }, { x: -32.24, y: 19.28, z: 3.09 })
      // }
    });
    function switchAll(type: string) {
      if (type === "芯片缩回") {
        new TWEEN.Tween(g1.position)
          .to({ z: -81 }, 1000)
          .easing(TWEEN.Easing.Linear.None)
          .start();
      } else if (type === "芯片伸出") {
        new TWEEN.Tween(g1.position)
          .to({ z: -131 }, 1000)
          .easing(TWEEN.Easing.Linear.None)
          .start();
      } else if (type === "芯片压制") {
        new TWEEN.Tween(g1.position)
          .to({ z: -186 }, 1000)
          .easing(TWEEN.Easing.Linear.None)
          .start();
      } else if (type === "轮胎缩回") {
        new TWEEN.Tween(g2.position)
          .to({ z: -76 }, 1000)
          .easing(TWEEN.Easing.Linear.None)
          .start();
      } else if (type === "轮胎伸出") {
        new TWEEN.Tween(g2.position)
          .to({ z: -136 }, 1000)
          .easing(TWEEN.Easing.Linear.None)
          .start();
      } else if (type === "轮胎压制") {
        new TWEEN.Tween(g2.position)
          .to({ z: -186 }, 1000)
          .easing(TWEEN.Easing.Linear.None)
          .start();
      } else if (type === "t1") {
        new TWEEN.Tween(tuo.position)
          .to({ x: -1140 }, 1000)
          .easing(TWEEN.Easing.Linear.None)
          .start();
      } else if (type === "t2") {
        new TWEEN.Tween(tuo.position)
          .to({ x: -997 }, 1000)
          .easing(TWEEN.Easing.Linear.None)
          .start();
      } else if (type === "t3") {
        new TWEEN.Tween(tuo.position)
          .to({ x: -870 }, 1000)
          .easing(TWEEN.Easing.Linear.None)
          .start();
      } else if (type === "t4") {
        new TWEEN.Tween(tuo.position)
          .to({ x: -755 }, 1000)
          .easing(TWEEN.Easing.Linear.None)
          .start();
      }
    }
    let score = ref(20);
    function changeData(params: any) {
      score.value = score.value + params.value;
    }
    onBeforeUnmount(() => {
      console.log("分数", score.value);
    });
    return {
      topic,
      // goTest,
	  isFold,
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
      switchAll,
      questionPageShow,
      choseAnswer,
      showlr,
      showHelp,
      changeNum,
      // runOfState
    };
  },
});
</script>

<template>
  <div class="controls_box">
    <div class="helppage" v-if="showHelp">
      <img
        style="width: 490px; height: 400px"
        v-if="topicNum === 3"
        src="/pressfit/a1.png"
      />
      <img
        style="width: 490px; height: 250px"
        v-if="topicNum === 14"
        src="/pressfit/b1.png"
      />
      <div
        class="nextb"
        v-if="topicNum === 3"
        @click="
          topicNum++,
            setLeftContent('操作机器人'),
            (showlr = true),
            (showHelp = false)
        "
      >
        下一步
      </div>
      <div
        class="nextb"
        v-if="topicNum === 14"
        @click="topicNum++, (showlr = true), (showHelp = false)"
      >
        下一步
      </div>
    </div>

    <div class="touchpage" v-if="topicNum === 1">
      <div class="screen" style="left: 63px; top: 67px">
        <div class="daogui"></div>
        <div class="type">压装单元气缸</div>
        <div class="name" style="left: 170px; top: 45px">车标压装</div>
        <div
          class="on"
          style="left: 270px; top: 18px"
          @click="switchAll('芯片缩回')"
        >
          缩回
        </div>
        <div
          class="mid"
          style="left: 270px; top: 46px"
          @click="switchAll('芯片伸出')"
        >
          伸出
        </div>
        <div
          class="off"
          style="left: 270px; top: 76px"
          @click="switchAll('芯片压制')"
        >
          压制
        </div>
        <div class="name" style="left: 170px; top: 140px">轮胎压装</div>
        <div
          class="on"
          style="left: 270px; top: 120px"
          @click="switchAll('轮胎缩回')"
        >
          缩回
        </div>
        <div
          class="mid"
          style="left: 270px; top: 146px"
          @click="switchAll('轮胎伸出')"
        >
          伸出
        </div>
        <div
          class="off"
          style="left: 270px; top: 171px"
          @click="switchAll('轮胎压制')"
        >
          压制
        </div>
      </div>
      <div class="pBtn" @click="topicNum++">下一步</div>
    </div>

    <div class="touchpage" v-if="topicNum === 2">
      <div class="screen" style="left: 63px; top: 67px">
        <div class="daogui"></div>
        <div class="type">压装单元气缸</div>
        <div class="name" style="left: 140px; top: 86px">压装直线机构</div>
        <div class="on" style="left: 270px; top: 40px" @click="switchAll('t1')">
          位置1
        </div>
        <div
          class="mid"
          style="left: 270px; top: 70px"
          @click="switchAll('t2')"
        >
          位置2
        </div>
        <div
          class="off"
          style="left: 270px; top: 100px"
          @click="switchAll('t3')"
        >
          位置3
        </div>
        <div
          class="las"
          style="left: 270px; top: 130px"
          @click="switchAll('t4')"
        >
          位置4
        </div>
      </div>

      <div class="pBtn" @click="topicNum++, (showHelp = true)">下一步</div>
    </div>
    <div class="left_control" v-if="showlr" @click="isFold = !isFold">
    	<div :class="!isFold ? 'fold': 'expand'"></div>
    </div>
    <div class="left_box" v-if="showlr" v-show="!isFold">
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
          v-if="topicNum === 4"
          @click="setLeftContent('压装单元调试实训任务'), topicNext(true)"
        >
          下一步
        </div>
        <div
          class="t1-1 conBtn"
          v-if="topicNum === 6"
          @click="setLeftContent('压装单元调试实训任务'), topicNext(true)"
        >
          下一步
        </div>
        <!-- 吹屑 -->

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
      <!-- 压装单元调试实训任务 -->
      <div
        class="robot_opt"
        :style="topicOneImg"
        v-if="leftContent === '压装单元调试实训任务'"
      >
        <!-- <div class="waitpage" v-if="topicNum === 0">
                    <div class="start_btn" @click="topicNum++">开始实训</div>
                </div>-->

        <!-- 车标压装 -->

        <div
          class="conBtn"
          style="width: 94px; height: 25px; left: 194px; top: 268px"
          v-if="topicNum === 5"
          @click="topicNum++, setLeftContent('操作机器人')"
        ></div>
        <div
          class="conBtn"
          style="width: 94px; height: 25px; left: 194px; top: 268px"
          v-if="topicNum === 7"
          @click="topicNum++"
        ></div>

        <div class="codepage" v-if="topicNum === 8">
          <div
            class="conBtn"
            style="width: 37px; height: 14px; left: 44px; top: 121px"
          >
            <thinking-select
              :list="[
                { label: 'Set', value: 0 },
                { label: 'Reset', value: 0 },
                { label: 'SetGO', value: 1 },
              ]"
              @changeData="changeData"
            ></thinking-select>
          </div>
          <div
            class="conBtn"
            style="width: 57px; height: 14px; left: 80px; top: 144px"
          >
            <thinking-select
              :list="[
                { label: 'LGet_pos', value: 1 },
                { label: 'LPut_pos', value: 0 },
              ]"
              @changeData="changeData"
            ></thinking-select>
          </div>


          <div
            class="conBtn"
            style="width: 37px; height: 14px; left: 32px; top: 156px"
          >
            <thinking-select
              :list="[
                { label: 'Set', value: 1 },
                { label: 'Reset', value: 0 },
                { label: 'SetGO', value: 0 },
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

        <div class="codepage" v-if="topicNum === 9">
          <div
            class="conBtn"
            style="width: 37px; height: 14px; left: 44px; top: 119px"
          >
            <thinking-select
              :list="[
                { label: 'Set', value: 0 },
                { label: 'Reset', value: 1 },
                { label: 'SetGO', value: 0 },
              ]"
              @changeData="changeData"
            ></thinking-select>
          </div>
          <div
            class="conBtn"
            style="width: 37px; height: 14px; left: 44px; top: 155px"
          >
            <thinking-select
              :list="[
                { label: 'Set', value: 0 },
                { label: 'Reset', value: 0 },
                { label: 'SetGO', value: 1 },
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
          v-if="topicNum === 10"
          @click="topicNum++"
        ></div>
        <!-- <div
          class="conBtn"
          style="width: 80px; height: 32px; left: 297px; top: 292px"
          v-if="topicNum === 11"
          @click="topicNext(false)"
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
          v-if="topicNum === 11"
          @click="topicNum = 11.5"
        ></div>
        <div
          class="nextb"
          v-if="topicNum === 11.5"
          @click="topicNum = topicNum + 0.5"
        >
          下一步
        </div>
        <div
          class="conBtn"
          style="width: 96px; height: 23px; left: 276px; top: 102px"
          v-if="topicNum === 12"
          @click="topicNum++"
        ></div>
        <!-- <div
          class="conBtn"
          style="width: 96px; height: 29px; left: 286px; top: 292px"
          v-if="topicNum === 13"
          @click="topicNext(false), (showHelp = true), (showlr = false)"
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
          v-if="topicNum === 13"
          @click="topicNum = 13.5"
        ></div>
        <div
          class="nextb"
          v-if="topicNum === 13.5"
          @click="
            (topicNum = topicNum + 0.5), (showHelp = false), (showlr = false)
          "
        >
          下一步
        </div>

        <!-- 外轮胎压装 -->

        <div class="codepage" v-if="topicNum === 15">
          <div
            class="conBtn"
            style="width: 44px; height: 14px; left: 52px; top: 117px"
          >
            <thinking-select
              :list="[
                { label: 'TOpCPcylinder', value: 1 },
                { label: 'TOpslpos', value: 0 },
              ]"
              @changeData="changeData"
            ></thinking-select>
          </div>
          <div
            class="conBtn"
            style="width: 127px; height: 14px; left: 100px; top: 117px"
          >
            <thinking-select
              :list="[
                { label: 'TOpCPcylinder', value: 0 },
                { label: 'TOpslpos', value: 1 },
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
          style="width: 97px; height: 21px; left: 274px; top: 102px"
          v-if="topicNum === 16"
          @click="topicNum++"
        ></div>
        <div
          class="conBtn"
          style="width: 80px; height: 32px; left: 297px; top: 292px"
          v-if="topicNum === 17"
          @click="topicNext(false), (showHelp = false), (showlr = false)"
        ></div>
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
    <div class="overbtn" v-if="topicNum === 14" @click="goBack">实训结束</div>
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

  .startb {
    left: -1000px;
    top: 0;
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
    // width: 490px;
    // height: 370px;
    right: -35px;
    bottom: 0;
    background-color: #ffffff;
    z-index: 1;

    // img {
    //   width: 100%;
    //   height: 100%;
    // }

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
    width: 470px;
    height: 370px;
    right: -10px;
    bottom: -40px;
    background: url(../chukongping.png) no-repeat;
    background-size: 100% 100%;

    .screen {
      position: absolute;
      width: 341px;
      height: 203px;
      border: 2px solid #ff6900;
      background-color: #fff;

      .daogui {
        position: absolute;
        left: 21px;
        top: 17px;
        width: 110px;
        height: 118px;
        background: url(../pressfit/yazhuang.png) no-repeat;
        background-size: 100% 100%;
      }
      .type {
        position: absolute;
        left: 23px;
        top: 162px;
        font-size: 18px;
        color: #ff8d00;
        font-weight: bold;
      }
      .name {
        position: absolute;
        font-size: 18px;
        color: #ff8d00;
        font-weight: bold;
      }
      .on {
        position: absolute;

        font-size: 14px;
        width: 40px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        color: #fff;
        cursor: pointer;
        border-radius: 5px;
        background-color: #5efa3e;
      }
      .mid {
        position: absolute;

        font-size: 14px;
        width: 40px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        color: #fff;
        cursor: pointer;
        border-radius: 5px;
        background-color: #ffcd42;
      }
      .off {
        position: absolute;

        font-size: 14px;
        width: 40px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        color: #fff;
        cursor: pointer;
        border-radius: 5px;
        background-color: #f86450;
      }
      .las {
        position: absolute;

        font-size: 14px;
        width: 40px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        color: #fff;
        cursor: pointer;
        border-radius: 5px;
        background-color: #50dff8;
      }
      .ld {
        position: absolute;
        font-size: 14px;
        width: 40px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        color: #fff;
        cursor: pointer;
        border-radius: 5px;
      }
      .num {
        width: 80px;
        height: 16px;
        left: 118px;
        top: 20px;
        position: absolute;

        input {
          width: 30px;
          height: 15px;
        }
      }
      .run {
        position: absolute;
        left: 117px;
        top: 23px;
        font-size: 14px;
        width: 60px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        color: #fff;
        cursor: pointer;
        border-radius: 5px;
        background-color: #5bc772;
      }
    }
    .pBtn {
      left: -560px;
      top: 320px;
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
	.left_control{
		position: relative;
		width: 30px;
		height: 30px;
		top: -150px;
		left: -15px;
		cursor: pointer;
		.fold{
			width: 100%;
			height: 100%;
			background-image: url(fold.png);
		}
		.expand{
			width: 100%;
			height: 100%;
			background-image: url(expand.png);
		}
	}
  .left_box {
    width: 480px;
    height: 359px;
    /* float: left; */
    position: relative;
    top: 14px;
    border: 4px solid #666;
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

        .pBtn {
          position: absolute;
          background-color: #ff7c00;
          color: #fff;
          cursor: pointer;
          width: 69px;
          height: 32px;
          left: 200px;
          top: 289px;
          text-align: center;
          line-height: 32px;
        }
      }

      .conBtn {
        position: absolute;
        background-color: #00ccff66;
        cursor: pointer;
      }

      .t1-1 {
        right: 635px;
        bottom: -50px;
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
