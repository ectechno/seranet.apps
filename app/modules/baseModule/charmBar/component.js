define(function(require) {

    // Load the dependencies
    var Boiler = require('Boiler'),
        ViewModel = require('./viewmodel'),
        stylePath = require('path!./style.css'),
        template = require('text!./view.html');

    var Component = function (moduleContext) {

	    var panel, vm = null;

		this.activate = function(parent) {
			if(!panel) {
			    panel = new Boiler.ViewTemplate(parent, template);
			    Boiler.ViewTemplate.setStyleLink(stylePath);
			    vm = new ViewModel(moduleContext);
			    vm.initialize();
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