angular.module('app')
    .controller('FriendController', function ($scope,user,UtilsFactory,friend,SettingsFactory,ImageFactory,$ionicActionSheet, $timeout) {

        $scope.friend = friend;

        $scope.img1 = ImageFactory.getImgProfile($scope.friend.image.profile,'avatar',1);
        $scope.img2 = ImageFactory.getImgProfile($scope.friend.image.profile,'background_primary');
        $scope.img3 = ImageFactory.getImgProfile($scope.friend.image.profile,'background_secondary');


        if ($scope.friend.base && $scope.friend.base.born_date) {
            $scope.age = UtilsFactory.age($scope.friend.base.born_date);
        }

        this.getIncons = function (name) {
            console.log('icons', SettingsFactory.getInterestIcon(name));
            return SettingsFactory.getInterestIcon(name);
        };

        this.getInterestName = function (key) {
            return SettingsFactory.getInterestName(key);
        };




        $scope.openAction = function() {

            // Show the action sheet
            var hideSheet = $ionicActionSheet.show({
                buttons: [
                    { text: 'SEGNALA' },
                    { text: 'BLOCCA' }
                ],
                destructiveText: 'ELIMINA',
             //   titleText: 'Intrapprendi una azione',
                cancelText: 'CANCELLA',
                cancel: function() {
                    // add cancel code..
                },
                buttonClicked: function(index) {
                    return true;
                }
            });

            // For example's sake, hide the sheet after two seconds
            $timeout(function() {
                hideSheet();
            }, 10000);

        };



    });