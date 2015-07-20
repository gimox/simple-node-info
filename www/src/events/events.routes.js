angular.module('app')
    .config(function ($stateProvider) {

        $stateProvider
            .state('main.events', {
                url  : "/events",
                views: {
                    'events-tab': {
                        templateUrl: "src/events/tmpl/events.tmpl.html"
                    }
                }
            })


    });