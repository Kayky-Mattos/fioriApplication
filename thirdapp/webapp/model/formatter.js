sap.ui.define([], () => {
  "use strict";

  return {
    toUpperCase: function (sValue) {
      if (!sValue) {
        return sValue;
      }
      return sValue.toUpperCase();
    },

    checkStockText: function (UnitsInStock, UnitsOnOrder) {
      if (Number.isNaN(UnitsInStock) || Number.isNaN(UnitsOnOrder)) {
        return null;
      } else if (UnitsInStock < UnitsOnOrder) {
        return "Update Stock";
      } else {
        return "Stock Up to Date";
      }
    },

    checkStockState: function (UnitsInStock, UnitsOnOrder) {
      if (Number.isNaN(UnitsInStock) || Number.isNaN(UnitsOnOrder)) {
        return "None";
      } else if (UnitsInStock < UnitsOnOrder) {
        return "Error";
      } else {
        return "Success";
      }
    },
  };
});
