angular.module('app')
    .config(function ($stateProvider) {

        $stateProvider
            .state('main.chat', {
                url  : "/chat",
                views: {
                    'chat-tab': {
                        templateUrl: "src/chat/tmpl/chat.tmpl.html"
                    }
                }
            })


    });