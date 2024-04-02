sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/core/UIComponent",
    "sap/ui/core/BusyIndicator",
    "sap/m/MessageBox",
    "com/lab2dev/thirdapp/model/formatter",
    "sap/ui/model/json/JSONModel",
    "com/lab2dev/thirdapp/model/models",
  ],
  function (
    Controller,
    History,
    UIComponent,
    BusyIndicator,
    MessageBox,
    formatter,
    JSONModel,
    models
  ) {
    "use strict";

    return Controller.extend("com.lab2dev.thirdapp.controller.BaseController", {
      formatter: formatter,
      MessageBox: MessageBox,

      /**
       * Convenience method for getting the view model by name in every controller of the application.
       * @public
       * @param {string} sName the model name
       * @returns {sap.ui.model.Model} the model instance
       */
      getModel: function (sName) {
        return this.getView().getModel(sName);
      },

      /**
       * Convenience method for setting the view model in every controller of the application.
       * @public
       * @param {sap.ui.model.Model} oModel the model instance
       * @param {string} sName the model name
       * @returns {sap.ui.mvc.View} the view instance
       */
      setModel: function (oItems, sName) {
        var oModel = new JSONModel(oItems);
        return this.getView().setModel(oModel, sName);
      },

      /**
       * Convenience method for getting the resource bundle.
       * @public
       * @returns {sap.ui.model.resource.ResourceModel} the resourceModel of the component
       */
      getResourceBundle: function () {
        return this.getOwnerComponent().getModel("i18n").getResourceBundle();
      },

      getText: function (sKey, aArgs, bIgnoreKeyFallback) {
        return this.getResourceBundle().getText(
          sKey,
          aArgs,
          bIgnoreKeyFallback
        );
      },

      /**
       * Method for navigation to specific view
       * @public
       * @param {string} psTarget Parameter containing the string for the target navigation
       * @param {Object.<string, string>} pmParameters? Parameters for navigation
       * @param {boolean} pbReplace? Defines if the hash should be replaced (no browser history entry) or set (browser history entry)
       */

      navTo: function (psTarget, pmParameters, pbReplace) {
        this.getRouter().navTo(psTarget, pmParameters, pbReplace);
      },

      getRouter: function () {
        return UIComponent.getRouterFor(this);
      },

      onNavBack: function () {
        const sPreviousHash = History.getInstance().getPreviousHash();

        if (sPreviousHash !== undefined) {
          window.history.back();
        } else {
          this.getRouter().navTo("HomePage", {}, true /*no history*/);
        }
      },

      byRootId: function (sId) {
        return this.getOwnerComponent().getRootControl().byId(sId);
      },

      attachPatternMatched: function (sTargetName, fControllerCallback) {
        const oRouter = this.getOwnerComponent().getRouter();
        oRouter.getRoute(sTargetName).attachPatternMatched(fControllerCallback);
      },

      attachBusy: function (pRequestPromise) {
        BusyIndicator.show(0);
        pRequestPromise
          .then(function () {
            BusyIndicator.hide();
          })
          .catch(function () {
            BusyIndicator.hide();
          });
        return pRequestPromise;
      },

      handleGenericError: function (error) {
        var oError = error.response || error;
        oError =
          oError.getParameters && oError.getParameters()
            ? oError.getParameters()
            : oError;

        var sErrorMessage =
          oError.statusCode +
          (oError.statusText ? " (" + oError.statusText + ")" : "");
        var sErrorDetails = oError.responseText || oError.body;

        try {
          sErrorMessage += JSON.parse(responseText).error.message.value;
        } catch (e) {}

        console.log(error);

        MessageBox.error(sErrorMessage, {
          title: "Erro",
          icon: sap.m.MessageBox.Icon.ERROR,
          actions: ["OK"],
          details: sErrorDetails,
        });
      },

      onNavTo: function (event) {
        var target = event.getSource().data("mydata").replace(/ /, "");
        this.navTo(target);
        this.toogleMaster(target);
      },

      toogleMaster: function (target) {
        var isTablet = this.getView().getModel("device").getData()
          .system.tablet;
        var isMasterShown = this.getView()
          .getParent()
          .getParent()
          .isMasterShown();
        var validTargets = ["Newsletter", "Products"];
        var isValidTarget = validTargets.includes(target);

        if (isTablet && isValidTarget) {
          if (isMasterShown) {
            this.getView().getParent().getParent().hideMaster();
          } else {
            this.getView().getParent().getParent().showMaster();
          }
        }
      },

      closeMaster: function () {
        var oApp = this.getRootApp();
        oApp.hideMaster();
      },

      showMessage: function (msg) {
        sap.m.MessageToast.show(msg, {
          duration: 3000,
        });
      },

      removeDuplicates: function (array) {
        return array.filter(function (elem, pos, self) {
          return self.indexOf(elem) === pos;
        });
      },

      getRootApp: function () {
        return this.getOwnerComponent().getRootControl().getContent()[0];
      },

      getDateTime: function () {
        var date = new Date();
        var month = (date.getMonth() + 1).toString();
        if (month.length === 1) {
          month = "0" + month;
        }
        var hours = date.getHours().toString();
        if (hours.length === 1) {
          hours = "0" + hours;
        }
        var minutes = date.getMinutes().toString();
        if (minutes.length === 1) {
          minutes = "0" + minutes;
        }
        var seconds = date.getSeconds().toString();
        if (seconds.length === 1) {
          seconds = "0" + seconds;
        }
        return {
          date:
            date.getFullYear().toString() +
            month +
            date.getDate().toString().padStart(2, "0"),
          time: hours + minutes + seconds,
        };
      },

      getTypeProfile: function () {
        const pService = models.getTipoPerfil();
        this.attachBusy(pService);

        return pService
          .then((response) => {
            return response.results[0].Perfil;
          })
          .catch((err) => {
            this.handleGenericError(err);
            return "";
          });
      },
    });
  }
);
