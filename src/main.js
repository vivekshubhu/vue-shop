import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap";
import jQuery from "jquery";
import "popper.js";
import "./assets/app.scss";
import { fb } from "./firebase";

window.$ = jQuery;

Vue.config.productionTip = false;

Vue.component("nav-bar", require("./components/Navbar.vue").default);
Vue.component("hero", require("./components/Hero.vue").default);
Vue.component("products", require("./sections/Products.vue").default);


let app = "";

fb.auth().onAuthStateChanged(()=> {
  if (!app){
    new Vue( {
      router,
      render: h => h(App)
    } ).$mount("#app");
  }
})

