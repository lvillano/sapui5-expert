sap.ui.define([
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.model.json.JSONModel} JSONModel
     */

    function (JSONModel) {
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

                
            }

        }

    });