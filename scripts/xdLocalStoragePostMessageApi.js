/**
 * Created by dagan on 07/04/2014.
 */
'use strict';
(function () {
  window.addEventListener("message", receiveMessage, false);

  var MESSAGE_NAMESPACE = 'cross-domain-local-message';
  function getData(id, key) {
    var value = localStorage.getItem(key);
    var data = {
      namespace: MESSAGE_NAMESPACE,
      id: id,
      key: key,
      value: value
    }
    parent.postMessage(data, '*');
  }

  function setData(data) {
    localStorage.setItem(data.key, data.value);
    var checkGet = localStorage.getItem(data.key);
    var data = {
      namespace: MESSAGE_NAMESPACE,
      id: data.id,
      success: checkGet === data.value
    }
    parent.postMessage(data, '*');
  }

  function receiveMessage(event) {
    var data = event.data;
    if (data && data.namespace === MESSAGE_NAMESPACE) {
      if(data.action === 'set') {
        setData(data);
      } else if (data.action === 'get') {
        getData(data.id, data.key);
      }
    }
  }
  function sendOnLoad() {
    var data = {
      namespace: MESSAGE_NAMESPACE,
      id: 'iframe-ready'
    }
    parent.postMessage(data, '*');
  }
  //on creation
  sendOnLoad();
})();
