import Type from "../models/Type.js";

export const addType = async (req, res) => {
  const { type, subTypes, unit } = req.body;
  try {
    let d = await Type.create({
      type,
      subTypes,
      unit,
    });
    return res.json({ data: d, message: "Added Type Successfully" });
  } catch (e) {
    res.status(400).json({ message: "Something went wrong" });
  }
};

export const getTypes = async (req, res) => {
  try {
    let d = await Type.find();
    return res.status(200).json({ data: d });
  } catch (e) {
    return res
      .status(400)
      .json({ message: "Something went wrong, couldn't get types" });
  }
};
