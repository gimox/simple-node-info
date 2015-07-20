angular.module('app')
    .controller('SearchNearController', function (user, ChatFactory, $state, FriendsFactory, $ionicPopup, $ionicLoading, $scope, $rootScope, storage, ImageFactory, GelolocFactory, SearchFactory, $timeout, ionicMaterialInk, ionicMaterialMotion, UtilsFactory) {


        $scope.user = storage.get('user');
        $scope.avatar = ImageFactory.getAvatarImage();
        $scope.friends = [];
        $scope.hasPosition = false;
        $scope.loading = true;
        $scope.hasError = false;


        GelolocFactory.getPosition('main.search').then(function (success) {

            $scope.hasError = false;
            $scope.hasPosition = true;
            console.log('GPS SUCCESS:', success);
            loadData();

        }, function (err) {

            $scope.hasError = true;
            console.log('GPS ERROR:', err);
        });


        var params = {
            'type' : 2,
            'count': null,
            'limit': null,
            'page' : null
        };

        function loadData() {
            SearchFactory.get(params)
                .then(function (response) {
                    $scope.loading = false;
                    $scope.friends = response.data.friend;

                    // animation material design
                    $timeout(function () {


                        ionicMaterialInk.displayEffect();


                        if ($scope.friends.length) {
                            ionicMaterialMotion.pushDown({
                                selector: '.push-down'
                            });
                            ionicMaterialMotion.fadeSlideInRight({
                                selector: '.animate-fade-slide-in .item'
                            });
                        }


                    }, 200);

                },
                function (err) {
                    $scope.isLoading = false;
                    $scope.hasError = true;
                });
        }

        this.getAge = function (born_date) {
            return UtilsFactory.age(born_date);
        };

        this.getImage = function (img) {
            console.log(img);
            return ImageFactory.getImg(img);
        };


        $scope.$on('stateChangeStart', function () {
            $ionicLoading.show({
                templateUrl: 'src/search/tmpl/loading.search.tmpl.html'
            });
        });

        $scope.$on('stateChangeSuccess', function () {
            $ionicLoading.hide();
        });


        this.setAskFriend = function (id) {
            FriendsFactory.getAskFriend(id).then(function (success) {
                $state.go('main.search-near', {}, {reload: true});
            }, function (err) {

            });
        };

        this.chat = function (id) {
            ChatFactory.friend(id);
        }


    });