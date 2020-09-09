const User = require("../models/user");
const Vehicle = require("../models/vechicle");
const Receipt = require("../models/receipt");
const TollBooth = require("../models/tollBooth");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const mongoose = require("mongoose");
const shortid = require("shortid");

const { isEmpty } = require("../utils");
const { secretOrKey } = require("../config/keys");
const { trip_type_charges, vehicle_type_charges } = require("../constants");

const parseJSON = (val) => JSON.parse(JSON.stringify(val));

exports.registerUser = async (req, res) => {
  try {
    const user = await User.find({ email: req.body.email });

    if (!isEmpty(user)) {
      return res.status(400).send({ message: "User already exists" });
    }

    const newUser = new User({
      user_display_id: shortid.generate(),
      full_name: req.body.full_name,
      driving_license: req.body.driving_license,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
    });

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(req.body.password, salt, function (err, hash) {
        if (err) throw err;
        newUser.password = hash;
        newUser
          .save()
          .then((user) => res.json({ success: true }))
          .catch((err) => console.log(err));
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};

exports.loginUser = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    if (isEmpty(email))
      return res.status(400).json({ message: "Email is required" });

    if (isEmpty(password))
      return res.status(400).json({ message: "Password is required" });

    const user = await User.findOne({ email });

    if (isEmpty(user)) {
      return res.status(400).json({ message: "User does not exists" });
    }

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        const payload = {
          id: user.id,
          name: user.name,
          email: user.email,
        };

        jwt.sign(payload, secretOrKey, { expiresIn: "12h" }, (err, token) => {
          res.json({
            success: true,
            token: token,
          });
        });
      } else {
        return res.status(400).json({ message: "Password does not match" });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};

exports.addVehicle = async (req, res) => {
  try {
    const user_id = req.user._id;

    const newVehicle = new Vehicle({
      vehicle_display_id: shortid.generate(),
      user_id,
      license_plate: req.body.license_plate,
      model: req.body.model,
      brand: req.body.brand,
      vehicle_type: req.body.vehicle_type,
    });
    const result = await newVehicle.save();
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};

exports.issueReceipt = async (req, res) => {
  try {
    if (
      isEmpty(req.body.toll_booth_id) ||
      isEmpty(req.body.vehicle_id) ||
      isEmpty(req.body.type)
    ) {
      return res.status(400).send({ message: "Body parameters are missing" });
    }

    const vehicle = await Vehicle.findOne({ _id: req.body.vehicle_id });
    if (isEmpty(vehicle)) {
      return res.status(500).end();
    }

    const total =
      trip_type_charges[req.body.type] +
      vehicle_type_charges[vehicle.vehicle_type];

    const newReceipt = new Receipt({
      receipt_display_id: shortid.generate(),
      user_id: req.user._id,
      toll_booth_id: req.body.toll_booth_id,
      vehicle_id: req.body.vehicle_id,
      type: req.body.type,
      trip_type_charge: trip_type_charges[req.body.type],
      vehicle_type_charges: vehicle_type_charges[vehicle.vehicle_type],
      total,
    });

    const createdReceipt = await newReceipt.save();

    const data = {
      ...parseJSON(createdReceipt),
      ...parseJSON(vehicle),
      formatted_created_at: moment(createdReceipt.created_at).format(
        "DD MMM YYYY hh:mm A"
      ),
      trip_type_charge: trip_type_charges[req.body.type],
      vehicle_type_charges: vehicle_type_charges[vehicle.vehicle_type],
    };

    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};

exports.validateReceipt = async (req, res) => {
  try {
    const user_id = req.user._id;
    const receipt_id = req.body.receipt_id;

    const receipt = await Receipt.findOne({
      user_id: mongoose.Types.ObjectId(user_id),
      receipt_display_id: receipt_id,
    });

    if (!receipt) {
      return res.status(400).json({
        message: "Receipt is not found",
      });
    }

    const now = moment();
    const receipt_create_date = moment(receipt.created_at);

    let isValid = now.isSame(receipt_create_date, "day");

    if (!isValid) {
      return res.status(400).json({
        message: "Receipt is not valid",
      });
    }

    if (receipt.type === "one_way") {
      return res.status(400).json({
        message: "You cannot check out toll with one way ticket",
      });
    }

    res.send({ message: "Receipt is valid" });
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};

exports.getAllVehicles = async (req, res) => {
  const user_id = req.user._id;
  const vehicles = await Vehicle.find({ user_id });
  res.json(vehicles);
};

exports.getAllTolls = async (req, res) => {
  const tolls = await TollBooth.find({});
  res.json(tolls);
};
