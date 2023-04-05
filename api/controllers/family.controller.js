import Family from "../models/family.model.js";

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
    const family = await Family.findOne(parent);
    if (!family) {
      return res.status(404).json({ error: "Family not found" });
    }
    res.status(200).json({ family });
  } catch (error) {
    res.status(500).json(error);
  }
};
