/**
 * Created by dagan on 07/04/2014.
 */
'use strict';
window.xdLocalStorage = window.xdLocalStorage || (function () {
  var MESSAGE_NAMESPACE = 'cross-domain-local-message';
  var options = {
    iframeId: 'cross-domain-iframe',
    iframeUrl: undefined,
    initCallback: undefined
  };
  var requestId = -1;
  var iframe;
  var requests = {};
  var wasInit = false;
  var iframeReady = true;

    function applyCallback(data) {
    requests[data.id](data);
    delete requests[data.id];
  }

  function receiveMessage (event) {
    if(event.data && event.data.namespace === MESSAGE_NAMESPACE){
      var data = event.data;
      if (data.id === 'iframe-ready' && options.initCallback) {
        iframeReady = true;
        options.initCallback();
      } else {
        applyCallback(data);
      }
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
  function init (customOptions) {
    if(wasInit) {
      console.log('xdLocalStorage was already initialized!');
      return;
    }
    wasInit = true;
    options = extend(customOptions, options);
    var temp = document.createElement('div');
    window.addEventListener("message", receiveMessage, false);
    temp.innerHTML = '<iframe id="' + options.iframeId + '" src=' + options.iframeUrl + ' style="display: none;"></iframe>';
    document.body.appendChild(temp);
    iframe = document.getElementById(options.iframeId);
  }

  function isApiReady() {
    if(!wasInit){
      console.log('You must call xdLocalStorage.init() before using it.');
      return false;
    }
    if(!iframeReady){
      console.log('You must wait for iframe ready message before using the api.');
      return false;
    }
    return true;
  }

  return {
    //callback is optional for cases you use the api before window load.
    init: function (customOptions) {
      if(!customOptions.iframeUrl) {
        throw 'You must specify iframeUrl';
      }
      if (document.readyState === "complete") {
        init(customOptions);
      } else {
        window.onload = function() {
          init(customOptions);
        }
      }
    },
    setItem: function (key, value, callback) {
      if(!isApiReady()){
        return;
      }
      buildMessage('set', key, value, callback);
    },

    getItem: function (key, callback) {
      if(!isApiReady()){
        return;
      }
      buildMessage('get', key,  null, callback);
    }
  }
})();