define(function (require) {

    var tweets = null;
    var cursor = 0;

    fetchTweetes();
    setInterval(function () { fetchTweetes() }, 600000);
    setInterval(function () { changeTile() }, 20000);

    function changeTile() {
        var firstPreview = $("#twitter .tile-dynamic").children(':first');
        var secondPreview = $("#twitter .tile-dynamic").children(':last');
        if (tweets != null & tweets.length > 0) {
            secondPreview.children(".tweet-text").text(tweets[cursor].text);
            secondPreview.children(".tweet-date").text(relative_time(tweets[cursor].created_at));
            $("#twitter .button-retweet").attr('href', "http://twitter.com/intent/retweet?tweet_id=" + tweets[cursor].id_str);
            $("#twitter .button-reply").attr('href', "http://twitter.com/intent/tweet?in_reply_to=" + tweets[cursor].id_str);
            firstPreview.animate({ marginTop: '-135px' }, 1000, function () {
                firstPreview.css("margin-top", "0");
                firstPreview.insertAfter(secondPreview);
            });
            cursor = (cursor + 1) % 7;
        }
    }

    function fetchTweetes() {
        $.ajax({
            url: 'http://api.twitter.com/1/statuses/user_timeline/99xtechnology.json?count=7&include_rts=true&include_entities=true',
            dataType: 'jsonp',
            success: function (data) {
                tweets = data;
                changeTile()
            }
        });
    }

    function relative_time(time_value) {
        var values = time_value.split(" ");
        time_value = values[1] + " " + values[2] + ", " + values[5] + " " + values[3];
        var parsed_date = Date.parse(time_value);
        var relative_to = (arguments.length > 1) ? arguments[1] : new Date();
        var delta = parseInt((relative_to.getTime() - parsed_date) / 1000);
        delta = delta + (relative_to.getTimezoneOffset() * 60);

        var r = '';
        if (delta < 60) {
            r = 'a minute ago';
        } else if (delta < 120) {
            r = 'couple of minutes ago';
        } else if (delta < (45 * 60)) {
            r = (parseInt(delta / 60)).toString() + ' minutes ago';
        } else if (delta < (90 * 60)) {
            r = 'an hour ago';
        } else if (delta < (24 * 60 * 60)) {
            r = '' + (parseInt(delta / 3600)).toString() + ' hours ago';
        } else if (delta < (48 * 60 * 60)) {
            r = '1 day ago';
        } else {
            r = (parseInt(delta / 86400)).toString() + ' days ago';
        }

        return r;
    }


});