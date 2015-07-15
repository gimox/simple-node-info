'use strict';
angular.module('app')
    .directive('slider', function () {

        return {
            transclude  : true,
            restrict    : 'E',
            templateUrl : 'src/components/slider/slider.tmpl.html',
            controller  : function ($scope, $ionicScrollDelegate, ionicMaterialMotion, $timeout) {

                $scope.slideStyle = {};
                $scope.avatarStyle = {};
                $scope.imgStyle = {};


                $timeout(function () {
                    ionicMaterialMotion.fadeSlideInRight({
                        selector: '.animate-fade-slide-in .item'
                    });
                }, 50);

                var width = window.innerWidth
                    || document.documentElement.clientWidth
                    || document.body.clientWidth;


                this.fxscroll = function () {

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

                    var avatardim = (avatarHeight + (positionScroll * -1));
                    avatardim = (avatardim < 0) ? 0 : avatardim;
                    if (avatardim < width - 40) {
                        $scope.avatarStyle = {
                            'height': avatardim + 'px',
                            'width' : avatardim + 'px'
                        }
                    }

                    if (positionScroll > 80) {
                        blur = 0.5;
                    }

                    if (positionScroll > 100) {
                        blur = 1;
                    }

                    if (positionScroll > 120) {
                        blur = 2;
                    }

                    $scope.imgStyle = {
                        'height': slideHeight + 'px'
                    };

                    $scope.slideStyle = {
                        height: slideHeight + 'px'
                    };

                    if (ionic.Platform.isIOS()) $scope.slideStyle['-webkit-filter'] = 'blur(' + blur + 'px)';

                    $scope.$apply();
                }


            },
            controllerAs: 'sliderCtrl'
        };

    })
    .directive('sliderFull', function () {

        return {
            transclude  : true,
            restrict    : 'E',
            templateUrl : 'src/components/slider/sliderFull.tmpl.html',
            controller  : function ($scope, $ionicScrollDelegate, ionicMaterialMotion, $timeout) {

                $scope.slideStyle = {};
                $scope.imgStyle = {};


                $timeout(function () {
                    ionicMaterialMotion.fadeSlideInRight({
                        selector: '.animate-fade-slide-in .item'
                    });
                }, 50);


                var width = window.innerWidth
                    || document.documentElement.clientWidth
                    || document.body.clientWidth;


                this.fxscroll = function () {

                    var positionScroll = $ionicScrollDelegate.getScrollPosition().top;
                    var height = 285;

                    var blur = 0;

                    if (width >= 768) {
                        height = 550;
                    }

                    var slideHeight = (height + (positionScroll * -1));
                    slideHeight = (slideHeight < 1) ? 1 : slideHeight;

                    if (positionScroll > 80) {
                        blur = 0.5;
                    }

                    if (positionScroll > 100) {
                        blur = 1;
                    }

                    if (positionScroll > 120) {
                        blur = 2;
                    }

                    $scope.imgStyle = {
                        'height': slideHeight + 'px'
                    };

                    $scope.slideStyle = {
                        'height': slideHeight + 'px'

                    };

                    if (ionic.Platform.isIOS()) $scope.slideStyle['-webkit-filter'] = 'blur(' + blur + 'px)';

                    $scope.$apply();
                }


            },
            controllerAs: 'sliderFullCtrl'
        };

    });