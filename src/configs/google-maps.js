/**
 * Google Maps config module.
 *
 * @module configs/google-maps
 */

export default {
  libraries: ['places', 'drawing','geometry','visualization'],
  key: process.env.GOOGLE_KEY,
  id: 'google-maps-script'
};
