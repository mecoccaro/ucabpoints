import Vue from "vue";
import VueRouter from "vue-router";
import adminLogin from "../views/adminLogin";
import adminHomeView from "../views/adminHomeView";
import adminChangeService from "../views/adminChangeService";
import adminEquivalence from "../views/adminEquivalence";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "adminLogin",
    component: adminLogin,
  },
  {
    path: "/adminHome",
    name: "adminHome",
    component: adminHomeView,
  },
  {
    path: "/adminService",
    name: "adminServide",
    component: adminChangeService,
  },
  {
    path: "/adminPoints",
    name: "adminPoints",
    component: adminEquivalence,
  },
];

const router = new VueRouter({
  mode: "history",
  base: "/",
  routes,
});

router.beforeResolve((to, from, next) => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const isAuthenticated = user ? true : false;

  if (to.name !== "adminLogin" && !isAuthenticated)
    next({ name: "adminLogin" });
  else next();
});

export default router;
