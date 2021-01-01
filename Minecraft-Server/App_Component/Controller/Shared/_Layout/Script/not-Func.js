function countUpFromTime(countFrom) {
    var now = new Date(),
        countFrom = new Date(countFrom),
        timeDifference = (now - countFrom);

    var secondsInADay = 60 * 60 * 1000 * 24,
        secondsInAHour = 60 * 60 * 1000;

    year = Math.floor(((timeDifference / (secondsInADay) * 1) / 30)/12);
    month = Math.floor((timeDifference / (secondsInADay) * 1)/30);
    days = Math.floor(timeDifference / (secondsInADay) * 1);
    hours = Math.floor((timeDifference % (secondsInADay)) / (secondsInAHour) * 1);
    mins = Math.floor(((timeDifference % (secondsInADay)) % (secondsInAHour)) / (60 * 1000) * 1);
    secs = Math.floor((((timeDifference % (secondsInADay)) % (secondsInAHour)) % (60 * 1000)) / 1000 * 1);

    if (year) {
        return year + ' year ago';
    }
    else if (month) {
        return month + ' moth ago';
    }
    else if(days){
        return days + ' day ago';
    }
    else if (hours) {
        return hours + ' hour ago';
    }
    else if (mins) {
        return mins + ' min ago';
    }
    else {
        return secs + ' sec ago';
    }

    
    
}