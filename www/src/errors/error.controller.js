angular.module('app')
    .controller('ErrorController', function ($window) {

       this.reload = function(){
           console.log('relaoded');
           $window.location.href = '/';
       }
    });
