angular.module('app')
    .config(function ($stateProvider) {
        $stateProvider
            .state('main.search', {
                url  : "/search",
                views: {
                    'search-tab': {
                        templateUrl: "src/search/tmpl/search.tmpl.html",
                        controller: "SearchController as SearchCtrl"
                    }
                }
            })
            .state('main.search-near', {
                url  : "/search-near",
               // cache: false,
                views: {
                    'search-tab': {
                        templateUrl: "src/search/tmpl/search.near.tmpl.html",
                        controller: "SearchNearController as SrcNearCtrl"
                    }
                }
            })

            .state('main.search-match', {
                url  : "/search-match",
                // cache: false,
                views: {
                    'search-tab': {
                        templateUrl: "src/search/tmpl/search.match.tmpl.html",
                        controller: "SearchMatchController as SrcMatchCtrl"
                    }
                }
            })

            .state('main.search-profile', {
                url  : "/search-profile/:id",
                views: {
                    'search-tab': {
                        templateUrl: "src/search/tmpl/search.profile.tmpl.html",
                        controller : "SearchProfileController as srcprCtrl",
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