'use strict';
angular.module('quoozy')
    .controller('SettVisibController', function ($scope, $rootScope, SettingsFactory, DBfactory) {

        var _this = this;

        function setUser() {
            DBfactory.find('user').then(function (response) {
                $rootScope.user = response;
                $scope.visibility = angular.copy($rootScope.user.visibility);
            });
        }

        setUser();


        this.update = function () {
            var userdata = {};
            userdata.user = angular.copy($rootScope.user);
            userdata.user.visibility = angular.copy($scope.visibility);
            SettingsFactory.updateVisibility(userdata).then(onSuccess, onError);
        };

        this.setMinAge = function () {
            if (parseInt($scope.visibility.v_set_age_2) < parseInt($scope.visibility.v_set_age_1)) {
                $scope.visibility.v_set_age_1 = angular.copy($scope.visibility.v_set_age_2);
            }
        };

        this.setMaxAge = function () {
            if (parseInt($scope.visibility.v_set_age_1) > parseInt($scope.visibility.v_set_age_2)) {
                $scope.visibility.v_set_age_2 = angular.copy($scope.visibility.v_set_age_1);
            }
        };


        function onSuccess(response) {
            var user = angular.copy($rootScope.user);
            user.visibility = response.data.visibility;
            delete user._id;
            delete user._rev;

            DBfactory.findOneAndUpdate('user', user)
                .then(function (res) {
                    console.log(res);
                    $rootScope.user = user;
                })
                .catch(function (err) {
                    console.log(err);

                });
        }

        function onError(err) {
            console.log(err);
            $scope.visibility = angular.copy($rootScope.user.visibility);
        }


    });
