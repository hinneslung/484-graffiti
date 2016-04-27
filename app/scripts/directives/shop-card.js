(function () {
    'use strict';

    angular
        .module('app')
        .directive('shopCard', shopCard);

    shopCard.$inject = [];

    /* @ngInject */
    function shopCard() {
        var directive = {
            bindToController: true,
            controller: ShopCardCtrl,
            controllerAs: 'vm',
            link: link,
            restrict: 'E',
            templateUrl: 'views/components/shop-card.html',
            scope: {
                shop: '='
            }
        };
        return directive;

        function link(scope, element, attrs) {
            
        }
    }

    ShopCardCtrl.$inject = ['$scope', 'dictionary', 'apiService'];

    /* @ngInject */
    function ShopCardCtrl($scope, dictionary, apiService) {
        var vm = $scope;
        vm.dict = dictionary();
    }

})();

