'use strict';

var ejs = require('ejs');

module.exports = function(grunt)
{
  grunt.registerMultiTask('ejsAmd', 'Compile EJS template files to JS AMD files.', function()
  {
    var options = this.options({
      helpers: {},
      ejs: {
        compileDebug: false
      },
      wrap: null
    });

    var moduleArgs = [];
    var modulePaths = [];

    Object.keys(options.helpers).forEach(function(helperName)
    {
      moduleArgs.push(helperName);
      modulePaths.push(options.helpers[helperName]);
    });

    moduleArgs = moduleArgs.join(', ');
    modulePaths = JSON.stringify(modulePaths);

    var wrap = typeof options.wrap === 'function'
      ? options.wrap
      : wrapAmd.bind(null, moduleArgs, modulePaths);

    this.files.forEach(function(f)
    {
      f.src
        .filter(function(filepath)
        {
          if (grunt.file.exists(filepath))
          {
            return true;
          }

          grunt.log.warn("EJS file not found: " + filepath);

          return false;
        })
        .forEach(function(filepath)
        {
          var src = grunt.file.read(filepath);
          var compiled;

          grunt.verbose.write("Compiling " + filepath + "...");

          options.ejs.client = true;
          options.ejs.filename = f.dest;

          try
          {
            compiled = ejs.compile(src, options.ejs).toString();
          }
          catch (err)
          {
            grunt.fatal(err);
          }

          grunt.verbose.ok();
          grunt.verbose.write("Wrapping " + filepath + "...");

          var wrapped = wrap(compiled, options.helpers);

          grunt.verbose.ok();

          grunt.file.write(f.dest, wrapped);
        });
    });
  });

  /**
   * @param {string} moduleArgs
   * @param {string} modulePaths
   * @param {string} js
   * @returns {string}
   */
  function wrapAmd(moduleArgs, modulePaths, js)
  {
    return [
      'define(', modulePaths, ', function(', moduleArgs, ') { return ',
      js,
      '});'
    ].join('');
  }
};
