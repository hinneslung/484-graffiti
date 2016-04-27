(function () {
    'use strict';

    angular
        .module('app')
        .controller('MediaCtrl', MediaCtrl);

    MediaCtrl.$inject = ['$window', '$scope', '$rootScope', '$stateParams', '$log', 'dictionary', 'apiService'];

    /* @ngInject */
    function MediaCtrl($window, $scope, $rootScope, $stateParams, $log, dictionary, apiService) {
        var vm = this;
        vm.dict = dictionary();
        vm.title = 'MediaCtrl';
        vm.media = {};

        $scope.arts = [];
        for (var i = 0; i < 5; i++) {
            $scope.arts.push({
                id: i,
                shop: {username: "Artist " + i},
                preview_url: "images/" + i + ".jpg"
            });
        }
    }
})();

