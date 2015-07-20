'use strict';
angular.module('app')
    .controller('SettVisibController', function ($scope,user,storage, SettingsFactory) {

        $scope.user = storage.get('user');
        var previousData = angular.copy($scope.user);


        this.update = function () {
            SettingsFactory.updateVisibility({user:$scope.user}).then(onSuccess, onError);
        };

        this.setMinAge = function () {
            if (parseInt($scope.user.visibility.v_set_age_2) < parseInt($scope.user.visibility.v_set_age_1)) {
                $scope.user.visibility.v_set_age_1 = angular.copy($scope.user.visibility.v_set_age_2);
            }
        };

        this.setMaxAge = function () {
            if (parseInt($scope.user.visibility.v_set_age_1) > parseInt($scope.user.visibility.v_set_age_2)) {
                $scope.user.visibility.v_set_age_2 = angular.copy($scope.user.visibility.v_set_age_1);
            }
        };


        function onSuccess(response) {

            $scope.user.visibility = response.data.visibility;
            previousData = angular.copy($scope.user);
        }

        function onError(err) {
            console.log(err);
            $scope.user = angular.copy(previousData);
        }


    });
