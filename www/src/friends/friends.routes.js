angular.module('app')
    .config(function ($stateProvider) {

        $stateProvider
            .state('main.people', {
                url  : "/people",
                views: {
                    'people-tab': {
                        templateUrl: "src/friends/tmpl/friends.tmpl.html",
                        controller : "FriendsController as frsCtrl",
                        resolve : {
                            friends : function($timeout,$q,FriendsFactory){
                                var deferred = $q.defer();
                                FriendsFactory.get()
                                    .then(function (response) {
                                        deferred.resolve(response.data.friends);
                                    },function(error){
                                        deferred.reject(error);
                                    });

                                return deferred.promise;
                            }
                        }
                    }
                }
            })

            .state('main.friendprofile', {
                url  : "/people-profile/:id",
                cache: false,
                views: {
                    'people-tab': {
                        templateUrl: "src/friends/tmpl/friend.tmpl.html",
                        controller : "FriendController as frCtrl",
                        resolve : {
                            friend : function($timeout,$q,FriendsFactory,$stateParams){
                                var deferred = $q.defer();

                                FriendsFactory.getFriendDetail($stateParams.id)
                                    .then(function (response) {
                                        deferred.resolve(response.data.friend);
                                    },function(error){
                                        deferred.reject(error);
                                    });

                                return deferred.promise;
                            }
                        }
                    }
                }
            });

    });