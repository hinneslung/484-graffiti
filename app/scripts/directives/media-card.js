(function () {
    'use strict';

    angular
        .module('app')
        .directive('mediaCard', mediaCard);

    mediaCard.$inject = [];

    /* @ngInject */
    function mediaCard() {
        var directive = {
            bindToController: true,
            controller: MediaCardCtrl,
            controllerAs: 'vm',
            link: link,
            restrict: 'E',
            templateUrl: 'views/components/media-card.html',
            scope: {
                media: '='
            }
        };
        return directive;

        function link(scope, element, attrs) {

        }
    }

    MediaCardCtrl.$inject = ['$scope', '$rootScope'];

    /* @ngInject */
    function MediaCardCtrl($scope, $rootScope) {
        $scope.showAddToCart = function() {
            return $rootScope.clientType === 'user';
        }
    }

})();
