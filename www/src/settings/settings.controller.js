'use strict';
angular.module('app')
    .controller('SettingsController', function ($state,AuthFactory) {

        console.log('Settings controller');

        this.logout = function () {
            AuthFactory.logout();
            $state.go('login.sign-in');
        };

    });