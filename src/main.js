// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';

import App from './App';

import router from './router';
import http from './services/http';

import { ValidationProvider } from 'vee-validate';



import VueAxios from 'vue-axios';
import axios from 'axios';


import Moment from './plugins/moment';

Vue.use(VueAxios, axios);
Vue.component('ValidationProvider', ValidationProvider);

Vue.use(Moment);

window.moment.locale('es');

/* eslint-disable no-new */
new Vue({
  render: v => v(App),
  template: '<App/>',
  router,
  http,
  el: '#app',
});
