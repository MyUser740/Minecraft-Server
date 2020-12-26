app.controller("QuickSearch", function ($scope, $http) {
    $scope.quickSearches = function () {
        if ($('#QuickSearch').val() === '')
            Swal.fire({
                icon: 'error',
                title: _LayoutRsc.Texts[25].text,
                text: _LayoutRsc.Texts[26].text,
                confirmButtonText: _LayoutRsc.Texts[27].text
            });
        else {
            window.location.href = './quicksearch?query=' + $('#QuickSearch').val();
        }
    };
});