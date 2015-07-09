angular.module('app')
    .controller('SearchMatchController', function (user,$state, $scope,$rootScope, storage, ImageFactory, GelolocFactory, SearchFactory, $timeout, ionicMaterialInk, ionicMaterialMotion, UtilsFactory,$ionicLoading,$ionicSlideBoxDelegate) {

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
            'type' : 1,
            'count': null,
            'limit': 1,
            'page' : null
        };

        //TODO remove in production
        /*
        $timeout(function(){
            if(!$scope.loaded) {
                loadData();
            }
        },2000);
        */
        loadData();

        function loadData() {
            SearchFactory.get(params)
                .then(function (response) {
                    $scope.loading = false;
                    $scope.friends = response.data.friend;

                    $ionicSlideBoxDelegate.update();

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


        this.getImage = function(img){
            return  ImageFactory.getImg(img);
        };


        $scope.slidePosition = 0;

        $scope.slideHasChanged = function(index) {
            $scope.slidePosition = index;
        };


        $scope.age = function(born_date){
           return  UtilsFactory.age(born_date);
        }

    });