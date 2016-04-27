(function () {
    'use strict';

    angular
        .module('app')
        .filter('caption', caption);

    function caption() {
        return captionFilter;

        ////////////////

        function captionFilter(caption) {
            return transformTags(caption);
        }

        function transformTags(text) {
            if (typeof(text) != 'string') return '';
            text = text.replace(/#+([\u4e00-\u9fa5_A-Za-z0-9-]+)/ig, "<a href='#/search/$1' class='text-info'>#$1</a>");
            return text.replace(/\n/g, "<br/>");
        }
    }

})();
