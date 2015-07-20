'use strict';
angular.module('app')
    .factory('ImageFactory', function (storage) {

        var defaultImg = 'img/thumb-profile.jpg';


        var typeimage = [
            'avatar',
            'background_primary',
            'background_secondary',
            'background_3',
            'background_4',
            'background_5'
        ];


        function getAvatarImage() {

            var user = storage.get('user');

            if (!user) {
                return defaultImg;
            }

            if (!user.image) {
                return defaultImg;
            }

            if (!user.image.hasOwnProperty('profile')) {
                return defaultImg;
            }

            if (!user.image.profile.avatar) {
                return defaultImg;
            }

            return user.image.profile.avatar;
        }


        function getImgProfile(images, position, setDefault, customimage) {


            var imgdf = defaultImg;

            if (customimage) {
                imgdf = customimage;
            }


            if (!images[position]) {

                if (setDefault) {
                    return imgdf;
                }
                return false;
            }


            return images[position];
        }


        function getImg(img) {
            if (!img) {
                return defaultImg;
            }

            return img;
        }


        function getType() {
            return typeimage;
        }


        function getAllImage(userImage) {
            var imageType = getType();
            var images = [];

            for (var i = 0; i < imageType.length; i++) {

                var setDefault = 0;

                if(i==0){
                    setDefault=1;
                } else {
                    setDefault=0;
                }

               var img =  getImgProfile(userImage, imageType[i], setDefault);
                if(img) {
                    images.push(img);
                }
            }

            return images;


        }


        return {
            getAvatarImage: getAvatarImage,
            getImgProfile : getImgProfile,
            getImg        : getImg,
            getType       : getType,
            getAllImage   : getAllImage
        }

    })


    .directive('defaultSrc', function () {
        return {
            link: function postLink(scope, element, attrs) {
                element.bind('error', function () {
                    angular.element(this).attr("src", attrs.defaultSrc);
                });
            }
        }
    });