'use strict';

var through = require('through2');
var vfs = require('vinyl-fs');
var fs = require('fs');
var gutil = require('gulp-util');
var handlebars = require('gulp-compile-handlebars');


module.exports = function (options) {

  /**
   * __Default Config__
   * @author: Trung Nguyen <http://github.com/nttrung91>
   *
   * @option  __array__   partials [description]
   * @option  __string__  helpers  [description]
   *
   */
  options = options || {};

  options = extend({
    ignorePartials: true, //ignores the unknown footer2 partial in the handlebars template, defaults to false
    batch : options.partials || [],
    helpers: {}
  }, options);


  function extend (target, source) {
    var a = Object.create(target);
    Object.keys(source).map(function (prop) {
      prop in a && (a[prop] = source[prop]);
    });
    return a;
  };


  // Register Base Helpers
  require('./helpers/helpers-comparisons').register(handlebars.Handlebars, 'helpers-comparisons');


  return through.obj(function (file, enc, cb) {

    if (file.isNull()) {
      cb(null, file);
      return;
    }

    if (file.isStream()) {
      cb(new gutil.PluginError('gulp-prototype-handlebars', 'Streaming not supported'));
      return;
    }

    var raw = JSON.parse(file.contents);
    var rawStream  = vfs.src('./' + raw.template);

    rawStream
      .pipe(handlebars(raw.data, options))
      .on("finish", function handleEndEvent () {
        file.contents = new Buffer(this._readableState.buffer[0].contents)
        file.path = gutil.replaceExtension(file.path, '.html');
        cb(null, file);
      });
  });
};

// Access to Handlebars
module.exports.Handlebars = handlebars.Handlebars;
