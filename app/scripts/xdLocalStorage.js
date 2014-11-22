/**
 * Created by dagan on 07/04/2014.
 */
'use strict';
/* global console, XdUtils */
window.xdLocalStorage = window.xdLocalStorage || (function () {
  var MESSAGE_NAMESPACE = 'cross-domain-local-message';
  var options = {
    iframeId: 'cross-domain-iframe',
    iframeUrl: undefined,
    initCallback: function () {}
  };
  var requestId = -1;
  var iframe;
  var requests = {};
  var wasInit = false;
  var iframeReady = false;
  var messageCache = [];

  function applyCallback(data) {
    if (requests[data.id]) {
      requests[data.id](data);
      delete requests[data.id];
    }
  }

  function receiveMessage(event) {
    var data;
    try {
      data = JSON.parse(event.data);
    } catch (err) {
      //not our message, can ignore
    }
    if (data && data.namespace === MESSAGE_NAMESPACE) {
      if (data.id === 'iframe-ready') {
        iframeReady = true;
        options.initCallback();
        messageCache.forEach(function (data) {
            iframe.contentWindow.postMessage(JSON.stringify(data), '*');
          });
        messageCache.length = 0;
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
    if (iframeReady) {
      iframe.contentWindow.postMessage(JSON.stringify(data), '*');
    } else {
      messageCache.push(data);
    }
  }
  function init(customOptions) {
    if (wasInit) {
      console.log('xdLocalStorage was already initialized!');
      return;
    }
    wasInit = true;
    options = XdUtils.extend(customOptions, options);
    var temp = document.createDocumentFragment();

    if (window.addEventListener) {
      window.addEventListener('message', receiveMessage, false);
    } else {
      window.attachEvent('onmessage', receiveMessage);
    }

    iframe = temp.ownerDocument.createElement('iframe');
    iframe.id = options.iframeId;
    iframe.src = options.iframeUrl;
    temp.appendChild(iframe);
    document.body.appendChild(temp);
  }

  function isApiReady() {
    if (!wasInit) {
      console.log('You must call xdLocalStorage.init() before using it.');
      return false;
    }
    return true;
  }

  return {
    //callback is optional for cases you use the api before window load.
    init: function (customOptions) {
      if (!customOptions.iframeUrl) {
        throw 'You must specify iframeUrl';
      }
      init(customOptions);
    },
    setItem: function (key, value, callback) {
      if (!isApiReady()) {
        return;
      }
      buildMessage('set', key, value, callback);
    },

    getItem: function (key, callback) {
      if (!isApiReady()) {
        return;
      }
      buildMessage('get', key,  null, callback);
    },
    removeItem: function (key, callback) {
      if (!isApiReady()) {
        return;
      }
      buildMessage('remove', key,  null, callback);
    },
    key: function (index, callback) {
      if (!isApiReady()) {
        return;
      }
      buildMessage('key', index,  null, callback);
    },
    clear: function (callback) {
      if (!isApiReady()) {
        return;
      }
      buildMessage('clear', null,  null, callback);
    }
  };
})();