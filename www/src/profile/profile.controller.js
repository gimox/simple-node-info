'use strict';
angular.module('app')
    .controller('ProfileController', function (user, $state, $scope, storage, SettingsFactory, UtilsFactory, ImageFactory, ionicMaterialInk, ionicMaterialMotion, $timeout, $ionicSlideBoxDelegate, $ionicScrollDelegate) {

        if (user.error) {
            // $state.go('error.connection');
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


        // follia animazione da rifare bene con angualr animation

/*
        $scope.slideStyle = {};
        $scope.avatarStyle = {};
        $scope.imgStyle = {};

        var width = window.innerWidth
            || document.documentElement.clientWidth
            || document.body.clientWidth;


        $scope.fxscrollX = function () {

            var positionScroll = $ionicScrollDelegate.getScrollPosition().top;
            var height = 285;
            var avatarHeight = 210;
            var blur = 0;

            if (width >= 768) {
                height = 550;
                avatarHeight = 400;
            }

            var slideHeight = (height + (positionScroll * -1));


            slideHeight = (slideHeight < 1) ? 1 : slideHeight;

            $scope.imgStyle = {
                'height': slideHeight + 'px'
            };

            var avatardim = (avatarHeight + (positionScroll * -1));
            avatardim = (avatardim < 0) ? 0 : avatardim;
            if (avatardim < width - 40) {

                $scope.avatarStyle = {
                    'height': avatardim + 'px',
                    'width' : avatardim + 'px'
                }
            }

            if (positionScroll < 120) {
                blur = 0;
            } else {
                blur = 2;
            }

            $scope.slideStyle = {
                height: slideHeight + 'px'
            };

            if (!ionic.Platform.isIOS()) $scope.slideStyle['-webkit-filter'] = 'blur(' + blur + 'px)';

            $scope.$apply();
        }

*/

    });