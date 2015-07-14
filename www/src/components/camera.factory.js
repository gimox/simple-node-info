'use strict';
angular.module('app')
    .factory('CameraFactory', function ($cordovaCamera) {

        var options = {
            quality         : 50,
            destinationType : Camera.DestinationType.DATA_URL,
            sourceType      : Camera.PictureSourceType.CAMERA,
            allowEdit       : true,
            encodingType    : Camera.EncodingType.JPEG,
            targetWidth     : 768,
            targetHeight    : 768,
            // popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };


        function popoverOpt() {
            options.popoverOptions = "";
        }


        /**
         * @description
         * set source type:
         * 1 for library
         * 0 for camera
         *
         * @param type
         */
        function setSource(stype) {
            if (stype == 1) {
                options.sourceType = Camera.PictureSourceType.CAMERA;
            } else {
                options.sourceType = Camera.PictureSourceType.PHOTOLIBRARY;
            }

        }

        function get(source) {
            if (!window.cordova) {
                $log.debug('camera is not implemented in browser mode (error if you are inside mobile app) ');
            }

            setSource(source);

            return $cordovaCamera.getPicture(options).then(cameraSuccess, cameraError);

        }


        function cameraSuccess(imageURL) {
            return imageUrl;
        }


        function cameraError(error) {
            return error;
        }

        return {
            get : get
        }
    });