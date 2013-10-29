define(function (require) {

    setInterval(function () { changeTile() }, 4000);

    function changeTile() {
        var firstPreview = $("#sports .tile-dynamic").children(':first');
        firstPreview.animate({ marginTop: '-135px' }, 500, function () {
            firstPreview.css("margin-top", "0");
            firstPreview.insertAfter($("#sports .tile-dynamic").children(':last'));
        });
    }

});