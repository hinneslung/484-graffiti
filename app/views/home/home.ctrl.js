(function () {
    'use strict';

    angular
    .module('app')
		    .controller('HomeCtrl', HomeCtrl);

	    HomeCtrl.$inject = ['$scope', '$log', '$window', '$rootScope', 'dictionary', 'apiService', 'CONST'];

	    /* @ngInject */
	    function HomeCtrl($scope, $log, $window, $rootScope, dictionary, apiService, CONST) {
		    var vm = this;
		    vm.title = 'home';

		    $scope.dict = dictionary();

		    $scope.myInterval = 5000;
		    $scope.noWrapSlides = false;
		    $scope.active = 0;
		    var slides = $scope.slides = [];
		    var currIndex = 0;

		    $scope.addSlide = function() {
			    var newWidth = 600 + slides.length + 1;
			    slides.push({
				    image: 'images/banners/0.png',
				    // text: ['Nice image','Awesome photograph','That is so cool','I love that'][slides.length % 4],
				    id: currIndex++
			    });
			    slides.push({
				    image: 'images/banners/1.png',
				    // text: ['Nice image','Awesome photograph','That is so cool','I love that'][slides.length % 4],
				    id: currIndex++
			    });
		    };
		    $scope.addSlide();

		    $scope.categories = [{title: "Cat 1"}, {title: "Cat 2"}, {title: "Cat 3"}];

		    $scope.arts = [];
		    for (var i = 0; i < 5; i++) {
			    $scope.arts.push({
				    id: i,
				    shop: {username: "Artist " + i},
				    preview_url: "images/" + i % 6 + ".jpg"
			    });
		    }

		    $scope.artists = [];
		    for (var i = 0; i < 5; i++) {
			    $scope.artists.push({
				    id: i,
				    username: "Artist " + i,
				    image_url: "../assets/images/a" + i + ".jpg"
			    });
		    }
    }

})();
