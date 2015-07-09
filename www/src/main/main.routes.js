angular.module('app')
    .config(function ($stateProvider) {

        $stateProvider
            .state('main', {
                url        : "/main",
                abstract   : true,
                templateUrl: "src/main/tmpl/main.tmpl.html",
                controller: "MainController as mainCtrl",
                resolve    : {


                    user: ['$q', '$rootScope', 'store', '$http', 'API_URL','storage', function ($q, $rootScope, store, $http, API_URL,storage) {


                        var deferred = $q.defer();
                        var token = store.get('qoojoin.auth-token');

                        if(storage.get('user')){
                            deferred.resolve(storage.get('user'));

                        } else if (token) {

                            $http.get(API_URL + '/users/profile/full')
                                .then(function success(response) {

                                    if (response.data.user) {


                                        storage.set('user',response.data.user);

                                        deferred.resolve(response.data.user);
                                    }else {
                                        deferred.reject(err);
                                    }

                                })

                                .catch(function (err) {
                                    deferred.reject(err);
                                });
                        }

                        return deferred.promise;

                    }]
                }
            })

    });