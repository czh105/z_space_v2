<script lang="ts">
import { defineComponent, ref } from 'vue'
import router from '../router';

export default defineComponent({
    setup() {
        function goTopics() {
            router.push('/home/topics')
        }
        return {
            defineComponent,
            ref,
            goTopics,
        };
    },
});
</script>

<template>
    <article>
         <div class="person_box">
            <div class="info_box">
                <div class="info_item">总成绩：</div>
                <!-- <div class="info_item"></div>
                <div class="info_item">：</div>
                <div class="info_item">专业：</div>
                <div class="info_item">班级：</div> -->
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

    
}
</style>
