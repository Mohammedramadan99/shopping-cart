import Family from "../models/family.model.js";
import Section from "../models/section.model.js";

export const createFamily = async (req, res, next) => {
  try {
    const { parent, familyName, members } = req.body;
    const family = new Family({ parent, familyName, members });
    await family.save();
    res.status(201).json(family);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getFamily = async (req, res) => {
  try {
    const parent = req.user; // Assuming the parent user is authenticated
    console.log({ parent });
    const id = "642cba9ad2b112cd8df7c8bb";
    console.log(parent);
    const family = await Family.findOne({ parent });
    if (!family) {
      return res.status(404).json({ error: "Family not found" });
    }
    res.status(200).json({ family });
  } catch (error) {
    res.status(500).json(error);
  }
};
export const getFamilies = async (req, res) => {
  try {
    const families = await Family.find({});

    res.status(200).json(families);
  } catch (error) {
    res.status(500).json(error);
  }
};
export const getSections = async (req, res) => {
  try {
    const sections = await Section.find({ familyId: req.params.familyId });
    res.status(200).json(sections);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const addToCart = async (req, res) => {
  const { familyId, productId } = req.params;
  const { quantity } = req.body;
  try {
    const family = await Family.findById(familyId).populate("cart.product");
    if (!family) {
      return res.status(400).json({ message: "Family not found" });
    }

    const existingCartItemIndex = family.cart.findIndex(
      (item) => item.product._id.toString() === productId
    );
    if (existingCartItemIndex !== -1) {
      family.cart[existingCartItemIndex].quantity += quantity || 1;
    } else {
      family.cart.push({ product: productId, quantity: quantity || 1 });
    }

    await family.save();
    res.status(200).json(family);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const removeFromCart = async (req, res) => {
  const { productId, familyId } = req.params;

  try {
    const family = await Family.findById(familyId).populate("cart.product");
    if (!family) {
      return res.status(400).json({ message: "Family not found" });
    }

    const existingCartItemIndex = family.cart.findIndex(
      (item) => item.product._id.toString() === productId
    );
    if (existingCartItemIndex === -1) {
      return res.status(400).json({ message: "Product not in cart" });
    }

    family.cart.splice(existingCartItemIndex, 1);
    await family.save();
    res.status(200).json(family);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
