'use strict';
angular.module('app')
    .factory('ProfileFactory', function ($http, API_URL) {

        function update(params) {

            delete params.id_user;
            delete params.num_friends;
            delete params.email;

            console.log(params);

            return $http.post(API_URL + '/users/update', params)
                .then(function success(response) {
                    return response;
                });
        }


        function deleteImage(imgtype) {
            return $http.put(API_URL + '/users/deleteImage/' + imgtype)
                .then(function success(response) {
                    return response;
                });
        }


        return {
            update     : update,
            deleteImage: deleteImage
        }

    });