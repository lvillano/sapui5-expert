/* eslint-disable no-undef */


QUnit.config.autostart = false;


sap.ui.getCore().attachInit(function(){
"use strict";
sap.ui.require(["logaligroupa21/sapui5/test/unit/ALLtests"],function(){

QUnit.start();

})

});