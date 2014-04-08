/**
 * Created by Ofir_Dagan on 4/8/14.
 */
'use strict'
/* global xdLocalStorage */

angular.module('xdLocalStorage', [])
  .provider('xdLocalStorage', function () {
    var wasInit = false;
    this.init = function(options) {
      xdLocalStorage.init(options);
      wasInit = true;
    }
    this.$get = function () {
      return {
        setItem: function(key, value, callback) {
          if(!wasInit) {
            throw 'You must init xdLocalStorage in app config before use';
          }
          xdLocalStorage.setItem(key, value, callback);
        },
        getItem: function(key, callback) {
          if(!wasInit) {
            throw 'You must init xdLocalStorage in app config before use';
          }
          xdLocalStorage.getItem(key, callback);
        }
      }
    }
  });