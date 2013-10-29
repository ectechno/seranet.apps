define(function (require) {


    setInterval(function () { changeTile() }, 4000);

    function changeTile() {
        var firstPreview = $("#ccc .tile-dynamic").children(':first');
        firstPreview.animate({ marginTop: '-135px' }, 1000, function () {
            firstPreview.css("margin-top", "0");
            firstPreview.insertAfter($("#ccc .tile-dynamic").children(':last'));
        });
    }

});

