// import "shitajicss/docs/css/shitaji.min.css";
// import "./scss/style.scss";
import "vuetify/dist/vuetify.min.css";
import Vue from "vue";
import App from "./App.vue";
import Vuetify from "vuetify";

Vue.use(Vuetify);
new Vue({
  el: "#app",
  render: h => h(App)
});
