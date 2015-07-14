angular.module('app')
    .controller('SearchProfileController', function ($scope,user,UtilsFactory,friend,SettingsFactory,ImageFactory,$ionicActionSheet, $timeout,$ionicScrollDelegate) {

        $scope.friend = friend;

        var typeImg = ImageFactory.getType();
        $scope.img1 = ImageFactory.getImgProfile($scope.friend.image.profile, typeImg[0], 1);
        $scope.img2 = ImageFactory.getImgProfile($scope.friend.image.profile, typeImg[1]);
        $scope.img3 = ImageFactory.getImgProfile($scope.friend.image.profile, typeImg[2]);
        $scope.img4 = ImageFactory.getImgProfile($scope.friend.image.profile, typeImg[3]);
        $scope.img5 = ImageFactory.getImgProfile($scope.friend.image.profile, typeImg[4]);
        $scope.img6 = ImageFactory.getImgProfile($scope.friend.image.profile, typeImg[5]);

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


        this.hideFriend = function(id) {
            alert(id);
        };

        this.setFriend = function(id) {
            alert(id);
        };


        $scope.fxscroll = function () {

            var positionScroll = $ionicScrollDelegate.getScrollPosition().top;
            var el = document.getElementById('profileSearchNearSlidebox'); //slide containerr
            var elimg = document.getElementsByClassName('imgslideNear'); // image
            var profile = document.getElementById('search-profile');

            var width = window.innerWidth
                || document.documentElement.clientWidth
                || document.body.clientWidth;

            var height = 285;
            var blur = 0;

            if (width >= 768) {
                height = 550;
                profile.style.paddingTop = "550px";
            }

            var slideHeight = (height + (positionScroll * -1)) + 'px';

            el.style.height = slideHeight;

            for (var i = 0; i < elimg.length; i++) {
                elimg[i].style.height = slideHeight;
            }


            if (positionScroll < 120) {
                blur = 0;
            } else {
                blur = 2;
            }

            el.style['-webkit-filter'] = 'blur(' + blur + 'px)';

        }

    });