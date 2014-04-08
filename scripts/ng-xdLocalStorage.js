/**
 * Created by Ofir_Dagan on 4/8/14.
 */
'use strict'
/* global xdLocalStorage */

angular.module('xdLocalStorage', [])
  .service('xdLocalStorage', function () {

    this.init = function(options) {
      xdLocalStorage.init(options);
    }
    this.setItem = function(key, value, callback) {
      xdLocalStorage.setItem(key, value, callback);
    }
    this.getItem = function(key, callback) {
      xdLocalStorage.getItem(key, callback);
    }
  });