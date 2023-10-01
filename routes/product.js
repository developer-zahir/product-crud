import express from "express";
import {
  create_product,
  delete_product,
  get_all_products,
  get_single_product,
  show_add_product_page,
  show_product_dashboard,
  show_shop_page,
  show_single_product_page,
  show_edit_product_page,
  update_product,
} from "../controller/productController.js";
import { productMulter } from "../utils/multer.js";

// init route
const router = express.Router();

// ejs routes
router.get("/product-dashboard", show_product_dashboard);
router.get("/add-product", show_add_product_page);
router.get(["/", "/shop"], show_shop_page);
router.get("/single/:slug", show_single_product_page);
router.get("/edit/:id", show_edit_product_page)
router.post("/update/:id", productMulter, update_product);






// api routes
router.get("/product", get_all_products);
router.post("/create-product", productMulter, create_product);
router.get("/products/:slug", get_single_product);
router.get("/product-delete/:id", delete_product);
// export default
export default router;
