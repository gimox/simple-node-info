'use strict';
angular.module('app')
    .factory('FriendsFactory', function ($http, API_URL, $ionicLoading, $ionicPopup, $q) {

        /**
         * list all friends
         *
         * @returns {*}
         */
        function get() {
            return $http.get(API_URL + '/friends/getAllFriends')
                .then(function success(response) {
                    return response;
                });
        }

        /**
         * return full friend profile like user
         * @param id
         * @returns {*}
         */
        function getFriendDetail(id) {

            return $http.get(API_URL + '/friends/getFriendDetail/' + id)
                .then(function success(response) {
                    return response;
                });
        }

        /**
         * exec friendship
         *
         * @param id
         * @returns {*}
         */
        function friendship(id) {

            return $http.get(API_URL + '/friends/friendship/' + id)
                .then(function success(response) {
                    return response;
                });
        }

        /**
         * add  ask friend
         * if isCount return count
         *
         * @param isCount
         * @returns {*}
         */
        function getAsk(isCount) {

            var params = "";

            if (isCount) {
                params = "?count=1";
            }

            return $http.get(API_URL + '/friends/getAskFriends' + params)
                .then(function success(response) {
                    return response;
                });
        }

        /**
         * set ask
         *
         * @param id
         * @returns {*}
         */
        function setAsk(id) {
            return $http.get(API_URL + '/friends/askFriend/' + id)
                .then(function success(response) {
                    return response;
                });
        }

        /**
         * remove ask friend
         * @param id
         * @returns {*}
         */
        function deleteAsk(id) {

            return $http.get(API_URL + '/friends/deleteAskFriend/' + id)
                .then(function success(response) {
                    return response;
                });
        }

        /**
         * remove friend
         * @param id
         * @returns {*}
         */
        function removeFriend(id) {
            return $http.get(API_URL + '/friends/deleteFriend/' + id)
                .then(function success(response) {
                    return response;
                });
        }


        function deleteAskFriend(id) {
            var deferred = $q.defer();

            $ionicLoading.show({
                template: 'invio la richiesta...'
            });

            deleteAsk(id)
                .then(function (response) {
                    $ionicLoading.hide();

                    console.log(response);
                    if (response.data.hasOwnProperty('friend')) {

                        $ionicPopup.alert({
                            title   : 'Invito consegnato',
                            template: 'Il tuo invito è stato consegnato.'
                        }).then(function (res) {
                            deferred.resolve({'success': true});
                        });

                    } else {

                        var alertPopup = $ionicPopup.alert({
                            title   : 'Errore',
                            template: 'L\'invito non è stato recapitato, verifica di avere connessione e riprova più tardi'
                        });

                        alertPopup.then(function (res) {
                            deferred.reject({'error': 1});
                        });
                    }
                },
                function (err) {
                    $ionicLoading.hide();
                    console.log(err);

                    $ionicPopup.alert({
                        title   : 'Errore',
                        template: 'L\'invito non è stato recapitato, verifica di avere connessione e riprova più tardi'
                    }).then(function (res) {
                        deferred.reject({'error': 2});
                    });
                });


            return deferred.promise;


        }

        function getAskFriend(id) {

            var deferred = $q.defer();

            $ionicLoading.show({
                template: 'invio la richiesta...'
            });

            setAsk(id)
                .then(function (response) {
                    $ionicLoading.hide();

                    console.log(response);
                    if (response.data.hasOwnProperty('friend')) {

                        $ionicPopup.alert({
                            title   : 'Invito consegnato',
                            template: 'Il tuo invito è stato consegnato.'
                        }).then(function (res) {
                            deferred.resolve({'success': true});
                        });

                    } else {

                        var alertPopup = $ionicPopup.alert({
                            title   : 'Errore',
                            template: 'L\'invito non è stato recapitato, verifica di avere connessione e riprova più tardi'
                        });

                        alertPopup.then(function (res) {
                            deferred.reject({'error': 1});
                        });
                    }
                },
                function (err) {
                    $ionicLoading.hide();
                    console.log(err);

                    $ionicPopup.alert({
                        title   : 'Errore',
                        template: 'L\'invito non è stato recapitato, verifica di avere connessione e riprova più tardi'
                    }).then(function (res) {
                        deferred.reject({'error': 2});
                    });
                });


            return deferred.promise;


        }


        function _blockFriend(id) {
            return $http.get(API_URL + '/friends/blockFriend/' + id)
                .then(function success(response) {
                    return response;
                });
        }


        function blockFriend(id) {

            var deferred = $q.defer();

            $ionicLoading.show({
                template: 'invio la richiesta...'
            });

            _blockFriend(id)
                .then(function (response) {
                    $ionicLoading.hide();

                    console.log(response);
                    if (response.data.hasOwnProperty('friend')) {

                        $ionicPopup.alert({
                            title   : 'Fatto!',
                            template: 'Utente bloccato, da questo momento non comparirà più nel tuo match.'
                        }).then(function (res) {
                            deferred.resolve({'success': true});
                        });

                    } else {

                        var alertPopup = $ionicPopup.alert({
                            title   : 'Errore',
                            template: 'Non è stato possibile eseguire questa operazione, riprova più tardi'
                        });

                        alertPopup.then(function (res) {
                            deferred.reject({'error': 1});
                        });
                    }
                },
                function (err) {
                    $ionicLoading.hide();
                    console.log(err);

                    $ionicPopup.alert({
                        title   : 'Errore',
                        template: 'L\'invito non è stato recapitato, verifica di avere connessione e riprova più tardi'
                    }).then(function (res) {
                        deferred.reject({'error': 2});
                    });
                });


            return deferred.promise;

        }


        return {
            get            : get,
            getFriendDetail: getFriendDetail,
            friendship     : friendship,
            getAsk         : getAsk,
            deleteAsk      : deleteAsk,
            removeFriend   : removeFriend,
            setAsk         : setAsk,
            getAskFriend   : getAskFriend,
            blockFriend    : blockFriend
        }

    });