angular.module('app')

    .config(function ($httpProvider, jwtInterceptorProvider) {
        'use strict';
        jwtInterceptorProvider.tokenGetter = ['config', 'jwtHelper', '$http', 'API_URL', '$window', 'store', '$state', function (config, jwtHelper, $http, API_URL, $window, store, $state) {

            /**
             * very important, not remove or infinite loop!
             * disable token check in login
             * $state arrive later on start app ->fix add config.url
             *
             */
            /*
             if ($state.current.name.substr(0, 5) === 'login' || config.url.substr(0, 9) === 'src/login') {
             return null;
             }
             */
            // var x = tokenFromStorage.get(); // call token from SQL LITE and add to local storage
            //  console.log(x);


            var token        = store.get('qoojoin.auth-token'),
                refreshToken = store.get('qoojoin.refresh-token');

            if ($state.current.name.substr(0, 5) === 'login' || config.url.substr(0, 9) === 'src/login') {
                return null;
            }

            try {
                if (jwtHelper.isTokenExpired(token)) {

                    return $http({
                        url              : API_URL + '/refreshToken',
                        skipAuthorization: true,
                        method           : 'POST',
                        data             : {
                            refreshToken: refreshToken
                        }
                    }).then(function (response) {
                        var token = response.data.token;

                        if (token) {
                            store.set('qoojoin.auth-token', token);
                            return token;
                        }

                        $state.go('login.sign-in');
                    });

                } else {
                    return token;
                }

            } catch (ex) {
                $state.go('login.sign-in');
            }

        }];

        $httpProvider.interceptors.push('jwtInterceptor');
    })

    .factory('AuthTokenFactory', function AuthTokenFactory(store) {
        'use strict';

        var key = 'qoojoin.auth-token';
        var keyRefresh = 'qoojoin.refresh-token';


        function getToken() {
            return store.get(key);
        }

        function getRefreshToken() {
            return store.get(getRefreshToken);
        }

        function setToken(token) {
            if (token) {
                store.set(key, token);
            } else {
                store.remove(key);
            }
        }

        function setRefreshToken(token) {
            if (token) {
                store.set(keyRefresh, token);
            } else {
                store.remove(keyRefresh);
            }
        }

        function removeAll() {
            setRefreshToken();
            setToken();
        }

        function isAuth() {
            return getToken() ? true : false;
        }

        return {
            getToken       : getToken,
            getRefreshToken: getRefreshToken,
            setToken       : setToken,
            setRefreshToken: setRefreshToken,
            removeAll      : removeAll,
            isAuth         : isAuth
        };

    });
