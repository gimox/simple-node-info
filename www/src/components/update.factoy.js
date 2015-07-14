'use strict';
angular.module('app')
    .service('UpdateFactory', function ( $rootScope,$ionicDeploy, $ionicPopup, $timeout, $ionicLoading) {

        var isUpdate = false;

        function check() {
            console.log('Ionic Deploy: Checking for updates');
            $ionicDeploy.check().then(function (hasUpdate) {
                console.log('Ionic Deploy: Update available: ' + hasUpdate);
                isUpdate = hasUpdate;
            }, function (err) {
                console.error('Ionic Deploy: Unable to check for updates', err);
            });
        }

        function updateDialog() {

            if (!isUpdate) {
                return true;
            }


            var confirmPopup = $ionicPopup.confirm({
                title   : 'Aggiornamento',
                template: 'Abbiamo migliorato l\'App e abbiamo rilasciato un aggiornamento, lo vuoi fare ora? ',
                buttons: [
                    { text: 'No' },
                    {
                        text: '<b>SI</b>',
                        type: 'button-positive'
                    }
                ]
            });


            confirmPopup.then(function (res) {
                if (res) {
                    isUpdate = false;
                } else {
                    update();
                }
            });
        }

        function update() {
            console.log('update lanciato');

            $rootScope.progress = 0;


            $ionicLoading.show({
                template: 'aggiorno l\'app..  {{$root.progress}}%'
            });


/*
            $timeout(function(){
                $ionicLoading.hide();

                var alertPopup = $ionicPopup.alert({
                    title: 'Fatto!',
                    template: 'L\'abggiornamento è stato eseguito con successo'
                });
                isUpdate = false;
            },4000);
            */




            $ionicDeploy.update().then(function(res) {
                $ionicLoading.hide();
             $ionicPopup.alert({
             title: 'Fatto!',
             template: 'L\'abggiornamento è stato eseguito con successo'
             });
            isUpdate = false;

            }, function(err) {
                $ionicLoading.hide();
             $ionicPopup.alert({
             title: 'Errore!',
             template: 'Non è stato possibile eseguire questo aggiornamento, riprova più tardi'
             });
             var isUpdate = false;

            }, function(prog) {
                $rootScope.progress = prog;
                console.log('Ionic Deploy: Progress... ', prog);
            });

        }


        function hasUpdate() {
            return isUpdate;
        }

        return {
            check        : check,
            update       : update,
            updateDialog: updateDialog
        }
    });