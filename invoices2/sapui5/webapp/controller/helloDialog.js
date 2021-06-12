sap.ui.define([
    "sap/ui/base/ManagedObject",
"sap/ui/core/Fragment"
],
    /**
     * 
     * @param {typeof sap.ui.base.ManagedObject} ManagedObject 
     * @param {typeof sap.ui.core.Fragment} Fragment 
     */


    function (ManagedObject, Fragment) {
        "use:strict"

        return ManagedObject.extend("logaligroupa21.sapui5.controller.helloDialog", {

            constructor: function (oView) {
                this._oView = oView;

            },

            exit: function () {
                delete this._oView;


            },
            open: function () {

                const oView = this._oView;

                if (!oView.byId("helloDialog")) {
                    //instanciar el dialogo

                    let oFragmentController = {
                        oncloseDialog: function(){
                            oView.byId("helloDialog").close();

                        }

                    };

                    Fragment.load({
                        id: oView.getId(),
                        name: "logaligroupa21.sapui5.view.helloDialog",
                        controller: oFragmentController// 

                    }).then(function (oDialog) {
                        oView.addDependent(oDialog);
                        oDialog.open();
                    });

                }
                else {
                    //ya esta instanciado
                    oView.byId("helloDialog").open();


                }

            }
            // close: function () {
            //     ya esta instanciado, ahora debe permitir cerrar el objeto
            //     this.getView().byId("helloDialog").close();

            // }

        }

        );

    }


);