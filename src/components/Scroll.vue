<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Scroll",
  props: {
    list: Array,
    type: String,
  },
  setup(props, { emit }) {
    let left_box = ref();
    let right_box = ref();
    let moveLeft = ref(false);
    let moveRight = ref(false);
    let list: any = props.list;
    console.log('list', list)
    let type: any = props.type;
    function goTest(name: string) {
      console.log("gotest");

      emit("my-emit", { name, type });
    }

    function left() {
      moveLeft.value = true;
      setTimeout(() => {
        list.unshift(list.pop());
        moveLeft.value = false;
      }, 500);
    }
    function right() {
      moveRight.value = true;
      setTimeout(() => {
        list.push(list.shift());
        moveRight.value = false;
      }, 500);
    }

    function getimg(url: string): string {
      return `background-image: url(${url})`;
    }

    return {
      goTest,
      left,
      right,
      moveLeft,
      moveRight,
      left_box,
      right_box,
      list,
      getimg,
    };
  },
});
</script>

<template>
  <div class="scroll_back">
    <!-- <div class="left" ref="left_box" @click="left"></div> -->
    <div class="item_box">
      <div class="card" v-for="n in list" :key="n" @click="goTest(n.text)">
        <div class="item_img" :style="getimg(n.url)"></div>
        <div class="item_name">{{ n.text }}</div>
      </div>
    </div>
    <!-- <div class="right" ref="right_box" @click="right"></div> -->
  </div>
</template>

<style scoped lang="less">
.scroll_back {
  position: relative;
  overflow: hidden;
  height: 100%;
  width: 100%;
  padding-top: 1%;
  .move_left {
    transition: all 0.3s linear;
    transform: translateX(366px);
  }
  .move_right {
    transition: all 0.3s linear;
    transform: translateX(-366px);
  }
  .left {
    width: 50px;
    height: 100px;
    background-color: #ccc;
    position: absolute;
    left: 0;
    top: 28%;
    cursor: pointer;
    z-index: 1;
    background: url(../scrollBtn.png);
    background-color: #ffffff2b;
    background-size: 100% 100%;
    background-blend-mode: difference;
  }
  .right {
    width: 50px;
    height: 100px;
    background-color: #ccc;
    position: absolute;
    right: 0;
    top: 28%;
    cursor: pointer;
    z-index: 1;
    background: url(../scrollBtn.png);
    background-color: #ffffff2b;
    background-size: 100% 100%;
    background-blend-mode: difference;
    transform: rotateZ(180deg);
  }
  .item_box {
    position: relative;
    height: 42%;
    margin-top: 30px;
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    align-items: stretch;
    // justify-content: space-between;

    .card {
      width: 9%;
      height: 100%;
      cursor: pointer;
      margin: 0 20px;

      .item_img {
        width: 100%;
        height: 100%;
        border: 2px solid #fbab67;
        background-size: 100% 100%;
      }
      .item_name {
        font-size: 18px;
        font-weight: bold;
        text-align: center;
        margin-top: 10px;
      }
    }
  }
}
</style>
