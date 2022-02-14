import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Editor",
    component: () => import("../views/Editor.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
