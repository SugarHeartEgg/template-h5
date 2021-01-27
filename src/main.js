import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";

// Vant UI
import Vant from "vant";
import "vant/lib/index.css";

// 私有方法
import funs from "@/assets/utils/funs";
import Axios from "@/assets/utils/http";
import "@/assets/utils/rem";

// 第三方库
import moment from "moment"; // 导入moment文件
import md5 from "js-md5";
import echarts from "echarts";

// 默认css
import "@/assets/css/index.css";

Vue.use(Vant);

Vue.prototype.$funs = funs;
Vue.prototype.$moment = moment; // moment赋值使用
Vue.prototype.$md5 = md5;
Vue.prototype.$axios = Axios;
Vue.prototype.$echarts = echarts;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
