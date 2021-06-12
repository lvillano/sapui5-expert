sap.ui.define([
    "sap/ui/core/UIComponent",
    "logaligroupa21/sapui5/model/models",
    "sap/ui/model/resource/ResourceModel",
    "./controller/helloDialog"
 

],
    /**
     * @param {typeof sap.ui.core.UIComponent} UIComponent
     * @param {typeof sap.ui.model.resource.ResourceModel} ResourceModel
     */

    function (UIComponent, models, ResourceModel, helloDialog,  ) {

        return UIComponent.extend("logaligroupa21.sapui5.Component", {

            metadata : {

                manifest : "json"

              
            },

            

            init: function () {
                UIComponent.prototype.init.apply(this, arguments);

                //modelo default
                //this.getView().setModel(models.createModel());
                this.setModel(models.createModel());

                //modelo i18n
                var i18nModel = new ResourceModel({ bundleName: "logaligroupa21.sapui5.i18n.i18n" });
                //this.getView().setModel(i18nModel,"i18n");
                this.setModel(i18nModel, "i18n");

                //instancia de objeto manejado
                this._helloDialog = new helloDialog(this.getRootControl());

            },
            exit: function(){
                this._helloDialog.destroy();
                //elimina el atributo
                delete this._helloDialog;

            },
            openHelloDialog: function(){

                this._helloDialog.open();
            }


        });

    }

);