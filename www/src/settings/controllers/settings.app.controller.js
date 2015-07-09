'use strict';
angular.module('app')
    .controller('SettAppController', function (user, $scope, $rootScope, SettingsFactory) {

        var _this = this;

        $scope.user = user.get('user');

        function setUser() {
            /*
            DBfactory.find('user').then(function (response) {
                $rootScope.user = response;
                $scope.settings = angular.copy($rootScope.user.settings);
            });
            */
        }

        setUser();


        this.update = function () {
            var userdata = {};
            userdata.user = angular.copy($rootScope.user);
            userdata.user.settings = angular.copy($scope.settings);
            SettingsFactory.updateAppSettings(userdata).then(onSuccess, onError);
        };


        function onSuccess(response) {
            var user = angular.copy($rootScope.user);
            user.settings = response.data.settings;
            delete user._id;
            delete user._rev;

            DBfactory.findOneAndUpdate('user', user)
                .then(function (res) {
                    $rootScope.user = user;
                })
                .catch(function (err) {
                    console.log(err);
                });
        }

        function onError(err) {
            console.log(err);
            $scope.settings = angular.copy($rootScope.user.settings);
        }


    });
