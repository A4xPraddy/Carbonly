import Activity from "../models/Activity.js";
import { callAPI } from "./llm.controller.js";

const queryDB = async (duration, userId) => {
  const now = new Date();
  let startDate;

  now.setUTCHours(0, 0, 0, 0);

  switch (duration) {
    case "day":
      startDate = new Date(now);
      break;

    case "week":
      startDate = new Date(now);
      startDate.setUTCDate(startDate.getUTCDate() - 6);
      break;

    default:
      startDate = new Date(now);
      startDate.setUTCMonth(startDate.getUTCMonth() - 1);
      break;
  }

  const activities = await Activity.find({
    userId,
    date: {
      $gte: startDate,
      $lte: now,
    },
  }).sort({ date: 1 });

  return activities;
};

export const createActivity = async (req, res) => {
  let { type, subType, consumption, co2 } = req.body;
  let userId = req.userId;
  if (!userId) {
    return res.status(401).json({ message: "User Not Authorized" });
  }
  try {
    let newActivity = await Activity.create({
      userId,
      type,
      subType,
      consumption,
      co2,
    });
    return res
      .status(200)
      .json({ data: newActivity, message: "Added Activity successfully" });
  } catch (e) {
    return res.status(400).json({ message: "Something went wrong!" });
  }
};

export const getActivitiesByDuration = async (req, res) => {
  try {
    const { duration = "day" } = req.query;
    const userId = req.userId;

    let activities = await queryDB(duration, userId);

    res.status(200).json({
      duration,
      count: activities.length,
      data: activities,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getInsights = async (req, res) => {
  let userId = req.userId;
  if (!userId) {
    return res.status(400).json({ message: "User does not exist" });
  }
  let activites = await queryDB("month", userId);
  console.log(activites);
  let response = await callAPI(activites);
  const cleanedText = response.text
    .replace(/^```json\s*/, "")
    .replace(/\s*```$/, "")
    .trim();
  return res.json(JSON.parse(cleanedText));
};
