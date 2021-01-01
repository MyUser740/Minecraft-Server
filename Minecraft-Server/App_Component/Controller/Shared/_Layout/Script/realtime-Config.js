var noti = $.connection.notificationHub;

noti.client.reacive = function (Id,User, From, Message, DateSend) {
    if ($.cookie('usr_Name') === User) {

        $.ajax({
            url: './api/Translate?fromLanguage=en-GB&toLanguage=' + $.cookie('stg_lang') + '&input=' + Message,
            type: 'GET',
            dataType: 'json',
            success: function (data, textStatus, xhr) {
                $.ajax({
                    url: './api/Translate?fromLanguage=en-GB&toLanguage=' + $.cookie('stg_lang') + '&input=' + From,
                    type: 'GET',
                    dataType: 'json',
                    success: function (data1, textStatus1, xhr1) {
                        $('#notiBox').append('<div class="row"> <div class="col-8"> <strong>' + data1 + '</strong> </div><div class="col-12"> <p class="text-muted" index="' + Id + '"></p></div></div><div class="row"> <span class="badge badge-soft-danger">New</span> <div class="col-20"> <p>' + data + '</p></div></div>');

                        var now = new Date();
                        setInterval(function () {

                            $("[index='" + Id + "']").text(countUpFromTime(now));
                        }, 1000);
                    },
                    error: function (xhr1, textStatus1, errorThrown1) {
                        console.log('Error in Operation');
                    }
                });
                
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log('Error in translating');
            }
        });

        

        
    }
        
};

$.connection.hub.start().done(function () {
    console.log('Notification hub Started');
});