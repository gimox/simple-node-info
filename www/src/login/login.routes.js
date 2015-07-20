'use strict';
angular.module('app')
    .config(function ($stateProvider) {

        $stateProvider
            .state('login', {
                url        : '/login',
                abstract   : true,
                templateUrl: 'src/login/templates/login.layout.tmpl.html',
                controller: 'LoginController as lgnCtrl'
            })

            .state('login.sign-in', {
                url  : '/sign-in',
                views: {
                    'login': {
                        templateUrl: 'src/login/templates/login.signin.tmpl.html',
                        controller : 'SigninController as sgnCtrl'
                    }
                }
            })

            .state('login.sign-in-local', {
                url  : '/sign-in-local',
                views: {
                    'login': {
                        templateUrl: 'src/login/templates/login.signinlocal.tmpl.html',
                        controller : 'SigninlocalController as sgnlocCtrl'
                    }
                }
            })

            .state('login.sign-out', {
                url  : '/sign-out',
                views: {
                    'login': {
                        templateUrl: 'src/login/templates/login.signout.tmpl.html'
                        //  controller : 'SignOutController as signOut'
                    }
                }
            })

            .state('login.signup', {
                url  : '/sign-up',
                views: {
                    'login': {
                        templateUrl: 'src/login/templates/login.signup.tmpl.html'
                        //controller  : 'SignupController as sup'
                    }
                }
            });


    });
