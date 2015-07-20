'use strict';
angular.module('app')
    .factory('ChatFactory', function ($state) {


        function friend(id) {
            $state.go('main.chat');
        }

        return {
            friend: friend
        }
    });
