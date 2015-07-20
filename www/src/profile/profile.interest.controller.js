'use strict';
angular.module('app')

    .controller('ProfileInterestController', function ($scope, user, storage, SettingsFactory) {
        var that = this;

        $scope.interests = SettingsFactory.getInterestsAsArray();
        $scope.user = storage.get('user');
        var previousUser = angular.copy($scope.user);


        /**
         * change class on interest selected
         * @param key
         * @returns {number}
         */
        this.isSelected = function (key) {
            if ($scope.user.interest.hasOwnProperty(key) && $scope.user.interest[key]) {
                return 1;
            }
            return 0;
        };


        /**
         * save data
         * @param key
         */
        this.updateInterest = function (key) {

            if ($scope.user.interest[key]) {
                $scope.user.interest[key] = 0;
            } else {
                $scope.user.interest[key] = 1;
            }

            SettingsFactory.updateInterests({user: $scope.user}).then(function (response) {

                $scope.user.interest = response.data.interest;
                storage.set('user',$scope.user);
                previousUser = angular.copy($scope.user);

            }, function (error) {
                console.log(err);
                $scope.user = angular.copy(previousUser); // revert data to last not saved

            });


        };


    });
