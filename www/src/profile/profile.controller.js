angular.module('app')
    .controller('ProfileController', function (user, $state,$scope, storage, SettingsFactory, UtilsFactory, ImageFactory, ionicMaterialInk, ionicMaterialMotion, $timeout, $ionicSlideBoxDelegate, $ionicScrollDelegate) {

        if(user.error) {
            $state.go('error.connection');
        }

        $scope.user = storage.get('user');

        var typeImg = ImageFactory.getType();
        $scope.img1 = ImageFactory.getImgProfile($scope.user.image.profile, typeImg[0], 1);
        $scope.img2 = ImageFactory.getImgProfile($scope.user.image.profile, typeImg[1]);
        $scope.img3 = ImageFactory.getImgProfile($scope.user.image.profile, typeImg[2]);
        $scope.img4 = ImageFactory.getImgProfile($scope.user.image.profile, typeImg[3]);
        $scope.img5 = ImageFactory.getImgProfile($scope.user.image.profile, typeImg[4]);
        $scope.img6 = ImageFactory.getImgProfile($scope.user.image.profile, typeImg[5]);


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
            try {
                  ionicMaterialInk.displayEffect();
            }catch(e){
                    console.log('user display effect error, ok managed');
            }
            // ionicMaterialMotion.ripple();

            ionicMaterialMotion.fadeSlideInRight({
                selector: '.animate-fade-slide-in .item'
            });
        }, 50);





        // follia animazione da rifare bene con angualr animation


        $scope.fxscroll = function () {


            var positionScroll = $ionicScrollDelegate.getScrollPosition().top;
            var el = document.getElementById('profileSlideBox'); //slide container
            var elimg = document.getElementsByClassName('imgslide'); // image
            var elavatar = document.getElementsByClassName('profile-avatar'); // avatar image
            var profile = document.getElementById('profile');

            var width = window.innerWidth
                || document.documentElement.clientWidth
                || document.body.clientWidth;

            var height = 285;
            var avatarHeight = 220;
            var blur = 0;

            if (width >= 768) {
                height = 550;
                avatarHeight = 400;
                profile.style.paddingTop = "550px";
            }

            var slideHeight = (height + (positionScroll * -1)) + 'px';
            var avatardim = (avatarHeight + (positionScroll * -1));

            el.style.height = slideHeight;

            if (avatardim < width - 40) {
                elavatar[0].style.height = avatardim + 'px';
                elavatar[0].style.width = avatardim + 'px';
            }

            for (var i = 0; i < elimg.length; i++) {
                elimg[i].style.height = slideHeight;
            }

            if (avatardim < width - 40) {
                elavatar[0].style.height = avatardim + 'px';
                elavatar[0].style.width = avatardim + 'px';
            }

            if (positionScroll < 120) {
                blur = 0;
            } else {
                blur = 2;
            }

            el.style['-webkit-filter'] = 'blur('+blur+'px)';

        }


    });