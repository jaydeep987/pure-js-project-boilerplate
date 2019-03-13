/* global requestData */

describe('Test: requestData', function testRequestData() {
  'use strict';

  describe('Test: XHR', () => {
    beforeEach(function beforeEach() {
      var requests;
      this.requests = [];
      this.xhr = sinon.useFakeXMLHttpRequest();

      requests = this.requests;

      this.xhr.onCreate = function onCreate(x) {
        requests.push(x);
      };
    });

    afterEach(function afterEach() {
      this.xhr.restore();
    });

    it('should make get request as default', function shouldMakeGetRequest() {
      var callback = sinon.spy();
      var fakeData = [{ id: 11 }];

      requestData({
        url     : '/some/thing',
        callback: callback,
      });

      this.requests[0].respond(200, {
        'Content-type': 'application/json',
      }, JSON.stringify(fakeData));

      assert(callback.calledWith(fakeData), 'callback should be called');
    });

    it('should make get request with given params', function shouldMakeGetRequest() {
      var callback = sinon.spy();
      var fakeData = [{ id: 11 }];
      var params = {
        param1: 'paramVal1',
        param2: 'paramVal2',
      };
      var requestBody = (function getRequestbody() {
        var key;
        var query = [];
        for (key in params) {
          query.push(encodeURIComponent(key) + '=' + encodeURIComponent(params[key]));
        }
        return query.join('&');
      }());

      requestData({
        url     : '/some/thing',
        callback: callback,
        data    : params,
      });

      this.requests[0].respond(200, {
        'Content-type': 'application/json',
      }, JSON.stringify(fakeData));

      expect(this.requests[0].requestBody).to.equal(requestBody);
    });

    it('should make post request', function shouldMakePostRequest() {
      var callback = sinon.spy();
      var fakeData = [{ id: 11 }];
      var params = {
        param1: 'paramVal1',
        param2: 'paramVal2',
      };

      requestData({
        url     : '/some/thing',
        method  : 'post',
        callback: callback,
        data    : params,
      });

      this.requests[0].respond(200, {
        'Content-type': 'application/json',
      }, JSON.stringify(fakeData));

      assert(callback.calledWith(fakeData), 'callback should be called');
      expect(this.requests[0].requestHeaders['Content-type']).to.have.string('application/x-www-form-urlencoded');
    });
  });
});
