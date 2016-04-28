(function () {
    'use strict';

    angular
        .module('app')
        .controller('ChatCtrl', ChatCtrl);

    ChatCtrl.$inject = ['$scope','$rootScope', 'apiService', '$stateParams', '$log'];

    /* @ngInject */
    function ChatCtrl($scope, $rootScope, apiService , $stateParams, $log) {
        $log.info('ChatCtrl is mounter');
        console.log('$stateParams', $stateParams);
        var vm = this;
        vm.title = 'ChatCtrl';

    }

})();
