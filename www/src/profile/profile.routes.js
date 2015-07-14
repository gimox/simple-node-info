angular.module('app')
    .config(function ($stateProvider) {
        $stateProvider
            .state('main.profile', {
                url  : "/profile",
                cache:false,
                views: {
                    'profile-tab': {
                        templateUrl: "src/profile/tmpl/profile.tmpl.html",
                        controller : "ProfileController as prfCtrl",
                        reload:true

                    }
                }
            })

            .state('main.profile-edit', {
                url  : "/profile/edit",
                views: {
                    'profile-tab': {
                        templateUrl: "src/profile/tmpl/profile.edit.tmpl.html",
                        controller : "ProfileEditController as prfeCtrl"
                    }
                }
            })

            .state('main.profile-interest', {
                url  : "/profile/interest",
                views: {
                    'profile-tab': {
                        templateUrl: "src/profile/tmpl/profile.interest.tmpl.html",
                        controller : "ProfileInterestController as prfintCtrl",
                        reload:true
                    }
                }
            })

            .state('main.profile-image', {
                url  : "/profile/image",
                views: {
                    'profile-tab': {
                        templateUrl: "src/profile/tmpl/profile.image.tmpl.html",
                        controller : "ProfileImageController as prfimgCtrl",
                        reload:true
                    }
                }
            })

    });
