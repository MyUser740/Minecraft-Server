app.controller('News', function ($scope, $http) {

    $.getScript('./App_Component/Controller/Locale/Pages.js')

    $('#RandomNewsLoader').attr('style', 'display: block;');
    $('#RandomNews').attr('style', 'display: none;');

    setTimeout(function () {
        $('#RandomNewsLoader').attr('style', 'display: none;');
        $('#RandomNews').attr('style', 'display: block;');
    }, 4500);

    $scope.LoadRandomNews = function () {
        $.ajax({
            type: 'GET',
            url: './api/getRandomNews?lang=' + $.cookie('stg_lang'),
            success: function (respone) {
                var r = JSON.parse(respone);

                for (i = 0; i < 5; i++) {
                    var Ids = r[i].ID;
                    var Titles = r[i].Title;
                    var createBy = r[i].Create_By;

                    $('#RandomNews').append(`<li class="list-group-item"> <h6>${r}</h6> <label class="text-muted mt-0">${createBy}</label> <br/> <div class="btn-group btn-block" role="group" aria-label="Basic mixed styles example"> <button class="btn btn-outline-secondary-Journal" onclick="openNews(${Ids})">${NewsResc.Texts[6].text}</button> <button type="button" class="btn btn-outline-danger-Journal">${NewsResc.Texts[7].text}</button> <button type="button" class="btn btn-outline-success-Journal">${NewsResc.Texts[8].text}</button> </div></li>`);

                }
            },
            error: function (err) {
                console.error(err)
            }
        });
    }

    $scope.LoadCarouselNews = function () {
        $.ajax({
            type: 'GET',
            url: './api/getLatesNews',
            success: function (respone) {
                var r = JSON.parse(respone);

                $('#LatesNewsTitle').text(r[0].Title);
                $('#LatesNewsImage').attr('src', r[0].Image);
                $('#LatesNewsLink').attr('href', './News/Detail/' + r[0].ID);
            },
            error: function (err) {
                console.error(err)
            }
        });

        $.ajax({
            type: 'GET',
            url: './api/getMostPopullar',
            success: function (respone) {
                var r = JSON.parse(respone);

                $('#MostPopullarNewsTitle').text(r[0].Title);
                $('#MostPopullarNewsImage').attr('src', r[0].Image);
                $('#MostPopullarNewsLink').attr('href', './News/Detail/' + r[0].ID);
            },
            error: function (err) {
                console.error(err)
            }
        });

        $.ajax({
            type: 'GET',
            url: './api/getMostRate',
            success: function (respone) {
                var r = JSON.parse(respone);

                $('#MostRatedNewsTitle').text(r[0].Title);
                $('#MostRatedNewsImage').attr('src', r[0].Image);
                $('#MostRatedNewsLink').attr('href', './News/Detail/' + r[0].ID);
            },
            error: function (err) {
                console.error(err)
            }
        });

        $.ajax({
            type: 'GET',
            url: './api/getMostVote',
            success: function (respone) {
                var r = JSON.parse(respone);

                $('#MostVotedNewsTitle').text(r[0].Title);
                $('#MostVotedNewsImage').attr('src', r[0].Image);
                $('#MostVotedNewsLink').attr('href', './News/Detail/' + r[0].ID);
            },
            error: function (err) {
                console.error(err)
            }
        });
    }
});