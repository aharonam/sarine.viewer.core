'use strict';
module.exports = function(grunt) {
    var path = require("path");

    var dirname = __dirname.split(path.sep)
    dirname.pop();
    dirname = dirname.pop();
    var branch = "dev"
    require('load-grunt-tasks')(grunt)
    var files = ["Gruntfile.js", "copyright.txt",  "package.json", "dist/*.js", "commit.cmd"]
    var message = "commit"
    grunt.initConfig({

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
            }
        },
        copy: {
            bundle_min_file: {
                expand: true,
                cwd: 'src/',
                src: '*/dist/*.bundle.min.js',
                dest: 'lib/',
                flatten: true

            }
        },
        concat: {
            dist: {
                src: ['lib/*.js'],
                dest: 'dist/<%= pkg.name %>-<%= pkg.version %>.js',
            }
        },
        clean: {
            build: {
                src: ["src", "lib","dist"]
            }
        }

    })    
    
    grunt.registerTask('build-core', ['clean','gitclone', 'copy:bundle_min_file', 'concat'])
    grunt.registerTask('commit', ['gitadd', 'gitcommit:all', 'gitpush']);
    
};
