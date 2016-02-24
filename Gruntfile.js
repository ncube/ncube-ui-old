/*!
 * NCube's Gruntfile
 * http://ncubeschool.org/ncube-ui
 * Copyright 2015-2016 NCube.
 * Licensed under CC BY-SA 4.0 (https://github.com/ncube/ncube-ui/blob/master/LICENSE)
 */

module.exports = function(grunt) {
    'use strict';
    
    var autoprefixerSettings = require('./grunt/autoprefixer-settings.js');
    var autoprefixer = require('autoprefixer')(autoprefixerSettings);
    
    // Project configuration.
    grunt.initConfig({

    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*!\n' +
            ' * NCube UI v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
            ' * Copyright 2015-<%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            ' * Licensed under the <%= pkg.license %> license\n' +
            ' */\n',    

    // Task configuration.
        
        // To Remove Previous compiled files
        clean: {
            dist: 'dist',
            },

        // To Watch files to compile
        watch: {
            sass: {
                files: ['sass/*.sass', 'sass/mixins/*.sass', 'sass/utilities/*.sass', 'sass/components/*.sass'],
                tasks: ['sass', 'postcss:core']
            }
        },
        
        copy: {
            fonts: {
                expand: true,
                src: 'fonts/*',
                dest: 'dist/'
            }
        },
        
        //Post Css & Autoprefixer
        postcss: {
            core: {
                options: {
                map: true,
                processors: [
                    autoprefixer
                ]
                },
                src: 'dist/css/*.css'
            },
        },
        
        //Sass Configuration
        sass: { 
            core: { 
                options: { 
                    style: 'expanded',
                    sourcemap: 'none',                    
                    unixNewlines: true
                },
                files: { 
                    'dist/css/<%= pkg.name %>.css': 'sass/main.sass' 
                }
            },
            core_min: { 
                options: { 
                    style: 'compressed',
                    sourcemap: 'file',
                    unixNewlines: true
                },
                files: { 
                    'dist/css/<%= pkg.name %>.min.css': 'sass/main.sass' 
                }
            }
        }
    });
    
    require('load-grunt-tasks')(grunt, { scope: 'devDependencies' });    
    
    // CSS distribution task.
    grunt.registerTask('sass-compile', ['clean:dist', 'sass', 'postcss:core']);
    
    // Default task.
    grunt.registerTask('default', ['sass-compile','copy']);
};