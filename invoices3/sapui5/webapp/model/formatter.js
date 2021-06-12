// @ts-nocheck 
sap.ui.define([

], function () {


    return {
        invoiceStatus: function (sStatus) {

            const resourceBundle = this.getView().getModel("i18n").getResourceBundle();

            switch (sStatus) {
                //buscar el texto/valor con la propiedad del modelo i18n
                case 'A': return resourceBundle.getText("statusA");

                case 'B': return resourceBundle.getText("statusB");
              
                case 'C': return resourceBundle.getText("statusC");

                default: return resourceBundle.getText("statusA");
                 
            }

        }

    }

});