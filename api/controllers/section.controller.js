import Section from "../models/section.model.js";
import Product from "../models/product.model.js";

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
    const section = await Section.find({ familyId: req.params.familyId });
    if (!section) {
      return res.status(404).json({ error: "Section not found" });
    }
    res.json(section);
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

// for testing
export const getSections = async (req, res) => {
  try {
    const sections = await Section.find({});
    res.status(200).json(sections);
  } catch (error) {
    res.status(500).json(error);
  }
};
