<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import router from '../router';
import $store from '../store/index'

export default defineComponent({
    setup() {
        let nowShowContent: any = ref('我的信息')
        let textList = ref(['我的信息', '考核管理', '成绩查询'])

        let personType = $store.state.userData.user.type
        let textObj: any = {
            '我的信息': 'person',
            '成绩查询': 'Manage',
            '考核管理': 'Exam'
        }
        if (personType === 1) {
            textList = ref(['我的信息', '考核管理'])
        } else if (personType === 2) {
            textList = ref(['我的信息', '成绩查询'])

        } else if (personType === 3) {
            textList = ref(['我的信息', '考核管理', '成绩查询'])
        }




        function switchInfo(text: string) {
            nowShowContent.value = text
            router.push('/home/info/' + textObj[text])
        }
        function goFork() {
            router.push("/home/fork");
        }
        onMounted(() => {
            router.push('/home/info/' + textObj[nowShowContent.value])


        })

        return {
            defineComponent,
            ref,
            textList,
            nowShowContent,
            switchInfo,
            goFork
        };
    },
});
</script>

<template>
    <article>
        <div class="info_box">
            <div class="left_box">
                <div
                    class="info_btn"
                    :class="{ active: nowShowContent === text }"
                    v-for="text in textList"
                    :key="text"
                    @click="switchInfo(text)"
                >{{ text }}</div>
            </div>
            <div class="right_box">
                <transition name="fade">
                    <router-view></router-view>
                </transition>
            </div>
            <div class="back_btn" @click="goFork">返回</div>
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

    .info_box {
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

        .left_box {
            width: 170px;
            height: 735px;
            float: left;
            // border: 1px solid #f00;

            .info_btn {
                padding: 10px 10px;
                text-align: center;
                background-color: #ffffff;
                color: #f59a23;
                border: 2px solid #f59a23;
                cursor: pointer;
                margin: 5px 0;
            }
            .active {
                background-color: @mainColor;
                border: 2px solid @mainColor;
                color: #ffffff;
            }
        }
        .right_box {
            width: 89%;
            height: 735px;
            float: right;
            position: relative;
            // border: 1px solid #11a318;
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
}
</style>
