// @ts-nocheck 
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "../model/formatter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
    /**
     * 
     * @param {typeof sap.ui.core.mvc.Controller}Controller
     * @param {typeof sap.ui.model.json.JSONModel}JSONModel
     * @param {typeof sap.ui.model.Filter}Filter
     * @param {typeof sap.ui.model.FilterOperator}FilterOperator
     */


    function (Controller, JSONModel, formatter, Filter, FilterOperator) {
        "use:strict"

        return Controller.extend("logaligroupa21.sapui5.controller.invoicesList", {


            formatter: formatter,

            onInit: function () {
                
                var oViewModel = new JSONModel({
                    usd: "USD",
                    eur: "EUR"

                });
                //agregar modelo + propiedades que faltan en modelo
                this.getView().setModel(oViewModel, "currency");

            },

            filterInvoices: function (oEvent) {

                const aFilter = [];
                const sQuery = oEvent.getParameter("query");

                if (sQuery) {
                    //aFilter.push( new filter("ProductName", "EQ", sQuery));
                    aFilter.push(new Filter("ProductName", FilterOperator.Contains, sQuery));

                };

                const oList = this.getView().byId("invoiceList");
                const oBinding = oList.getBinding("items");
                oBinding.filter(aFilter);

            },

            NavigateDetails: function(oEvent){
                const oItem = oEvent.getSource();
                const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("details", {
                    //path en el manifest routing
                    invoicePath: window.encodeURIComponent(oItem.getBindingContext("northwind").getPath().substr(1))

                });
            }

        });


        v

    }

);