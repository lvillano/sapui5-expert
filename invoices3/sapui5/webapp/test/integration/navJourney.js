sap.ui.define([
    "logaligroupa21/sapui5/localService/mockServer",
    "sap/ui/test/opaQunit",
    "./pages/helloPanel"
],
    /**
        * @param{typeof sap.ui.test.opaQunit}  opaQunit
        * 
        */

    function (mockServer,opaQunit) {
        QUnit.module("nav");

        opaQunit("debe abrir hello dialog", function (Given, When, Then) {

            //inicializar el mockserver para interfaz de usuario porque no hay vistas definidas
            mockServer.init();

            Given.iStartMyUIComponent({
                componentConfig: {
                    name: "logaligroupa21.sapui5"
                }
            });
            //metodos definidos en helloPanel.js
            When.onTheAppPage.sayHelloDialogBut();

            Then.onTheAppPage.seeHelloDialogBut();

            Then.iTeardownMyApp();

        });

    });