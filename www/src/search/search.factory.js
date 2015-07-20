'use strict';
angular.module('app')
    .factory('SearchFactory', function ($http, API_URL, storage, GelolocFactory) {


        function get(params) {
            var user = storage.get('user');

            var pos= GelolocFactory.get();
            user.position = pos;

            var obj = angular.extend({}, {user: user}, params);

            return $http.post(API_URL + '/matching/getMatchFriends', obj)
                .then(function success(response) {

                    return response;
                });

        }


        return {
            get: get
        }

    });