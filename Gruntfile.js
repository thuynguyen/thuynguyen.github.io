'use strict';

module.exports = function(grunt) {

  // configure the tasks
  grunt.initConfig({
    watch: {
      scripts: {
        files: [ 'lib/js/base/*.js','lib/js/*.js'],
        tasks: [ 'uglify:main', 'clean:scripts' ]
      },
      stylesheets: {
        files: 'lib/css/*.scss',
        tasks: [ 'sass', 'clean:stylesheets' ]
      }
    },

    clean: {
      build: {
        src: [ 'build' ]
      },
      lib: {
        src: [ 'build/lib' ]
      },
      scripts: {
        src: [ 'build/js' ]
      },
      stylesheets: {
        src: [ 'build/css' ]
      },
      docco: {
        src: [ 'docs' ]
      }
    },

    uglify: {
      main: {
        options: {
          mangle: false,
          sourceMap: 'build/js/application.min.js.map',
          sourceMappingURL: 'application.min.js.map'
        },
        files: {
          'build/js/application.min.js': [
            'lib/js/*/*.js',
            'lib/js/*.js'
          ]
        }
      }
    },

    sass: {
      dist: {
        options: {
          style: 'compressed',
          sourcemap: true
        },
        files: {
          'build/css/application.min.css': 'lib/css/application.scss'
        }
      }
    },

    webfont: {
      icons: {
        src: 'build/lib/icons/*.svg',
        dest: 'build/fonts',
        destCss: 'build/lib/css/webfont',
        options: {
          font: 'darkroom',
          //types: 'ttf',
          embed: 'woff,ttf',
          stylesheet: 'scss',
          relativeFontPath: '../fonts',
          htmlDemo: false,
          syntax: 'bootstrap',
          templateOptions: {
            classPrefix: 'darkroom-icon-'
          }
        }
      }
    },

    connect: {
      server: {
        options: {
          port: 4000,
          base: '.',
          hostname: '*'
        }
      }
    },

    docco: {
      docs: {
        src: ['lib/js/**/*.js'],
        options: {
          output: 'docs/'
        }
      }
    }

  });

  // load the tasks
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-docco');
  grunt.loadNpmTasks('grunt-webfont');

  // define the tasks
  grunt.registerTask(
    'build',
    'Compiles all of the assets and copies the files to the build directory.',
    [ 'clean:build', 'sass', 'uglify:main', 'clean:lib' ]
  );

  grunt.registerTask(
    'docs',
    'Compiles all of the assets and copies the files to the build directory.',
    [ 'clean:docco', 'docco']
  );

  grunt.registerTask(
    'default',
    'Build, watch and launch server.',
    [ 'build', 'connect', 'watch' ]
  );
};
