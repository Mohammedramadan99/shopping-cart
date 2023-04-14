import Family from "../models/family.model.js";
import Section from "../models/section.model.js";

export const createFamily = async (req, res, next) => {
  try {
    const { parent, familyName, members } = req.body;
    const family = await Family.findOne({ parent });
    console.log({ family });
    if (family) {
      res.status(403).json("you already have a family");
    } else {
      const createFamily = new Family({ parent, familyName, members });
      await createFamily.save();
      res.status(201).json(createFamily);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getFamily = async (req, res) => {
  try {
    const parent = req.user; // Assuming the parent user is authenticated
    console.log(parent);
    const family = await Family.findOne({ parent }).populate("cart.product");
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
    const families = await Family.find({}).populate("cart.product");

    res.status(200).json(families);
  } catch (error) {
    res.status(500).json(error);
  }
};
export const addMember = async (req, res) => {
  const { familyId } = req.params;
  const { idNumber, email } = req.body;
  try {
    const family = await Family.findById(familyId);
    if (!family) {
      return res.status(400).json({ message: "Family not found" });
    }

    // Check if the member already exists in the family
    const existingMember = family.members.find(
      (member) => member.idNumber === idNumber || member.email === email
    );
    if (existingMember) {
      return res
        .status(400)
        .json({ message: "Member already exists in the family" });
    }

    // Add the new member to the family
    family.members.push({ idNumber, email });
    await family.save();
    res.status(200).json(family);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
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
