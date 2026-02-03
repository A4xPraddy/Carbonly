import Activity from "../models/Activity.js";

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

      case "month":
        startDate = new Date(now);
        startDate.setUTCMonth(startDate.getUTCMonth() - 1);
        break;

      default:
        return res.status(400).json({
          message: "Invalid duration. Use day, week, or month.",
        });
    }

    const activities = await Activity.find({
      userId,
      date: {
        $gte: startDate,
        $lte: now,
      },
    }).sort({ date: 1 });

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
