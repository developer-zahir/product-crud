import multer from "multer";

//  create storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "custommerPhoto") {
      cb(null, "public/custommer_photo");
    } else if (file.fieldname === "productPhoto") {
      cb(null, "public/product_photo");
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + "_" + Math.floor(Math.random(5) * 1000) + "_" + file.originalname);
  },
});

export const productMulter = multer({ storage }).single("productPhoto");
