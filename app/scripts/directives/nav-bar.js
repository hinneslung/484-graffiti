(function () {
    'use strict';

    angular
        .module('app')
        .directive('navBar', navBar);

    navBar.$inject = [];

    /* @ngInject */
    function navBar() {
        var directive = {
            bindToController: true,
            controller: NavBarCtrl,
            controllerAs: 'vm',
            link: link,
            restrict: 'E',
            templateUrl: "views/components/nav-bar.html",
            scope: {
                delegate: "="
            }
        };
        return directive;

        function link(scope, element, attrs) {

        }
    }

    NavBarCtrl.$inject = ['$window', '$rootScope', '$scope', '$state', 'apiService', 'dictionary', '$log'];

    /* @ngInject */
    function NavBarCtrl($window, $rootScope, $scope, $state, apiService, dictionary, $log) {
        var vm = $scope;
        $log.info("navbar mounted");
        vm.clientType = $rootScope.clientType;
        vm.clientUsername = $rootScope.clientUsername;
        vm.dict = dictionary();
	    vm.searchText = "";
        vm.profileText = vm.clientType == 'shop' ? vm.dict.myShop : vm.dict.myProfile;
        vm.chats = [];

        vm.suggestKeyword = function(val) {
	        if (val === '') return;
	        return (apiService.suggestSearchKeyword(val).then(function(res) {
		        console.log(res.data.data);
		        return res.data.data;
	        }));
        };

        vm.loggedin = function(){
            return $rootScope.clientType !== undefined && $rootScope.clientType !== 'visitor';
        };

	    vm.goSearch = function() {
		    $window.location = '#/search/' + vm.searchText;
	    };

        vm.login = function(type){
            $window.location = '#/login/' + type;

            //apiService.login('user').success(function(data) {
            //    console.log('login',data.data);
            //    $window.location = data.data.url;
            //});
        };

        vm.logout = function(){
            localStorage.removeItem('jwt');
            $rootScope.clientType = undefined;
            $rootScope.clientType = undefined;
            $rootScope.clientUsername = undefined;
            $rootScope.clientId = undefined;
            $state.go('public.home');
        };

        vm.goProfile = function() {
            $window.location = '#/profile/' + vm.clientType;
        };

        apiService.getChats().success(function(res){
            vm.chats = res.data;
        });
    }

})();

