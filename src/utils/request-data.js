/* global ActiveXObject */
(function requestDataUtil(window) {
  'use strict';

  var xhr;

  /**
   * Initialized xhr.
   */
  function initXHR() {
    var versions = [
      'MSXML2.XmlHttp.6.0',
      'MSXML2.XmlHttp.5.0',
      'MSXML2.XmlHttp.4.0',
      'MSXML2.XmlHttp.3.0',
      'MSXML2.XmlHttp.2.0',
      'Microsoft.XmlHttp',
    ];
    var i;

    if (typeof XMLHttpRequest !== 'undefined') {
      xhr = new XMLHttpRequest();
    } else {
      for (i = 0; i < versions.length; i++) {
        try {
          xhr = new ActiveXObject(versions[i]);
          break;
        } catch (e) {
          // ignore
        }
      }
    }
  }

  /**
   * Make jsonp request.
   *
   * @param {string} url Request url
   * @param {string} query Query parameters
   * @param {function} callback A function to be called after request complete
   */
  function jsonpRequest(url, query, callback) {
    var jsonpCallback = 'callback_' + Math.round(100000 * Math.random());
    var script = document.createElement('script');
    var urlJoiner = url.indexOf('?') >= 0 ? '&' : '?';

    window[jsonpCallback] = function callCallback(data) {
      delete window[jsonpCallback];
      document.body.removeChild(script);
      callback(data);
    };

    if (query) {
      url = url + urlJoiner + query + '&callback=' + jsonpCallback;
    } else {
      url = url + urlJoiner + 'callback=' + jsonpCallback;
    }

    script.src = url;
    document.body.appendChild(script);
  }

  /**
   * To make an ajax call.
   * This function is exposed with several options to make an ajax request.
   *
   * @param {string} options.method     Request method (get (default), post)
   * @param {object} options.data       Request data
   * @param {string} options.type       Request type (default nothing. can set: 'jsonp')
   * @param {string} options.url        Request url
   * @param {function} options.callback A function which will be called after request done
   */
  function requestData(options) {
    var method = !options.method ? 'get' : options.method;
    var async = true;
    var query = [];
    var key;

    initXHR();

    if (options.data) {
      for (key in options.data) {
        query.push(encodeURIComponent(key) + '=' + encodeURIComponent(options.data[key]));
      }
    }

    if (options.type === 'jsonp') {
      jsonpRequest(options.url, query.join('&'), options.callback);
      return;
    }

    xhr.open(method, options.url, async);
    xhr.onreadystatechange = function onreadystatechange() {
      if (xhr.readyState === 4) {
        options.callback(JSON.parse(xhr.responseText));
      }
    };

    if (method.toLowerCase() === 'post') {
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    }

    xhr.send(query.join('&'));
  }

  /** Export requestData */
  window.requestData = requestData;
}(window));
