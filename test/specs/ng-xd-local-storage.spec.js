/**
 * Created by Ofir_Dagan on 4/24/15.
 */
describe('xdLocalStorage test', function () {

  beforeEach(function () {
    module('xdLocalStorage')
  });

  afterEach(inject(function (xdLocalStorage) {
    xdLocalStorage.clear();
  }));


  it('should get item after init', function (done) {
    inject(function (xdLocalStorage) {
      var spy = jasmine.createSpy();
      xdLocalStorage.init({
        iframeUrl: 'base/app/views/cross-domain-local-storage.html'
      }).then(function () {
        spy();
      });
      xdLocalStorage.setItem('myKey', 1).then(function () {
        xdLocalStorage.getItem('myKey').then(function (response) {
          expect(response.value).toBe('1');
          expect(spy).toHaveBeenCalled();
          done();
        })
      });
    });
  });

});