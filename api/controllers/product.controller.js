import Product from "../models/product.model.js";
import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: "dtmjc8y9z",
  api_key: "379966828288349",
  api_secret: "a41LSvU3XXAJuQOLxorhOVFPauw",
});

export const createProduct = async (req, res, next) => {
  try {
    const { productName, sectionId, price, image } = req.body;
    if (image !== "") {
      // Upload image to Cloudinary
      const cloudinaryResult = await cloudinary.v2.uploader.upload(image, {
        folder: "products",
      });
      const product = new Product({
        productName,
        sectionId,
        price,
        image: cloudinaryResult.secure_url,
      });
      await product.save();
      res.status(201).json({
        product,
      });
      return;
    }
    const product = new Product({
      productName,
      sectionId,
      price,
      image: "",
    });

    await product.save();
    res.status(201).json(product);
    return;
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndRemove(req.params.id);
    if (!product) return res.status(404).json({ message: "product not found" });
    if (product) return res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
