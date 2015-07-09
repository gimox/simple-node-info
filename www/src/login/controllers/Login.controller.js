'use strict';
angular.module('app')
    .controller('LoginController', function (AuthTokenFactory, $state) {

        function redirectToMainApp() {
            if (AuthTokenFactory.isAuth()) {
                $state.go('main.search');
            }
        }

        redirectToMainApp();

    });
