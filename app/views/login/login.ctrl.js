(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['$scope', '$log', '$window', '$stateParams', 'dictionary', 'apiService'];

    /* @ngInject */
    function LoginCtrl($scope, $log, $window, $stateParams, dictionary, apiService) {
        var vm = this;
        $scope.dict = dictionary();
        $scope.title = 'Login';
        $scope.advantages = [];
        $scope.typeString = '';
        $scope.type = $stateParams.type === 'shop' ? 'shop' : 'user';

	    activate();

        ////////////////

        function activate() {
            $log.info("LoginCtrl is mounted");

            if ($scope.type === 'user') {
                $scope.advantages = ['快速搜尋商品商店', '向賣家查詢及落單', '無需註冊一鍵登入'];
                $scope.typeString = '買家';
            } else {

            }
        }

        $scope.login  = function() {
            apiService.login($scope.type).success(function(data) {
                console.log('login',data.data);
                $window.location = data.data.url;
            });
        }
    }

})();

