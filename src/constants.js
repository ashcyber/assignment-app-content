/**
 * This file defines contants used as enums or price values
 * Also note that price values are given here as a demo ideally should be in
 * database
 *
 */

exports.vehicle_types = ["Car/Jeep/Van", "LCV", "Bus/Truck", "3 Axle"];

exports.trip_types = ["one_way", "round"];

exports.vehicle_type_charges = {
  "Car/Jeep/Van": 50,
  LCV: 60,
  "Bus/Truck": 70,
  "3 Axle": 80,
};

exports.trip_type_charges = {
  one_way: 50,
  round: 150,
};
