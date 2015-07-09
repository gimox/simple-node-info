'use strict';
angular.module('app')
    .factory('ImageFactory', function (storage) {

        var defaultImg = 'img/thumb-profile.jpg';

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


        function getImgProfile(images, position, setDefault) {


            if (!images[position]) {

                if (setDefault) {
                    return defaultImg;
                }
                return false;
            }


            return images[position];
        }



        function getImg(img){
            if(!img){
                return defaultImg;
            }

            return img;
        }



        return {
            getAvatarImage: getAvatarImage,
            getImgProfile : getImgProfile,
            getImg: getImg
        }


    });