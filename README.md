# grunt-ejs-amd

> Compile [EJS](https://github.com/visionmedia/ejs) template files to JS AMD files.

## Getting Started

This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install git://github.com/morkai/grunt-ejs-amd.git --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-ejs-amd');
```

## The "ejsAmd" task

_Run this task with the `grunt ejsAmd` command._

Task targets, files and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.

### Options

#### options.ejs

Type: `Object`
Default value: `{compileDebug: false}`

An options object passed to EJS during compilation. Can be used to change `open` and `close` tags.
See [EJS Options](https://github.com/visionmedia/ejs#options) for a list of available options.

#### options.helpers

Type: `Object.<String, String>`
Default value: `{}`

A map of strings that will be passed to the `wrap` function which in turn can use it to inject other modules to all templates.

#### options.wrap

Type: `Function(String, Object.<String, String>): String`
Default value: `null`

A function that takes a compiled EJS template (`function anonymous(locals) { return <template-string>; }` string) and the `helpers` object as arguments, optionally processes and returns it.

If `null` is specified, a default wrapper function is used which wraps the EJS template in an AMD module. Properties of the `helpers` object are turned into module dependencies.

### Usage Examples

```js
grunt.initConfig({
  ejsAmd: {
    frontend: {
      expand: true,
      cwd: './frontend',
      src: '**/*.ejs'
      dest: './build/frontend',
      ext: '.js',
      options: {
        helpers: {
          t: 'app/i18n'
        }
      }
    }
  },
})
```

Executing:

```
grunt ejsAmd:frontend
```

will wrap all EJS templates under the `./frontend` directory with the following
code:

```js
define(['app/i18n', function(t) { return <ejs-template-function>; });
```

and write them under the `./build/frontend` directory (the directory structure is
preserved).

## Release History

_(Nothing yet)_

## License

This project is released under the
[MIT License](https://raw.github.com/morkai/grunt-ejs-amd/master/LICENSE-MIT).
