app.controller("QuickSearch", function ($scope, $http) {
    $scope.quickSearches = function () {
        if ($('#QuickSearch').val() === '')
            Swal.fire(
                _LayoutRsc.Texts[25].text,
                _LayoutRsc.Texts[26].text,
                'error'
            );
        else {
            window.location.href = './quicksearch?query=' + $('#QuickSearch').val();
        }
    };
});