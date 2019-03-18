(function utils(window) {
  'use strict';

  var Symbols = {
    YEN: '円',
  };

  /**
   * Loads config from given config elements by using default config
   *
   * @param {*} $configElem html element which holds config options as attribs
   * @param {*} defaultConfig default config option values
   */
  function loadConfig($configElem, defaultConfig) {
    var attrs;
    var key;
    var config = {};

    if (!$configElem || !defaultConfig) {
      return defaultConfig;
    }

    attrs = $configElem.attributes;

    for (key in defaultConfig) {
      if (typeof attrs[key] !== 'undefined' && attrs[key] !== '') {
        config[key] = attrs[key].nodeValue;
      } else {
        config[key] = defaultConfig[key];
      }
    }

    return config;
  }

  /**
   * Formats given string/number to comma separated numbers and return as string
   */
  function formatNumber(value) {
    if (value === null) {
      return '';
    }

    return String(value).replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
  }

  /**
   * Format a number separating each 3 value with commas and the yen symbol
   */
  function formatPrice(value) {
    if (value === null) {
      return '';
    }

    const formatted = formatNumber(value);

    return formatted ? formatted + Symbols.YEN : '';
  }

  window.utils = {
    loadConfig  : loadConfig,
    formatNumber: formatNumber,
    formatPrice : formatPrice,
  };
}(window));
