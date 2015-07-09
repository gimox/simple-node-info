angular.module('app', [
    'ionic',
    'ionic.service.core',
    'ionic.service.deploy',
    'ngCordova',
    'angular-jwt',
    'angular-storage',
    'ionic-material'
])
    .constant('API_URL', 'http://api.quoozy.com:8080/api')
   // .constant('API_URL', 'http://localhost:8080/api')
    .run(function ($ionicPlatform, $rootScope, $cordovaStatusbar, $cordovaAppVersion, $cordovaDevice) {

        $rootScope.loading = false;

        $rootScope
            .$on('$stateChangeStart',
            function(event, toState, toParams, fromState, fromParams){
                $rootScope.loading = true;
                console.log('stateChange');
                $rootScope.$broadcast('stateChangeStart',1);
            });

        $rootScope
            .$on('$stateChangeSuccess',
            function(event, toState, toParams, fromState, fromParams){
                $rootScope.loading = false;
                console.log('endstateChange');
                $rootScope.$broadcast('stateChangeSuccess',1);
            });


        $rootScope.appVersion = "0.0.0"; // set a default vale for appVersion
        $rootScope.UUID = 'web'; // get uid

        $ionicPlatform.ready(function () {

            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            //  for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }

            // get version app
            if (window.cordova) {

                $cordovaAppVersion.getAppVersion().then(function (version) {
                    $rootScope.appVersion = version;
                });

                $rootScope.UUID = $cordovaDevice.getUUID();

            }

            // manage ios statusbar
            if (window.StatusBar) {

                try {
                    $cordovaStatusbar.overlaysWebView(true);
                    $cordovaStatusbar.style(0);
                    //  $cordovaStatusbar.styleColor('black');
                    //   $cordovaStatusbar.styleHex('#000');
                } catch (e) {
                    console.log('statusbar plugin initialization error - Ok if you are in web browser');
                    console.log(e);
                }
            }

        });

    })

    .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider, $ionicAppProvider) {


      //  $ionicConfigProvider.views.forwardCache(true);


        $ionicAppProvider.identify({
            app_id : 'b1f860a2',
            api_key: 'aa05e9ac02575e3188976fc3dc283cfcd5189c484615202a'
            // Your GCM sender ID/project number (Uncomment if using GCM)
            //gcm_id: 'YOUR_GCM_ID'
        });


        $ionicConfigProvider.platform.android.scrolling.jsScrolling(false);
        $ionicConfigProvider.tabs.position('bottom');
        $urlRouterProvider.otherwise('/main/search');
    });
