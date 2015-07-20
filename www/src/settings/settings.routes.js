angular.module('app')
    .config(function ($stateProvider) {
        $stateProvider

            .state('main.settings', {
                url  : "/settings",
                views: {
                    'profile-tab': {
                        templateUrl: "src/settings/templates/tab.settings.tmpl.html",
                        controller : "SettingsController as settCtrl",
                        reload: true
                    }
                }
            })

            .state('main.settings-visibility', {
                url  : "/settings/visibility",
                views: {
                    'profile-tab': {
                        templateUrl: "src/settings/templates/settings.visibility.tmpl.html",
                        controller : "SettVisibController as svisCtrl"
                    }
                }
            })

            .state('main.settings-share', {
                url  : "/settings/share",
                views: {
                    'profile-tab': {
                        templateUrl: "src/settings/templates/settings.share.tmpl.html"
                    }
                }
            })
            .state('main.settings-contacts', {
                url  : "/settings/contacts",
                views: {
                    'profile-tab': {
                        templateUrl: "src/settings/templates/settings.contacts.tmpl.html"
                    }
                }
            })

            .state('main.settings-app', {
                url  : "/settings/app",
                views: {
                    'profile-tab': {
                        templateUrl: "src/settings/templates/settings.app.tmpl.html",
                        controller : "SettAppController as sappCtrl"
                    }
                }
            })

            .state('main.settings-app-assistance', {
                url  : "/settings/app/assistance",
                views: {
                    'profile-tab': {
                        templateUrl: "src/settings/templates/settings.app.assist.tmpl.html"
                    }
                }
            })
            .state('main.settings-app-privacy', {
                url  : "/settings/app/privacy",
                views: {
                    'profile-tab': {
                        templateUrl: "src/settings/templates/settings.app.privacy.tmpl.html"
                    }
                }
            })
            .state('main.settings-app-condizioni', {
                url  : "/settings/app/condizioni",
                views: {
                    'profile-tab': {
                        templateUrl: "src/settings/templates/settings.app.cond.tmpl.html"
                    }
                }
            });
/*
            .state('tabs.settings-position', {
                url  : "/settings/app/position",
                views: {
                    'profile-tab': {
                        templateUrl: "src/settings/templates/settings.position.tmpl.html",
                        controller: "PositionController as posCtrl"
                    }
                }
            })

            */
    });