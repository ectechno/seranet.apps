define(function (require) {

    /* 
	 * All settings belongs to your plugin should listed below
	 */
    return {
        "pluginId": "jira", //This should be unique id for your plugin
        "name": "99X Jira",
        "tileSize": "small", //Can be 'large' or 'small'
        "tileColor": "purple", //Color of your tile choose from the collection ("blue", "dark_blue", "green", "dark_green", "red", "yellow", "orange", "pink", "purple", "black")
        "target": "https://seranet.atlassian.net/login?dest-url=%2Fsecure%2FDashboard.jspa",
        "description": "JIRA is the project tracker for teams planning, building and launching great products.",
        "category": "99x_places"
    };

});