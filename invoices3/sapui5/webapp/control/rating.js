sap.ui.define([
    "sap/ui/core/Control",
    "sap/m/RatingIndicator",
    "sap/m/Label",
    "sap/m/Button"

],
    /**
     * 
     * @param {typeof sap.ui.core.Control} Control 
     * @param {typeof sap.m.RatingIndicator} RatingIndicator
     * @param {typeof sap.m.Label} Label 
     * @param {typeof sap.m.Button} Button 
     */

    function (Control, RatingIndicator, Label, Button) {
        "use strict"

        return Control.extend("logaligroupa21.sapui5.control.rating", {

            metadata: {
                //propiedades del control personalizado
                properties: {
                    value: { type: "float", defaultValue: 0 }
                },
                aggregations: {
                    rating: {
                        type: "sap.m.RatingIndicator",
                        multiple: false,
                        visibility: "hidden"

                    },
                    label: {
                        type: "sap.m.Label",
                        multiple: false,
                        visibility: "hidden"

                    },
                    button: {
                        type: "sap.m.Button",
                        multiple: false,
                        visibility: "hidden"
                    }
                },

                events: {
                    change: {
                        parameters: {
                            value: { type: "int" }
                        }
                    }
                }


            },

            init: function () {

                this.setAggregation("rating", new RatingIndicator({
                    //set y get se arman por default
                    value: this.getValue(),
                    iconSize: "3rem",
                    visualMode: "Half",
                    liveChange: this.onRate.bind(this)//cambios en rating

                }));
                //forma JS de crear Label--------------------------------
                this.setAggregation("label", new Label({
                    text: "{i18n>ratingLabel}"
                }).addStyleClass("sapUiSmallMargin")
                );

                this.setAggregation("button", new Button({
                    text: "{i18n>ratingButton}",
                    press: this.onSubmit.bind(this) //cambios al presionar boton Rate
                }).addStyleClass("sapUiTinyMarginTopButton")
                );

            },

            renderer: function (oRm, oControl) {
                //interpretacion del navegador (emular los <div>)
                //<div></div>
                oRm.openStart("div", oControl);
                oRm.class("productRating");
                oRm.openEnd();

                oRm.renderControl(oControl.getAggregation("rating"));
                oRm.renderControl(oControl.getAggregation("button"));
                oRm.renderControl(oControl.getAggregation("label"));

                oRm.close("div");

            },

            onRate: function (oEvent) {
                // cambia el texto del rating
                const oResourceBundle = this.getModel("i18n").getResourceBundle();
                const fValue = oEvent.getParameter("value");

                this.setProperty("value", fValue, true);

                this.getAggregation("label").setText(oResourceBundle.getText("ratingIndicator", [fValue, oEvent.getSource().getMaxValue()]));
                this.getAggregation("label").setDesign("Bold");

            },

            onSubmit: function (oEvent) {

                //deshabilitar al presionar "Rate"
                const oResourceBundle = this.getModel("i18n").getResourceBundle();
                this.getAggregation("rating").setEnabled(false);
                this.getAggregation("button").setEnabled(false);

                //cambiar etiqueta
                this.getAggregation("label").setText(oResourceBundle.getText("ratingThanks"));
                //disparar evento
                this.fireEvent("change", {
                    value: this.getValue()
                });

            },
            reset: function () {
                const oResourceBundle = this.getModel("i18n").getResourceBundle();
                this.setValue(0)
                this.getAggregation("rating").setEnabled(true);
                this.getAggregation("label").setText(oResourceBundle.getText("ratingLabel"));
                this.getAggregation("button").setEnabled(true);

                this.getAggregation("label").setDesign("Standard");
            },

            //sobreescritura del setValue por default
            setValue: function (fValue) {
                this.setProperty("value", fValue, true);
                this.getAggregation("rating").setValue(fValue);//actualizar en interfaz

            }




        });

    });