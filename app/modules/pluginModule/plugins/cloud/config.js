define(function (require) {

    /* 
	 * All settings belongs to your plugin should listed below
	 */
    return {
        "pluginId": "cloud", //This should be unique id for your plugin
        "name": "Analysis in Cloud",
        "tileSize": "large", //Can be 'large' or 'small'
        "tileColor": "blue", //Color of your tile choose from the collection ("blue", "dark_blue", "green", "dark_green", "red", "yellow", "orange", "pink", "purple", "black")
        "target": "http://inspect.99xtechnology.com/",
        "description": "Analysis your code with Sonar",
        "category": "99x_places"
    };

});