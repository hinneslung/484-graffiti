(function () {
	'use strict';

	angular
		.module('app')
		.factory('socketService', socketService);

	socketService.$inject = ['$rootScope'];

	/* @ngInject */
	function socketService($rootScope) {
		var socketUrl = "http://45.115.39.208:3000";

		var socket;

		console.log("SOCKETTTTTTTTTTTT");

		if ($rootScope.clientId)
			socket = io.connect(socketUrl, {query: 'jwt=' + localStorage.getItem('jwt')});
		else
			return socket;

		socket.onEvent = function (eventName, callback) {
			socket.on(eventName, function () {
				var args = arguments;
				$rootScope.$apply(function () {
					callback.apply(socket, args);
				});
			});
		};

		socket.emitEvent = function (eventName, data, callback) {
			socket.emit(eventName, data, function () {
				var args = arguments;
				$rootScope.$apply(function () {
					if (callback) {
						callback.apply(socket, args);
					}
				});
			})
		};

		return socket;
	}
})();