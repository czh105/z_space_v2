import { createRouter, createWebHashHistory } from "vue-router";
import Login from "../views/Login.vue";

const routes = [
  { path: "/", name: "Login", component: Login },
  {
    path: "/test",
    name: "Test",
    component: () => import("../views/Test.vue"),
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("../views/Home.vue"),
    children: [
      {
        path: 'fork',
        name: "Fork",
        component: () => import("../views/Fork.vue"),
      },
      {
        path: 'topics',
        name: "Topics",
        component: () => import("../views/Topics.vue"),
      },
      {
        path: 'info',
        name: "Info",
        component: () => import("../views/Info.vue"),
        children: [
          {
            path: 'person',
            name: "Person",
            component: () => import("../views/Person.vue"),
          },
          {
            path: 'manage',
            name: "Manage",
            component: () => import("../views/Manage.vue"),
          },
          {
            path: 'exam',
            name: "Exam",
            component: () => import("../views/Exam.vue"),
          },
        ]
      },
    ],
  },
];

export default createRouter({
  history: createWebHashHistory(),
  routes,
});