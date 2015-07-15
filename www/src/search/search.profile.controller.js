angular.module('app')
    .controller('SearchProfileController', function ($scope,user,UtilsFactory,friend,SettingsFactory,ImageFactory,$ionicActionSheet, $timeout) {

        $scope.friend = friend;
        $scope.images = [];
        $scope.images = ImageFactory.getAllImage($scope.friend.image.profile);

        if ($scope.friend.base && $scope.friend.base.born_date) {
            $scope.age = UtilsFactory.age($scope.friend.base.born_date);
        }

        this.getIncons = function (name) {
            return SettingsFactory.getInterestIcon(name);
        };

        this.getInterestName = function (key) {
            return SettingsFactory.getInterestName(key);
        };

        this.hideFriend = function(id) {
            alert(id);
        };

        this.setFriend = function(id) {
            alert(id);
        };

    });