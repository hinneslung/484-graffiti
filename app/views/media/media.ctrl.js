(function () {
    'use strict';

    angular
        .module('app')
        .controller('MediaCtrl', MediaCtrl);

    MediaCtrl.$inject = ['$window', '$scope', '$rootScope', '$stateParams', '$log', 'dictionary', 'apiService'];

    /* @ngInject */
    function MediaCtrl($window, $scope, $rootScope, $stateParams, $log, dictionary, apiService) {
        var vm = this;
        vm.dict = dictionary();
        vm.title = 'MediaCtrl';
        vm.media = {};

        //bookmark
        vm.isBookmarked = false;
        vm.toggleBookmark = toggleBookmark;

        //subscribe shop
        vm.isShopSubscribed = false;
        vm.toggleShopSubscription = toggleShopSubscription;

        //reviews
        vm.reviews = [];
        vm.reviewContent = "";
        vm.uploadedFileNames = [];
        vm.isReadyForReviewSubmission = true;
        vm.submitReview = submitReview;

        vm.showMediaActions = showMediaActions;

        activate();

        ////////////////

        function activate() {
            $log.info('MediaCtrl is mounted', $stateParams.mediaId);
            getMedia();
            getReviews();
            checkIsBookmarked();
        }

        function showMediaActions(){
            return $rootScope.clientType === 'user';
        }

        function getMedia(){
            apiService
                .getMediaById($stateParams.mediaId)
                .success(function(res){
                    vm.media = res.data;
	                checkIsShopSubscribed();
	                getShop();
	                getIgComments();
                });
        }

	    function getShop() {
		    apiService
			    .getShopByUsername(vm.media.shop.username)
			    .success(function(res) {
				    vm.media.shop = res.data;
			    })
	    }

        function getIgComments() {
            apiService.getMediaIgComments(vm.media._id).success(function(res) {
                vm.media.igComments = res.data;
            });
        }

        function getReviews(){
            apiService
                .getReviews($stateParams.mediaId)
                .success(function(res){
                    vm.reviews = res.data;
                });
        }

        function submitReview(){
            var mediaId = $stateParams.mediaId;
            var content = vm.reviewContent;
            if (content == "") return;
            var fileNames = vm.uploadedFileNames;
            apiService
                .review(mediaId, content, fileNames)
                .success(function(res){
                    getReviews();
                    vm.reviewContent = "";
                    vm.uploadedFileNames = [];
                });
        }

        function checkIsBookmarked (){
            apiService
                .isBookmarked($stateParams.mediaId)
                .success(function(res){
                    vm.isBookmarked = res.data.bookmarked;
                });
        }

        function toggleBookmark(){
            if (vm.isBookmarked){
                apiService
                    .unbookmark($stateParams.mediaId)
                    .success(function(res){
                        vm.isBookmarked = false;
                    });
            }else {
                apiService
                    .bookmark($stateParams.mediaId)
                    .success(function(res){
                        vm.isBookmarked = true;
                    });
            }
        }

        function checkIsShopSubscribed (){
            apiService
                .isSubscribed(vm.media.shop._id)
                .success(function(res){
                    vm.isShopSubscribed = res.data.subscribed;
                });
        }

        function toggleShopSubscription (){
            if (vm.isShopSubscribed){
                apiService
                    .unsubscribe(vm.media.shop._id)
                    .success(function(res){
                        vm.isShopSubscribed = false;
                    });
            } else {
                apiService
                    .subscribe(vm.media.shop._id)
                    .success(function(res){
                        vm.isShopSubscribed = true;
                    });
            }
        }

	    //shop owner

	    vm.refreshMedia = function() {
		    apiService.refreshMedia(vm.media._id).success(function(res) {
			    getMedia();
		    });
	    };
    }
})();

