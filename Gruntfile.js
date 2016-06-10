module.exports = function (grunt) {
    'use strict';
    // Project configuration
    grunt.initConfig({

        // Metadata
        pkg: grunt.file.readJSON('package.json'),

        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
            ' Licensed <%= pkg.license %> */\n',

        // Task configuration
        concat: {
            dist: {
                src: ['index.js'],
                dest: 'build/cli-weather.js'
            }
        },

        uglify: {
            dist: {
                src: '<%= concat.dist.dest %>',
                dest: 'build/cli-weather.min.js'
            }
        },

        tslint: {
            options:{
                whitespace: [true, "check-decl", "check-separator"],
                variable_name: [true, "check-format", "allow-leading-underscore"],
                triple_equals: true,
                "no-unused-expression": true,
                "no-unused-variable": true
            },

            files: {
                src: ['src/**/*.ts', '!src/**/*.d.ts']
            }
        },

        watch: {
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            },
            lib_test: {
                files: '<%= jshint.lib_test.src %>',
                tasks: ['jshint:lib_test', 'nodeunit']
            }
        }
    });

    // These plugins provide necessary tasks
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-tslint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task
    grunt.registerTask('default', ['tslint', 'concat', 'uglify']);
};

