
angular.module('app')
    .controller('ProfileController', function (user, $state, $scope, storage, SettingsFactory, UtilsFactory, ImageFactory, ionicMaterialInk, $timeout, $ionicSlideBoxDelegate, $ionicScrollDelegate) {

        if (user.error) {
             $state.go('error.connection');
        }



        $scope.user = storage.get('user');
        $scope.images = [];
        $scope.images = ImageFactory.getAllImage($scope.user.image.profile);


        /*
        var typeImg = ImageFactory.getType();

        $scope.img1 = ImageFactory.getImgProfile($scope.user.image.profile, typeImg[0], 1);
        $scope.img2 = 'img/thumb-profile.jpg';
        /
         $scope.img2 = ImageFactory.getImgProfile($scope.user.image.profile, typeImg[1]);
         $scope.img3 = ImageFactory.getImgProfile($scope.user.image.profile, typeImg[2]);
         $scope.img4 = ImageFactory.getImgProfile($scope.user.image.profile, typeImg[3]);
         $scope.img5 = ImageFactory.getImgProfile($scope.user.image.profile, typeImg[4]);
         $scope.img6 = ImageFactory.getImgProfile($scope.user.image.profile, typeImg[5]);
         */



        /*

         for(var i = 0; i<7; i++) {

         if($scope['img'+i]) {
         $scope.images.push($scope['img'+i]);
         }
         }
         */


        this.getIncons = function (name) {
            return SettingsFactory.getInterestIcon(name);
        };

        this.getInterestName = function (key) {
            return SettingsFactory.getInterestName(key);
        };

        this.getStyle = function (img) {
            return {
                'background'     : 'url(' + img + ') no-repeat center',
                'background-size': 'cover'
            }
        };


        $scope.friendsColor = function () {
            return ($scope.user.base.num_friends ) ? 'badge-assertive' : 'badge-assertive';
        };

/*
        $timeout(function () {
            try {
                ionicMaterialInk.displayEffect();
            } catch (e) {
                console.log('user display effect error, ok managed');
            }
            // ionicMaterialMotion.ripple();

            ionicMaterialMotion.fadeSlideInRight({
                selector: '.animate-fade-slide-in .item'
            });
        }, 50);
  */

    });