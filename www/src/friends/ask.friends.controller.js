angular.module('app')
    .controller('AskFriendsController', function ($scope,ask,user,UtilsFactory,ionicMaterialInk,ionicMaterialMotion,$timeout,$ionicLoading,FriendsFactory) {

        $scope.friends = ask;


        this.getAge = function(bd) {
            return UtilsFactory.age(bd);
        };

        this.getImage = function (img) {
          
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