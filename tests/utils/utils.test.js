/* global utils */

describe('Test: utils', function testUtils() {
  'use strict';

  it('should return defaultConfig when $config is not defined', function shouldGiveDefaultConfig() {
    var $config;
    var defaultConfig = true;
    var config = utils.loadConfig($config, defaultConfig);

    expect(config).to.equal(defaultConfig);
  });

  it('should return defaultConfig when defaultConfig itself is not defined', function shouldGiveDefaultConfig() {
    var $config = true;
    var defaultConfig;
    var config = utils.loadConfig($config, defaultConfig);

    expect(config).to.equal(defaultConfig);
  });

  it('should read config from given element', function shouldReadConfog() {
    var $config = document.createElement('div');
    var defaultConfig = {
      testAttr: 'nothing',
    };
    var config;
    $config.className = 'test-config';
    $config.setAttribute('testAttr', 'testValue');

    config = utils.loadConfig($config, defaultConfig);

    expect(config.testAttr).to.not.equal(defaultConfig.testAttr);
    expect(config.testAttr).to.equal('testValue');
  });

  it('should read default config attr when it is not in element', function shouldReadConfog() {
    var $config = document.createElement('div');
    var defaultConfig = {
      testAttr   : 'nothing',
      anotherAttr: 'attrVal',
    };
    var config;
    $config.className = 'test-config';
    $config.setAttribute('testAttr', 'testValue');

    config = utils.loadConfig($config, defaultConfig);

    expect(config.anotherAttr).to.equal(defaultConfig.anotherAttr);
  });

  describe('Test: formatNumber', () => {
    it('should format given number to comma separated', function shouldFormatNumber() {
      var number = 842291;

      expect(utils.formatNumber(number)).to.equal('842,291');
    });

    it('should give blank string when passed null', function shouldFormatNumberBlank() {
      var number = null;

      expect(utils.formatNumber(number)).to.equal('');
    });
  });

  describe('Test: formatPrice', () => {
    it('should format given price to comma separated and with yen symbol', function shouldFormatPrice() {
      var number = 842291;

      expect(utils.formatPrice(number)).to.equal('842,291円');
    });

    it('should give blank string when passed null', function shouldFormatPriceBlank() {
      var number = null;

      expect(utils.formatPrice(number)).to.equal('');
    });
  });
});
