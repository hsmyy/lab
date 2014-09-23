angular.module('mean.multiply').directive('timer', function () {
    return {
        restrict: 'E',
        scope: {
            onTimeUp: '&onTimeUp'
        },
        link: function ($scope, $element, $attr) {
            // TODO 1. Add count down display element;

            // TODO 2. Start timer and count down;
            // Count down in seconds.
            var countDown = $scope.$eval($attr.countDown);

            // TODO 3. Call onTimeUp on time up.
        }
    };
});
