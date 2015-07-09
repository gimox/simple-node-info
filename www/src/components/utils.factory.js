'use strict';
angular.module('app')
    .factory('UtilsFactory', function (storage) {


        function age(dateString) {
            if (!dateString) {
                return null;
            }

            var today = new Date();
            var birthDate = new Date(dateString);
            var age = today.getFullYear() - birthDate.getFullYear();
            var m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            return age;
        }


/*
        function update() {
            $ionicDeploy.update().then(function(res) {
                console.log('Ionic Deploy: Update Success! ', res);
            }, function(err) {
                console.log('Ionic Deploy: Update error! ', err);
            }, function(prog) {
                console.log('Ionic Deploy: Progress... ', prog);
            });
        }


        function checkForUpdates(){
            console.log('Ionic Deploy: Checking for updates');
            $ionicDeploy.check().then(function(hasUpdate) {
                console.log('Ionic Deploy: Update available: ' + hasUpdate);
                $scope.hasUpdate = hasUpdate;
            }, function(err) {
                console.error('Ionic Deploy: Unable to check for updates', err);
            });
        };
        */

        return {
            age: age
        }
    });