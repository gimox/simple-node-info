'use strict';
angular.module('app')
    .factory('AuthFactory', function ($http, API_URL, AuthTokenFactory,$ionicHistory) {


        function signinLocal(params) {

            return $http.post(API_URL + '/auth/signin', params, {skipAuthorization: true})
                .then(function success(response) {

                    AuthTokenFactory.setToken(response.data.token);

                    if (response.data.refreshToken) {
                        AuthTokenFactory.setRefreshToken(response.data.refreshToken);
                    }

                    return response;
                });
        }

        function logout() {
            ionic.Platform.exitApp();
            $ionicHistory.clearCache();
            $ionicHistory.clearHistory();

          //  DBfactory.reset();
            AuthTokenFactory.setToken();
            AuthTokenFactory.setRefreshToken();
        }



        return {
            signinLocal: signinLocal,
            logout: logout
        };

    });