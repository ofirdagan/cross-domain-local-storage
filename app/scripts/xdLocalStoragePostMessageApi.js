/**
 * Created by dagan on 07/04/2014.
 */
'use strict';
(function () {

  window.addEventListener("message", receiveMessage, false);

  var MESSAGE_NAMESPACE = 'cross-domain-local-message';
  var defaultData = {
    namespace: MESSAGE_NAMESPACE
  };

  function postData(id, data) {
    var data = XdUtils.extend(data, defaultData);
    data.id = id;
    parent.postMessage(data, '*');
  }

  function getData(id, key) {
    var value = localStorage.getItem(key);
    var data = {
      key: key,
      value: value
    }
    postData(id, data);
  }

  function setData(id, key, value) {
    localStorage.setItem(key, value);
    var checkGet = localStorage.getItem(key);
    var data = {
      success: checkGet === value
    }
    postData(id, data);
  }

  function removeData(id, key) {
    localStorage.removeItem(key);
    postData(id, {});
  }

  function getKey(id, index) {
    var key = localStorage.key(index);
    postData(id, {key: key});
  }

  function clear(id) {
    localStorage.clear();
    postData(id, {});
  }

  function receiveMessage(event) {
    var data = event.data;
    if (data && data.namespace === MESSAGE_NAMESPACE) {
      if(data.action === 'set') {
        setData(data.id, data.key, data.value);
      } else if (data.action === 'get') {
        getData(data.id, data.key);
      } else if (data.action === 'remove') {
        removeData(data.id, data.key);
      } else if (data.action === 'key') {
        getKey(data.id, data.key);
      } else if (data.action === 'clear') {
        clear(data.id);
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
