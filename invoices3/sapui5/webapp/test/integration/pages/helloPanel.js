sap.ui.define([
    "sap/ui/test/Opa5",
    "sap/ui/test/actions/Press"
],
    /**
     * @param{typeof sap.ui.test.Opa5}  Opa5
     * @param{typeof sap.ui.test.actions.Press}  Press
     */

    function (Opa5, Press) {

        Opa5.createPageObjects({
            onTheAppPage: {
                actions: {
                    sayHelloDialogBut: function () {
                        return this.waitFor({
                            id: "helloDialogBut",
                            viewName: "logaligroupa21/sapui5.view.helloPanel",
                            actions: new Press(),
                            errorMessage: "Error llamada helloDialogBut Press"

                        })

                    }

                },
                assertions: {

                    seeHelloDialogBut: function () {
                        return this.waitFor({
                            controlType: "sap.m.Dialog",
                            success: function () {
                                Opa5.assert.ok(true, "Se abre diálogo")

                            },
                            errorMessage: "Error al abrir diálogo"

                        })

                    }

                }

            }

        });

    })