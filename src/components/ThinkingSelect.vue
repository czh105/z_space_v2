<script lang="ts">
import { defineComponent, ref, onMounted,toRef } from 'vue'
import $store from '../store/index'
import { ElMessage } from 'element-plus'

export default defineComponent({
    name: 'ThinkingSelect',
    props: ['list','res'],
    setup(props, { emit }) {
        let label: any = ref([])
        let nowLabel:any = ref('')
        let showList = ref(false)
        let bigType = $store.state.bigType
        let fat:any = ref()
            let cld:any = ref()
        
        onMounted(() => {
            label.value = props.list

            let rot:any = document.body
            rot.addEventListener('click',(e:any)=>{
                showList.value = false
            },true)
           
        })
        function opemList(){
            showList.value = !showList.value;
        }
        function selectItem(n:any){
            nowLabel.value = n.label
            if(n.value === 1){
                ElMessage.success('程序模块选择正确！')
            }else{
                ElMessage.error('程序模块选择错误！')
            }
            // props.res = n
            emit('changeData',{name:props.res,value:n.value})
            showList.value = false
        }
        return {
            label,
            showList,
            nowLabel,
            selectItem,
            bigType,
            fat,
            cld,
            opemList
        }
    }
})
</script>

<template>
    <div class="select_box" ref="fat">
        <div class="content" ref="cld" @click="opemList();">{{nowLabel}}</div>
        <div class="select" v-if="showList">
            <div v-for="n in label" :key="n" :class="{right:bigType === '教学演示'&& n.value === 1}" class="item" @click="selectItem(n)">{{ n.label }}</div>
        </div>
    </div>
</template>

<style scoped lang="less">
.select_box {
    width: 100%;
    height: 100%;
    font-size: 12px;
    /* background-color: #f00; */
    border: 1px solid @mainColor;
    position: relative;

    .content {
        background-color: #fff;
        height: 14px;
        line-height: 14px;
        text-align: center;
    }

    .select {
        position: absolute;
        right: -75px;
        top: -1px;
        cursor: pointer;
        border: 1px solid @mainColor;
        background-color: #fff;
        z-index: 999;

        .right{
            color: orangered;
        }
        .item {
            // width: 60px;
            height: 20px;
            cursor: pointer;
            padding: 2px 5px;
            text-align: center;

            &:hover {
                background-color: @mainColor;
                color: #fff;
            }
        }
    }
}
</style>
