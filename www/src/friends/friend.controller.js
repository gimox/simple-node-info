angular.module('app')
    .controller('FriendController', function ($scope, user, UtilsFactory, friend, SettingsFactory, ImageFactory, $ionicActionSheet, $timeout,$ionicScrollDelegate,$ionicSlideBoxDelegate) {

        $scope.friend = friend;
        $scope.images = [];
        $scope.images = ImageFactory.getAllImage($scope.friend.image.profile);


/*
        var typeImg = ImageFactory.getType();
        $scope.img1 = ImageFactory.getImgProfile($scope.friend.image.profile, typeImg[0], 1);
        $scope.img2 = ImageFactory.getImgProfile($scope.friend.image.profile, typeImg[1]);
        $scope.img3 = ImageFactory.getImgProfile($scope.friend.image.profile, typeImg[2]);
        $scope.img4 = ImageFactory.getImgProfile($scope.friend.image.profile, typeImg[3]);
        $scope.img5 = ImageFactory.getImgProfile($scope.friend.image.profile, typeImg[4]);
        $scope.img6 = ImageFactory.getImgProfile($scope.friend.image.profile, typeImg[5]);
        */


        if ($scope.friend.base && $scope.friend.base.born_date) {
            $scope.age = UtilsFactory.age($scope.friend.base.born_date);
        }

        this.getIncons = function (name) {
            return SettingsFactory.getInterestIcon(name);
        };

        this.getInterestName = function (key) {
            return SettingsFactory.getInterestName(key);
        };


        $scope.openAction = function () {

            // Show the action sheet
            var hideSheet = $ionicActionSheet.show({
                buttons        : [
                    {text: 'SEGNALA'},
                    {text: 'BLOCCA'}
                ],
                destructiveText: 'ELIMINA',
                //   titleText: 'Intrapprendi una azione',
                cancelText     : 'CANCELLA',
                cancel         : function () {
                    // add cancel code..
                },
                buttonClicked  : function (index) {
                    return true;
                }
            });

            // For example's sake, hide the sheet after two seconds
            $timeout(function () {
                hideSheet();
            }, 10000);

        };

/*
        $scope.fxscroll = function () {
            $ionicSlideBoxDelegate.update();

            var positionScroll = $ionicScrollDelegate.getScrollPosition().top;
            var el = document.getElementById('profileFriendSlidebox'); //slide containerr
            var elimg = document.getElementsByClassName('imgslideFriend'); // image
            var profile = document.getElementById('friend');

            var width = window.innerWidth
                || document.documentElement.clientWidth
                || document.body.clientWidth;

            var height = 285;
            var blur = 0;

            if (width >= 768) {
                height = 550;
               // profile.style.paddingTop = "550px";
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
        */


    });