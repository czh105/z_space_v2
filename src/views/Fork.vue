<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
import router from "../router";

import $store from "../store/index";
export default defineComponent({
  setup() {
    onMounted(async () => {
      await $store.dispatch("setType", "");
    });
    let jxShow = ref(true);
    let sxShow = ref(true);
    let khShow = ref(true);
    // const bigType = computed(() => $store.state.bigType)
    async function goTopics(name: string) {
      // router.push('/home/topics')

      await $store.dispatch("setType", name);

      router.push({ name: "Topics", params: { mode: name } });
    }
    let personType = $store.state.userData.user.type;
    if (personType === 1) {
      khShow.value = false;
    } else if (personType === 2) {
      jxShow.value = false;
    }

    return {
      defineComponent,
      ref,
      goTopics,
      khShow,
      jxShow,
      sxShow,
    };
  },
});
</script>

<template>
  <article>
    <!-- <div class="part_box" >教学演示</div> -->
    <!-- <div
      class="part_box"
      :class="{ none: !jxShow }"
      @click="goTopics('教学演示')"
    >
      教学演示
    </div> -->
    <div
      class="part_box"
      @click="goTopics('教学演示')"
    >
      教学演示
    </div>
    <div
      class="part_box"
      :class="{ none: !sxShow }"
      @click="goTopics('实训练习')"
    >
      实训练习
    </div>
    <div
      class="part_box"
      :class="{ none: !khShow }"
      @click="goTopics('在线考核')"
    >
      在线考核
    </div>
    <!-- <div class="part_box" >在线考核</div> -->
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
  justify-content: space-around;
  .none {
    background-color: #ccc !important;
    pointer-events: none;
  }

  .part_box {
    /* width: 40%; */
    height: 130px;
    border-radius: 20px;
    background-color: #ef9d57;
    color: #fff;
    font-size: 38px;
    text-align: center;
    line-height: 130px;
    padding: 7%;
    /* margin: 0 120px; */
    transition: all 0.2s linear;
    opacity: 0.8;
    cursor: pointer;

    &:hover {
      transform: scale(1.1);
      opacity: 1;
    }
  }
}
</style>
