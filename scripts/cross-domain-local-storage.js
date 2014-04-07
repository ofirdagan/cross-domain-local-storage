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
    var requestId = 0;
    var iframe;
    var requests = [];
    api.init = function () {
      var temp = document.createElement('div');
      window.addEventListener("message", receiveMessage, false);
      temp.innerHTML = '<iframe id="' + options.iframeId + '" src="https://rawgithub.com/ofirdagan/cross-domain-local-storage/master/html/cross-domain-local-storage.html" style="display: none;"></iframe>';
      document.body.appendChild(temp);
      iframe = document.getElementById(options.iframeId);
    };

    function receiveMessage (event) {
      if(event.data && event.data.namespace === NAMESPACE){
        var data = event.data;
        if(data.action === 'get-answer') {
          requests[data.id](data);
        }
      }
    }

    api.set = function (key, value) {
      var data = {
        namespace: NAMESPACE,
        action: 'set',
        key: key,
        value: value
      };
      iframe.contentWindow.postMessage(data, '*');
    };

    api.get = function (key, callback) {
      requests[requestId] = callback;
      requestId++;
      var data = {
        namespace: 'cross-domain-local-message',
        id: requestId,
        action: 'get',
        key: key
      };
      iframe.contentWindow.postMessage(data, '*');
    };


    api.init();
  }
})();