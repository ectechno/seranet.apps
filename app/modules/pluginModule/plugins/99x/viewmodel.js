define(function (require) {


    setInterval(function () { changeTile() }, 4000);

    function changeTile() {
        var firstPreview = $("#nnx .tile-dynamic").children(':first');
        firstPreview.animate({ marginTop: '-135px' }, 1000, function () {
            firstPreview.css("margin-top", "0");
            firstPreview.insertAfter($("#nnx .tile-dynamic").children(':last'));
        });
    }

});