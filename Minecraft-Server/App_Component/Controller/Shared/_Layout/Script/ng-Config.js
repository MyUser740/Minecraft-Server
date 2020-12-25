app.controller("QuickSearch", function ($scope, $http) {
    $scope.quickSearches = function () {
        if ($('#QuickSearch').val() === '')
            swal.fire();
        else {
            window.location.href = './quicksearch?query=' + $('#QuickSearch').val();
        }
    };
});