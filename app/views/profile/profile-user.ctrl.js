(function () {
    'use strict';

    angular
        .module('app')
        .controller('ProfileUserCtrl', ProfileUserCtrl);

    ProfileUserCtrl.$inject = ['$scope', '$log', '$window', '$rootScope', 'dictionary', 'apiService'];

    /* @ngInject */
    function ProfileUserCtrl($scope, $log, $window, $rootScope, dictionary, apiService) {
        var vm = this;
        vm.dict = dictionary();
        vm.title = 'home';

        vm.currentTabIndex = 0;

        vm.bookmarkedMedia = [];
        vm.subscribedShops = [];

        vm.noMoreBookmarkedMedia = false;
        vm.noMoreSubscribedShops = false;

        vm.user = $rootScope.user;

	    activate();

        ////////////////

        function activate() {
            $log.info("ProfileUserCtrl is mounted");

            getBookmarkedMedia();
            getSubscribedShops();

            console.log(vm.user);
        }

        function getBookmarkedMedia(){
            apiService.getBookmarks(vm.bookmarkedMedia.length).success(function(res){
                Array.prototype.push.apply(vm.bookmarkedMedia, res.data);
                if(res.data.length == 0) vm.noMoreBookmarkedMedia = true;
            });
        }

        function getSubscribedShops(){
            apiService.getSubscriptions(vm.subscribedShops.length).success(function(res){
                Array.prototype.push.apply(vm.subscribedShops, res.data);
                if(res.data.length == 0) vm.noMoreSubscribedShops = true;
            });
        }

        //tab
        vm.switchTab = function(index) {
            vm.currentTabIndex = index;
        };

        vm.isCurrentTab = function(index) {
            return index === vm.currentTabIndex;
        };
    }

})();

