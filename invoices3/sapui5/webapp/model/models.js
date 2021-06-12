sap.ui.define([
    "sap/ui/model/json/JSONModel",
    "sap/ui/Device"
],
    /**
     * @param {typeof sap.ui.model.json.JSONModel} JSONModel
     *  @param {typeof sap.ui.Device} Device
     */

    function (JSONModel,Device) {
        "use strict";

        return {

            createModel: function () {

                var oData = {

                    data: {

                        name1: "world1",
                        name2: "world2"
                    }

                    
                };

                return new JSONModel(oData);

                
            },

            //Agregar modelo del dispositivo y que se pueda ver en toda la app
            createDeviceModel: function(){
                var oModel = new JSONModel(Device);
                oModel.setDefaultBindingMode(sap.ui.model.BindingMode.OneWay);
                return oModel;

            }


        }

    });