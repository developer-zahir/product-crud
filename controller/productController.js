import { createSlug, getRandomUniqueId } from "../helpers/helpers.js";
import fs from "fs";

// Show all  products on dashbord
export const get_all_products = (req, res) => {
  const productData = JSON.parse(fs.readFileSync("./db/product.json").toString());
  if (productData.length === 0) {
    return res.status(400).json({ message: "no product found" });
  }
  res.status(200).json(productData);
};

// create product
export const create_product = (req, res) => {
  const { name, regularPrice, salePrice, stock } = req.body;

  if (!name || !regularPrice) {
    return res.status(400).json({ message: "name and regularPrice is required" });
  }

  const productData = JSON.parse(fs.readFileSync("./db/product.json").toString());

  // product slug check
  if (productData.some((data) => data.slug === createSlug(name))) {
    return res.status(400).json({ message: "product slug already exist" });
  }

  const product = {
    id: getRandomUniqueId(),
    name,
    slug: createSlug(name),
    regularPrice,
    salePrice,
    stock,
    photo: req.file.filename,
  };

  productData.push(product);
  fs.writeFileSync("./db/product.json", JSON.stringify(productData));

  res.redirect("/product-dashboard");
};

// Show single product
export const get_single_product = (req, res) => {
  const { slug } = req.params;
  const productData = JSON.parse(fs.readFileSync("./db/product.json").toString());
  const sinlgeProduct = productData.find((data) => data.slug === slug);
  if (!sinlgeProduct) {
    return res.status(400).json({ message: "product not found" });
  }
  res.status(200).json(sinlgeProduct);
};

// delete product
export const delete_product = (req, res) => {
  const { id } = req.params;
  const productData = JSON.parse(fs.readFileSync("./db/product.json").toString());

  const updatedProduct = productData.filter((data) => data.id !== id);
  fs.writeFileSync("./db/product.json", JSON.stringify(updatedProduct));

  res.redirect("/product-dashboard");
};

// Show product on dashbord page
export const show_product_dashboard = (req, res) => {
  const productData = JSON.parse(fs.readFileSync("./db/product.json").toString());

  // view > product dashbord .ejs
  res.render("product-dashboard", {
    products: productData,
  });
};

// show add product page
export const show_add_product_page = (req, res) => {
  res.render("add-product");
};

// show shop page
export const show_shop_page = (req, res) => {
  const productData = JSON.parse(fs.readFileSync("./db/product.json").toString());
  res.render("shop", {
    products: productData,
  });
};

// show single product
export const show_single_product_page = (req, res) => {
  const { slug } = req.params;
  const productData = JSON.parse(fs.readFileSync("./db/product.json").toString());

  // find single product
  const sProduct = productData.find((data) => data.slug === slug);

  res.render("single-product", {
    singleProduct: sProduct,
  });
};

// show edite porduct page
export const show_edit_product_page = (req, res) => {
  const { id } = req.params;
  const productData = JSON.parse(fs.readFileSync("./db/product.json").toString());

  // find single product
  const singleProduct = productData.find((data) => data.id === id);

  res.render("edit-product", {
    editProduct: singleProduct, // Fix the variable name here
  });
};

// product update
export const update_product = (req, res) => {
  const { id } = req.params;
  const { name, regularPrice, salePrice, stock } = req.body;
  const productData = JSON.parse(fs.readFileSync("./db/product.json").toString());

  let photoName = productData[productData.findIndex((data) => data.id === id)].photo;
  if (req?.file?.filename) {
    photoName = req.file.filename;
  }

  productData[productData.findIndex((data) => data.id === id)] = {
    ...productData[productData.findIndex((data) => data.id === id)],
    id: id,
    slug: createSlug(name),
    name,
    regularPrice,
    salePrice,
    stock,
    photo: photoName,
  };
  fs.writeFileSync("./db/product.json", JSON.stringify(productData));
  res.redirect("/product-dashboard");
};
