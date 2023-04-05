import Product from "../models/product.model.js";
export const createProduct = async (req, res, next) => {
  try {
    const { productName, sectionId } = req.body;
    const product = new Product({ productName, sectionId });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
