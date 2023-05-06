<script lang="ts">
import { CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer";
import * as TWEEN from "@tweenjs/tween.js";
import { ElMessage } from 'element-plus'
import $store from "../store/index";
import {
  defineComponent,
  computed,
  watch,
  onMounted,
  onBeforeUnmount,
  ref,
  reactive,
} from "vue";

export default defineComponent({
  name: "layout",
  setup(props, { emit }) {
    const bigType = $store.state.bigType;
    let topic = ref((window as any).topic);
    let topicNum = ref(0);
    const changeNum = (num: number): void => {
      topicNum.value = num
    }
    let obj = ref([
      {
        name: "机器人本体",
        num: "1",
        pos: [0, 10, 0],
        img: "./buju/jiqiren.png",
      },
      {
        name: "工具快换装置",
        num: "2",
        pos: [-24, 20, 12],
        img: "./buju/gongju.png",
      },
      {
        name: "涂胶单元",
        num: "3",
        pos: [-8, 20, 25],
        img: "./buju/tujiao.png",
      },
      {
        name: "码垛单元",
        num: "4",
        pos: [19, 20, 24],
        img: "./buju/maduo.png",
      },
      {
        name: "多工艺单元",
        num: "5",
        pos: [27, 20, 12],
        img: "./buju/duogongyi.png",
      },
      {
        name: "装配单元",
        num: "6",
        pos: [-30, 20, -5],
        img: "./buju/zhuangpei.png",
      },
      {
        name: "仓储单元",
        num: "7",
        pos: [-8, 20, 32],
        img: "./buju/cangchu.png",
      },
      {
        name: "视觉单元",
        num: "8",
        pos: [7, 20, 26],
        img: "./buju/shijue.png",
      },
      {
        name: "安全光栅",
        num: "9",
        pos: [0, 20, 36],
        img: "./buju/guangzha.png",
      },
      {
        name: "监控系统",
        num: "10",
        pos: [33, 20, 34],
        img: "./buju/jiankong.png",
      },
    ]);
    let showtips = ref(false);
    let player: any = (window as any).player;
    let nowChoseLabel: HTMLDivElement | null = null;
    let nowChose: string | null = null;
    let score: number = 0;
    let robot: any = player.scene.getObjectByName("robotGroup");
    robot.visible = false;
    let tujiao: any = player.scene.getObjectByName("涂胶单元");
    tujiao.visible = false;
    let jiankong: any = player.scene.getObjectByName("监控系统");
    jiankong.visible = false;
    let guangzha: any = player.scene.getObjectByName("安全光栅");
    guangzha.visible = false;
    let zhuangpei: any = player.scene.getObjectByName("装配单元");
    zhuangpei.visible = false;
    let cangchu: any = player.scene.getObjectByName("仓储单元");
    cangchu.visible = false;
    let gongju: any = player.scene.getObjectByName("工具快换装置");
    gongju.visible = false;
    let maduo: any = player.scene.getObjectByName("码垛单元");
    maduo.visible = false;
    let duogongyi: any = player.scene.getObjectByName("多工艺单元");
    duogongyi.visible = false;
    let shijue: any = player.scene.getObjectByName("视觉单元");
    shijue.visible = false;
    onMounted(() => {
      // debugger
      startFree(
        { x: 24.45, y: 96.12, z: 70.11 },
        { x: 25.32, y: 9.9, z: 8.81 }
      );

      let scene = player.scene;
      obj.value.forEach((item) => {
        const labelDiv = document.createElement("div");
        labelDiv.style.backgroundColor = "#fff";
        labelDiv.style.width = "100px";
        labelDiv.style.height = "30px";
        labelDiv.style.lineHeight = "30px";
        labelDiv.style.textAlign = "center";
        labelDiv.style.border = "1px solid #fb9b09";
        labelDiv.style.pointerEvents = "auto";
        labelDiv.style.cursor = "pointer";
        labelDiv.style.color = "#fb9b09";
        if (bigType === "在线考核") {
          labelDiv.innerHTML = `<div class="text">${item.num}</div>`;
        } else {
          labelDiv.innerHTML = `<div class="text">${item.name}</div>`;
        }

        const earthLabel = new CSS2DObject(labelDiv);
        earthLabel.position.set(item.pos[0], item.pos[1], item.pos[2]);
        earthLabel.name = "m" + item.num;
        scene.add(earthLabel);

        labelDiv.addEventListener("click", function choseLabel() {
          console.log("nowChose", item.num);
          if (nowChoseLabel) {
            nowChoseLabel.style.color = "#fb9b09";
            nowChoseLabel.style.backgroundColor = "#fff";
            nowChoseLabel = null;
          }
          nowChoseLabel = labelDiv;
          nowChoseLabel.style.backgroundColor = "#fb9b09";
          nowChoseLabel.style.color = "#fff";
          nowChose = item.num;
        });
      });
    });
    function searchItem(item: any) {
      console.log(item);
      if (item.num === nowChose) {
        score++;
        switch (item.name) {
          case "机器人本体":
            robot.visible = true;
            break;
          case "工具快换装置":
            gongju.visible = true;
            break;
          case "涂胶单元":
            tujiao.visible = true;
            break;
          case "码垛单元":
            maduo.visible = true;
            break;
          case "多工艺单元":
            duogongyi.visible = true;
            break;
          case "装配单元":
            zhuangpei.visible = true;
            break;
          case "仓储单元":
            cangchu.visible = true;
            break;
          case "视觉单元":
            shijue.visible = true;
            break;
          case "安全光栅":
            guangzha.visible = true;
            break;
          case "监控系统":
            jiankong.visible = true;
            break;
        }
        player.scene.getObjectByName("m" + nowChose).visible = false;
        if (score === 10) {
          ElMessage.success('工作站布局安装点完成!')
        }
        return;
        // nowChoseLabel!.style.display = "none"
        // nowChoseLabel = null
      } else {
        if (bigType !== "在线考核") {
          showtips.value = true;
        }
        if (bigType === "在线考核") {
          showtips.value = true;
          switch (nowChose) {
            case "1":
              robot.visible = true;
              break;
            case "2":
              gongju.visible = true;
              break;
            case "3":
              tujiao.visible = true;
              break;
            case "4":
              maduo.visible = true;
              break;
            case "5":
              duogongyi.visible = true;
              break;
            case "6":
              zhuangpei.visible = true;
              break;
            case "7":
              cangchu.visible = true;
              break;
            case "8":
              shijue.visible = true;
              break;
            case "9":
              guangzha.visible = true;
              break;
            case "10":
              jiankong.visible = true;
              break;
          }
          player.scene.getObjectByName("m" + nowChose).visible = false;
          if (score === 10) {
          ElMessage.success('工作站布局安装点完成!')
        }
        }
      }
    }

    function startFree(posObj: Object, conObj: Object): void {
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
    function goBack() {
      let p = {
        name: "工作站布局b",
        score: score,
      };
      console.log("上传", p);
      if(bigType !== "教学演示"){
        alert(`您本次实训成绩为：${p.score}分`,)
      }
      emit("back", p);
    }

   watch(topicNum, () => {
      emit("changeTopicNum", topicNum.value);
      console.log(topicNum.value)
      // if(topicNum.value === 1){
      //   typeChoseShow.value = true
      // }
      // if(topicNum.value === 2){
      //   typeChoseShow.value = true
      // }
     
    });

    onBeforeUnmount(() => {
      console.log(score);
    });

    return {
      obj,
      searchItem,
      showtips,
      bigType,
      goBack,
      changeNum
    };
  },
});
</script>

<template>
  <div class="controls_box">
    <div class="model_box">
      <div class="item" @click="searchItem(item)" v-for="item in obj" :key="item.num">
        <div class="img">
          <img :src="item.img" />
        </div>
        <div class="name">{{ item.name }}</div>
      </div>
    </div>
    <div class="tip_box" v-if="showtips && bigType !== '在线考核'">
      <p>请选择正确的单元进行布置安装！</p>
      <div class="btn" @click="showtips = false">确定</div>
    </div>

    <div class="tip_box" v-if="showtips && bigType === '在线考核'">
      <p>未能选择正确的单元进行布置安装！</p>
      <div class="btn" @click="showtips = false">继续考核</div>
    </div>
  </div>
</template>

<style scoped lang="less">
.controls_box {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  z-index: 999;
  pointer-events: none;

  .tip_box {
    width: 400px;
    height: 250px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border: 4px solid #fb9b09;
    pointer-events: auto;

    p {
      line-height: 140px;
      font-size: 16px;
      text-align: center;
    }
    .btn {
      width: 100px;
      height: 30px;
      line-height: 30px;
      background-color: #fb9b09;
      color: #fff;
      position: absolute;
      top: 170px;
      left: 150px;
      text-align: center;
      font-size: 16px;
      cursor: pointer;
    }
  }

  .model_box {
    width: 39%;
    max-width: 580px;
    height: 64%;
    background-color: #6262624a;
    border: 4px solid #fbc709;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    pointer-events: auto;
    position: absolute;
    right: 1%;
    bottom: 5%;

    .item {
      text-align: center;
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      margin: 0px 16px;
      cursor: pointer;
      .img {
        width: 109px;
        height: 110px;
        border: 2px solid #ffd402;

        img {
          width: 100%;
          height: 100%;
        }
      }
      .name {
        font-size: 16px;
        text-align: center;
        width: 100px;
        height: 30px;
        line-height: 30px;
        color: #ffeb00;
      }
    }
  }
}
</style>
