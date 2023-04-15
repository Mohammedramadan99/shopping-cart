import Family from "../models/family.model.js";
import User from "../models/user.model.js";
import Section from "../models/section.model.js";

export const createFamily = async (req, res, next) => {
  try {
    const { parent, familyName, member } = req.body;
    const family = await Family.findOne({ parent });
    if (family) {
      res.status(403).json({ message: "you already have a family" });
    } else {
      const createFamily = new Family({ parent, familyName, member });
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
    console.log({ parent });
    // const family = await Family.findOne({ parent }).populate("cart.product");
    const family = await Family.findOne({ parent }).populate("cart.product");
    if (!family) {
      const user = await User.findOne({ _id: parent }).populate("family");
      console.log(user);
      if (!user)
        return res.status(404).json({ error: "you don't have a family" });

      // const familyId = user.family._id;
      // const family = await Family.findOne({ familyId }).populate(
      //   "cart.product"
      // );

      return res.status(201).json({ family: user.family });
    } else {
      return res.status(200).json({ family });
    }
  } catch (error) {
    res.status(500).json(error);
    return;
  }
};
export const removeFamily = async (req, res) => {
  try {
    const parent = req.user; // Assuming the parent user is authenticated
    console.log(parent);
    // const family = await Family.findOne({ parent }).populate("cart.product");
    const family = await Family.findOneAndDelete({ parent });
    if (!family) {
      return res.status(404).json({ error: "Family not found" });
    }
    res.status(200).json({ message: "family deleted" });
    return;
  } catch (error) {
    res.status(500).json(error);
    return;
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
    // Check if the member is a user or not
    const user = await User.findOne({ email });

    if (!user)
      return res
        .status(400)
        .json({ message: "This email is not in our system" });
    if (user.idNumber !== idNumber)
      return res.status(400).json({ message: "idNumber is wrong" });
    // Check if the member already exists in the family
    const existingMember = family.members.find(
      (member) => member.email === email
    );

    if (existingMember) {
      return res.status(400).json({
        message: "Member already exists in the family",
        existingMember,
      });
    }

    const upUser = await User.findOneAndUpdate(
      { email },
      { family: family._id },
      { new: true }
    );

    // Add the new member to the family
    family.members.push({ idNumber, email });
    await family.save();
    res.status(200).json({ family, upUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};
export const removeMember = async (req, res) => {
  const { familyId, idNumber } = req.params;
  try {
    const family = await Family.findById(familyId);
    if (!family) {
      return res.status(404).json({ error: "Family not found" });
    }
    const memberIndex = family.members.findIndex(
      (member) => member.idNumber === idNumber
    );
    if (memberIndex === -1) {
      return res.status(404).json({ error: "Member not found" });
    }
    family.members.splice(memberIndex, 1);
    console.log("remover member", idNumber);
    // console.log("before Update", user);
    const upUser = await User.findOneAndUpdate(
      { idNumber },
      { family: null },
      { new: true }
    );
    await family.save();
    res.status(200).json({ message: "Member removed successfully", upUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
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
