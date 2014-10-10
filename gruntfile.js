'use strict';
var LIVERELOAD_PORT = 35729,
    PORT            = process.env.PORT || 9000,
    lrSnippet       = require('connect-livereload')({ port: LIVERELOAD_PORT }),
    mountFolder     = function (connect, dir) {
      return connect.static(require('path').resolve(dir));
    };
module.exports = function(grunt) {
  /**
   * Loads grunt tasks based on dependencies
   */
  require('load-grunt-tasks')(grunt);

  var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      livereload: {
        options: {
          livereload: LIVERELOAD_PORT
        },
        files: [
          'public/templates/*.html',
          'public/index.html',
          'public/js/**/*.js',
          'public/css/style.css'
        ]
      }
    },

    bowerInstall: {
      app: {
        src: [
          'public/index.html',
          'public/css/style.css'
        ]
      }
    },

    injector: {
      options:{
        dest:'/Users/berkeley/angular/restaurant_search/public/index.html',
        ignorePath: ['public/'],
        addRootSlash: false
      },
      local_dependencies: {
        files: {
          'public/index.html': ['public/js/**/*.js']
        }
      }
    },

    connect: {
      server: {
        options: {
          hostname: 'localhost',
          port: PORT,
          base: './public',
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, './public'),
              proxySnippet
            ];
          }
        },
        proxies: [
          {
            context: '/api',
            host: 'localhost',
            port: 2403, // port should match deployd port
            https: false,
            changeOrigin: true,
            rewrite: {
              '^/api/dpd.js': '/dpd.js',
              '^/api': '' // prefix all api requests with /api ( ie. /api/products )
            }
          }
        ]
      }
    },
    open: {
      dev: {
        path: 'http://localhost:' + PORT,
        app: 'Google Chrome',
        files: {
          path: './public/index.html'
        }
      }
    }
  });
  // register  a custom task for grunt.
  grunt.registerTask('preview', function () {
    grunt.task.run([
      'bowerInstall',
      'injector',
      'configureProxies:server',
      'connect:server',
      'open:dev',
      'watch'
    ]);
  });
};