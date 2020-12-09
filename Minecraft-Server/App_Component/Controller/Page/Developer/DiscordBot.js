
app.controller("DeveloperController", function ($scope, $http) {
    $scope.startBot = function () {
        $.ajax({
            method: 'GET',
            url: '/api/DiscordBot/0',
            success: function (r) {
                if (r === 'success') {
                    Swal.fire(
                        'Success!',
                        'That thing is still around?',
                        'success'
                    );
                }
                else {
                    var errMsg = r.split('|');
                    Swal.fire(
                        'An error occurred',
                        errMsg[1],
                        'error'
                    );
                }
            }
        });
    }
});