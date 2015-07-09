angular.module('app')
    .controller('MainController', function (user, $state, storage, $scope,GelolocFactory,ionicMaterialInk, ionicMaterialMotion,$timeout,    $ionicHistory) {

        storage.set('user',user);

        GelolocFactory.start();


        this.search = function () {

            $state.go('main.search', {}, {reload: true});
        };

        this.profile = function () {
            $state.go('main.profile', {}, {reload: true});
        };

        this.people = function () {
            $state.go('main.people',{reload:true});
        };

        this.searchNear = function() {
            $state.go('main.search-near', {}, {reload: true,cache:false});
        };


        $timeout(function() {
            ionicMaterialInk.displayEffect();
        },500);


    });