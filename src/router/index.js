import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Admin from "../views/Admin.vue";
import Overview from "../views/Overview.vue";
import Product from "../views/Product.vue";
import {fb} from "../firebase";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    meta: { requiresAuth: true },
    children: [
      {
        path: "overview",
        name: "Overview",
        component: Overview
      },
      {
        path: "product",
        name: "Product",
        component: Product
      }
    ]
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
 const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
 const currentUser = fb.auth().currentUser;

 if(requiresAuth && !currentUser) {
   next("/")
 }else if(requiresAuth && currentUser){
  next();
 }else{
  next();
 }
})

export default router;
