import Section from "../models/section.model.js";
import Product from "../models/product.model.js";
import Family from "../models/family.model.js";

export const createSection = async (req, res, next) => {
  try {
    const { sectionName, familyId } = req.body;
    const section = new Section({ sectionName, familyId });
    await section.save();
    res.status(201).json(section);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSection = async (req, res, next) => {
  try {
    const _id = req.params.sectionId;
    const section = await Section.findOne({ _id });
    if (!section) {
      return res.status(404).json({ error: "Section not found" });
    }
    res.json(section);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getFamilySections = async (req, res, next) => {
  try {
    const sections = await Section.find({
      familyId: req.params.familyId,
    });
    if (!sections) {
      return res.status(404).json({ error: "Sections not found" });
    }
    // const products = await Product.find({ sectionId: section[0]._id });
    // // Calculate the count of products in the section
    // const productCount = products.length;
    // // Calculate the total price of all products in the section
    // const totalPrice = products.reduce((total, product) => {
    //   return total + product.price;
    // }, 0);
    // Calculate count and total price of products for each section
    const sectionsWithStats = await Promise.all(
      sections.map(async (section) => {
        // Fetch products for the section from the database
        const products = await Product.find({ sectionId: section._id });
        // Calculate the count of products in the section
        const productCount = products.length;
        // Calculate the total price of all products in the section
        const totalPrice = products.reduce((total, product) => {
          return total + product.price;
        }, 0);

        // Create a new object with section data and stats
        return {
          sectionId: section,
          sectionName: section.name,
          productCount,
          totalPrice,
        };
      })
    );
    res.json({ sections, sectionsWithStats });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({
      sectionId: req.params.sectionId,
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const removeSection = async (req, res) => {
  try {
    const id = req.params.sectionId;
    const familyId = req.params.familyId;
    const section = await Section.findOneAndDelete({ id });
    // console.log({ section });
    if (!section) {
      res.status(404).json({ message: "section not found" });
      return;
    }
    const family = await Family.findById(familyId).populate("cart.product");
    console.log("family", family.cart);

    // remove section products from the family cart

    // const cartIndex = family.cart.findIndex(
    //   (cartItem) => cartItem.product?.sectionId.toString() === id
    // );
    console.log("familtt", family.cart);
    // console.log({ cartIndex });
    // if (cartIndex !== -1) {
    //   family.cart.splice(cartIndex, 1);
    //   await family.save();
    // }
    // Remove all products in the section from the family's cart
    const cart = family.cart
      .map((item) => {
        if (item.product?.sectionId.toString() !== id) {
          return item;
        }
      })
      .filter(Boolean);
    console.log({ cart });
    family.cart = cart;
    await family.save();

    res.status(200).json({ message: "section removed" });
    return;
  } catch (error) {
    res.status(500).json(error);
    return;
  }
};
