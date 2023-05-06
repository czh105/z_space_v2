<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import router from "../router";
import axios from "../axios/axios";
import { mokeGet } from "../axios/api";
import $store from "../store/index";
import Base64 from "base-64";
// import {requestService} from '../axios/request'

export default defineComponent({
  setup() {
    let switchType = ref(true);
    let switchRegister = ref(false);
    let ruleFormDom = ref();
    let ruleForm = ref({
      name: "",
      number: "",
      type: "",
      college: "",
      major: "",
    });
    let useName = ref("");
    let passWord = ref("");

    async function login(useName: any, passWord: any) {
      let res = {};
      if (useName === "student" && passWord === "123456") {
        res = {
          urlDataPost: "/openapi/data_upload",
          urlDataGet: "/openapi/data_get",
          error: "",
          expList: [
            {
              projectStudyId: 903,
              appId: "143e9b65-b4d9-44bc-b35d-f77916219f8d",
              expName: "网络设备运维训练",
              projectName: "网络设备运维训练",
              lectureName: "网络运维仿真实训系统",
              teacherName: "教师001",
              lectureStartTime: "yyyy-MM-dd HH:mm:ss",
              lectureEndTime: "yyyy-MM-dd HH:mm:ss",
            },
            {
              projectStudyId: 905,
              appId: "bc4b9fb3-0083-4e3b-8412-ebfd4d10fcf6",
              expName: "网络故障定位排查训练",
              projectName: "网络故障定位排查训练",
              lectureName: "网络运维仿真实训系统",
              teacherName: "教师001",
            },
          ],
          user: {
            id: 1288,
            name: "student",
            numberId: "student",
            type: 2,
            college: "学院1",
            specialty: "专业",
            class: "班级",
          },
        };
      } else if (useName === "teacher" && passWord === "123456") {
        res = {
          urlDataPost: "/openapi/data_upload",
          urlDataGet: "/openapi/data_get",
          error: "",
          expList: [
            {
              projectStudyId: 903,
              appId: "143e9b65-b4d9-44bc-b35d-f77916219f8d",
              expName: "网络设备运维训练",
              projectName: "网络设备运维训练",
              lectureName: "网络运维仿真实训系统",
              teacherName: "教师001",
              lectureStartTime: "yyyy-MM-dd HH:mm:ss",
              lectureEndTime: "yyyy-MM-dd HH:mm:ss",
            },
            {
              projectStudyId: 905,
              appId: "bc4b9fb3-0083-4e3b-8412-ebfd4d10fcf6",
              expName: "网络故障定位排查训练",
              projectName: "网络故障定位排查训练",
              lectureName: "网络运维仿真实训系统",
              teacherName: "教师001",
            },
          ],
          user: {
            id: 1288,
            name: "teacher",
            numberId: "teacher",
            type: 1,
            college: "学院1",
            specialty: "专业",
            class: "班级",
          },
        };
      } else if (useName === "admin" && passWord === "123456") {
        res = {
          urlDataPost: "/openapi/data_upload",
          urlDataGet: "/openapi/data_get",
          error: "",
          expList: [
            {
              projectStudyId: 903,
              appId: "143e9b65-b4d9-44bc-b35d-f77916219f8d",
              expName: "网络设备运维训练",
              projectName: "网络设备运维训练",
              lectureName: "网络运维仿真实训系统",
              teacherName: "教师001",
              lectureStartTime: "yyyy-MM-dd HH:mm:ss",
              lectureEndTime: "yyyy-MM-dd HH:mm:ss",
            },
            {
              projectStudyId: 905,
              appId: "bc4b9fb3-0083-4e3b-8412-ebfd4d10fcf6",
              expName: "网络故障定位排查训练",
              projectName: "网络故障定位排查训练",
              lectureName: "网络运维仿真实训系统",
              teacherName: "教师001",
            },
          ],
          user: {
            id: 1288,
            name: "admin",
            numberId: "admin",
            type: 3,
            college: "学院1",
            specialty: "专业",
            class: "班级",
          },
        };
      } else {
        let data: object = {
          account: useName,
          password: passWord,
        };
        // console.log('base64:',Base64.encode(JSON.stringify(data)))
        let url = "";
        let ishttps = "https:" === document.location.protocol ? true : false;
        if (ishttps) {
          url = "https://10.8.15.102/openapi/outer/login";
        } else {
          url = "http://10.8.15.102/openapi/outer/login";
        }
        //  url = "http://jhc.owvlab.net/openapi/outer/login";
        // const url = "api/openapi/outer/login";
        let response = await fetch(url, {
          method: "POST",
          // credentials: 'include',
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          mode: "cors",
          body: Base64.encode(JSON.stringify(data)),
        });
        // console.log("response", response);
        let nres = await response.json();
        if(nres.error){
          alert(nres.error)
          return
        }
        res = nres
      }

      let userData = JSON.parse(JSON.stringify(res));

      await $store.dispatch("setUserData", userData);
      router.push("/home/fork");
    }

    onMounted(async () => {
      return
      let res = null
       let params = getParamByUrl(window.location.href);
      // let nowUrl =
      //   "http://10.8.15.102/vlab_files/2022/137/0757/bgev/index.html?token=c7bcc41f-44aa-49fc-86db-a8ffa4048114_83&sequenceCode=2477410350283923&key=MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAKPMJ/TOMQGdSB8Av1PlOcaTRS+3QFknXK0DNIHsko7KkrdIKzI6ozqg/qf1XzSXmw2ML4JSDMfjAWVfeSwllr8CAwEAAQ==#/";
      // let params = getParamByUrl(nowUrl);
      if(params.token){
      let loginArr = params.token.split("_");
      let url = "";
      let ishttps = "https:" === document.location.protocol ? true : false;
      if (ishttps) {
        url = `https://10.8.15.102/openapi/${loginArr[0]}/${loginArr[1]}`;
      } else {
        url = `http://10.8.15.102/openapi/${loginArr[0]}/${loginArr[1]}`;
      }

      let response = await fetch(url, {
        method: "GET",
        // credentials: 'include',
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        mode: "cors",
      });

      let nres = await response.json();


      //         {
      // "token": "96f8affb-3b5d-4ef2-9e51-89547dda6c41",
      // "urlDataPost": "/openapi/data_upload",
      // "urlDataGet": "/openapi/data_get",
      // "urlFilePost": "/openapi/upload_file",
      // " userNumber": "2018001002",
      // " userName": "宋云",
      // " userType": 2,
      // " userCollege": "信息学院",
      // " userSpecialty": "通信工程",
      // " userClass": "通信一班"
      // }

       res = {
        urlDataPost: "/openapi/data_upload",
        urlDataGet: "/openapi/data_get",
        error: "",
        expList: [],
        user: {
          id: loginArr[1],
          name: nres.userName,
          numberId: nres.userNumber,
          type: nres.userType,
          college: nres.userCollege,
          specialty: nres.userSpecialty,
          class: nres.userClass,
        },
      };
      }else{
          res = {
          urlDataPost: "/openapi/data_upload",
          urlDataGet: "/openapi/data_get",
          error: "",
          expList: [
            {
              projectStudyId: 903,
              appId: "143e9b65-b4d9-44bc-b35d-f77916219f8d",
              expName: "网络设备运维训练",
              projectName: "网络设备运维训练",
              lectureName: "网络运维仿真实训系统",
              teacherName: "教师001",
              lectureStartTime: "yyyy-MM-dd HH:mm:ss",
              lectureEndTime: "yyyy-MM-dd HH:mm:ss",
            },
            {
              projectStudyId: 905,
              appId: "bc4b9fb3-0083-4e3b-8412-ebfd4d10fcf6",
              expName: "网络故障定位排查训练",
              projectName: "网络故障定位排查训练",
              lectureName: "网络运维仿真实训系统",
              teacherName: "教师001",
            },
          ],
          user: {
            id: 1288,
            name: "teacher",
            numberId: "teacher",
            type: 1,
            college: "学院1",
            specialty: "专业",
            class: "班级",
          },
        };
      }

      

      


      let userData = JSON.parse(JSON.stringify(res));

      // console.log(userData);
      await $store.dispatch("setUserData", userData);
      router.push("/home/fork");
    });
    function getParamByUrl(url: any) {
      var theRequest: any = new Object();
      var index = url.indexOf("?");
      if (index != -1) {
        // debugger
        let str = url.substr(index + 1);
        let strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
          theRequest[strs[i].split("=")[0]] = strs[i].split("=")[1];
        }
      }
      return theRequest;
    }

    function goHome() {
      login(useName.value, passWord.value);
    }

    function resetForm() {
      ruleFormDom.value.resetFields();
    }
    function nextPage() {
      switchRegister.value = !switchRegister.value;
    }
    function full() {
      document.body.requestFullscreen();
    }
    return {
      defineComponent,
      ref,
      goHome,
      useName,
      passWord,
      switchType,
      ruleForm,
      resetForm,
      nextPage,
      full,
    };
  },
});
</script>

<template>
  <div class="back">
    <div class="full" @click="full">全屏模式</div>
    <div class="main_title">金华职业技术学院</div>
    <div class="sub_title">虚拟仿真实训教学系统</div>
    <div class="content_box">
      <div class="login_box" v-if="switchType">
        <div class="form_item">
          <el-row :gutter="20">
            <el-input
              v-model="useName"
              placeholder="请输入用户名"
              prefix-icon="el-icon-user"
            />
          </el-row>
        </div>
        <div class="form_item">
          <el-row :gutter="20">
            <el-input
              v-model="passWord"
              placeholder="请输入密码"
              prefix-icon="el-icon-suitcase"
              show-password
            />
          </el-row>
        </div>

        <div class="forget">忘记密码？</div>
        <div class="login_btn" @click="goHome()">登录</div>
        <!-- <div class="login_btn" @click="switchType = !switchType">注册</div> -->
      </div>
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
  // background: url(..../back1.png) no-repeat;
  background: url(../back1.jpg) no-repeat;
  background-size: 100% 100%;
  user-select: none;

  .full {
    /* width: 20px; */
    /* height: 20px; */
    position: absolute;
    background-color: #f59a2369;
    padding: 10px;
    color: #dbdbdb;
    left: 1%;
    bottom: 2%;
    border-radius: 10px;
  }

  .main_title {
    position: absolute;
    right: 33%;
    top: 255px;
    font-size: 42px;
    font-weight: bold;
    color: #f59a23;
  }
  .sub_title {
    position: absolute;
    right: 33%;
    top: 320px;
    font-size: 56px;
    font-weight: bold;
    color: #fff;
  }
  .content_box {
    position: absolute;
    right: 4%;
    top: 24%;
    width: 20%;
    max-width: 310px;
    background-color: #fff;
    padding: 10px 30px;

    .form_item {
      width: 93%;
      height: 60px;
      text-align: center;
      font-size: 20px;
      color: #ffffff;
      margin: 20px 0 0 10px;
    }

    // .el-row {
    // width: 200px;
    // margin: 50px 0;
    // }

    .forget {
      font-size: 14px;
      color: #000000;
      position: absolute;
      right: 26px;
      top: 158px;
    }
    .login_btn {
      width: 100%;
      height: 45px;
      line-height: 45px;
      text-align: center;
      font-size: 16px;
      margin: 35px 0;
      background-color: #f59a23;
      color: #ffffff;
      border-radius: 10px;
      cursor: pointer;
    }
  }
}
</style>
