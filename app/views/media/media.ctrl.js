(function () {
    'use strict';

    angular
        .module('app')
        .controller('MediaCtrl', MediaCtrl);

    MediaCtrl.$inject = ['$window', '$scope', '$rootScope', '$stateParams', '$log', 'dictionary', 'apiService'];

    /* @ngInject */
    function MediaCtrl($window, $scope, $rootScope, $stateParams, $log, dictionary, apiService) {
        var vm = this;
        vm.title = 'MediaCtrl';

	    $scope.dict = dictionary();

        $scope.media = {
            id: 0,
            image_url: "images/0.jpg",
            shop: {
                username: "Artist " + 1,
                image_url: "../assets/images/a1.jpg"
            }
        };

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
