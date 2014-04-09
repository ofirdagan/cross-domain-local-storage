/**
 * Created by dagan on 07/04/2014.
 */
'use strict';
window.xdLocalStorage = window.xdLocalStorage || (function () {
  var MESSAGE_NAMESPACE = 'cross-domain-local-message';
  var defaultOptions = {
    iframeId: 'cross-domain-iframe',
    iframeUrl: 'https://rawgithub.com/ofirdagan/cross-domain-local-storage/master/html/cross-domain-local-storage.html'
  };
  var requestId = -1;
  var iframe;
  var requests = {};
  var wasInit = false;

  function applyCallback(data) {
    requests[data.id](data);
    delete requests[data.id];
  }

  function receiveMessage (event) {
    if(event.data && event.data.namespace === MESSAGE_NAMESPACE){
      var data = event.data;
      applyCallback(data);
    }
  }

  function buildMessage(action, key, value, callback) {
    requestId++;
    requests[requestId] = callback;
    var data = {
      namespace: MESSAGE_NAMESPACE,
      id: requestId,
      action: action,
      key: key,
      value: value
    };
    iframe.contentWindow.postMessage(data, '*');
  }
  function extend (object, defaultObject) {
    var result = defaultObject || {};
    var key;
    for (key in object) {
      if (object.hasOwnProperty(key)) {
        result[key] = object[key];
      }
    }
    return result;
  }
  function init (options, callback) {
    if(wasInit) {
      console.log('xdLocalStorage was already initialized!');
      return;
    }
    wasInit = true;
    options = extend(options, defaultOptions);
    var temp = document.createElement('div');
    window.addEventListener("message", receiveMessage, false);
    temp.innerHTML = '<iframe id="' + options.iframeId + '" src=' + options.iframeUrl + ' style="display: none;"></iframe>';
    document.body.appendChild(temp);
    iframe = document.getElementById(options.iframeId);
    if(callback) {
      callback();
    }
  }
  return {
    //callback is optional for cases you use the api before window load.
    init: function (options, callback) {
      if (document.readyState === "complete") {
        init(options, callback);
      } else {
        window.onload = function() {
          init(options, callback);
        }
      }
    },
    setItem: function (key, value, callback) {
      if(!wasInit){
        console.log('You must call xdLocalStorage.init() before using it.');
        return;
      }
      buildMessage('set', key, value, callback);
    },

    getItem: function (key, callback) {
      if(!wasInit){
        console.log('You must call xdLocalStorage.init() before using it.');
        return;
      }
      buildMessage('get', key,  null, callback);
    }
  }
})();