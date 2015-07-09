angular.module('app')
    .controller('ProfileController', function (user, $scope, storage, SettingsFactory, UtilsFactory, ImageFactory, ionicMaterialInk, ionicMaterialMotion, $timeout) {

        $scope.user = storage.get('user');

        //$scope.avatar = ImageFactory.getAvatarImage();
        $scope.img1 = ImageFactory.getImgProfile($scope.user.image.profile, 'avatar', 1);
        $scope.img2 = ImageFactory.getImgProfile($scope.user.image.profile, 'background_primary');
        $scope.img3 = ImageFactory.getImgProfile($scope.user.image.profile, 'background_secondary');
        $scope.img4 = ImageFactory.getImgProfile($scope.user.image.profile, 'unknow');

        this.getIncons = function (name) {
            return SettingsFactory.getInterestIcon(name);
        };

        this.getInterestName = function (key) {
            return SettingsFactory.getInterestName(key);
        };

        /*
         if ($scope.user.base && $scope.user.base.born_date) {
         $scope.age = UtilsFactory.age($scope.user.base.born_date);
         }
         */

        $scope.friendsColor = function () {

            return ($scope.user.base.num_friends ) ? 'badge-assertive' : 'badge-assertive';
        };


        $timeout(function () {
            ionicMaterialInk.displayEffect();
           // ionicMaterialMotion.ripple();


            ionicMaterialMotion.fadeSlideInRight({
                selector: '.animate-fade-slide-in .item'
            });


        }, 50);


    });