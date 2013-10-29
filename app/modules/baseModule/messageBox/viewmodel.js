define(function (require) {

    var ViewModel = function (moduleContext) {

        var self = this;

        this.messageTitle = ko.observable("");
        this.message = ko.observable("");
        this.callback = null;

        
        moduleContext.listen("MESSAGE_BOX", function (message) {
            self.messageTitle(message.title);
            self.message(message.body);
            self.callback = message.callback;
            $('#messageModal').modal('show');
        });


        this.ok = function () {
            if (self.callback) self.callback();
            $('#messageModal').modal('hide');
        }
    }

    return ViewModel;

});