/**
 * @ngdoc function
 * @name app.config:uiRouter
 * @description
 * # Config
 * Config for the router
 */
(function() {
    'use strict';
    angular
        .module('app')
        .run(runBlock)
        .config(config);

    runBlock.$inject = ['$rootScope', '$state', '$stateParams'];
    function runBlock($rootScope,   $state,   $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    }

    config.$inject =  ['$stateProvider', '$urlRouterProvider', 'MODULE_CONFIG'];
    function config( $stateProvider,   $urlRouterProvider,   MODULE_CONFIG ) {

        $urlRouterProvider
            .otherwise('/home');
        $stateProvider
            .state('public', {
                abstract: true,
                data: {
                    requiredLogin: false
                },
                views: {
                    '': {
                        templateUrl: 'views/layout.html'
                    }
                }
            })
            .state('public.home', {
                url: '/home',
                templateUrl: 'views/home/home.html',
                data : { title: '' },
                controller: "HomeCtrl",
                resolve: load('views/home/home.ctrl.js')
            })
            .state('public.login', {
                url: '/login/:type',
                templateUrl: 'views/login/login.html',
                data : { title: '' },
                controller: "LoginCtrl",
                resolve: load('views/login/login.ctrl.js')
            })
            .state('public.shop', {
                url: '/shop/:shopName',
                params: { shopName: '' },
                templateUrl: 'views/shop/shop.html',
                controller: 'ShopCtrl',
                resolve: load('views/shop/shop.ctrl.js')
            })
            .state('public.media', {
                url: '/media/:mediaId',
                params: { mediaId: '' },
                templateUrl: 'views/media/media.html',
                controller: 'MediaCtrl',
                resolve: load(['angularFileUpload','views/media/media.ctrl.js'])
            })
            .state('public.search', {
                url: '/search/:text',
                params: { text: ''},
                templateUrl: 'views/search/search.html',
                controller: 'SearchCtrl',
                resolve: load(['views/search/search.ctrl.js'])
            })
            .state('private', {
                abstract: true,
                data: {
                    requiredLogin: true
                },
                views: {
                    '': {
                        templateUrl: 'views/layout.html'
                    }
                }
            }).state('private.profileUser', {
                url: '/profile/user',
                templateUrl: 'views/profile/profile-user.html',
                data : { title: '' },
                controller: "ProfileUserCtrl",
                resolve: load('views/profile/profile-user.ctrl.js')
            })

            .state('private.profileShop', {
                url: '/profile/shop',
                templateUrl: 'views/profile/profile-shop.html',
                data : { title: '' },
                controller: "ProfileShopCtrl",
                resolve: load('views/profile/profile-shop.ctrl.js')
            })
            .state('private.bookmark', {
                url: '/bookmark',
                templateUrl: 'views/bookmark/bookmark.html',
                controller: 'BookmarkCtrl',
                resolve: load('views/bookmark/bookmark.ctrl.js')
            })
            .state('private.subscription', {
                url: '/subscription',
                templateUrl: 'views/subscription/subscription.html',
                controller: 'SubscriptionCtrl',
                resolve: load('views/subscription/subscription.ctrl.js')
            })
            .state('private.chat', {
                url: '/chat',
                params: {
                    buddyUsername: null,
                    mediaId: null
                },
                templateUrl: 'views/chat/chat.html',
                controller: 'ChatCtrl',
                resolve: load(['angularFileUpload','views/chat/chat.ctrl.js'])
            })
            ;


        function load(srcs, callback) {
            return {
                deps: ['$ocLazyLoad', '$q',
                    function( $ocLazyLoad, $q ){
                        var deferred = $q.defer();
                        var promise  = false;
                        srcs = angular.isArray(srcs) ? srcs : srcs.split(/\s+/);
                        if(!promise){
                            promise = deferred.promise;
                        }
                        angular.forEach(srcs, function(src) {
                            promise = promise.then( function(){
                                angular.forEach(MODULE_CONFIG, function(module) {
                                    if( module.name == src){
                                        src = module.module ? module.name : module.files;
                                    }
                                });
                                return $ocLazyLoad.load(src);
                            } );
                        });
                        deferred.resolve();
                        return callback ? promise.then(function(){ return callback(); }) : promise;
                    }]
            }
        }

        function getParams(name) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(location.search);
            return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        }
    }
})();
