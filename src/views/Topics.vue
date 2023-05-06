<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  computed,
  onBeforeUnmount,
  onMounted,
} from "vue";
import router from "../router";
import { useRouter, useRoute, onBeforeRouteUpdate } from "vue-router";
import $store from "../store/index";
import Scroll from "../components/Scroll.vue";

export default defineComponent({
  components: {
    Scroll,
  },
  setup() {
    const route = useRoute();
    // let videoShow = ref(false);
    let list1: any = null;
    let list2: any = null;
    // const subTitle = route.params.mode
    // let topic = (window as any).topic =  route.params.topic
    if ($store.state.bigType === "在线考核") {
      list1 = ref([
        { text: "工作站布局A", url: "./topicImg/bujuA.jpg" },
        { text: "示教器操作", url: "./topicImg/shijiaoqijicheng.jpg" },
        { text: "执行单元调试", url: "./topicImg/zhixing.jpg" },
        { text: "仓库单元调试", url: "./topicImg/cangku.jpg" },
        { text: "打磨单元调试", url: "./topicImg/damo.jpg" },
        { text: "压装单元调试", url: "./topicImg/yazhuang.jpg" },
        { text: "数控单元调试", url: "./topicImg/shukong.jpg" },
        { text: "SCARA机器人", url: "./topicImg/scara.jpg" },
      ]);
      list2 = ref([
        { text: "工作站布局B", url: "./topicImg/buju.jpg" },
        { text: "示教器操作", url: "./topicImg/shijiaoqiyunwei.jpg" },
        { text: "涂胶调试", url: "./topicImg/tujiao.jpg" },
        { text: "码垛调试", url: "./topicImg/maduo.jpg" },
        { text: "多工艺调试", url: "./topicImg/duogongyi.jpg" },
        { text: "装配调试", url: "./topicImg/zhuangpei.jpg" },
      ]);
    } else {
      list1 = ref([
        { text: "工作站布局A", url: "./topicImg/bujuA.jpg" },
        { text: "示教器操作", url: "./topicImg/shijiaoqijicheng.jpg" },
        { text: "执行单元调试", url: "./topicImg/zhixing.jpg" },
        { text: "仓库单元调试", url: "./topicImg/cangku.jpg" },
        { text: "打磨单元调试", url: "./topicImg/damo.jpg" },
        { text: "压装单元调试", url: "./topicImg/yazhuang.jpg" },
        { text: "数控单元调试", url: "./topicImg/shukong.jpg" },
        { text: "SCARA机器人", url: "./topicImg/scara.jpg" },
        { text: "HMI模拟A", url: "./topicImg/HMIjicheng.jpg" },
      ]);

      list2 = ref([
        { text: "工作站布局B", url: "./topicImg/buju.jpg" },
        { text: "示教器操作", url: "./topicImg/shijiaoqiyunwei.jpg" },
        { text: "涂胶调试", url: "./topicImg/tujiao.jpg" },
        { text: "码垛调试", url: "./topicImg/maduo.jpg" },
        { text: "多工艺调试", url: "./topicImg/duogongyi.jpg" },
        { text: "装配调试", url: "./topicImg/zhuangpei.jpg" },
        { text: "HMI模拟B", url: "./topicImg/HMIyunwei.jpg" },
        // { text: "视频", url: "./topicImg/shipin.jpg" },
      ]);
    }

    function goFork() {
      router.push("/home/fork");
    }

    function goTest(p: any) {
      // if (p.name === "视频") {
      //   videoShow.value = true;
      //   return;
      // }
      router.push({
        name: "Test",
        params: { topic: p.name, mode: $store.state.bigType, type: p.type },
      });
    }

    let shixunShow = ref(false);
    let kaoheShow = ref(false);

    let result = $store.state.resultValue

    onMounted(async () => {
      // if ($store.state.bigType === "实训练习" && !$store.state.shixunShow) {
      //   shixunShow.value = true;
      //   await $store.dispatch("setshixun", true);
      // }

      // if ($store.state.bigType === "在线考核" && !$store.state.kaoheShow) {
      //   kaoheShow.value = true;
      //   await $store.dispatch("setkaohe", true);
      // }
      console.log('result',result)
    });
    onBeforeUnmount(async () => {

    });
    return {
      defineComponent,
      ref,
      goFork,
      goTest,
      list1,
      list2,
      // videoShow,
      shixunShow,
      kaoheShow,
      // subTitle
    };
  },
});
</script>

<template>
  <article>
    <!-- <div class="back_btn" @click="goFork">首页</div> -->
    <div class="content">
      <!-- <div class="type_title">{{subTitle}}</div> -->
      <div class="type_box">
        <div class="title">工业机器人集成应用</div>
        <Scroll @my-emit="goTest" :list="list1" type="工业机器人集成应用"></Scroll>
      </div>
      <div class="type_box">
        <div class="title">工业机器人操作与运维</div>
        <Scroll @my-emit="goTest" :list="list2" type="工业机器人操作与运维"></Scroll>
      </div>
      <div class="back_btn" @click="goFork">返回</div>
      <div class="logout" v-if="shixunShow">
        <p>当前进入实训练习模式</p>
        <p>实训开始时间已经记录，下面选择题目进行实训</p>
        <p>离开此页后实训记录将自动上传</p>
        <div class="btn_box">
          <span class="s2" @click="shixunShow = false">确定</span>
        </div>
      </div>
      <div class="logout" v-if="kaoheShow">
        <p>当前进入在线考核模式</p>
        <p>考核开始时间已经记录，下面选择题目进行考核</p>
        <p>离开此页后考核记录与成绩将自动上传</p>
        <div class="btn_box">
          <span class="s2" @click="kaoheShow = false">确定</span>
        </div>
      </div>
    </div>
    
  </article>
</template>

<style scoped lang="less">
article {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;

 

  .sub_title {
    font-size: 16px;
  }

  .content {
    width: 92%;
    height: 82%;
    top: 8%;
    left: 50%;
    padding: 30px;
    position: absolute;
    transform: translate(-50%);
    border-radius: 30px;
    background-color: #fff;
    border: 2px solid #f59a23;

    .logout {
      position: absolute;
      left: 50%;
      top: 39%;
      transform: translate(-50%, -50%);
      width: 630px;
      text-align: center;
      background-color: #fff;
      border: 4px solid #ef9d57;
      box-sizing: border-box;
      padding: 30px;

      p {
        font-size: 18px;
        color: #ef9d57;
        line-height: 30px;
        font-weight: bold;
      }
      .btn_box {
        /* width: 100%; */
        /* height: 30px; */
        /* margin: 50px auto; */
        padding-right: 10px;
        margin-top: 50px;

        span {
          display: inline-block;
        }
        .s1 {
          width: 50px;
          height: 30px;
          margin-right: 20px;
          line-height: 30px;
          border: 1px solid #ef9d57;
          background-color: #fff;
          color: #ef9d57;
          cursor: pointer;
        }
        .s2 {
          width: 50px;
          height: 30px;
          line-height: 30px;
          border: 1px solid #ef9d57;
          background-color: #ef9d57;
          color: #fff;
          cursor: pointer;
        }
      }
    }

    .back_btn {
      position: absolute;
      width: 60px;
      height: 0px;
      line-height: 0px;
      font-size: 18px;
      text-align: center;
      color: #fff;
      font-weight: bold;
      right: -1px;
      top: -1px;
      border-radius: 0 30px 0 30px;
      cursor: pointer;
      padding: 20px 10px 20px 11px;
      background-color: #f59a23;
    }

    .type_title {
      font-size: 16px;
    }

    .type_box {
      // border: 1px solid blue;
      margin-bottom: 1%;
      height: 46%;
      width: 100%;

      .title {
        font-size: 20px;
        color: #fff;
        font-weight: bold;
        height: 40px;
        width: 21%;
        /* margin-bottom: 30px; */
        text-align: center;
        line-height: 40px;
        background-color: #f59a23;
      }
    }
  }
}
</style>
