'use strict';
angular.module('app')
    .factory('SettingsFactory', function ($http, API_URL) {

        var interests = {
            male  : {'icon': 'icon-my-ionicons-male', 'name': 'Uomo', 'key': 'male'},
            female: {'icon': 'icon-my-ionicons-female', 'name': 'Donna', 'key': 'female'},
            couple: {'icon': 'icon-my-ionicons-couple', 'name': 'Entrambi', 'key': 'couple'},
            crew  : {'icon': 'icon-my-ionicons-group', 'name': 'Gruppo', 'key': 'crew'},
            join  : {'icon': 'icon-my-ionicons-join', 'name': 'Emozioni', 'key': 'join'},
            fun   : {'icon': 'icon-my-ionicons-fun', 'name': 'Divertimento', 'key': 'fun'},
            tour  : {'icon': 'icon-my-ionicons-tour', 'name': 'Viaggi', 'key': 'tour'},
            play  : {'icon': 'icon-my-ionicons-play', 'name': 'Sport', 'key': 'play'}
        };

        /**
         * in settings visibility, campo mostra
         * @returns {*[]}
         */
        function getGenderView() {
            return [
                {name: "Uomini e Donne", value: 0},
                {name: "Solo Donne", value: 1},
                {name: "Solo Uomini", value: 2}
            ]
        }

        function getGender() {
            return [
                {name: 'Uomo', value: "M"},
                {name: 'Donna', value: "F"}
            ]
        }

        function updateVisibility(params) {
            return $http.post(API_URL + '/settings/visibility', params)
                .then(function success(response) {
                    return response;
                });
        }

        function updateAppSettings(params) {
            return $http.post(API_URL + '/settings/application', params)
                .then(function success(response) {

                    return response;
                });
        }

        function updateInterests(params) {
            return $http.post(API_URL + '/settings/interests', params)
                .then(function success(response) {
                    return response;
                });
        }

        function getInterestIcon(name) {
            if (interests[name]) {
                return interests[name].icon;
            }

            return false;
        }

        function getInterestName(key) {
            if (interests[key]) {
                return interests[key].name;
            }

            return false;
        }

        function getInterests() {
            return interests;
        }

        function getInterestsAsArray() {
            var ar = [];
            angular.forEach(interests, function (value, key) {
                ar.push(value);
            });
            return ar;
        }

        return {
            getGenderView      : getGenderView,
            getGender          : getGender,
            updateVisibility   : updateVisibility,
            updateAppSettings  : updateAppSettings,
            updateInterests    : updateInterests,
            getInterestIcon    : getInterestIcon,
            getInterests       : getInterests,
            getInterestsAsArray: getInterestsAsArray,
            getInterestName    : getInterestName
        }

    });