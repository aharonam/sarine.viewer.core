'use strict';
module.exports = function(grunt) {
    var path = require("path");

    var dirname = __dirname.split(path.sep)
    dirname.pop();
    dirname = dirname.pop();
    var branch = "dev"
    require('load-grunt-tasks')(grunt)
    var files = ["Gruntfile.js", "copyright.txt",  "package.json", "dist/*.*", "commit.cmd","README.md"]
    var message = "commit"
    grunt.initConfig({
        version: {
            project: {
                src: ['bower.json', 'package.json']
            }
        },
        pkg: grunt.file.readJSON('package.json'),
        gitcheckout: {
            task: {
                options: {
                    branch: "<%= branch %>",
                    overwrite: true
                }
            }
        },
        gitcommit: {
            all: {               
                files: {
                    src: files
                }
            },
            bower: {
                options: {
                    message: "release : <%= config.version %>",
                    force: true
                },
                files: {
                    src: ["bower.json", "package.json"]
                }
            }
        },
        gitpush: {
            all: {
                options: {
                    branch: "<%= branch %>",
                    force: true
                },
                files: {
                    src: files
                }
            }
        },
        gitadd: {
            firstTimer: {
                option: {
                    force: true
                },
                files: {
                    src: files
                }
            }
        },
        gitpull: {
            build: {
                options: {
                    force: true
                },
                files: {
                    src: files
                }
            }
        },
        gitclone: {
            rm: {
                options: {
                    repository: 'https://github.com/SarineTechnologies/sarine.viewer.resource.manager.git',
                    branch: 'dev',
                    directory: 'src/rm',
                    bare: false
                }
            },
            vm: {
                options: {
                    repository: 'https://github.com/SarineTechnologies/sarine.viewer.manager.git',
                    branch: 'dev',
                    directory: 'src/vm'
                }
            },
            ut: {
                options: {
                    repository: 'https://github.com/SarineTechnologies/sarine.viewer.utils.git',
                    branch: 'dev',
                    directory: 'src/ut'
                }
            }
        },
        copy: {           
            src_files:{
                expand: true,
                cwd: 'src/',
                src: ['*/dist/*.js','!*/dist/*{bundle,min}*.js' ],
                dest: 'lib/raw',
                flatten: true
            }
        },
        concat: {            
            src_files :{
                src: ['lib/raw/*.js'],
                dest: 'dist/<%= pkg.name %>.bundle.js'
            }
        },
        clean: {
            build: {
                src: ["src", "lib","dist"]
            }
        },
         uglify: {
            options: {
                preserveComments: 'some',
                sourceMap : true                
            },            
            bundle: {
                src: 'dist/<%= pkg.name %>.bundle.js',
                dest: 'dist/<%= pkg.name %>.bundle.min.js'
            }
        }

    })    
    grunt.registerTask('build',['clean','gitclone','copy:src_files','concat:src_files','uglify']);    
    grunt.registerTask('commit', ['gitadd', 'gitcommit:all', 'gitpush']);
    
};
