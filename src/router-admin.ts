import express from "express";
const routerAdmin = express.Router();
import restaurantController from "./controllers/restaurant.controller";
import productController from "./controllers/product.controllers";
import makeUploader from "./libs/utils/uploader";

// gets two argument =>
// 1: endpoint (url)
// 2: restaurantController ga bogliq methodlar

/**Restauran */
routerAdmin.get("/", restaurantController.goHome);
routerAdmin
  .get("/login", restaurantController.getLogin)
  .post("/login", restaurantController.processLogin);
routerAdmin
  .get("/signup", restaurantController.getSignup)
  .post(
    "/signup",
    makeUploader("members").single("memberImage"),
    restaurantController.processSignup
  );
routerAdmin.get("/logout", restaurantController.logout);
routerAdmin.get("/check-me", restaurantController.checkAuthSession);

/** Product **/
routerAdmin.get(
  "/product/all",
  restaurantController.verifyRestaurant,
  productController.getAllProducts
);
routerAdmin.post(
  "/product/create",
  restaurantController.verifyRestaurant,
  // makeUploader.single("productImage"), makeUploader function uchun beriladigon manzil
  // folder name buyerda products va request qilayotkanda productImage db beriladi
  makeUploader("products").array("productImages", 5),
  productController.createNewProduct
);
routerAdmin.post(
  // epxpress topib bergan router
  "/product/:id",
  // restarant controllerdan restaran ekanligimiz tekshiradi va keyingi bosqichga olib otadi
  restaurantController.verifyRestaurant,
  productController.updateChosenProduct
);

/** User **/
routerAdmin.get(
  "/user/all",
  restaurantController.verifyRestaurant,
  restaurantController.getUsers
);
routerAdmin.post(
  "/user/edit",
  restaurantController.verifyRestaurant,
  restaurantController.updateChosenUser
);

export default routerAdmin;
