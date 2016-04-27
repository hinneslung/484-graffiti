(function () {
    'use strict';

    angular
        .module('app')
        .controller('ShopCtrl', ShopCtrl);

    ShopCtrl.$inject = ['$window', '$scope', '$rootScope', '$stateParams', '$log', 'dictionary', 'apiService', 'CONST'];

    /* @ngInject */
    function ShopCtrl($window, $scope, $rootScope, $stateParams, $log, dictionary, apiService, CONST) {
        var vm = this;
        vm.title = 'Shop';
        vm.dict = dictionary();
        vm.media = [];
        vm.shop = {};
        vm.isShopSubscribed = false;

        vm.noMoreMedia = false;

        vm.searchText = '';

        activate();

        ////////////////

        function activate() {
            $log.info("ShopCtrl is mounted");

	        //transfer to profile if is own shop
            if ($rootScope.clientType === 'shop' && $rootScope.clientUsername === $stateParams.shopName)
	            $window.location = '#/profile/shop';

            getMedia();
            getShop();

	        vm.searchText = vm.dict.getURLParameter('search');
	        console.log('search text' + vm.searchText);
        }

	    vm.getMedia = getMedia;
        function getMedia(){
	        if (vm.noMoreMedia === true) return;
	        console.log('loading more');
            apiService
                .getMediaByShopUsername($stateParams.shopName, vm.media.length)
                .success(function(res){
	                vm.media = uniqueArrayBy_id(vm.media.concat(res.data));
                    if (res.data.length == 0) vm.noMoreMedia = true;
                });
        }
        function getShop() {
            apiService
                .getShopByUsername($stateParams.shopName)
                .success(function(res){
                    vm.shop = res.data;
                    checkIsShopSubscribed();
                });
        }

        function checkIsShopSubscribed (){
            apiService
                .isSubscribed(vm.shop._id)
                .success(function(res){
                    vm.isShopSubscribed = res.data.subscribed;
                });
        }

        vm.toggleShopSubscription = function(){
            if (vm.isShopSubscribed){
                apiService
                    .unsubscribe(vm.shop._id)
                    .success(function(res){
                        vm.isShopSubscribed = false;
                    });
            } else {
                apiService
                    .subscribe(vm.shop._id)
                    .success(function(res){
                        vm.isShopSubscribed = res.data;
                    });
            }
        };

	    vm.isUser = function() {
		    return $rootScope.clientType === 'user';
	    };

	    //search
	    vm.searchFieldChanged = function() {
		    var text = vm.searchText;
		    if (text.length != 0){
			    apiService.searchMediaFromShop(text, vm.shop.username).success(function(res){
				    vm.media = res.data;
			    });
		    } else {
			    getMedia();
		    }
	    };
	    vm.goSearch = function() {
		    $window.location = '#/search/' + vm.searchText;
	    };
    }

})();

