angular.module('app')
    .controller('FriendController', function ($scope,$state, user, UtilsFactory, friend, SettingsFactory, ImageFactory, $ionicActionSheet, $timeout,$ionicScrollDelegate,$ionicSlideBoxDelegate,$ionicPopup,FriendsFactory) {

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


        $scope.openAction = function () {

            var hideSheet = $ionicActionSheet.show({
                buttons        : [
              //      {text: 'SEGNALA'},
               //     {text: 'BLOCCA'}
                ],
                destructiveText: 'ELIMINA',
                cancelText     : 'CANCELLA',
                cancel         : function () {
                    return true;
                },
                buttonClicked  : function (index) {
                    return true;
                },
                destructiveButtonClicked: function() {
                    removeFriend();
                    return true;
                }

            });

            $timeout(function () {
                hideSheet();
            }, 10000);

        };





        function removeFriend() {
            var id = friend.base.id_user;

            FriendsFactory.removeFriend(id)
                .then(function (response) {

                    console.log(response.data);

                    if(response.data.hasOwnProperty('friend')) {

                        var alertPopup = $ionicPopup.alert({
                            title: 'Fatto!',
                            template: 'Ora non siete più amici'
                        });
                        alertPopup.then(function(res) {
                            $state.go('main.people');
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




        }



    });