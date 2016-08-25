/**
 * Created by Ofir_Dagan on 4/17/14.
 */
'use strict';

describe('xdLocalStorage test', function () {

  var service;

  beforeEach(function () {
    xdLocalStorage.clear();
  });

  it('should set value to local storage', function (done) {
    xdLocalStorage.setItem('itemKey', 'value', function (res) {
      expect(res.success).toBe(true);
      done();
    });
  });


  it('should get value to local storage', function (done) {
    xdLocalStorage.getItem('itemKey', function (res) {
      expect(res.value).toBe(null);
      xdLocalStorage.setItem('itemKey', 'value', function () {
        xdLocalStorage.getItem('itemKey', function (res) {
          expect(res.value).toBe('value');
          done();
        })
      });
    });
  });

  it('should clear all values after clear is called', function (done) {
    xdLocalStorage.setItem('itemKey', 'value', function () {
      xdLocalStorage.setItem('itemKey2', 'value2', function () {
        xdLocalStorage.getItem('itemKey', function (res) {
          expect(res.value).toBe('value');
          xdLocalStorage.getItem('itemKey2', function (res) {
            expect(res.value).toBe('value2');
            xdLocalStorage.clear(function () {
              xdLocalStorage.getItem('itemKey', function (res) {
                expect(res.value).toBe(null);
                xdLocalStorage.getItem('itemKey2', function (res) {
                  expect(res.value).toBe(null);
                  done();
                });
              });
            });
          });
        });
      });
    });
  });

  it('should remove value from local storage', function (done) {
    xdLocalStorage.setItem('itemKey', 'value', function () {
      xdLocalStorage.getItem('itemKey', function (res) {
        expect(res.value).toBe('value');
        xdLocalStorage.removeItem('itemKey', function () {
          xdLocalStorage.getItem('itemKey', function (res) {
            expect(res.value).toBe(null);
            done();
          });
        });
      })
    });
  });

  it('should return key name when calling key() with right key index ', function (done) {
    xdLocalStorage.setItem('itemKey', 'value', function () {
      xdLocalStorage.key(0, function (res) {
        expect(res.key).toBe('itemKey');
        done();
      });
    });
  });

  it('should return the size of local storage', function (done) {
    var dummyLocalStorage = {itemKey: 'value'};
    xdLocalStorage.setItem('itemKey', 'value', function () {
      xdLocalStorage.getSize(function (res) {
        expect(res.size).toBe(JSON.stringify(dummyLocalStorage).length);
        done();
      });
    });
  });

  it('should return the number of keys of local storage', function (done) {
    xdLocalStorage.setItem('itemKey', 'value', function () {
      xdLocalStorage.setItem('itemKey2', 'value2', function () {
        xdLocalStorage.getLength(function (res) {
          expect(res.length).toBe(2);
          xdLocalStorage.removeItem('itemKey', function () {
            xdLocalStorage.getLength(function (res) {
              expect(res.length).toBe(1);
              done();
            });
          });
        });
      });
    });
  });
});
