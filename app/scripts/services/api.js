(function () {
    'use strict';

    angular
        .module('app')
        .factory('apiService', apiService);

    apiService.$inject = ['$http', '$rootScope', 'CONST'];

    /* @ngInject */
    function apiService($http,$rootScope, CONST) {
        var apiUrl = "http://45.115.39.208/api/";
        var apiUploadUrl = apiUrl + 'upload';
        var authAppUrl = "http://45.115.39.208/client_v2/app/index.html";

        var clientId = $rootScope.clientId;
        var clientType = $rootScope.clientType;

        var api = {apiUrl: apiUrl, apiUploadUrl: apiUploadUrl};
        var DEFAULT_LIMIT = CONST.DEFAULT_LIMIT;
        var DEFAULT_SKIP = CONST.DEFAULT_SKIP;
        //-----------------------------------------------------------------------------
        // User
        api.login = function(type) {
            console.log(location);
            return $http.get(apiUrl + 'authentication/' + type + '?auth_url=' + authAppUrl);
        };
        api.jwt = function(type, code) {
            return $http.get(apiUrl + 'authentication/' + type + '/jwt?code=' + code + '&auth_url=' + authAppUrl);
        };

        //-----------------------------------------------------------------------------
        // Media
        // TODO: change to proper pagination using GET params limit & skip
        api.getMedia = function(skip, limit) {
            return $http.get(apiUrl + 'media', {
                params: {
                    limit: limit ? limit : DEFAULT_LIMIT,
                    skip: skip ? skip : DEFAULT_SKIP
                }
            });
        };

        api.getMostViewedMedia = function(categoryKey, pastHours, skip, limit) {
            return $http.get(apiUrl + 'media-views/media/most-viewed', {
                params: {
                    category: categoryKey,
	                past_hours: pastHours,
                    limit: limit ? limit : DEFAULT_LIMIT,
                    skip: skip ? skip : DEFAULT_SKIP
                }
            });
        };

	    api.getLatestMedia = function(categoryKey, skip, limit) {
		    return $http.get(apiUrl + 'media', {
			    params: {
				    category: categoryKey,
				    limit: limit ? limit : DEFAULT_LIMIT,
				    skip: skip ? skip : DEFAULT_SKIP
			    }
		    });
	    };

	    api.getSubscribedMedia = function(skip, limit) {
		    return $http.get(apiUrl + 'subscriptions/media', {
			    params: {
				    limit: limit ? limit : DEFAULT_LIMIT,
				    skip: skip ? skip : DEFAULT_SKIP
			    }
		    });
	    };

        api.getMediaById = function(id) {
            return $http.get(apiUrl + 'media/' + id);
        };

        api.getMediaByShopUsername = function(shopUsername, skip, limit) {
            return $http.get(apiUrl + 'media?shop_username=' + shopUsername, {
                params: {
                    limit: limit ? limit : DEFAULT_LIMIT,
                    skip: skip ? skip : DEFAULT_SKIP
                }
            });
        };
	    api.getMediaIgComments = function(id) {
		    return $http.get(apiUrl + 'media/' + id + '/ig/comments');
	    };
        api.searchMedia = function(text, skip, limit) {
            return $http.get(apiUrl + 'media/search/' + text, {
                params: {
                    limit: limit ? limit : DEFAULT_LIMIT,
                    skip: skip ? skip : DEFAULT_SKIP
                }
            });
        };
        api.suggestSearchKeyword = function(text) {
          return $http.get(apiUrl + 'media/suggest/' + text);
        };
        api.searchMediaFromShop = function(text, shopUsername, skip, limit) {
            return $http.get(apiUrl + 'media/search/' + text, {
                params: {
                    shop_username: shopUsername,
                    limit: limit ? limit : DEFAULT_LIMIT,
                    skip: skip ? skip : DEFAULT_SKIP
                }
            });
        };
        //api.updateProduct = function(id, name, price) {
        //    return $http.post(apiUrl + 'media', {id:id, name:name, price:price});
        //};

        //-----------------------------------------------------------------------------
        // User
        api.getUserById = function(id){
            return $http.get(apiUrl + 'users/' + id);
        };

        //-----------------------------------------------------------------------------
        // Shops
	    api.getMostViewedShops = function(categoryKey, pastHours, skip, limit) {
		    return $http.get(apiUrl + 'media-views/shops/most-viewed', {
			    params: {
				    category: categoryKey,
				    past_hours: pastHours,
				    limit: limit ? limit : DEFAULT_LIMIT,
				    skip: skip ? skip : DEFAULT_SKIP
			    }
		    });
	    };

        api.getShopByUsername = function(username, skip, limit) {
            return $http.get(apiUrl + 'shops/u/' + username);
        };
	    api.getShopById = function(id){
            return $http.get(apiUrl + 'shops/' + id);
        };

        api.getShops = function(skip, limit) {
            return $http.get(apiUrl + 'shops', {
                params: {
                    limit: limit ? limit : DEFAULT_LIMIT,
                    skip: skip ? skip : DEFAULT_SKIP
                }
            });
        };
        api.searchShops = function(text, skip, limit) {
            return $http.get(apiUrl + 'shops/search/' + text, {
                params: {
                    limit: limit ? limit : DEFAULT_LIMIT,
                    skip: skip ? skip : DEFAULT_SKIP
                }
            });
        };
        api.searchMediaFromShop = function(text, shop, skip, limit) {
            return $http.get(apiUrl + 'media/search/' + text + '?shop_username=' + shop, {
                params: {
                    limit: limit ? limit : DEFAULT_LIMIT,
                    skip: skip ? skip : DEFAULT_SKIP
                }
            });
        };

        //---------------------------------------Shop owner
        api.updateShopContacts = function(whatsapp, line, wechat, phone) {
            return $http.post(apiUrl + 'shops/contacts', {
	            'whatsapp': whatsapp,
	            'line': line,
	            'wechat': wechat,
	            'phone': phone
            });
        };
        api.updateShopCover = function(imageName) {
            return $http.post(apiUrl + 'shops/cover', {'image_name': imageName});
        };
        api.createPaymentMethod = function(type, fee, description, bank, accNo, accName) {
            return $http.post(apiUrl + 'shops/payment/methods', {
	            'type': type,
	            'fee': fee,
	            'description': description,
	            'bank': bank,
	            'bank_acc_no': accNo,
	            'bank_acc_name': accName
            });
        };
	    api.deletePaymentMethod = function(id) {
		    return $http.delete(apiUrl + 'shops/payment/methods/' + id);
	    };
	    api.createDeliveryMethod = function(type, fee, area, description) {
		    return $http.post(apiUrl + 'shops/delivery/methods', {
			    'type': type,
			    'fee': fee,
			    'area': area,
			    'description': description
		    });
	    };
	    api.deleteDeliveryMethod = function(id) {
		    return $http.delete(apiUrl + 'shops/delivery/methods/' + id);
	    };

	    api.refreshMedia = function(id) {
		    return $http.get(apiUrl + 'shops/update/media/' + id);
	    };

        //----------------------------------------------------------------------------
        // Bookmark
        api.getBookmarks = function(skip, limit) {
            return $http.get(apiUrl + 'bookmarks', {
                params: {
                    limit: limit ? limit : DEFAULT_LIMIT,
                    skip: skip ? skip : DEFAULT_SKIP
                }
            });
        };
        api.bookmark = function(mediaId) {
            return $http.post(apiUrl + 'bookmarks', {media_id: mediaId});
        };
        api.unbookmark = function(mediaId) {
            return $http.delete(apiUrl + 'bookmarks?media_id=' + mediaId);
        };
        api.isBookmarked = function(mediaId) {
            return $http.get(apiUrl + 'bookmarks/bookmarked?media_id=' + mediaId);
        };

        //-----------------------------------------------------------------------------
        // Subscribe
        api.getSubscriptions = function(skip, limit) {
            return $http.get(apiUrl + 'subscriptions', {
                params: {
                    limit: limit ? limit : DEFAULT_LIMIT,
                    skip: skip ? skip : DEFAULT_SKIP
                }
            });
        };
        api.subscribe = function(id) {
            return $http.post(apiUrl + 'subscriptions', {shop_id: id});
        };
        api.unsubscribe = function(id) {
            return $http.delete(apiUrl + 'subscriptions?shop_id=' + id);
        };
        api.isSubscribed = function(id) {
            return $http.get(apiUrl + 'subscriptions/subscribed?shop_id=' + id);
        };

        //-----------------------------------------------------------------------------
        // Review
        api.getReviews = function(mediaId, skip, limit) {
            return $http.get(apiUrl + 'reviews?media_id=' + mediaId, {
                params: {
                    limit: limit ? limit : DEFAULT_LIMIT,
                    skip: skip ? skip : DEFAULT_SKIP
                }
            });
        };
        api.review = function(mediaId, content, fileNames) {
            var review = {
                media_id: mediaId,
                content: content,
                image_names: fileNames};
            return $http.post(apiUrl + 'reviews', review);
        };

        //-----------------------------------------------------------------------------
        // Chat
        //-----------------------------------------------------------------------------
        // Chat
        api.getChats = function(skip, limit) {
            var params = {};
            if (skip) params['skip'] = skip;
            if (limit) params['limit'] = skip;
            return $http.get(apiUrl + 'chats', {params: params});
        };
        api.getChat = function(buddyUsername) {
            return $http.get(apiUrl + 'chats/' + buddyUsername);
        };
        api.getMessages = function(buddyId, skip, limit) {
            var params = {};
            if (skip) params['skip'] = skip;
            if (limit) params['limit'] = skip;
            return $http.get(apiUrl + 'chats/' + buddyId + '/messages', {params:params});
        };
        api.sendMessage = function(content, buddyId, fileName) {
            var data = {
                buddy_id: buddyId,
                content: content,
                image_name: fileName};
            return $http.post(apiUrl + 'chats', data);
        };
        api.sendMediaMessage = function(content, buddyId, mediaId) {
            var data = {
                buddy_id: buddyId,
                content: content,
                media_id: mediaId};
            return $http.post(apiUrl + 'chats', data);
        };
        api.getMentionedMediaInChat = function(buddyId, skip, limit) {
            var params = {};
            if (skip) params['skip'] = skip;
            if (limit) params['limit'] = skip;
            return $http.get(apiUrl + 'chats/' + buddyId + '/media', {params: params});
        };
        // Orders in Chat
        api.editMediaInCart = function(mediaId, buddyId, quantity) {//for add, edit quantity and remove
            var data = {
                buddy_id: buddyId,
                media_id: mediaId,
                quantity: quantity};//0 to remove, others to add or edit quantity
            return $http.post(apiUrl + 'chats/orders/media', data);
        };
        api.userCreateOrder = function(orderId, deliveryMethodId, deliveryLocation, deliveryTime, note) {
            // user create order
            var data = {
                order_id: orderId,
                delivery_method_id: deliveryMethodId,
                delivery_location: deliveryLocation,
                delivery_time: deliveryTime,
                note: note};
            return $http.post(apiUrl + 'chats/orders/order', data);
        };
        api.editOrderDelivery = function(orderId, methodId, location, time) {
            //please send out every field even no changes made
            var data = {
                order_id: orderId,
                method_id: methodId,
                location: location,
                time: time};
            return $http.post(apiUrl + 'chats/orders/delivery', data);
        };
        api.shopEditOrderTotal = function(orderId, total) {
            var data = {
                order_id: orderId,
                total: total};
            return $http.post(apiUrl + 'chats/orders/total', data);
        };
        api.userPayOrder = function(orderId, methodId, fileName) {
            var data = {
                order_id: orderId,
                method_id: methodId,
                image_name: fileName};
            return $http.post(apiUrl + 'chats/orders/pay', data);
        };
        api.shopFulfillOrder = function(orderId) {
            var data = {
                order_id: orderId
            };
            return $http.post(apiUrl + 'chats/orders/fulfill', data);
        };
        api.cancelOrder = function(orderId) {
            var data = {
                order_id: orderId
            };
            return $http.post(apiUrl + 'chats/orders/cancel', data);
        };

        //-----------------------------------------------------------------------------
        // Files
        api.uploadUrl = apiUploadUrl;

        api.uploadTempFile = function(file) {
            var fd = new FormData();
            fd.append('file', file);
            return $http.post(apiUploadUrl, fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            });
        };
        api.deleteTempUpload = function(fileName) {
            return $http.delete(apiUrl + 'upload?file_name=' + fileName);
        };

        return api;
    }

})();