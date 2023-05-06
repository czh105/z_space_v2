<script lang="ts">
import { defineComponent, ref, onMounted, computed } from "vue";
import router from "../router";
import $store from "../store/index";
import IndexDB from "../hooks/indexDB";

export default defineComponent({
  setup() {
    const bigType = computed(() => $store.state.bigType);
    // console.log('123', bigType.value)
    let logoutShow = ref(false);
    let videoShow = ref(false);

    onMounted(() => {});

    const userData = computed(() => {
      return $store.state.userData;
    });
    function playVideo() {
      videoShow.value = true;
    }

    function goTest() {
      router.push("/test");
    }

    function enterInfo() {
      router.push("/home/info");
    }
    function goIndex() {
      router.push("/home/fork");
    }
    function showPop() {
      logoutShow.value = true;
    }
    function outLogin() {
      router.push("/");
    }

    return {
      defineComponent,
      ref,
      goTest,
      enterInfo,
      goIndex,
      outLogin,
      bigType,
      userData,
      showPop,
      logoutShow,
      videoShow,
      playVideo,
    };
  },
});
</script>

<template>
  <div class="back">
    <nav>
      <div class="title" @click="goIndex">
        虚拟仿真实训教学系统
        <span>{{ bigType }}</span>
      </div>
      <!-- <div class="manyou" @click="playVideo()">漫游视频</div> -->
      <div class="user_info" @click="enterInfo">{{ userData.user.name }}</div>
      <div class="login_out" @click="showPop"></div>
    </nav>
    <article>
      <transition name="fade">
        <router-view></router-view>
      </transition>
      <!-- <div class="part_box" @click="goTest()">教学演示</div>
      <div class="part_box">实训练习</div>
      <div class="part_box">在线考核</div>-->
    </article>
    <div class="logout" v-if="logoutShow">
      <p>确定要退出登录吗？</p>
      <div class="btn_box">
        <span class="s1" @click="outLogin">确定</span>
        <span class="s2" @click="logoutShow = false">取消</span>
      </div>
    </div>
    <div class="video" v-if="videoShow">
      <div class="close" @click="videoShow = false">+</div>
      <video src="/video.mp4" autoplay width="100%" controls></video>
    </div>
  </div>
</template>

<style scoped lang="less">
.back {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: url(../back2.jpg) no-repeat;
  background-size: 100% 100%;
  .video {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
    overflow: hidden;

    .close {
      position: absolute;
      font-size: 50px;
      transform: rotateZ(45deg);
      color: #fff;
      right: 0;
      top: 0px;
      width: 30px;
      height: 30px;
      z-index: 1;
      cursor: pointer;
      text-align: center;
      line-height: 30px;
    }

    video {
      width: 100%;
      height: 100%;
      object-fit: fill;
    }
  }

  .logout {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    height: 250px;
    text-align: center;
    background-color: #fff;
    border: 4px solid #ef9d57;
    box-sizing: border-box;
    padding: 30px;
    box-shadow: 0 0 0 1000px #000000ba;

    p {
      font-size: 18px;
      color: #ef9d57;
      line-height: 70px;
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

  nav {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 50px;
    background-color: #ffffffed;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    color: #f59a23;
    z-index: 1;
    .title {
      font-size: 24px;
      font-weight: bold;
      // height: 50px;
      // line-height: 50px;
      padding-left: 50px;
      cursor: pointer;

      span {
        font-size: 18px;
        display: inline-block;
        margin-left: 20px;
      }
    }
    .manyou {
      font-size: 16px;
      position: absolute;
      /* right: 0; */
      right: 174px;
      font-weight: bold;
      cursor: pointer;
      color: #fff;
      padding: 5px;
      border-radius: 5px;
      background-color: #f59a23;
    }
    .user_info {
      font-size: 16px;
      position: absolute;
      /* right: 0; */
      right: 70px;
      font-weight: bold;
      cursor: pointer;
      width: 100px;
      text-align: center;
    }
    .login_out {
      font-size: 17px;
      position: absolute;
      right: 30px;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      cursor: pointer;
      background: url(../out.png) no-repeat;
      background-size: 80% 80%;
      background-position: center;
      background-color: @mainColor;
    }
  }

  article {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;

    .part_box {
      width: 400px;
      height: 400px;
      border-radius: 20px;
      background-color: #ef9d57;
      color: #fff;
      font-size: 38px;
      text-align: center;
      line-height: 400px;
      margin: 0 120px;
      transition: all 0.2s linear;
      opacity: 0.9;
      cursor: pointer;

      &:hover {
        transform: scale(1.1);
        opacity: 1;
      }
    }
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
}
</style>
