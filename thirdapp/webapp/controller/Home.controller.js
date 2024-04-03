sap.ui.define(
  [
    "com/lab2dev/thirdapp/controller/BaseController",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/odata/v2/ODataModel",
    "com/lab2dev/thirdapp/model/models",
    "com/lab2dev/thirdapp/model/formatter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
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
    models,
    formatter,
    Filter,
    FilterOperator,
  ) {
    "use strict";

    return Controller.extend("com.lab2dev.thirdapp.controller.Home", {
      formatter: formatter,
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

        const params = {
          urlParameters: {
            $expand: "Category"
          }
        };

        const pService = models.readProducts(params);

        const list = this.byId("list");

        list.setBusy(true);
        pService
          .then((response) => {
            console.log(response);
            const oModel = new JSONModel(response);
            this.getView().setModel(oModel, "Products");
          })
          .catch((err) => {
            MessageBox.error("O Serviço está indisponível!");
          })
          .finally(() => {
            list.setBusy(false);
          });
      },
      //Lista de produtos

      onPress: function (oEvent) {
        //Origem do evento
        const item = oEvent.getSource();

        //Titulo do item
        const itemTitle = item.getTitle();

        const i18n = this.getOwnerComponent().getModel("i18n").getResourceBundle();

        const message = i18n.getText("itemClicked", [itemTitle]);
        //Mensagem a ser exibida
        // const message = `The item: "${itemTitle}" ${clicked}`;

        //Exibe uma mensagem na tela
        MessageBox.information(message);
      },
      onSearch: function (oEvent) {
                // add filter for search
                const aFilters = [];
                const sQuery = oEvent.getSource().getValue();

                if (sQuery && sQuery.length > 0) {
                    const filter = new Filter("ProductName", FilterOperator.Contains, sQuery);
                    aFilters.push(filter);
                }

                // update list binding
                const oList = this.byId("list");
                const oBinding = oList.getBinding("items");
                oBinding.filter(aFilters);
            },

            onSearchoData: function (oEvent) {
                const sQuery = oEvent.getSource().getValue();
                const list = this.byId("list");
                const params = {
                    urlParameters: {
                        $expand: "Category"
                    },
                    filters: [
                        new Filter("ProductName", FilterOperator.Contains, sQuery)
                    ]
                };

                const products = models.readProducts(params);

                products
                    .then((oProductsModel) => {
                      const oModel = new JSONModel(oProductsModel);
                        this.getView().setModel(oModel,'Products');

                    }).catch((oError) => {
                        MessageBox.error(oError);

                    }).finally(() => {
                      list.setBusy(false);
                    });
            },
    });
    
  }
);
