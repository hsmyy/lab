'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;
var Multiply = new Module('multiply');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Multiply.register(function (app, auth, database) {

    //We enable routing. By default the Package Object is passed to the routes
    Multiply.routes(app, auth, database);

    //We are adding a link to the main menu for all authenticated users
//    Multiply.menus.add({
//        title: '乘法实验',
//        link: '乘法实验',
//        roles: ['authenticated'],
//        menu: 'main'
//    });
//
//    Multiply.menus.add({
//        title: '描述实验',
//        link: '描述实验',
//        roles: ['authenticated'],
//        menu: 'main'
//    });
//
//    Multiply.menus.add({
//        title: '辩词实验',
//        link: '辩词实验',
//        roles: ['authenticated'],
//        menu: 'main'
//    });
//
//    Multiply.menus.add({
//        title: '问卷调查',
//        link: '问卷调查',
//        roles: ['authenticated'],
//        menu: 'main'
//    });
//
//    Multiply.menus.add({
//        title: '计时器',
//        link: '计时器',
//        roles: ['authenticated'],
//        menu: 'main'
//    });

    Multiply.menus.add({
        title: '实验',
        link: '实验',
        roles: ['authenticated'],
        menu: 'main'
    });


//    Multiply.menus.add({
//        title: '眼神实验',
//        link: '眼神实验',
//        roles: ['authenticated'],
//        menu: 'main'
//    });
    Multiply.angularDependencies(['ui.slider', 'timer']);
    Multiply.aggregateAsset('js','hack.js', {global:true});
    /**
     //Uncomment to use. Requires meanio@0.3.7 or above
     // Save settings with callback
     // Use this for saving data from administration pages
     Multiply.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

     // Another save settings example this time with no callback
     // This writes over the last settings.
     Multiply.settings({
        'anotherSettings': 'some value'
    });

     // Get settings. Retrieves latest saved settigns
     Multiply.settings(function(err, settings) {
        //you now have the settings object
    });
     */
    Multiply.aggregateAsset('css', 'multiply.css');


    return Multiply;
});
