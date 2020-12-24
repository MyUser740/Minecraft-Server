app.controller("QuickSearch", function ($scope, $http) {
    $scope.quickSearches = function () {
        window.location.href = './quicksearch?query=' + $('#QuickSearch').val();
    };
});