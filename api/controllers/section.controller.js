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

//
export const removeSection = async (req, res) => {
  try {
    const id = req.params.sectionId;
    const section = await Section.findOneAndDelete({ id });
    if (!section) {
      res.status(404).json({ message: "section not found" });
      return;
    }
    res.status(200).json({ message: "section removed" });
    return;
  } catch (error) {
    res.status(500).json(error);
    return;
  }
};
