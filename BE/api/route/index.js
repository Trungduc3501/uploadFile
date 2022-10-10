const ItemController = require("../controller/index");

const routers = (app) => {
  app.route("/item").post(ItemController.addItem);
  app
    .route("/item/:id")
    .delete(ItemController.deleteItem)
    .put(ItemController.updateItem);
  app.route("/item/paginate").get(ItemController.paginateItem);
  app.route("/item/search").get(ItemController.searchItem);
  app.route("/item").delete(ItemController.deleteOneItem);
};

module.exports = routers;
