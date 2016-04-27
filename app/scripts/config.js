(function () {
    'use strict';
    angular
        .module('app')
    //JWT http request interceptor

        .config(config);

        config.$inject = ['$httpProvider', 'jwtInterceptorProvider'];

        /* @ngInject */
        function config ($httpProvider, jwtInterceptorProvider) {
            jwtInterceptorProvider.tokenGetter = ['apiService', function(apiService) {
                return localStorage.getItem('jwt');
            }];
            $httpProvider.interceptors.push('jwtInterceptor');
        }

    angular
        .module('app')
        .run(runcb);

        runcb.$inject = ['$rootScope', '$state', 'jwtHelper', 'apiService', '$window', '$log', 'dictionary', 'editableOptions'];
        function runcb ($rootScope, $state, jwtHelper, apiService, $window, $log, dictionary, editableOptions) {
            $log.info('app.run is running');
            // handle redirect & auth

            var dict = dictionary();

            var type = dict.getURLParameter('type');
            var code = dict.getURLParameter('code');
            console.log('type:', type, ' code:', code);

            if (type && code) {
                apiService.jwt(type, code).success(function(data) {
                    console.log(data.data);
                    localStorage.setItem('jwt', data.data.jwt);
                    $window.location = '/client_v2/app/index.html';
                });
            }else {
                setClientByCheckingJWT();
            }


            $rootScope.$on('$stateChangeStart', function(event, toState){
                console.log('on$StateChangeStart', toState);
                if(toState.data.requiredLogin && $rootScope.clientType == 'visitor'){
                    console.log('requireLogin',toState.data.requiredLogin,'clientType',$rootScope.clientType);
                    $state.go('public.home');
                }
            });

            function setClientByCheckingJWT() {
                var expToken = localStorage.getItem('jwt');
                if (expToken) {
                    console.info('user is logged in');
                    console.log('jwt ' + expToken);
                    var tokenPayload = jwtHelper.decodeToken(expToken);
                    console.log(tokenPayload);
                    $rootScope.clientType = tokenPayload.client_type;
                    $rootScope.clientId = tokenPayload.client_id;
                    $rootScope.clientUsername = tokenPayload.client_username;
                    if ($rootScope.clientType === 'user') {
                        apiService.getUserById(tokenPayload.client_id).success(function(res){
                            $rootScope.user = res.data;
                        });
                    } else if ($rootScope.clientType === 'shop') {
                        apiService.getShopByUsername(tokenPayload.client_username).success(function(res){
                            $rootScope.shop = res.data;
                        });
                    }
                } else {
                    $rootScope.clientType = 'visitor';
                    $rootScope.clientId = '';
                    $rootScope.clientUsername = '';
                }
            }

            editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
        }


    angular
        .module('app')
        .constant('CONST', {
            DEFAULT_LIMIT: 16,
            DEFAULT_SKIP: 0
        });
})();