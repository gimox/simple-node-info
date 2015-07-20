angular.module('app')
    .config(function ($stateProvider) {

        $stateProvider
            .state('error', {
                url        : '/error',
                abstract   : true,
                templateUrl: 'src/errors/tmpl/error.layout.tmpl.html'
            })

            .state('error.connection', {
                url  : '/connection',
                views: {
                    'errors': {
                        templateUrl: 'src/errors/tmpl/error.tmpl.html',
                        controller: 'ErrorController as errCtrl'
                    }
                }
            })
    });