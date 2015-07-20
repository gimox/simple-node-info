angular.module('app')
    .config(function ($stateProvider) {

        $stateProvider
            .state('main.people', {
                url  : "/people",
                cache:false,
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

            .state('main.askfriend', {
                url  : "/people-ask",
                cache: false,
                views: {
                    'people-tab': {
                        templateUrl: "src/friends/tmpl/askfriends.tmpl.html",
                        controller : "AskFriendsController as askfrsCtrl",
                        resolve : {
                            ask : function($timeout,$q,FriendsFactory){
                                var deferred = $q.defer();
                                FriendsFactory.getAsk()
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

            .state('main.askprofile', {
                url  : "/people-profile-ask/:id",
                cache: false,
                views: {
                    'people-tab': {
                        templateUrl: "src/friends/tmpl/askfriend.tmpl.html",
                        controller : "AskFriendController as askfrCtrl",
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