'use strict';
angular.module('app')
    .controller('SigninlocalController', function ($scope, $rootScope, $state, AuthFactory, AuthTokenFactory, $ionicPopup, $ionicLoading, storage) {

        var that = this;
        that.loginForm = {};

        $scope.credentials = {};


        that.login = function () {
            if (!that.loginForm.$valid) {
                return false;
            }

            $ionicLoading.show({
                template: 'Verifico i tuoi dati...'
            });

            AuthFactory.signinLocal($scope.credentials).then(onSuccess, onError);
        };


        function onSuccess(response) {

            if (AuthTokenFactory.isAuth()) {

                $ionicLoading.hide();
                storage.set('user',response.data.user);
                $state.go('main.search');

            } else {

                if (!response.data.token) {
                    $ionicLoading.hide();
                    var errorCode = 0;

                    if (response.data.error) {
                        errorCode = response.data.error;
                    }

                    showAlert('Email o password errati, prova a reinserirli con più attenzione - cod. ' + errorCode);

                } else {
                    $ionicLoading.hide();
                    showAlert('Non è stato possibile eseguire l accesso, riprova più tardi');
                }

            }


        }


        function onError(err) {
            $ionicLoading.hide();
            showAlert('Non è stato possibile eseguire il login, i server stanno lavorando al massimo, riprova più tardi');
        }


        function showAlert(errorMsg) {

            if (!errorMsg) {
                errorMsg = "Le credenziali di accesso non sono corrette";
            }

            var alertPopup = $ionicPopup.alert({
                title   : 'Autenticazione fallita!',
                template: errorMsg
            });


        }


    });
