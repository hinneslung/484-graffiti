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
        vm.shop = {};

	    $scope.shop = {
		    full_name: "Hinnes Lung",
		    username: "hinneslung",
		    phone: "(213) 245 1234",
		    website: "hinnes.me",
		    bio: "The most wanted graffiti artist in 21st Century is here. Come buy a masterpiece from me and sell it " +
		    "for 100% profit in less than a decade."
	    };

	    $scope.arts = [];
	    for (var i = 0; i < 5; i++) {
		    $scope.arts.push({
			    id: i,
			    shop: {username: "Artist " + i},
			    preview_url: "images/" + i % 6 + ".jpg"
		    });
	    }

    }

})();

