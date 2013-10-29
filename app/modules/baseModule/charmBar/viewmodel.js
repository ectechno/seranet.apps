define(function (require) {

    var ViewModel = function (moduleContext) {

        var self = this;
        var sectionTitles = ['Apps', 'Settings'];         
        

        this.isOpen = ko.observable(false);
        this.openedSection = ko.observable("settings");
        this.newApps = ko.observableArray([]);
        this.hotApps = ko.observableArray([]);
        this.allApps = ko.observableArray([]);

        this.initialize = function () {
            $('#pivot').pivot();

            $(document).mouseup(function (e) {
                var container = $("#charms");
                if (!container.is(e.target) && container.has(e.target).length === 0) {
                    if ($('#charms').hasClass('in')) self.isOpen(false);
                }
            });

        }        

        this.toggleCharmBar = function (openedSec) {
            if (self.isOpen()) {
                self.isOpen(false);
            } else {                
                
                $.getJSON(moduleContext.getSettings().urls.plugins, function (pluginPaths) {

                    //TODO: should move following function to server side as can directly get app list from server with http call
                    var allApps = [],configPaths = [];
                    for (var i = 0; i < pluginPaths.length; i++) {
                        configPaths[i] = pluginPaths[i].replace('component', 'config');
                    }
                    require(configPaths, function () {
                        for (var i = 0; i < arguments.length; i++) {

                            if (typeof (Storage) !== "undefined") {
                                if (localStorage.userPlugins) {
                                    var localPlugins = JSON.parse(localStorage.userPlugins);
                                    if (localPlugins.indexOf(pluginPaths[i]) != -1) {
                                        continue;
                                    }
                                }
                            }

                            var menuItem = {};
                            menuItem['title'] = arguments[i].name;
                            menuItem['details'] = arguments[i].description;
                            menuItem['image'] = pluginPaths[i].replace('component', 'icon.png');
                            menuItem['path'] = pluginPaths[i];
                            allApps.push(menuItem);
                        }
                        self.allApps(allApps);
                    });

                });             

                self.openedSection(openedSec == "apps" ? sectionTitles[0] : sectionTitles[1]);                
                self.isOpen(true);
                $("#charms .listview-container.grid-layout").height($(window).height() - 150);
                $(window).resize(function () {
                    $("#charms .listview-container.grid-layout").height($(window).height() - 150);
                });
            }
        }        

        this.showInfo = function (data, event) {
            
            var listItem = $(event.target).closest(".listItem");
         
            if (listItem.hasClass("expand") && !$(event.target).hasClass("addbtn")) {
                listItem.removeClass("expand");
            }else {
                $(".expand").removeClass("expand");
                listItem.addClass("expand");
            }

            $(".appText").ellipsis();
                
        }

        this.add = function (data,event) {
            var val = $(event.target).val();
            if (typeof (Storage) !== "undefined") {
                var plugins = JSON.parse(localStorage.userPlugins);
                if (plugins.indexOf(val) == -1) {
                    plugins.push(val);
                    localStorage.userPlugins = JSON.stringify(plugins);
                }
                location.reload();
            }
        }

        moduleContext.listen("TOGGLE_CHARM_BAR", function (openedSec) {
            self.toggleCharmBar(openedSec);
        });
      
    }

    return ViewModel;

});

