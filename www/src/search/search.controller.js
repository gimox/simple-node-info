angular.module('app')
    .controller('SearchController', function (user,$state,UpdateFactory, storage,$scope, ionicMaterialInk, ionicMaterialMotion,$timeout) {

        if(user.error) {
            $state.go('error.connection');
        }


       UpdateFactory.updateDialog();


       // ionicMaterialInk.displayEffect();
       //  ionicMaterialMotion.ripple();


    });
