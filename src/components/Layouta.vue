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
        name: "总控单元",
        num: "1",
        pos: [0, 0, -400],
        img: "./buju2/zongkong.png",
      },
      {
        name: "仓储单元",
        num: "9",
        pos: [0, 0, -132],
        img: "./buju2/cangchu.png",
      },
      {
        name: "SCARA单元",
        num: "4",
        pos: [0, 0, -132],
        img: "./buju2/scara.png",
      },
      {
        name: "视觉单元",
        num: "3",
        pos: [0, 0, -132],
        img: "./buju2/shijue.png",
      },
      {
        name: "工具单元",
        num: "8",
        pos: [0, 0, -132],
        img: "./buju2/gongju.png",
      },
      {
        name: "数控单元",
        num: "10",
        pos: [0, 0, -132],
        img: "./buju2/shukong.png",
      },
      {
        name: "压装单元",
        num: "5",
        pos: [0, 0, -132],
        img: "./buju2/yazhuang.png",
      },
      {
        name: "机器人",
        num: "6",
        pos: [0, 0, -132],
        img: "./buju2/jiqiren.png",
      },
      {
        name: "打磨单元",
        num: "7",
        pos: [0, 0, -132],
        img: "./buju2/damo.png",
      },
      {
        name: "分拣单元",
        num: "2",
        pos: [0, 0, -132],
        img: "./buju2/fenjian.png",
      },
    ]);
    let showtips = ref(false);
    let player: any = (window as any).player;
    let nowChoseLabel: HTMLDivElement | null = null;
    let nowChose: string | null = null;
    let score: number = 0;
	// todo:控制当前的操作是否完成
	let optionsControl: string[] = [];
	let optionComplete = ref(false)
    let position1 = [
      [3490, 997, -341],
      [2375, 580, -681],
      [2734, 675, -5.5],
      [2032, 781, -104],
      [1332, 738, 0],
      [323, 845, -81],
      [675, 567, -672],
      [-11, 630, -681],
      [-8, 792, 678],
      [-688, 1184, -323],
    ];
    let position2 = [
      [3490, 997, -341],
      [2375, 580, -681],
      [2734, 675, -5.5],
      [2032, 781, -104],
      [1332, 738, 0],
      [323, 844, -81],
      [675, 568, 666],
      [-11, 630, -681],
      [-8, 792, 678],
      [-688, 1184, -323],
    ];
    let position3 = [
      [978, 997, -778],
      [1684, 580, 678],
      [1980, 675, -677],
      [2032, 781, -104],
      [1332, 738, 0],
      [323, 844, -81],
      [675, 568, 666],
      [-11, 630, -681],
      [-8, 792, 678],
      [-688, 1184, -323],
    ];

    function setPosition(type: number) {
      let pos: any[] = [];
      switch (type) {
        case 1:
          pos = position1;
          break;
        case 2:
          pos = position2;
          break;
        case 3:
          pos = position3;
          break;
      }
      q1.position.set(...pos[0]);
      q1.rotation.z = 0;
      type === 3 ? (q1.rotation.z = 1.57) : (q1.rotation.z = 0);
      q2.position.set(...pos[1]);
      q3.position.set(...pos[2]);
      q3.rotation.z = 0;
      type === 3 ? (q3.rotation.z = 3.14) : (q3.rotation.z = 0);
      q4.position.set(...pos[3]);
      q5.position.set(...pos[4]);
      q6.position.set(...pos[5]);
      q7.position.set(...pos[6]);
      q7.rotation.z = 0;
      type === 1 ? (q7.rotation.z = 0) : (q7.rotation.z = 3.14);
      q8.position.set(...pos[7]);
      q9.position.set(...pos[8]);
      q10.position.set(...pos[9]);

      zongkong.visible = false;
      fenjian.visible = false;
      shijue.visible = false;
      scara.visible = false;
      yazhuang.visible = false;
      robot.visible = false;
      damo.visible = false;
      gongju.visible = false;
      cangchu.visible = false;
      shukong.visible = false;
      // debugger
      player.scene.traverse((m: any) => {
        if (m.name.includes('m') && m.type === "Object3D") {
          m.visible = true
        }

      })

      if (nowChoseLabel) {
        nowChoseLabel.style.color = "#fb9b09";
        nowChoseLabel.style.backgroundColor = "#fff";
        nowChoseLabel = null;
      }
      if (nowChose) {
        player.scene.getObjectByName("m" + nowChose).visible = false;
        nowChose = null;
      }
	  // todo: 所有的标签全部显示一遍
	  for(let i = 1; i <= 10; i++){
	  	var label: any = player.scene.getObjectByName("m" + i);
	  	if(label){
	  		label.visible = true;
	  	}
	  }
	  // 清空操作
	  optionsControl = [];
	  optionComplete.value = false;
    }
    let q1: any = player.scene.getObjectByName("qq1");
    let q2: any = player.scene.getObjectByName("qq2");
    let q3: any = player.scene.getObjectByName("qq3");
    let q4: any = player.scene.getObjectByName("qq4");
    let q5: any = player.scene.getObjectByName("qq5");
    let q6: any = player.scene.getObjectByName("qq6");
    let q7: any = player.scene.getObjectByName("qq7");
    let q8: any = player.scene.getObjectByName("qq8");
    let q9: any = player.scene.getObjectByName("qq9");
    let q10: any = player.scene.getObjectByName("qq10");

    let Object2069: any = player.scene.getObjectByName("Object2069");
    Object2069.visible = false;

    let zongkong: any = player.scene.getObjectByName("总控单元");
    zongkong.visible = false;
    let fenjian: any = player.scene.getObjectByName("分拣单元");
    fenjian.visible = false;
    let shijue: any = player.scene.getObjectByName("视觉单元");
    shijue.visible = false;
    let scara: any = player.scene.getObjectByName("SCARA单元");
    scara.visible = false;
    let yazhuang: any = player.scene.getObjectByName("压装单元");
    yazhuang.visible = false;
    let robot: any = player.scene.getObjectByName("机器人");
    robot.visible = false;
    let damo: any = player.scene.getObjectByName("打磨单元");
    damo.visible = false;
    let gongju: any = player.scene.getObjectByName("工具单元");
    gongju.visible = false;
    let cangchu: any = player.scene.getObjectByName("仓储单元");
    cangchu.visible = false;
    let shukong: any = player.scene.getObjectByName("数控单元");
    shukong.visible = false;

    let typeChoseShow = ref(false);

    function addlabel() {
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
        let mesh = player.scene.getObjectByName(item.name);
        mesh.add(earthLabel);

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
    }

    onMounted(() => {
      typeChoseShow.value = true;
      // debugger
      startFree(
        { x: 17.03, y: 40.82, z: -36.37 },
        { x: 1.7, y: -0.93, z: 1.21 }
      );
      addlabel();
      // let scene = player.scene
    });
    function searchItem(item: any) {
      console.log(item);
      if (item.num === nowChose) {
        score++;
        switch (item.name) {
          case "总控单元":
            zongkong.visible = true;
            break;
          case "分拣单元":
            fenjian.visible = true;
            break;
          case "视觉单元":
            shijue.visible = true;
            break;
          case "SCARA单元":
            scara.visible = true;
            break;
          case "压装单元":
            yazhuang.visible = true;
            break;
          case "机器人":
            robot.visible = true;
            break;
          case "打磨单元":
            damo.visible = true;
            break;
          case "工具单元":
            gongju.visible = true;
            break;
          case "仓储单元":
            cangchu.visible = true;
            break;
          case "数控单元":
            shukong.visible = true;
            break;
        }
        player.scene.getObjectByName("m" + nowChose).visible = false;
        console.log('score', score)
        if (score === 10) {
          ElMessage.success('工作站布局安装点完成!')
        }
		// todo: 添加操作的标签
		if(nowChose !== null){
			console.log("添加")
			optionsControl.push(nowChose);
			if(optionsControl.length == 10){
				optionComplete.value = true;
			}
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
              zongkong.visible = true;
              break;
            case "2":
              fenjian.visible = true;
              break;
            case "3":
              shijue.visible = true;
              break;
            case "4":
              scara.visible = true;
              break;
            case "5":
              yazhuang.visible = true;
              break;
            case "6":
              robot.visible = true;
              break;
            case "7":
              damo.visible = true;
              break;
            case "8":
              gongju.visible = true;
              break;
            case "9":
              cangchu.visible = true;
              break;
            case "10":
              shukong.visible = true;
              break;
          }
          player.scene.getObjectByName("m" + nowChose).visible = false;
          console.log('score', score)
          if (score === 10) {
            ElMessage.success('工作站布局安装点完成!')
          }
		  // todo: 添加操作的标签
		  if(nowChose !== null){
		  	console.log("添加")
		  	optionsControl.push(nowChose);
		  	if(optionsControl.length == 10){
		  		optionComplete.value = true;
		  	}
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
        name: "工作站布局A",
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
      if (topicNum.value === 1) {
        typeChoseShow.value = true
      }
      if (topicNum.value === 2) {
        typeChoseShow.value = true
      }

    });

    onBeforeUnmount(() => {
      console.log(score);
    });

    return {
      obj,
      searchItem,
      showtips,
      bigType,
      typeChoseShow,
      setPosition,
      goBack,
      changeNum,
	  optionComplete
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
      <div class="btn" v-if="bigType !== '在线考核'" @click="typeChoseShow = true">
        重新选择布局
      </div>
    </div>
    <div class="tip_box" v-if="showtips && bigType !== '在线考核'">
      <p>请选择正确的单元进行布置安装！</p>
      <div class="btn" @click="showtips = false">确定</div>
    </div>
	<div class="tip_box" v-if="optionComplete">
		<p>当前布局部署完成！</p>
		<div class="btn" @click="optionComplete = false">确认</div>
	</div>
    <div class="tip_box" v-if="showtips && bigType === '在线考核'">
      <p>未能选择正确的单元进行布置安装！</p>
      <div class="btn" @click="showtips = false">继续考核</div>
    </div>

    <div class="type_box" v-if="typeChoseShow && bigType !== '在线考核'">
      <p>请选择下列布局的其中一个进行实训</p>
      <div class="btn_box">
        <div class="btn" @click="setPosition(1), (typeChoseShow = false)">
          布局A
        </div>
        <div class="btn" @click="setPosition(2), (typeChoseShow = false)">
          布局B
        </div>
        <div class="btn" @click="setPosition(3), (typeChoseShow = false)">
          布局C
        </div>
      </div>
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

  .type_box {
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

    .btn_box {
      padding: 0 50px;
      display: flex;

      .btn {
        width: 100px;
        height: 30px;
        line-height: 30px;
        background-color: #fb9b09;
        color: #fff;
        /* position: absolute; */
        /* top: 170px; */
        /* left: 150px; */
        margin: 0 5px;
        text-align: center;
        font-size: 16px;
        cursor: pointer;
      }
    }
  }

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

    .btn {
      width: 100px;
      height: 30px;
      line-height: 30px;
      background-color: #fbc709;
      color: #fff;
      position: absolute;
      bottom: 10px;
      right: 10px;
      border-radius: 5px;
      text-align: center;
      font-size: 14px;
      cursor: pointer;
    }

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
