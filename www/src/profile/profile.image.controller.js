angular.module('app')
    .controller('ProfileImageController', function (user, AuthTokenFactory, API_URL, $scope, storage, ImageFactory, $ionicActionSheet, $timeout, ProfileFactory, $ionicLoading, $cordovaCamera, $cordovaFileTransfer) {

        $scope.images = [];
        $scope.userdata = storage.get('user');

        var typeImg = ImageFactory.getType();
        var defaultImg = 'img/thumb-photo.jpg';

        var img1 = ImageFactory.getImgProfile($scope.userdata.image.profile, typeImg[0], 1, defaultImg);
        var img2 = ImageFactory.getImgProfile($scope.userdata.image.profile, typeImg[1], 1, defaultImg);
        var img3 = ImageFactory.getImgProfile($scope.userdata.image.profile, typeImg[2], 1, defaultImg);
        var img4 = ImageFactory.getImgProfile($scope.userdata.image.profile, typeImg[3], 1, defaultImg);
        var img5 = ImageFactory.getImgProfile($scope.userdata.image.profile, typeImg[4], 1, defaultImg);
        var img6 = ImageFactory.getImgProfile($scope.userdata.image.profile, typeImg[5], 1, defaultImg);

        $scope.images.push(img1);
        $scope.images.push(img2);
        $scope.images.push(img3);
        $scope.images.push(img4);
        $scope.images.push(img5);
        $scope.images.push(img6);

        $scope.imageAction = function (index, img) {

            var destructiveText = 'Elimina';

            if (img == defaultImg) {
                destructiveText = '';
            }

            var hideSheet = $ionicActionSheet.show({
                buttons                 : [
                    {text: 'Scatta Foto'},
                    {text: 'Libreria Foto'}
                ],
                destructiveText         : destructiveText,
                titleText               : 'Gestisci la tua foto',
                cancelText              : 'Annulla',
                cancel                  : function () {
                    return true;
                },
                buttonClicked           : function (indexButton) {


                    if (indexButton === 0) {

                        console.log('camera');
                        camera(index,1);
                        return true;
                    }

                    if (indexButton === 1) {
                        camera(index,2);
                        return true;
                    }

                    return true;
                },
                destructiveButtonClicked: function () {

                    removeImage(index, img);
                    return true;
                }
            });

            // For example's sake, hide the sheet after two seconds
            $timeout(function () {
                hideSheet();
            }, 12000);
        };


        function removeImage(index, img) {

            $ionicLoading.show({
                template: 'Rimuovo immagine...'
            });

            var imgType = typeImg[index];

            $scope.userdata.image.profile[imgType] = null;
            $scope.user = angular.copy($scope.userdata);

            storage.set('user', $scope.user);
            $scope.images[index] = defaultImg;

            ProfileFactory.deleteImage(imgType)
                .then(function (response) {
                    $ionicLoading.hide();

                    if (!response.data.error) {
                        console.log(response.data);
                        $scope.images[index] = defaultImg;
                        $scope.user = response.data.user;
                        $scope.userdata = response.data.user;

                        storage.set('user', $scope.user);
                    } else {
                        onError(response.data.err);
                    }
                }, onError);
        }


        function onError(err) {
            console.log(err);
            $ionicLoading.hide();
        }


        function camera(index,cameraType) {

            console.log('into camera');
            var options = {
                quality         : 50,
                destinationType : Camera.DestinationType.FILE_URI,
               // sourceType      : Camera.PictureSourceType.CAMERA,
                allowEdit       : true,
                encodingType    : Camera.EncodingType.JPEG,
                targetWidth     : 768,
                targetHeight    : 768,
                // popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false
            };

            if(cameraType===1) {
                options.sourceType = Camera.PictureSourceType.CAMERA;
            }else {
                options.sourceType = Camera.PictureSourceType.PHOTOLIBRARY;
            }

            $cordovaCamera.getPicture(options).then(function (imageData) {

                $ionicLoading.show({
                    template: 'Sincronizzo i dati..'
                });

                var token = AuthTokenFactory.getToken();
                var opt = {
                    headers: {
                        Authorization: "Bearer " + token,
                        Imgpos       : index
                    }
                };

                $cordovaFileTransfer.upload(API_URL + '/users/imageUpload', imageData, opt)
                    .then(function (result) {
                        // Success!
                        console.log('RESULT ', result.response);
                        var r = JSON.parse(result.response);

                        if (r.url) {
                            $scope.images[index] = r.url;
                            $scope.user = r.user;
                            $scope.userdata = r.user;
                            storage.set('user', $scope.user);
                        } else {
                            console.log('risposta non corretta url non esiste');
                        }

                        $ionicLoading.hide();

                    }, function (err) {
                        // Error
                        console.log('err', err);
                        $ionicLoading.hide();

                    }, function (progress) {
                        console.log('*******PROGRESS', progress);
                        // constant progress updates
                    });


            }, function (err) {
                $ionicLoading.hide();
            });

        }


    });