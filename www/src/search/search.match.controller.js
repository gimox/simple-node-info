angular.module('app')
    .controller('SearchMatchController', function (user,$state,SettingsFactory,FriendsFactory,GelolocFactory,ImageFactory, $scope,$rootScope, storage, SearchFactory, $timeout, ionicMaterialInk, ionicMaterialMotion, UtilsFactory,$ionicLoading,$ionicSlideBoxDelegate) {
        $scope.user = storage.get('user');
        $scope.avatar = ImageFactory.getAvatarImage();
        $scope.friends = false;
        $scope.hasPosition = false;
        $scope.loading = true;
        $scope.hasError = false;
        $scope.images = false;



        GelolocFactory.getPosition('main.search').then(function (success) {
            $scope.hasError = false;
            $scope.hasPosition = true;
            loadData();

        }, function (err) {
            $scope.hasError = true;
        });


        var params = {
            'type' : 1,
            'count': null,
            'limit': 1,
            'page' : null
        };




        function loadData() {
            SearchFactory.get(params)
                .then(function (response) {



                    FriendsFactory.getFriendDetail(response.data.friend[0].id_user)
                        .then(function (response) {
                            $scope.friend = response.data.friend;
                            $scope.image = [];
                            $scope.images = ImageFactory.getAllImage($scope.friend.image.profile);

                            console.log($scope.friend);
                            if ($scope.friend.base && $scope.friend.base.born_date) {
                                $scope.age = UtilsFactory.age($scope.friend.base.born_date);
                            }

                            $timeout(function () {
                                ionicMaterialInk.displayEffect();

                                if($scope.friends) {
                                    ionicMaterialMotion.pushDown({
                                        selector: '.push-down'
                                    });
                                    ionicMaterialMotion.fadeSlideInRight({
                                        selector: '.animate-fade-slide-in .item'
                                    });
                                }

                            }, 50);
                            $scope.loading = false;


                        },function(error){
                            $scope.loading = false;
                        });








                },
                function (err) {
                    $scope.loading = false;
                    $scope.hasError = true;
                });
        }





        this.getIncons = function (name) {
            return SettingsFactory.getInterestIcon(name);
        };

        this.getInterestName = function (key) {
            return SettingsFactory.getInterestName(key);
        };

        this.getImage = function(img){
            return  ImageFactory.getImg(img);
        };


        $scope.slidePosition = 0;

        $scope.slideHasChanged = function(index) {
            $scope.slidePosition = index;
        };


        $scope.age = function(born_date){
           return  UtilsFactory.age(born_date);
        };

        this.setAskFriend = function(id) {
            FriendsFactory.getAskFriend(id).then(function(success) {
                $state.go('main.search-match', {},{'reload':true});
            },function(err){

            });
        };

        this.block = function(id) {
            FriendsFactory.blockFriend(id).then(function(success) {
                $state.go('main.search-match', {},{'reload':true});
            },function(err){

            });
        };








    });