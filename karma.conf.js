// Karma configuration
// Generated on Sun Apr 03 2016 00:26:14 GMT+0000 (UTC)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: [],
    plugins: [require('karma-webpack')],
    webpack: {
       module: {
        loaders: [
          {
          	test: /\.js?$/,
          	loader: 'babel',
          	query: {
          		cacheDirectory: true,
          		presets: ['es2015', 'stage-2'],
          		plugins: ['transform-runtime', 'add-module-exports', 'transform-es2015-modules-commonjs']
          	}
          }
        ]
      }
    },
    // list of files / patterns to load in the browser
    files: [
      'node_modules/blue-tape/**/*',
      'node_modules/sinon/**/*',
      'node_modules/proxyquire/**/*',
      'node_modules/lodash/**/*',
      'orbit/src/**/*.js',
      'orbit/tests/**/*.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        'orbit/src/**/*.js': ['webpack'],
        'orbit/tests/**/*.js': ['webpack']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
