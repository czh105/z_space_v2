import { createStore } from "vuex";

export default createStore({
  state: {
    userData: {
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
    },
    bigType: "",
    num: 0,
    list: {
      "工业机器人集成应用": [],
      "工业机器人操作与运维": [],
    },
    shixunShow: false,
    kaoheShow: false,
    progressValue:'0',
    resultValue:[{}]
  },
  mutations: {
    userData: (state, newValue) => {
      state.userData = newValue;
    },
    bigType: (state, newValue) => {
      state.bigType = newValue;
    },
    num: (state, newValue) => {
      state.num = newValue;
    },
    list: (state, newValue) => {
      state.list = newValue;
    },
    shixunShow: (state, newValue) => {
      state.shixunShow = newValue;
    },
    kaoheShow: (state, newValue) => {
      state.kaoheShow = newValue;
    },
    progressValue: (state, newValue) => {
      state.progressValue = newValue;
    },
    resultValue: (state, newValue) => {
      // state.resultValue.forEach(()=>{
        
      // })
      state.resultValue =newValue;
    },
  },
  actions: {
    setUserData: (ctx, value) => {
      ctx.commit("userData", value);
    },
    setType: (ctx, value) => {
      ctx.commit("bigType", value);
    },
    setNum: (ctx, value) => {
      ctx.commit("num", value);
    },
    setlist: (ctx, value) => {
      ctx.commit("list", value);
    },
    setshixun: (ctx, value) => {
      ctx.commit("shixunShow", value);
    },
    setkaohe: (ctx, value) => {
      ctx.commit("kaoheShow", value);
    },
    setProgressValue: (ctx, value) => {
      ctx.commit("progressValue", value);
    },
    setResultValue:(ctx, value)=>{
      ctx.commit("resultValue", value);
    }
  },
});
