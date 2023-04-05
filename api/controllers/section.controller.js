import Section from "../models/section.model.js";

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
    const sections = await Section.find();
    res.json(sections);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
