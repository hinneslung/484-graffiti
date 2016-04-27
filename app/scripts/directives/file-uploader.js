(function () {
    'use strict';

    angular
        .module('app')
        .directive('fileUploader', fileUploader);

    fileUploader.$inject = [];

    /* @ngInject */
    function fileUploader() {
        var directive = {
            bindToController: true,
            controller: FileUploaderCtrl,
            controllerAs: 'fileUploaderCtrl',
            templateUrl: 'views/components/file-uploader.html',
            link: link,
            restrict: 'E',
            scope: {
                delegate: '='
            }
        };
        return directive;

        function link(scope, element, attrs) {

        }
    }

    FileUploaderCtrl.$inject = ['$scope','FileUploader', 'apiService'];

    /* @ngInject */
    function FileUploaderCtrl($scope, FileUploader, apiService) {
        var vm = this;
        console.info('FileUploaderCtrl is mounted');
        var uploader = $scope.uploader = new FileUploader({
            url: apiService.uploadUrl
        });

        // FILTERS

        uploader.filters.push({
            name: 'customFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                return this.queue.length < 10;
            }
        });

        // CALLBACKS

        uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
            console.info('onWhenAddingFileFailed', item, filter, options);
            vm.delegate.isReadyForReviewSubmission = false;
        };
        uploader.onAfterAddingFile = function(fileItem) {
            console.info('onAfterAddingFile', fileItem);
        };
        uploader.onAfterAddingAll = function(addedFileItems) {
            console.info('onAfterAddingAll', addedFileItems);
        };
        uploader.onBeforeUploadItem = function(item) {
            console.info('onBeforeUploadItem', item);
        };
        uploader.onProgressItem = function(fileItem, progress) {
            console.info('onProgressItem', fileItem, progress);
        };
        uploader.onProgressAll = function(progress) {
            console.info('onProgressAll', progress);
        };
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
        };
        uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        uploader.onCancelItem = function(fileItem, response, status, headers) {
            console.info('onCancelItem', fileItem, response, status, headers);
        };
        uploader.onCompleteItem = function(fileItem, response, status, headers) {
            console.info('onCompleteItem', fileItem, response, status, headers);
            vm.delegate.uploadedFileNames.push(response.data.file_names[0]);
        };
        uploader.onCompleteAll = function() {
            console.info('onCompleteAll');
            vm.delegate.isReadyForReviewSubmission = true;
        };

    }

})();

