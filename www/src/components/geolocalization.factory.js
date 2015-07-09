'use strict';
angular.module('app')
    .factory('GelolocFactory', function ($ionicPlatform, $cordovaBackgroundGeolocation, storage, $log, $timeout, $rootScope) {

        var options = {};
        var position = {};

        function start() {

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
                        },
                        function (location) { // notify callback
                            console.log('******LOCATION');
                            position = location;
                            addPositionToUser(position);
                            $rootScope.$broadcast('position', location);
                        });
                } catch (e) {
                    console.log('GEOLOC error', e);
                }
            });

        }

        function addPositionToUser(location) {
            var user = storage.get('user');

            user.position = {
                lat: location.latitude,
                lng: location.longitude
            };

            storage.set('user', user);
        }

        function get() {
            return position;
        }


        function stop() {
            $ionicPlatform.ready(function () {
                $cordovaBackgroundGeolocation.stop();
            })

        }


        return {
            start: start,
            stop : stop,
            get  : get
        }
    });