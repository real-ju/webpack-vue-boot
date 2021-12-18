// Vue
import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
// import directive from './config/directive'
// import components from './config/components'

// 第三方库
import VueWebStorage from 'vue-web-storage';
// import api from '@lib/api/plugin';
import { getEnvParams } from './config/util';

// 启动配置文件
import boot from './config/boot';

// 全局CSS
import '@/style/main.css';

// 调用Vue插件
Vue.use(VueWebStorage, { prefix: `${getEnvParams('appID')}_` });
// Vue.use(api);
// Vue.use(iModal);

// 注册Vue指令
// directive.reg();

// 注册Vue全局组件
// components.reg();

// 配置Vue
boot.configVue();

// 配置第三方库
boot.configAxios(); // 配置Axios
boot.configUtil(); // 配置自定义util库

/* eslint-disable no-new */

new Vue({
  el: '#app',
  store,
  router,
  render: (h) => h(App)
});

/* eslint-enable no-new */
