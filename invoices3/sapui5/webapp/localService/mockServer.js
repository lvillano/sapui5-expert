//@ts-nocheck
sap.ui.define([
    "sap/ui/core/util/MockServer",
    "sap/ui/model/json/JSONModel",
    "sap/base/util/UriParameters",
    "sap/base/Log"

    /** 
     * @param{typeof sap.ui.core.util.MockServer } MockServer
     * @param{typeof sap.ui.model.json.JSONModel } JSONModel
     * @param{typeof sap.base.util.UriParameters } UriParameters
     * @param{typeof sap.base.Log } Log
     */

], function (MockServer, JSONModel, UriParameters, Log) {
    "use strict";

    var oMockServer,
        _sAppPath = "logaligroupa21/sapui5/",
        _sJsonFilesPath = _sAppPath + "localService/mockData";//en caso de tener la carpeta mockData

    var oMockServerInterface = {

        /** 
         * inicializa en async
         * @protected
         * @param {object} oOptionsParameters
         * @returns{Promise} promesa desde llamada
         **/
        init: function (oOptionsParameters) {

            var oOptions = oOptionsParameters || {};

            return new Promise(function (fnResolve, fnReject) {

                var sMAnifestUrl = sap.ui.require.toUrl(_sAppPath + "manifest.json"),
                    oManifestModel = new JSONModel(sMAnifestUrl);

                oManifestModel.attachRequestCompleted(function () {

                    var oUriParameters = new UriParameters(window.location.href);
                    // parse manifest
                    var sJsonFilesUrl = sap.ui.require.toUrl(_sJsonFilesPath);
                    var oMainDataSource = oManifestModel.getProperty("/sap.app/dataSources/mainService");
                    var sMetadataUrl = sap.ui.require.toUrl(_sAppPath + oMainDataSource.settings.localUri);
                    //asegurar barra tecnica de cierre URL
                    var sMockServerUrl =
                        oMainDataSource.uri && new URI(oMainDataSource.uri).absoluteTo(sap.ui.require.toUrl(_sAppPath)).toString();
                    //creacion del mock
                    if (!oMockServer) {

                        oMockServer = new MockServer({
                            rootUri: sMockServerUrl
                        });

                    } else {
                        oMockServer.stop();
                    }

                    //configure con delay 0.5 seg
                    MockServer.config({
                        autoRespond: true,
                        autoRespondAfter: (oOptions.delay || oUriParameters.get("serverDelay") || 500)
                    });

                    //simular los request (generar datos)
                    oMockServer.simulate(sMetadataUrl, {
                        sMockdataBaseUrl: sJsonFilesUrl,
                        bGenerateMissingMockData: true
                    });

                    var aRequests = oMockServer.getRequests();
                    //manejo errores por cada peticion
                    var fnResponse = function (iErrCode, sMessage, aRequest) {
                        aRequest.response = function (oXhr) {
                            oXhr.response(iErrCode, { "Content-Type": "text/plain;charset=utf-8" }, sMessage);
                        };
                    };
                    //simular errores de datos metadata
                    if (oOptions.metadataError || oUriParameters.get("metadataError")) {
                        aRequests.forEach(function (aEntry) {
                            if (aEntry.path.toString().indexof("$metadata") > -1) {
                                fnResponse(500, "metadata Error", aEntry);
                            }
                        });
                    }
                    //simular errores de datos request
                    var sErrorParam = oOptions.errorType || oUriParameters.get("errorType");
                    var iErrorCode = sErrorParam === "badRequest" ? 400 : 500;

                    if (sErrorParam) {
                        aRequests.forEach(function (aEntry) {
                            fnResponse(iErrorCode, sErrorParam, aEntry);
                        });
                    }

                    //asignar peticion y arrancar
                    oMockServer.setRequests(aRequests);
                    oMockServer.start();

                    Log.info("Running con data Dummy");
                    fnResolve();

                });

                //caso error aplicacion manifest
                oManifestModel.attachRequestFailed(function () {
                    var sError = "Ha fallado la carga del manifest";
                    Log.error(sError);
                    fnReject(new Error(sError));
                });


            });

        }

    };

    return oMockServerInterface;


});