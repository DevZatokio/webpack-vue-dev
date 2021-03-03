import Vue from "vue";
import Router from "vue-router";
import pages from './pages';
const $j = jQuery.noConflict();

Vue.use(Router);

export default  new Router({
  scrollBehavior() {
    $j('#collapseProduct').collapse('hide');
    return { x: 0, y: 0 };
  },
  routes: []
  .concat(pages)
});
