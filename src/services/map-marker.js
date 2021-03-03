/* eslint-disable no-undef */
/**
 * Map Marker service module.
 *
 * @module services/map-marker
 */

import Vue from 'vue';

import colors from '../services/colors';
const $j = jQuery.noConflict();

const $mapMarkerService = new Vue({
  methods: {
    /**
     * Changes the luminance of a HEX color value.
     *
     * @param {String} hex The hex color value.
     * @param {Number} lum The luminance value (-1.0/+1.0)
     * @param {Boolean} hash Whether to add the # prefix.
     *
     * @returns {String} The modified hex color value.
     */
    luminance(hex = '000', lum = 0, hash = false) {
      /* Validate hex string */
      let input = String(hex).replace(/[^0-9a-f]/gi, '');

      /* Convert to 6 digit format fi necessary */
      if (input.length < 6) {
        input = input[0] + input[0] + input[1] + input[1] + input[2] + input[2];
      }

      /* Convert to decimal and change luminosity */
      let output = hash ? '#' : '';
      let values;

      for (let i = 0; i < 3; i++) {
        values = parseInt(input.substr(i * 2, 2), 16);
        values = Math.round(Math.min(Math.max(0, values + values * lum), 255)).toString(16);
        output += ('00' + values).substr(values.length);
      }

      return output;
    },

    /**
     * Generates a proper map marker icon URI.
     *
     * @param {String} color The hex color value for the marker.
     * @param {Boolean} dot Whether to include the dot in the image.
     * @param {Boolean} highlight Whether to include the highlight dot in the image.
     */
    icon(color = '#cf1820', dot = true, highlight = false) {
      const $svg = $j('<svg/>');

      // $svg.attr('xmlns:rdf', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#');
      // $svg.attr('xmlns:dc', 'http://purl.org/dc/elements/1.1/');
      // $svg.attr('xmlns:xlink', 'http://www.w3.org/1999/xlink');
      // $svg.attr('xmlns:cc', 'http://creativecommons.org/ns#');
      // $svg.attr('xmlns:svg', 'http://www.w3.org/2000/svg');
      $svg.attr('xmlns', 'http://www.w3.org/2000/svg');
      $svg.attr('viewBox', '0 0 27 43');
      $svg.attr('version', '1.1');
      $svg.attr('height', '43');
      $svg.attr('width', '27');

      const $body = $j('<path/>')
        .attr({
          d: 'm 26.5,13.5 c 0,7.2 -12,16 -13,29 -1,-13 -13,-21.8 -13,-29 0,-7.2 5.8,-13 13,-13 7.2,0 13,5.8 13,13 z'
        })
        .css({
          'stroke-width': '1.5',
          fill: `${color}`,
          stroke: `#ffffff`
        });

      $svg.append($body);

      if (dot) {
        const $dot = $j('<circle/>')
          .attr({
            cx: '13.5',
            cy: '13.5',
            r: '4.5'
          })
          .css({
            fill: this.luminance(color, -0.3, true)
          });

        $svg.append($dot);
      }

      if (highlight) {
        const $highlight = $j('<circle/>')
          .attr({
            cx: '23.5',
            cy: '4.5',
            r: '4.5'
          })
          .css({
            fill: `#${colors[11]}`,
            'stroke-width': '1.5',
            stroke: `#ffffff`
          });

        $svg.append($highlight);
      }

      const output = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>${$svg.prop('outerHTML')}`;

      return {
        url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(output)}`,
        scaledSize: new window.google.maps.Size(26, 44),
        labelOrigin: new window.google.maps.Point(13, 13)
      };
    }
  }
});

export default $mapMarkerService;
