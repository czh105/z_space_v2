<script lang="ts">
import { defineComponent, ref } from 'vue'
import router from '../router';
import $store from '../store/index'

export default defineComponent({
    setup() {
        function goTopics() {
            router.push('/home/topics')
        }

        let itemList1 = ref([
            { text: "工作站布局A", num: 0, ind: 2, need: true },
            { text: "示教器操作", num: 40, ind: 2, need: true },
            { text: "执行单元调试", num: 48, ind: 2, need: true },
            { text: "仓库单元调试", num: 18, ind: 2, need: true },
            { text: "打磨单元调试", num: 28, ind: 2, need: true },
            { text: "压装单元调试", num: 26, ind: 2, need: true },
            { text: "数控单元调试", num: 20, ind: 2, need: true },
            { text: "SCARA机器人", num: 46, ind: 2, need: true },
            { text: "HMI模拟A", num: 0, ind: 2, need: false },
        ]);
        let itemList2 = ref([
            { text: "工作站布局B", num: 10, ind: 2, need: true },
            { text: "示教器操作", num: 40, ind: 2, need: true },
            { text: "涂胶调试", num: 21, ind: 2, need: true },
            { text: "码垛调试", num: 30, ind: 2, need: true },
            { text: "多工艺调试", num: 67, ind: 2, need: true },
            { text: "装配调试", num: 70, ind: 2, need: true },
            { text: "HMI模拟B", num: 0, ind: 2, need: false },
        ]);
        const handleChange = (value: any) => {
            // console.log(value)
        }
        async function saveOption() {
            await $store.dispatch('setList', {
                '工业机器人集成应用': itemList1.value,
                '工业机器人操作与运维': itemList2.value
            })
        }
        function reset() {
            itemList1.value.forEach((item) => {
                item.ind = 2
            })
            itemList2.value.forEach((item) => {
                item.ind = 2
            })
        }
        return {
            defineComponent,
            ref,
            goTopics,
            itemList1,
            itemList2,
            handleChange,
            saveOption,
            reset
        };
    },
});
</script>

<template>
    <article>
        <div class="exam_box">
            <div class="left">
                <div class="title">工业机器人集成应用</div>
                <div class="topic_box">
                    <div class="table_title">
                        <div class="t1">实训名称</div>
                        <div class="t2">单项考点分值</div>
                        <div class="t3">合计总分</div>
                    </div>
                    <div class="table_content">
                        <div
                            class="c"
                            :class="{ none: !item.need }"
                            v-for="item in itemList1"
                            :key="item.text"
                        >
                            <div class="c1">{{ item.text }}</div>
                            <div class="c2">
                                <el-input-number
                                    v-model="item.ind"
                                    :min="1"
                                    :max="5"
                                    size="mini"
                                    @change="handleChange(item)"
                                />
                            </div>
                            <div class="c3">{{ item.ind * item.num }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="right" >
                <div class="title">工业机器人操作与运维</div>
                <div class="topic_box">
                    <div class="table_title">
                        <div class="t1">实训名称</div>
                        <div class="t2">单项考点分值</div>
                        <div class="t3">合计总分</div>
                    </div>
                    <div class="table_content">
                        <div
                            class="c"
                            :class="{ none: !item.need }"
                            v-for="item in itemList2"
                            :key="item.text"
                        >
                            <div class="c1">{{ item.text }}</div>
                            <div class="c2">
                                <el-input-number
                                    v-model="item.ind"
                                    :min="1"
                                    :max="5"
                                    size="mini"
                                    @change="handleChange"
                                />
                            </div>
                            <div class="c3">{{ item.ind * item.num }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="btn_box">
                <div class="b1" @click="reset">重置</div>
                <div class="b2" @click="saveOption">保存</div>
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

    .exam_box {
        width: 100%;
        height: 100%;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: space-evenly;

        .btn_box {
            position: absolute;
            right: 0px;
            top: 670px;

            div {
                display: inline-block;
                margin-right: 50px;
                cursor: pointer;
                font-weight: bold;
            }

            .b1 {
                width: 50px;
                height: 30px;
                line-height: 30px;
                border: 1px solid orange;
                color: orange;
                text-align: center;
            }
            .b2 {
                width: 50px;
                height: 30px;
                line-height: 30px;
                border: 1px solid orange;
                background-color: orange;
                color: #fff;
                text-align: center;
            }
        }

        .topic_box {
            width: 100%;
            /* height: 100%; */
            margin-top: 50px;
            position: relative;

            .table_title {
                width: 100%;
                height: 30px;
                line-height: 30px;
                /* text-align: center; */
                font-size: 18px;
                color: #ff8d00;
                font-weight: bold;
                display: flex;
                flex-flow: row nowrap;
                align-items: center;
                justify-content: space-around;

                .t1 {
                    width: 150px;
                }
                .t2 {
                    width: 200px;
                    text-align: center;
                }
                .t3 {
                    width: 80px;
                }
            }
            .table_content {
                width: 100%;
                /* height: 30px; */
                /* line-height: 30px; */
                /* font-size: 18px; */
                /* display: flex; */
                /* flex-flow: row nowrap; */
                /* align-items: center; */
                /* justify-content: space-evenly; */

                .none {
                    color: #999;
                    /* background-color: #eee; */
                    /* pointer-events: none; */
                    cursor: not-allowed;
                    .el-input-number--mini {
                        pointer-events: none;
                    }
                }

                .c {
                    width: 100%;
                    height: 50px;
                    line-height: 50px;
                    font-size: 16px;
                    /* text-align: center; */
                    display: flex;
                    flex-flow: row nowrap;
                    align-items: center;
                    border-bottom: 1px solid #ccc;
                    justify-content: space-around;

                    .c1 {
                        width: 150px;
                    }
                    .c2 {
                        width: 200px;
                        text-align: center;
                        .el-input-number--mini {
                            top: -2px;
                            width: 130px;
                            line-height: 26px;

                            .el-input-number__decrease,
                            .el-input-number__increase {
                                top: 2px !important;
                            }
                        }
                    }
                    .c3 {
                        width: 80px;
                        text-align: center;
                    }
                }
            }
        }

        .title {
            font-size: 20px;
            color: #fff;
            font-weight: bold;
            height: 40px;
            width: 43%;
            /* margin-bottom: 30px; */
            text-align: center;
            line-height: 40px;
            background-color: #f59a23;
        }
        .left {
            width: 47%;
            height: 100%;
            padding: 20px;
            box-sizing: border-box;
        }
        .right {
            width: 47%;
            height: 100%;
            padding: 20px;
            box-sizing: border-box;
        }
    }
}
</style>
