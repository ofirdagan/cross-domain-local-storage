/**
 * Created by dagan on 07/04/2014.
 */
'use strict';

window.addEventListener("message", receiveMessage, false);

function receiveMessage(event) {

  if (!event.origin.match(/[http|https]:\/\/.*wix.*.com/)) {
    return;
  } else {
     debugger;
  }
}
