angular.module('app')
    .controller('FriendsController', function ($scope,friends,user,UtilsFactory,ionicMaterialInk,ionicMaterialMotion,$timeout,$ionicLoading) {

        $scope.friends = friends;

        this.getAge = function(bd) {
            return UtilsFactory.age(bd);
        };

        this.getImage = function (img) {
            console.log('LIST IMG',img);
            if(!img) {
                return 'img/thumb-profile.jpg'
            }
            return img;
        };

        $timeout(function() {
            ionicMaterialInk.displayEffect();

            ionicMaterialMotion.pushDown({
                selector: '.push-down'
            });
            ionicMaterialMotion.fadeSlideInRight({
                selector: '.animate-fade-slide-in .item'
            });


        },200);





        $scope.$on('stateChangeStart',function(){
            $ionicLoading.show({
                templateUrl: 'src/friends/tmpl/loading.friends.tmpl.html'
            });
        });

        $scope.$on('stateChangeSuccess',function(){
            $ionicLoading.hide();
        });

    });