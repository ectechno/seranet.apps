/*
 * Definition of the base module. Base module contain some common components some one may use in
 * creating own application. These components are not a core part of BoilerplateJS, but available as samples.
 */
define(function(require) {

    // Load the dependencies
    var Boiler = require('Boiler'),
        settings = require('./settings'),
        CharmBarComponent = require('./charmBar/component'),
        ControlBarComponent = require('./controlBar/component'),
        MessageBoxComponent = require('./messageBox/component');

    // Definition of the base Module as an object, this is the return value of this AMD script
    return {
        
        initialize : function(parentContext) {
            //create module context by assiciating with the parent context
            var context = new Boiler.Context(parentContext);
            context.addSettings(settings);

            //scoped DomController that will be effective only on $('#page-content')
            var controller = new Boiler.DomController($('#page-content'));

            //add routes with DOM node selector queries and relevant components
            controller.addRoutes({
                ".control-bar": new ControlBarComponent(context),
                ".charm-bar": new CharmBarComponent(context),
                ".msg-box" : new MessageBoxComponent(context)
            });
            
            controller.start();
        }
        
    }

});