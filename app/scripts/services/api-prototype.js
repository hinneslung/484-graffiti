(function () {
    'use strict';

    angular
        .module('app')
        .factory('apiPrototypeService', apiPrototypeService);

    apiPrototypeService.$inject = ['$rootScope'];

    /* @ngInject */
    function apiPrototypeService($rootScope) {

        //-----------------------------------------------------------------------------
        //
        api.getArts = function(skip, limit) {
            return {

            };
        };
        api.getChat = function(buddyUsername) {
            return $http.get(apiUrl + 'chats/' + buddyUsername);
        };
        api.getMessages = function(buddyId, skip, limit) {
            return $http.get(apiUrl + 'chats/' + buddyId + '/messages?skip=' + skip + '&limit=' + limit);
        };

		//-----------------------------------------------------------------------------
	    // Most Viewed and Views


        return api;
    }

})();