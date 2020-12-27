var noti = $.connection.notificationHub;

noti.client.reacive = function (Id,User, From, Message, DateSend) {
    if($.cookie('usr_Name') === User)
        $('#notiBox').append('<div class="row"> <div class="col-10"> <strong>' + From + '</strong> </div><div class="col-5"> <p class="text-muted" data-id="' + Id + '"></p></div></div><div class="row"> <span class="badge badge-soft-danger">New</span> <div class="col-20"> <p>' + Message + '</p></div></div>');
};

$.connection.hub.start().done(function () {
    console.log('Notification hub Started');
});