angular.module('app')
    .controller('SearchController', function (user,$state,UpdateFactory) {

        if(user.error) {
            $state.go('error.connection');
        }

       //UpdateFactory.updateDialog();

    });
