angular.module('app')
    .controller('SearchNearController', function (user,$state, $scope,$rootScope, storage, ImageFactory, GelolocFactory, SearchFactory, $timeout, ionicMaterialInk, ionicMaterialMotion, UtilsFactory,$ionicLoading) {

        $scope.user = storage.get('user');
        $scope.avatar = ImageFactory.getAvatarImage();
        $scope.location = GelolocFactory.get();
        $scope.friends = [];
        $scope.hasPosition = false;
        $scope.loading = true;
        $scope.hasError = false;


        if ($scope.location.length) {
            $scope.hasPosition = true;
            loadData();
        }

        $scope.$on('position', function (ev, data) {
            $scope.location = data;
            $scope.hasPosition = true;
            loadData();
            $scope.loaded = true;
        });

        var params = {
            'type' : 2,
            'count': null,
            'limit': null,
            'page' : null
        };

        //TODO remove in production

        $timeout(function(){
            if(!$scope.loaded) {
                loadData();
            }
        },5000);



        function loadData() {
            SearchFactory.get(params)
                .then(function (response) {
                    $scope.loading = false;
                    $scope.friends = response.data.friend;

                    // animation material design
                    $timeout(function () {


                        ionicMaterialInk.displayEffect();


                        if($scope.friends.length) {
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



        $scope.$on('stateChangeStart',function(){
            $ionicLoading.show({
                templateUrl: 'src/search/tmpl/loading.search.tmpl.html'
            });
        });

        $scope.$on('stateChangeSuccess',function(){
            $ionicLoading.hide();
        });





    });