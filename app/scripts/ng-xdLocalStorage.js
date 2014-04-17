/**
 * Created by Ofir_Dagan on 4/8/14.
 */
'use strict';
/* global xdLocalStorage */

angular.module('xdLocalStorage', [])
  .provider('xdLocalStorage', function () {
    var wasInit = false;
    this.init = function (options) {
      xdLocalStorage.init(options);
      wasInit = true;
    };
    this.$get = function () {
      return {
        setItem: function (key, value, callback) {
          if (!wasInit) {
            throw 'You must init xdLocalStorage in app config before use';
          }
          xdLocalStorage.setItem(key, value, callback);
        },
        getItem: function (key, callback) {
          if (!wasInit) {
            throw 'You must init xdLocalStorage in app config before use';
          }
          xdLocalStorage.getItem(key, callback);
        },
        removeItem: function (key, callback) {
          if (!wasInit) {
            throw 'You must init xdLocalStorage in app config before use';
          }
          xdLocalStorage.removeItem(key, callback);
        },
        key: function (index, callback) {
          if (!wasInit) {
            throw 'You must init xdLocalStorage in app config before use';
          }
          xdLocalStorage.key(index, callback);
        },
        clear: function (callback) {
          if (!wasInit) {
            throw 'You must init xdLocalStorage in app config before use';
          }
          xdLocalStorage.clear(callback);
        }
      };
    };
  });