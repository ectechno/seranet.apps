/*
 * Definition of the base module. Base module contain some common components some one may use in
 * creating own application. These components are not a core part of BoilerplateJS, but available as samples.
 */
define(function(require) {

    // Load the dependencies
    var Boiler = require('Boiler'),
        TileControlComponent = require('./tileControls/component'),
        settings = require('./settings');


    // Definition of the base Module as an object, this is the return value of this AMD script
    return {
        
        initialize: function (parentContext) {

            var tileSizes = { "large": "wide imagetext wideimage", "small": "app" };
            var tileColors = { "blue": "bg-color-blue", "dark_blue": "bg-color-blueDark", "green": "bg-color-green", "dark_green": "bg-color-greenDark", "red": "bg-color-red", "yellow": "bg-color-yellow", "orange": "bg-color-orange", "pink": "bg-color-pink", "purple": "bg-color-purple", "black": "bg-color-darken", "white": "bg-color-white" }

            //create module context by assiciating with the parent context and assign settings
            var context = new Boiler.Context(parentContext);
            context.addSettings(settings);

            //scoped DomController that will be effective only on $('#page-content')
            var controller = new Boiler.DomController($('#page-content'));


            if (typeof (Storage) !== "undefined") {
                // Yes! local storage support!
                if (localStorage.userPlugins) {
                    loadPlugins(JSON.parse(localStorage.userPlugins));
                } else {
                    //First time,  load default list
                    $.getJSON(context.getSettings().urls.defaultPlugins, function (pluginPaths) {
                        localStorage.userPlugins = JSON.stringify(pluginPaths);
                        loadPlugins(pluginPaths);
                    });
                }
            } else {
                // No! local storage support....then load default plugin list
                $.getJSON(context.getSettings().urls.defaultPlugins, loadPlugins);
            }          


            function loadPlugins(pluginPaths) {
                //Load plugins
                require(pluginPaths, function () {

                    var routes = {};

                    //iterate 'arguments' array which contain all plugin modules loaded
                    for (var i = 0; i < arguments.length; i++) {
                        var plugin = new arguments[i](context);
                        var holderId = _.uniqueId(plugin.config.pluginId + "_");

                        
                        //form hoder element according to developer's requiement in config.js file of plugin
                        var holderElement = $("<a " +
                            "id=\"" + holderId + "\" " +
                            "href=\"" + (isUrl(plugin.config.target) ? plugin.config.target : "javascript:void(0);") + "\" " +
                            "class=\"tile " + (tileSizes[plugin.config.tileSize] != "undefined" ? tileSizes[plugin.config.tileSize] : tileSizes["samll"]) + " " + (tileColors[plugin.config.tileColor] != "undefined" ? tileColors[plugin.config.tileColor] : "") + "\" " +
                            "target=\"_blank\" " +
                            "><div id = " + (holderId + "_menu") + "></div></a>");

                        //var liHolderElement = $('<li></li>').append(holderElement);//wrap as li element for support tileGrid plugin

                        //categorize widget into sections
                        var section = null;
                        switch (plugin.config.category) {
                            case "99x_places":
                                section = $("#nnx_places_section");
                                break;
                            case "social_media":
                                section = $("#social_media_section");
                                break;
                            default:
                                //section = $("#other_section");
                                section = $("#nnx_places_section");
                                break;
                        }
                        section.append(holderElement);
                        holderElement.data("path", pluginPaths[i]);
                        routes["#" + holderId] = plugin;
                        routes["#" + holderId + "_menu"] = new TileControlComponent(context, plugin.config.description, plugin.config.name, holderElement);
                    }

                    //Bind plugings to dom using dom controller
                    controller.addRoutes(routes);

                    //Start DomController
                    controller.start();

                    //doResizing();
                });
            }

            function isUrl(str) {
                if (/^([a-z]([a-z]|\d|\+|-|\.)*):(\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?((\[(|(v[\da-f]{1,}\.(([a-z]|\d|-|\.|_|~)|[!\$&'\(\)\*\+,;=]|:)+))\])|((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=])*)(:\d*)?)(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*|(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)|((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)|((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)){0})(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(str)) {
                    return true;
                } else {
                    return false;
                }
            }

        }
        
    }

});