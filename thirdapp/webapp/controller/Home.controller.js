sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/m/MessageToast", "sap/m/MessageBox"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, MessageToast, MessageBox) {
    "use strict";

    return Controller.extend("com.lab2dev.thirdapp.controller.Home", {
      onInit: function () {},

      onPress: function (oEvent) {
        //Origem do evento
        const item = oEvent.getSource();

        //Titulo do item
        const itemTitle = item.getTitle();

        //Mensagem a ser exibida
        const message = `The item: "${itemTitle}" was clicked`;

        //Exibe uma mensagem na tela
        MessageBox.information(message);
      },
    });
  }
);
