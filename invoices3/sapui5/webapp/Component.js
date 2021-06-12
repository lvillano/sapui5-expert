sap.ui.define([
    "sap/ui/core/UIComponent",
    "logaligroupa21/sapui5/model/models",
    "sap/ui/model/resource/ResourceModel",
    "./controller/helloDialog",
    "sap/ui/Device"
 

],
    /**
     * @param {typeof sap.ui.core.UIComponent} UIComponent
     * @param {typeof sap.ui.model.resource.ResourceModel} ResourceModel
     * @param {typeof sap.ui.Device} Device
     */

    function (UIComponent, models, ResourceModel, helloDialog,  Device) {

        return UIComponent.extend("logaligroupa21.sapui5.Component", {

            metadata : {

                manifest : "json"

              
            },


            init: function () {
                UIComponent.prototype.init.apply(this, arguments);

                //modelo default
                //this.getView().setModel(models.createModel());
                this.setModel(models.createModel());

                //modelo i18n <--------------se carga en manifest
                //var i18nModel = new ResourceModel({ bundleName: "logaligroupa21.sapui5.i18n.i18n" });
                //this.getView().setModel(i18nModel,"i18n");
                //this.setModel(i18nModel, "i18n");

                //instancia de objeto manejado
                this._helloDialog = new helloDialog(this.getRootControl());

                //ROUTING
                this.getRouter().initialize();

                //agregar el dispositivo(desde modelo)
                this.setModel(models.createDeviceModel(),"device");

            },
            exit: function(){
                this._helloDialog.destroy();
                //elimina el atributo
                delete this._helloDialog;

            },
            openHelloDialog: function(){

                this._helloDialog.open();
            },
            getContentDensityClass: function(){
                if (!Device.support.touch){
                    this._sContentDensityClass = "sapUiSizeCompact";
                }
                else{
                this._sContentDensityClass = "sapUiSizeCozy";
                }
                return this._sContentDensityClass; 

            }


        });

    }

);