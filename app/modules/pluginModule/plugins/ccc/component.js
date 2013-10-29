define(function (require) {

    // Load the dependencies
    var Boiler = require('Boiler'),
        template = require('text!./view.html'),
        ViewModel = require('./viewmodel'),
        stylePath = require('path!./style.css'),
        config = require('./config');

    var Component = function (moduleContext) {
        var panel = null;
        this.activate = function (parent) {
            if (!panel) {
                panel = new Boiler.ViewTemplate(parent, template, null);
                Boiler.ViewTemplate.setStyleLink(stylePath);
            }
            panel.show();
        };

        this.deactivate = function () {
            if (panel) {
                panel.hide();
            }
        };

        this.config = config;
    };

    return Component;
});