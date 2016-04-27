(function () {
    'use strict';

    angular
        .module('app')
        .controller('BookmarkCtrl', BookmarkCtrl);

    BookmarkCtrl.$inject = ['$scope', '$log', 'dictionary', 'apiService', 'CONST'];

    /* @ngInject */
    function BookmarkCtrl($scope, $log, dictionary, apiService, CONST) {
        var vm = this;
        vm.dict = dictionary;
        vm.title = 'Bookmark';
        vm.media = [];
        vm.bookmark = [];
        vm.load_more_bookmark = load_more_bookmark;
        vm.noMoreBookmark = false;

        vm.searchText = "";
        vm.searchFieldChanged = searchFieldChanged;

        activate();

        ////////////////

        function activate() {
            $log.info("BookmarkCtrl is mounted");
            getBookmark();
        }
        function getBookmark(){
            apiService.getBookmarks(vm.bookmark.length).success(function(res){
                Array.prototype.push.apply(vm.bookmark, res.data);
                if(res.data.length == 0 || res.data.length % CONST.DEFAULT_LIMIT > 0) vm.noMoreBookmark = true;
            });
        }
        function searchFieldChanged() {
            var text = vm.searchText;
            console.log('home searchFieldChanged with', text);
            if (text.length != 0){
                apiService.searchMedia(text).success(function(res){
                    vm.media = res.data;
                });
                apiService.searchShops(text).success(function(res){
                    vm.shops = res.data;
                });
            } else {
                getBookmarks();
            }
        }
        function load_more_bookmark(){
            getBookmark();
        }
    }

})();

