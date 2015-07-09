'use strict';
angular.module('app')
    .factory('FriendsFactory', function ($http, API_URL) {

        function get() {
            return  $http.get(API_URL + '/friends/getAllFriends')
                .then(function success(response) {
                    return response;
                });
        }

        function getFriendDetail(id){

            return  $http.get(API_URL + '/friends/getFriendDetail/'+id)
                .then(function success(response) {
                    return response;
                });
        }



        return {
            get:get,
            getFriendDetail: getFriendDetail
        }

    });