sap.ui.define(["sap/ui/model/odata/v2/ODataModel"], function (ODataModel) {
  "use strict";

  return {
    _pDataServicesInit: null,
    _oDataModel: null,
    _oComponent: null,

    init: function (oComponent) {
      this._oComponent = oComponent;
      const resolveUrl = oComponent
        .getManifestObject()
        .resolveUri("https://services.odata.org/V2/Northwind/Northwind.svc/");

      this._oDataModel = new sap.ui.model.odata.v2.ODataModel(resolveUrl, {
        defaultUpdateMethod: sap.ui.model.odata.UpdateMethod.put,
      });

    //   var aModels = [this._oDataModel];
    //   var aPromises = aModels.map((oModel) => {
    //     return new Promise((resolve, reject) => {
    //       oModel.attachEventOnce("metadataLoaded", resolve);
    //       oModel.attachEventOnce("metadataFailed", reject);
    //     });
    //   });

    //   this._pDataServicesInit = Promise.all(aPromises);

    //   this._pDataServicesInit.catch(
    //     function (error) {
    //       var oError = error.response || error;
    //       oError =
    //         oError.getParameters && oError.getParameters()
    //           ? oError.getParameters()
    //           : oError;

    //       var sErrorMessage =
    //         oError.statusCode +
    //         (oError.statusText ? " (" + oError.statusText + ")" : "");
    //       var sErrorDetails = oError.responseText || oError.body;

    //       try {
    //         sErrorMessage += JSON.parse(responseText).error.message.value;
    //       } catch (e) {}

    //       console.log(error);

    //       sap.m.MessageBox.show(
    //         "Não foi possível se conectar com o servidor. \nRecarregue a página e tente novamente.",
    //         {
    //           icon: sap.m.MessageBox.Icon.ERROR,
    //           title: `Erro: ${oError.message} - ${oError.statusCode}`,
    //           actions: ["Recarregar"],
    //           styleClass: "sapUiSizeCompact",
    //           initialFocus: "Recarregar",
    //           details: sErrorDetails,
    //           onClose: function (oAction) {
    //             if (oAction === "Recarregar") {
    //               document.location.reload(true);
    //             }
    //           },
    //         }
    //       );
    //     }.bind(this)
    //   );
    },

    get: function (sPath) {
      return new Promise((resolve, reject) => {
        this._oDataModel.read(sPath, {
          success: function (oData, oResponse) {
            resolve(oData, oResponse);
          },
          error: function (err) {
            reject(err);
          },
        });
      });
    },
  };
});
