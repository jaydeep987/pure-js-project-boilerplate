var path = require('path');

module.exports = function karmaConfig(config) {
  'use strict';

  config.set({
    frameworks: ['mocha', 'chai', 'sinon'],
    files     : [
      'src/utils/utils.js',
      'src/utils/*.js',
      'src/**/*.js',
      'tests/**/*.js',
    ],
    reporters    : ['progress', 'coverage'],
    preprocessors: {
      'src/**/*.js': ['coverage'],
    },
    coverageReporter: {
      type: 'html',
      dir : path.resolve(__dirname, 'coverage'),
    },
    customContextFile: path.resolve(__dirname, 'tests', 'context.html'),
    port             : 9876,
    colors           : true,
    logLevel         : config.LOG_INFO,
    browsers         : ['ChromeHeadless'],
    concurrency      : Infinity,
  });
};
