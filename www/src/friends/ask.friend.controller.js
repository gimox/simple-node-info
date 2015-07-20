angular.module('app')
    .controller('AskFriendController', function ($scope, $state,user, UtilsFactory, friend, SettingsFactory, ImageFactory, $timeout,$ionicScrollDelegate,$ionicSlideBoxDelegate,$ionicPopup,$ionicHistory,FriendsFactory) {

        $scope.friend = friend;
        $scope.images = [];
        $scope.images = ImageFactory.getAllImage($scope.friend.image.profile);

        if ($scope.friend.base && $scope.friend.base.born_date) {
            $scope.age = UtilsFactory.age($scope.friend.base.born_date);
        }

        this.getIncons = function (name) {
            return SettingsFactory.getInterestIcon(name);
        };

        this.getInterestName = function (key) {
            return SettingsFactory.getInterestName(key);
        };

        
        this.addFriend = function(id) {

            FriendsFactory.friendship(id)
                .then(function (response) {

                    if(response.data.hasOwnProperty('friend')) {

                        var alertPopup = $ionicPopup.alert({
                            title: 'Fatto!',
                            template: 'Invito confermato'
                        });
                        alertPopup.then(function(res) {
                            $state.go('main.askfriend');
                        });

                    } else {
                        $ionicPopup.alert({
                            title: 'Errore!',
                            template: 'Opss qualcosa non ha funzionato, verifica la tua copertura di rete e riprova'
                        });
                    }
                },
                function (err) {
                    console.log(err);
                    $ionicPopup.alert({
                        title   : 'Errore!',
                        template: 'Opss qualcosa non ha funzionato ,verifica la tua copertura di rete e riprova'
                    });
                });
        };

        this.delete = function(id) {

            FriendsFactory.deleteAsk(id)
                .then(function (response) {

                    if(response.data.hasOwnProperty('friend')) {

                        var alertPopup = $ionicPopup.alert({
                            title: 'Fatto!',
                            template: 'Hai respinto l\'invito'
                        });
                        alertPopup.then(function(res) {
                            $state.go('main.askfriend');
                        });

                    } else {
                        $ionicPopup.alert({
                            title: 'Errore!',
                            template: 'Opss qualcosa non ha funzionato, verifica la tua copertura di rete e riprova'
                        });
                    }
                },
                function (err) {
                    console.log(err);
                    $ionicPopup.alert({
                        title: 'Errore!',
                        template: 'Opss qualcosa non ha funzionato ,verifica la tua copertura di rete e riprova'
                    });

                });
        }

    });