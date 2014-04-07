/**
 * Created by dagan on 07/04/2014.
 */
'use strict';
(function () {
  window.onload = function() {
    window.CDLS = window.CDLS || {};
    var NAMESPACE = 'cross-domain-local-message';

    var options = {
      iframeId: 'cross-domain-iframe'
    };
    var api = window.CDLS;
    var requestId = -1;
    var iframe;
    var requests = {};
    api.init = function () {
      var temp = document.createElement('div');
      window.addEventListener("message", receiveMessage, false);
      temp.innerHTML = '<iframe id="' + options.iframeId + '" src="https://rawgithub.com/ofirdagan/cross-domain-local-storage/master/html/cross-domain-local-storage.html" style="display: none;"></iframe>';
      document.body.appendChild(temp);
      iframe = document.getElementById(options.iframeId);
    };

    function applyCallback(data) {
      requests[data.id](data);
      delete requests[data.id];
    }

    function receiveMessage (event) {
      if(event.data && event.data.namespace === NAMESPACE){
        var data = event.data;
        if(data.action === 'get-answer') {
          applyCallback(data);
        } else if (data.action === 'set-answer'){
          applyCallback(data);
        }
      }
    }

    function buildMessage(action, key, value, callback) {
      requestId++;
      requests[requestId] = callback;
      var data = {
        namespace: NAMESPACE,
        id: requestId,
        action: action,
        key: key,
        value: value
      };
      iframe.contentWindow.postMessage(data, '*');
    }

    api.set = function (key, value, callback) {
      buildMessage('set', key, value, callback);
    };

    api.get = function (key, callback) {
      buildMessage('get', key,  null, callback);
    };


    api.init();
  }
})();