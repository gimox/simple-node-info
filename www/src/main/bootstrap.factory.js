'use strict';
angular.module('app')
    .factory('BootstrapFactory', function ($q, $rootScope, store, $http, API_URL, storage) {

        function get() {

            var deferred = $q.defer();
            var token = store.get('qoojoin.auth-token');

            if (storage.get('user')) {
                deferred.resolve(storage.get('user'));

            } else if (token) {

                $http.get(API_URL + '/users/profile/full')
                    .then(function success(response) {
                        if (response.data.user) {
                            storage.set('user', response.data.user);
                            deferred.resolve(response.data.user);
                        } else {
                            //  deferred.reject(err);
                            deferred.resolve({error: 2, message: err});
                        }
                    })

                    .catch(function (err) {
                        deferred.resolve({error: 1, message: err});
                        // deferred.reject({error:1,message:err});
                    });
            }

            return deferred.promise;
        }


        return {
            get: get
        }
    });
