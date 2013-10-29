define(function(require) {

    // Load the dependencies
    var Boiler = require('Boiler'),
        ViewModel = require('./viewmodel'),
        template = require('text!./view.html');

    var Component = function (moduleContext, description, name, holder) {

	    var panel, vm = null;

		this.activate = function(parent) {
			if(!panel) {
			    panel = new Boiler.ViewTemplate(parent, template);
			    vm = new ViewModel(moduleContext);
			    vm.initialize(panel.getJQueryElement(), description, name, holder);
			    ko.applyBindings(vm, panel.getDomElement());			    
			}
			panel.show();
		};

		this.deactivate = function () {
		    if (panel) {
		        panel.hide();
		    }
		};

	};

	return Component;
}); 