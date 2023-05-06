<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import router from '../router';
import $store from '../store/index'

export default defineComponent({
    setup() {
        function goTopics() {
            router.push('/home/topics')
        }
        const userData = computed(() => {
            return $store.state.userData
        })
        return {
            defineComponent,
            ref,
            goTopics,
            userData
        };
    },
});
</script>

<template>
    <article>
        <div class="person_box">
            <div class="info_box">
                <div class="info_item">姓名：{{userData.user.name}}</div>
                <div class="info_item">学号：{{userData.user.numberId}}</div>
                <div class="info_item"></div>
                <div class="info_item">学院：{{userData.user.college }}</div>
                <div class="info_item">专业：{{userData.user.specialty}}</div>
                <div class="info_item">班级：{{userData.user.class}}</div>
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

    .person_box {
        width: 100%;
        height: 100%;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: space-evenly;

        .info_box {
            position: absolute;
            width: 600px;
            height: 170px;
            left: 1%;
            top: 5%;
            display: flex;
            flex-flow: row wrap;
            align-items: center;
            justify-content: space-around;

            .info_item {
                width: 170px;
                font-size: 16px;
            }
        }
    }
}
</style>
