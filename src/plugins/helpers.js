/**
 * Helpers plugin module.
 *
 * @module plugins/helpers
 */

const Helpers = {
  install: Vue => {
    const $helpers = new Vue({
      methods: {
        getImage(path, force) {

          const url = `${process.env.PUBLIC_UPLOADS_HOST}/${path}`;
          if (force) {
            return `${url}?t=${Date.now()}`;
          }

          return url;
        }
      }
    });

    /* eslint no-param-reassign:0 */
    Vue.prototype.$helpers = $helpers;
  }
};

export default Helpers;
