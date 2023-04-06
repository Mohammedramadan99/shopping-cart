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
    const section = await Section.find({ familyId: req.params.id });
    if (!section) {
      return res.status(404).json({ error: "Section not found" });
    }
    res.json(section);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
