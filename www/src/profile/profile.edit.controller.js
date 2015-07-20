angular.module('app')
    .controller('ProfileEditController', function (user, $scope, ProfileFactory, storage,$state) {

        function init() {
            $scope.useredit = storage.get('user');
            $scope.useredit.base.born_date = new Date($scope.useredit.base.born_date);
            prevData = angular.copy($scope.useredit); // prev data
        }

        init();

        $scope.model = angular.copy($scope.useredit.base);

        this.update = function () {

            ProfileFactory.update($scope.model).then(onSuccess, onError);
        };


        function onSuccess(response) {
            console.log(response.data.user.base);

            if (!response.data.error) {


                $scope.model = response.data.user.base;
                $scope.model.born_date = new Date(response.data.user.base.born_date);
                $scope.useredit.base = angular.copy($scope.model);
                $scope.useredit.info =  angular.copy(response.data.user.info);
                storage.set('user', $scope.useredit);
               $state.go('main.profile');

            } else {

                onError(response.data.error);
            }

        }

        function onError(err) {
            console.log(err);
            init();
        }


    });
