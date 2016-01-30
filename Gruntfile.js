module.exports = function(grunt) {

    grunt.initConfig({
        uglify: {
            merchantTask: {
                files: [{
                    src: 'merchant/**/*.js',
                    dest: 'common/merchant_build.js'
                }, {
                    'common/merchant_dep.js': [
                        'bower_components/jquery/dist/jquery.min.js',
                        'bower_components/select2/select2.min.js',
                        'bower_components/bootstrap-switch/dist/js/bootstrap-switch.min.js',
                        'bower_components/sweetalert/dist/sweetalert.min.js',
                        'bower_components/angular/angular.js',
                        'bower_components/angular-cookies/angular-cookies.min.js',
                        'bower_components/angular-aria/angular-aria.min.js',
                        'bower_components/angular-animate/angular-animate.min.js',
                        'bower_components/angular-ui-router/release/angular-ui-router.min.js',
                        'bower_components/angular-bootstrap-switch/dist/angular-bootstrap-switch.min.js',
                        'bower_components/lodash/lodash.min.js',
                        'bower_components/async/dist/async.min.js',
                        'bower_components/momentjs/moment.js',
                        'bower_components/angular-moment/angular-moment.min.js',
                        'bower_components/angular-ui-tree/dist/angular-ui-tree.min.js',
                        'bower_components/ngSweetAlert/SweetAlert.min.js',
                        'bower_components/angular-ui-select2/src/select2.js',
                        'bower_components/bootstrap/dist/js/bootstrap.min.js',
                        'bower_components/angular-notification/angular-notification.js',
                        'bower_components/angular-audio/app/angular.audio.js',
                        'bower_components/angular-bootstrap/ui-bootstrap.min.js',
                        'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
                        'bower_components/ng-file-upload/ng-file-upload-shim.min.js',
                        'bower_components/ng-file-upload/ng-file-upload.min.js',
                        'bower_components/angularjs-ordinal-filter/ordinal-browser.js',
                        'bower_components/angular-toastr/dist/angular-toastr.tpls.min.js',
                        'bower_components/jquery.slimscroll/jquery.slimscroll.min.js',
                        'bower_components/ngstorage/ngStorage.min.js',
                        'bower_components/angular-wizard/dist/angular-wizard.min.js',
                        'bower_components/angular-loading-bar/build/loading-bar.min.js',
                        'bower_components/faye-client/dist/faye-browser.js',
                        'bower_components/angular-google-maps/dist/angular-google-maps.min.js'
                    ]
                }]
            },
            consoleTask: {
                files: [{
                    src: 'console/**/*.js',
                    dest: 'common/console_build.js'
                }, {
                    'common/console_dep.js': [
                        'bower_components/jquery/dist/jquery.min.js',
                        'bower_components/select2/select2.min.js',
                        'bower_components/bootstrap-switch/dist/js/bootstrap-switch.min.js',
                        'bower_components/sweetalert/dist/sweetalert.min.js',
                        'bower_components/angular/angular.js',
                        'bower_components/angular-cookies/angular-cookies.min.js',
                        'bower_components/angular-aria/angular-aria.min.js',
                        'bower_components/angular-animate/angular-animate.min.js',
                        'bower_components/angular-ui-router/release/angular-ui-router.min.js',
                        'bower_components/angular-bootstrap-switch/dist/angular-bootstrap-switch.min.js',
                        'bower_components/lodash/lodash.min.js',
                        'bower_components/async/dist/async.min.js',
                        'bower_components/bootstrap-file-input/bootstrap.file-input.js',
                        'bower_components/angular-moment/angular-moment.min.js',
                        'bower_components/angular-ui-tree/dist/angular-ui-tree.min.js',
                        'bower_components/ngSweetAlert/SweetAlert.min.js',
                        'bower_components/angular-ui-select2/src/select2.js',
                        'bower_components/bootstrap/dist/js/bootstrap.min.js',
                        'bower_components/angular-notification/angular-notification.min.js',
                        'bower_components/angular-audio/app/angular.audio.js',
                        'bower_components/ng-file-upload/ng-file-upload-shim.min.js',
                        'bower_components/ng-file-upload/ng-file-upload.min.js',
                        'bower_components/angular-bootstrap/ui-bootstrap.min.js',
                        'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
                        'bower_components/ng-file-upload/ng-file-upload-shim.min.js',
                        'bower_components/ng-file-upload/ng-file-upload.min.js',
                        'bower_components/angularjs-ordinal-filter/ordinal-browser.js',
                        'bower_components/angular-toastr/dist/angular-toastr.tpls.min.js',
                        'bower_components/jquery.slimscroll/jquery.slimscroll.min.js',
                        'bower_components/ngstorage/ngStorage.min.js',
                        'bower_components/oclazyload/dist/ocLazyLoad.require.js',
                        'bower_components/angular-wizard/dist/angular-wizard.min.js',
                        'bower_components/angular-loading-bar/build/loading-bar.min.js',
                        'bower_components/faye-client/dist/faye-browser.js',
                        'bower_components/angular-google-maps/dist/angular-google-maps.min.js'
                    ]
                }]
            }
        },
        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['uglify']);

};
