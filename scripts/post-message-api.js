/**
 * Created by dagan on 07/04/2014.
 */
'use strict';
(function () {
  window.addEventListener("message", receiveMessage, false);

  var NAMESPACE = 'cross-domain-local-message';
  function getData(id, key) {
    var value = localStorage.getItem(key);
    var data = {
      namespace: NAMESPACE,
      action: 'get-answer',
      id: id,
      key: key,
      value: value
    }
    parent.postMessage(data, '*');
  }
  function receiveMessage(event) {
    var data = event.data;
    if (data && data.namespace === NAMESPACE) {
      if(data.action === 'set') {
        localStorage.setItem(data.key, data.value);
      } else if (data.action === 'get') {
        getData(data.id, data.key);
      }
    }
  }
})();
