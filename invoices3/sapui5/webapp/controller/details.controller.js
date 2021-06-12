sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/core/UIComponent"

],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     * @param {typeof sap.ui.core.routing.History} History
     * @param {typeof sap.ui.core.UIComponent} UIComponent
     */

    function (Controller, History, UIComponent) {
        "use strict";

        return Controller.extend("logaligroupa21.sapui5.controller.details", {


            onInit: function () {

                const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.getRoute("details").attachPatternMatched(this._onObjectMatch, this);

            },
            _onObjectMatch: function (oEvent) {

                //se agrega para reiniciar rating.js
                this.byId("rating").reset();
                //se agrega para reiniciar rating.js

                this.getView().bindElement({
                    path: "/" + window.decodeURIComponent(oEvent.getParameter("arguments").invoicePath),
                    model: "northwind"

                })


            },
            onBack: function () {
                const oHistory = History.getInstance();
                const sPreviousHash = oHistory.getPreviousHash();

                if (sPreviousHash !== undefined) {
                    window.history.go(-1);
                } else {
                    const oRouter = UIComponent.getRouterFor(this);
                    oRouter.navTo("Routev1", {}, true);
                }


            },

            //funcion controlador Rating personalizado
            onRatingChange: function (oEvent) {
                const fValue = oEvent.getParameter("value");
                const oResourceBundle = this.getView().getModel("i18n").getResourceBundle();

                //sin utilizar la dependencia superior
                sap.m.MessageToast.show(oResourceBundle.getText("ratingConfirm", [fValue]));


            }



        });


    }

);