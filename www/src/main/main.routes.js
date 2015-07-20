angular.module('app')
    .config(function ($stateProvider) {

        $stateProvider
            .state('main', {
                url        : "/main",
                abstract   : true,
                templateUrl: "src/main/tmpl/main.tmpl.html",
                controller: "MainController as mainCtrl",
                resolve    : {
                    user: ['BootstrapFactory', function (BootstrapFactory) {
                       return BootstrapFactory.get();
                    }]
                }
            })

    });