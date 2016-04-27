(function () {
    'use strict';

    angular
        .module('app')
        .controller('SubscriptionCtrl', SubscriptionCtrl);

    SubscriptionCtrl.$inject = ['$scope', '$log', 'dictionary', 'apiService', 'CONST'];

    /* @ngInject */
    function SubscriptionCtrl($scope, $log, dictionary, apiService, CONST) {
        var vm = this;
        vm.dict = dictionary;
        vm.title = 'Subscription';
        vm.media = [];
        vm.subscriptions = [];

        vm.load_more_subsciptions =load_more_subsciptions;
        vm.noMoreSubscriptions = false;

        activate();

        ////////////////

        function activate() {
            $log.info("SubscriptionCtrl is mounted");
            getSubscriptions();
        }
        function getSubscriptions(){
            apiService.getSubscriptions(vm.subscriptions.length).success(function(res){
                Array.prototype.push.apply(vm.subscriptions, res.data);
                if(res.data.length == 0 || res.data.length % CONST.DEFAULT_LIMIT > 0) vm.noMoreSubscriptions = true;
            });
        }

        function load_more_subsciptions(){
            getSubscriptions();
        }
    }

})();

