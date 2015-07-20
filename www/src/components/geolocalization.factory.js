'use strict';
angular.module('app')
    .factory('GelolocFactory', function ($q, $state, $ionicPlatform, $ionicPopup, $cordovaGeolocation, $cordovaBackgroundGeolocation, storage, $log, $timeout, $rootScope) {

        var options = {};
        var position = false;
        var error = false;

        function start() {

            console.log('BACKGROUND GEOLOC STARTED');

            var user = storage.get('user');

            if (user.visibility && user.visibility.hasOwnProperty('v_set_hide_profile') && user.visibility.v_set_hide_profile == 1) {

            }

            $ionicPlatform.ready(function () {

                try {
                    $cordovaBackgroundGeolocation.configure(options)
                        .then(
                        null, // Background never resolves
                        function (err) { // error callback
                            console.error(err);
                            error = err;
                        },

                        function (location) { // notify callback
                            console.log('Background geolocalization: ', location);

                            position = {
                                lat: location.latitude,
                                lng: location.longitude
                            };

                            sendPosition({
                                id_user: 1,
                                lat    : location.latitude,
                                lng    : location.longitude
                            });

                            error = false;
                            $rootScope.$broadcast('position', position, location);
                        });
                } catch (e) {
                    console.log('GEOLOC error', e);
                    error = e;
                }
            });
        }


        function sendPosition(params) {

            return $http.post(API_URL + '/position/insertPosition', params)
                .then(function success(response) {
                    console.log('Background geoloc response: ', response.data);
                })
                .catch(function (err) {
                    console.log('ERROR backgorund geoloc',err);
                })

        }


        function addPositionToUser(position) {
            var user = storage.get('user');
            user.position = position;
            storage.set('user', user);
        }

        function get() {
            return position;
        }

        function checkGps() {
            return error;
        }

        function stop() {
            $ionicPlatform.ready(function () {
                $cordovaBackgroundGeolocation.stop();
            })
        }

        /**
         * get position
         *
         * @returns {*}
         */
        function getPosition(backstate) {
            var posOptions = {timeout: 10000, enableHighAccuracy: false};
            var deferred = $q.defer();

            $cordovaGeolocation
                .getCurrentPosition(posOptions)
                .then(function (pos) {
                    position = {
                        lat: pos.coords.latitude,
                        lng: pos.coords.longitude
                    };

                    deferred.resolve(position);


                }, function (err) {

                    $ionicPopup.alert({
                        title   : 'GPS error',
                        template: 'Posizione Gps non rilevata. Assicurati di aver attivato il GPS e aver dato i permessi nelle impostazioni di sistema err:' + err.code
                    }).then(function (res) {
                        if (backstate) {
                            $state.go(backstate);
                        }
                    });


                    deferred.reject(err);
                });

            return deferred.promise;
        }


        return {
            start      : start,
            stop       : stop,
            get        : get,
            checkGps   : checkGps,
            getPosition: getPosition
        }
    });