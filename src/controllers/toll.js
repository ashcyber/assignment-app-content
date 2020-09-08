const TollBoth = require("../models/tollBoth");
const Receipt = require("../models/receipt");

const shortid = require("shortid");

exports.createToll = async (req, res) => {
  const toll = await TollBoth.create({
    display_id: shortid.generate(),
    name: req.body.name,
    location: req.body.location,
  });
  res.send(toll);
};

exports.checkHistory = async (req, res) => {
  const receipts = await Receipt.aggregate([
    {
      $lookup: {
        from: "vehicles",
        localField: "vehicle_id",
        foreignField: "_id",
        as: "vehicle_data",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "user_id",
        foreignField: "_id",
        as: "user_data",
      },
    },
    {
      $lookup: {
        from: "tollboths",
        localField: "toll_both_id",
        foreignField: "_id",
        as: "toll_both_data",
      },
    },
    { $sort: { created_at: 1 } },
    {
      $project: {
        user_data: 1,
        vehicle_data: 1,
        created_at: 1,
        type: 1,
        total: 1,
        toll_both_data: { $arrayElemAt: ["$toll_both_data", 0] },
        user_data: { $arrayElemAt: ["$user_data", 0] },
        vehicle_data: { $arrayElemAt: ["$vehicle_data", 0] },
      },
    },
  ]);

  res.send(receipts);
};
