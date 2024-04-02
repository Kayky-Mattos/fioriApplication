sap.ui.define(
  [
    "com/lab2dev/thirdapp/controller/BaseController",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/odata/v2/ODataModel",
    "com/lab2dev/thirdapp/model/models",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (
    Controller,
    MessageToast,
    MessageBox,
    JSONModel,
    ODataModel,
    models
  ) {
    "use strict";

    return Controller.extend("com.lab2dev.thirdapp.controller.Home", {
      onInit: function () {
        const oRouter = this.getRouter();
        oRouter.getRoute("Home").attachMatched(this.onRouteLoad, this);

        // const oDataModel = new ODataModel(
        //   "https://services.odata.org/V2/Northwind/Northwind.svc/"
        // );

        // oDataModel.read("/Products", {
        //   success: (oProdcuts) => {
        //     console.log(oProdcuts);
        //     const products = oProdcuts.results;

        //     console.log(products);

        //     const oModel = new JSONModel(products);
        //     this.getView().setModel(oModel, "products");
        //   },
        //   error: (oError) => {
        //     MessageBox.error("Error on load datas");
        //   },
        // });

        // const products = [
        //   { title: "Rice", counter: 5 },
        //   { title: "Beans", counter: 1 },
        //   { title: "Pasta", counter: 4 },
        //   { title: "Oil", counter: 15 },
        //   { title: "Milk", counter: 235 },
        //   { title: "Coffe", counter: 15 },
        //   { title: "Sugar", counter: 55 },
        //   { title: "Salt", counter: 785 },
        //   { title: "Wheat Flour", counter: 75 },
        //   { title: "Soap", counter: 45 },
        // ];

        // //Cria um modelo JSON com os produtos (JSONModel)
        // const oModel = new JSONModel(products);

        // //Define o modelo com o nome "products" e fazendo a ligação com a view (aggregation bidding)
        // this.getView().setModel(oModel, "products");
      },
      onRouteLoad: function () {
        const pService = models.readProducts();
        pService
          .then((response) => {
            console.log(response);
          })
          .catch((err) => {
            console.log(err);
          });
      },
      //Lista de produtos

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
