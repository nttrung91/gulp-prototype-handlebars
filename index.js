'use strict';

var through = require('through2');
var _ = require('lodash');
var fs = require('vinyl-fs');
var fs2 = require('fs');
var gutil = require('gulp-util');
var handlebars = require('gulp-compile-handlebars');
var handlebarsHelpers = require('handlebars-helpers');


module.exports = function (options) {

  // Default Config
  options = options || {};

  options = _.assign({
    ignorePartials: true, //ignores the unknown footer2 partial in the handlebars template, defaults to false
    batch : ['./partials'],
    helpers: {}
  }, options);


  // Register Base Helpers
  handlebarsHelpers.register(handlebars.Handlebars, 'helpers-comparisons');


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
    var rawStream  = fs.src(__dirname + raw.template);

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
