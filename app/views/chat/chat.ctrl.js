(function () {
    'use strict';

    angular
        .module('app')
        .controller('ChatCtrl', ChatCtrl);

    ChatCtrl.$inject = ['$scope','$rootScope', 'apiService', '$stateParams', '$log', 'socketService'];

    /* @ngInject */
    function ChatCtrl($scope, $rootScope, apiService , $stateParams, $log, socketService) {
        $log.info('ChatCtrl is mounter');
        console.log('$stateParams', $stateParams);
        var vm = this;
        vm.title = 'ChatCtrl';
        vm.isSelf = isSelf;

        // chat list
        vm.chatsSearchText = '';

        // trade status
        vm.orders = [];
        vm.createOrder = userCreateOrder;
        vm.cart = [];
        vm.editMediaToCart = editMediaToCart;
        vm.toggle = toggle;

        // chats
        vm.chats = [];
        vm.chat = null;
        vm.buddy = null;
        vm.messages = [];
        vm.message = {
            content: '',
            mediaId: null,
            isReadyForSend: true
        };
        vm.uploadedFileNames = [];

        activate();

        ////////////////

        function activate() {
            // 3 scenarios
            // 1. directed from other chat, with buddyUsername
            // 2. directed from media, with buddyUsername, mediaId
            // 3. directly access Chat Page/ Reload Page

            apiService.getChats().success(function(res){
	            var isUser = $rootScope.clientType === 'user';
	            vm.chats = res.data.map(function(item) {
		            item.buddy = isUser ? item.shop : item.user;
		            return item;
	            });

                if (!$stateParams.buddyUsername && res.data.length > 0) {
                    vm.buddyUsername = res.data[0].buddy.username;
                    vm.buddy = res.data[0].buddy;
                }

                if (vm.buddy) loadChatAndMessagesWithBuddy(vm.buddy);
            });
        }

        function isSelf(sender){
            return sender == $rootScope.clientType;
        }

        function getChat(buddyUsername){
            apiService.getChat(buddyUsername).success(function(res){
                vm.chat = res.data;
                if (vm.chat.orders)
	                vm.chat.orders.forEach(function(item){ item.showMedia = false });
            })
        }

        function toggle(item) {
            item.showMedia = !item.showMedia;
        }

        function getMessages(buddyId){
            apiService.getMessages(buddyId).success(function(res){
                vm.messages = res.data;
            });
        }

        vm.sendMessage = sendMessage;
        function sendMessage(event){
	        if (event) {
		        if (event.keyCode != 13 || event.shiftKey || vm.message.content === '') return;
		        event.preventDefault();
	        }
            var content = vm.message.content;
            var buddyId = vm.buddy._id;
            var fileName =  vm.uploadedFileNames[0];
            apiService
                .sendMessage(content, buddyId, fileName)
                .success(function(res){
                    vm.messages.unshift(res.data); // push to front
                    vm.message.content = '';
                    vm.uploadedFileNames = [];
                });
        }

        function loadChatAndMessagesWithBuddy(buddy) {
            getChat(buddy.username);
            getMessages(buddy._id);
        }

	    vm.switchBuddy = switchBuddy;
        function switchBuddy(buddy) {
            vm.buddy = buddy;
            loadChatAndMessagesWithBuddy(vm.buddy);
        }

        function sendMediaMessage(content, buddyId, mediaId) {
            apiService
                .sendMediaMessage(content, buddyId, mediaId)
                .success(function(res){
                    loadChatAndMessagesWithBuddy(vm.buddy);
                });
        }

        function userCreateOrder(orderId, deliveryMethodId, deliveryLocation, deliveryTime, note) {
            apiService
                .userCreateOrder(orderId, deliveryMethodId, deliveryLocation, deliveryTime, note)
                .success(function(res){
                    vm.orders.push(res.data);
                });
        }

        function editMediaToCart(mediaId, buddyId, quantity) {
            apiService
                .editMediaInCart(mediaId, buddyId, quantity)
                .success(function(res){
                    vm.shop = res.data;
                })
        }

        function cancelOrder(orderId){
            apiService
                .cancelOrder(orderId)
                .success(function(res){
                    reloadTradeStatus(vm.buddy._id);
                })
        }

        function reloadTradeStatus(buddyId){

        }

	    //socket
	    socketService.onEvent('new_message', function(data) {
		    console.log(data);
		    vm.messages.unshift(data);
	    });
    }

})();
