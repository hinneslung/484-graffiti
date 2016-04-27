(function () {
    'use strict';

    angular
        .module('app')
        .factory('dictionary', dictionary);

    /* @ngInject */
    function dictionary() {
        return service;

        ////////////////

        function service() {
            return {
                rootUrl : '/client_v2/app/#/',
                searchFieldPlaceholder : '搜尋',
                userLogin : '買家登入',
                shopLogin : '店主登入',
                myProfile : '我的賬號',
                myShop : '我的商舖',
                logout : '登出',
                editCover : '',
                bookmark : '收藏',
                bookmarked : '已收藏',
                subscribe : '訂閱',
                subscribed : '已訂閱',
                buy : '購買',
                productName: '產品名稱',
                updateProduct: '更新',
                review : '評論',
                submitReview : 'Submit',
                aboutUs: '介紹',
                contact: '聯絡',
                category: '分類',
                hotMedia: '熱門商品',
                hotShops: '熱門店鋪',
                latestMedia: '最新',
	            subscribedMedia: '訂閱商品',
                seeMore: 'More!',
                categories: {
                    womenClothes :"女裝服飾",
                    menClothes:"男裝服飾",
                    womenShoes:"女裝鞋款",
                    menShoes:"男裝鞋款",
                    bags:"手袋皮具",
                    facialCare:"美容護理",
                    gadgets:"數碼配件",
                    accessories:"精品手作"
                },
                getURLParameter: function (name) {
                    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [,""])[1].replace(/\+/g, '%20')) || null;
                }
            }
        }
    }

})();

function uniqueArrayBy_id(array) {
	var a = array.concat();
	for(var i=0; i<a.length; ++i) {
		for(var j=i+1; j<a.length; ++j) {
			if(a[i]._id === a[j]._id)
				a.splice(j--, 1);
		}
	}
	return a;
}


/**
 * Created by kyfan on 24/12/2015.
 */
