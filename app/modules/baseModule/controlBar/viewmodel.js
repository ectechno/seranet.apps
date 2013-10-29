define(function (require) {

    var ViewModel = function (moduleContext) {

        var self = this;

        this.openSettings = function () {
            moduleContext.notify('TOGGLE_CHARM_BAR', "settings");
        };

        this.openWidgets = function () {
            moduleContext.notify('TOGGLE_CHARM_BAR', "apps");
        }
    }

    return ViewModel;

});