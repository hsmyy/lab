'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Judge = new Module('judge');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Judge.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Judge.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Judge.menus.add({
    title: 'judge test',
    link: 'judge',
    roles: ['authenticated'],
    menu: 'main'
  });

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Judge.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Judge.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Judge.settings(function(err, settings) {
        //you now have the settings object
    });
    */
  Judge.aggregateAsset('css', 'judge.css');

  return Judge;
});
