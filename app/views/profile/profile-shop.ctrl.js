(function () {
    'use strict';

    angular
        .module('app')
        .controller('ProfileShopCtrl', ProfileShopCtrl);

    ProfileShopCtrl.$inject = ['$scope', '$log', '$window', '$rootScope', 'dictionary', 'apiService'];

    /* @ngInject */
    function ProfileShopCtrl($scope, $log, $window, $rootScope, dictionary, apiService) {
        var vm = this;
        vm.dict = dictionary();
        vm.title = 'home';

        vm.currentTabIndex = 1;

	    vm.searchText = '';

        vm.media = [];
        vm.shop = {};
	    vm.noMoreMedia = false;

	    vm.newPayment = {};
	    vm.newDelivery = {};

	    activate();

        ////////////////

        function activate() {
            $log.info("ProfileShopCtrl is mounted");

            getMedia();
            getShop();

	        initNewPayment();
	        initNewDelivery();
        }

	    vm.getMedia = getMedia;
        function getMedia(){
            apiService
                .getMediaByShopUsername($rootScope.clientUsername, vm.media.length)
                .success(function(res){
	                vm.media = uniqueArrayBy_id(vm.media.concat(res.data));
	                if (res.data.length == 0) vm.noMoreMedia = true;
                });
        }
        function getShop() {
            apiService
                .getShopByUsername($rootScope.clientUsername)
                .success(function(res){
                    vm.shop = res.data;
                });
        }

	    vm.updateContacts = function() {
		    var s = vm.shop;
		    apiService.updateShopContacts(s.whatsapp, s.line, s.wechat, s.phone).success(function(res) {
			    vm.getShop();
		    });
	    };

	    vm.paymentMethodFromCode = function(code) {
		    switch(code) {
			    case 'f2f':
				    return '一手交錢一手交貨';
			        break;
			    case 'bankin':
				    return '銀行轉賬';
			        break;
			    default:
				    return 'ERROR';
		    }
	    };
	    vm.deliveryMethodFromCode = function(code) {
		    switch(code) {
			    case 'f2f':
				    return '一手交錢一手交貨';
				    break;
			    case 'postal':
				    return '郵寄';
				    break;
			    default:
				    return 'ERROR';
		    }
	    };

	    vm.createPaymentMethod  = function() {
		    var m = vm.newPayment;
		    apiService.createPaymentMethod(m.type, m.fee, m.description, m.bank, m.bankAccNo, m.bankAccName).success(function(res) {
			    console.log(res);
			    getShop();
			    initNewPayment();
		    });
	    };
	    vm.createDeliveryMethod  = function() {
		    var m = vm.newDelivery;
		    apiService.createDeliveryMethod(m.type, m.fee, m.area, m.description).success(function(res) {
			    console.log(res);
			    getShop();
			    initNewDelivery();
		    });
	    };

	    vm.newPaymentIsBankin = function() {
		    return vm.newPayment.type === 'bankin';
	    };

	    vm.removePaymentMethod = function(method) {
		    apiService.deletePaymentMethod(method._id).success(function(res) {
			    getShop();
		    });
	    };
	    vm.removeDeliveryMethod = function(method) {
		    apiService.deleteDeliveryMethod(method._id).success(function(res) {
			    getShop();
		    });
	    };

	    function initNewPayment() {
		    vm.newPayment = {
			    type: 'f2f',
			    fee: 0,
			    description: '',
			    bank: '',
			    bankAccNo: '',
			    bankAccName: ''
		    };
	    }
	    function initNewDelivery() {
		    vm.newDelivery = {
			    type: 'f2f',
			    fee: 0,
			    area: '',
			    description: ''
		    };
	    }

	    //tab
	    vm.switchTab = function(index) {
		    vm.currentTabIndex = index;
	    };

	    vm.isCurrentTab = function(index) {
		    return index === vm.currentTabIndex;
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

