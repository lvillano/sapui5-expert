sap.ui.define(["logaligroupa21/sapui5/model/formatter",
    "sap/ui/model/resource/ResourceModel"],//cargar i18n

    /**
     * @param {typeof sap.ui.model.resource.ResourceModel} ResourceModel
     */

    function (formatter, ResourceModel) {

        QUnit.module("Qinvoices Status", {
            beforeEach: function () {
                this._oResourceModel = new ResourceModel({
                    bundleUrl: sap.ui.require.toUrl("logaligroupa21/sapui5") + "/i18n/i18n.properties"

                });
            },

            afterEach: function () {
                this._oResourceModel.destroy();
            }

        });

        QUnit.test(" debe retornar estado de factura ", function(assert){

            let oModel = this.stub();
            oModel.withArgs("i18n").returns(this._oResourceModel);

            let oViewStub = {
                getModel: oModel
            }

            let oControllerStub = {
                getView: this.stub().returns(oViewStub)
            }

            let oFormatter = formatter.invoiceStatus.bind(oControllerStub);

            assert.strictEqual(oFormatter("A"),"Nueva factura", "prueba es correcta para A" );
            assert.strictEqual(oFormatter("B"),"En progreso", "prueba es correcta para B" );
            assert.strictEqual(oFormatter("C"),"Contabilizado", "prueba es correcta para C" );

        });


    });