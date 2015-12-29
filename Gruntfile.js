module.exports = function(grunt) {
    
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
                files: 'sass/*.sass',
                tasks: 'sass:core'
            }
        },
        
        //Sass Configuration
        sass: { 
            core: { 
                options: { 
                    style: 'expanded',
                    sourcemap: 'none',
                    trace: true,
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
                    trace: true,
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
    grunt.registerTask('sass-compile', ['clean:dist', 'sass']);
    
    // Default task.
    grunt.registerTask('default', function () {
        console.log('Default Task not yet Initialized');
    });
    
};