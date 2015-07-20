'use strict';
angular.module('app')
    .controller('SettAppController', function (user, storage, $scope, SettingsFactory) {

        $scope.user = storage.get('user');
        var prevData = angular.copy($scope.user);

        this.update = function () {
            SettingsFactory.updateAppSettings({user: $scope.user}).then(onSuccess, onError);
        };


        function onSuccess(response) {
            $scope.user.settings = response.data.settings;
            prevData = $scope.user;
        }

        function onError(err) {
            console.log(err);
            $scope.user = angular.copy(prevData);
        }

    });