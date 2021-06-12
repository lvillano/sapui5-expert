sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
    
   
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     * 
     * 
     */

    function (Controller) {
        "use strict";

        return Controller.extend("logaligroupa21.sapui5.controller.v1", {


            onInit: function () {

             

            },
            onOpenDialogHeader: function(){

                this.getOwnerComponent().openHelloDialog();
            } 
            // onShow: function () {
                
            //     var oBundle = this.getView().getModel("i18n").getResourceBundle();
            //     var sRecipient = this.getView().getModel().getProperty("/data/name1");                
            //     var sRecipient2 = this.getView().getModel().getProperty("/data/name2");
            //     var sMsg = oBundle.getText("helloMsg", [sRecipient, sRecipient2]);
            //     MessageToast.show(sMsg);
            // }

        });


    }

);