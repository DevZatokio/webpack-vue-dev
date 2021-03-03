/**
 * Google Maps service module.
 *
 * @module services/google-maps
 */ 
import config from '../configs/google-maps';

let loaded = false;
 
/**
 * Appends the script to the body.
 *
 * @returns {Element} The appended script.
 */
function appendScript() {
  const script = document.createElement('script');

  const params = {
    libraries: config.libraries.join(','),
    key: config.key
  };

  const query = Object.keys(params)
    .map(key => `${key}=${params[key]}`)
    .join('&');

  script.src = `https://maps.googleapis.com/maps/api/js?${query}`;
  script.type = 'text/javascript';
  script.id = config.id;
  script.async = true;

  document.body.appendChild(script);

  return script;
}

/**
 * Loads the Google Maps script.
 *
 * @returns {Promise} The load promise.
 */
function load() {
  let script = document.getElementById(config.id);

  return new Promise((resolve, reject) => {
    if (loaded) {
      resolve();
      return;
    }

    if (!script) {
      script = appendScript();
    }

    script.addEventListener('load', () => {
      loaded = true;
      resolve();
    });

    script.addEventListener('error', reject);
  });
}

export default {
  load
};
