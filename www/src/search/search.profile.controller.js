angular.module('app')
    .controller('SearchProfileController', function ($scope,user,UtilsFactory,friend,SettingsFactory,ImageFactory,$ionicActionSheet, $timeout) {

        $scope.friend = friend;

        $scope.img1 = ImageFactory.getImgProfile($scope.friend.image.profile,'avatar',1);
        $scope.img2 = ImageFactory.getImgProfile($scope.friend.image.profile,'background_primary');
        $scope.img3 = ImageFactory.getImgProfile($scope.friend.image.profile,'background_secondary');
       // $scope.img4 = ImageFactory.getImgProfile($scope.friend.image.profile,'background_secondary');
       // $scope.img5 = ImageFactory.getImgProfile($scope.friend.image.profile,'background_secondary');


        if ($scope.friend.base && $scope.friend.base.born_date) {
            $scope.age = UtilsFactory.age($scope.friend.base.born_date);
        }

        this.getIncons = function (name) {
            console.log('icons', SettingsFactory.getInterestIcon(name));
            return SettingsFactory.getInterestIcon(name);
        };

        this.getInterestName = function (key) {
            return SettingsFactory.getInterestName(key);
        };




    });