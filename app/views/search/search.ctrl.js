(function () {
    'use strict';

    angular
        .module('app')
        .controller('SearchCtrl', SearchCtrl);

	SearchCtrl.$inject = ['$window', '$scope', '$log', '$rootScope', '$stateParams', 'dictionary', 'apiService', 'CONST'];

    /* @ngInject */
    function SearchCtrl($window, $scope, $log, $rootScope, $stateParams, dictionary, apiService, CONST) {
        var vm = this;
        vm.title = 'search';

	    vm.media = [];
	    vm.shops = [];

	    //nav bar searching
	    vm.searchText = $stateParams.text;
	    vm.searchFieldChanged = searchFieldChanged;
	    vm.suggestKeyword = suggestKeyword;

	    activate();

	    function activate() {
		    searchFieldChanged();
	    }

        function searchFieldChanged() {
	        var text = vm.searchText;
	        console.log('search page searchFieldChanged with', text);
	        if (text.length != 0){
		        apiService.searchMedia(text, 0, 24).success(function(res){
			        vm.media = res.data;
		        });
		        apiService.searchShops(text, 0, 8).success(function(res){
			        vm.shops = res.data;
		        });
	        } else {
		        vm.media = [];
		        vm.shops = [];
	        }
        }
	    function suggestKeyword(val) {
		    if (val === '') return;
		    return (apiService.suggestSearchKeyword(val).then(function(res) {
			    console.log(res.data.data);
			    return res.data.data;
		    }));
	    }

    }

})();
