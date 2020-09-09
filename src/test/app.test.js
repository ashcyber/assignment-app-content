const app = require("../index");
const chai = require("chai");
const mongoose = require("mongoose");
const chaiHttp = require("chai-http");
const { expect } = chai;
const jwt = require("jsonwebtoken");

chai.use(chaiHttp);

const Vehicle = require("../models/vechicle");
const User = require("../models/user");
const TollBooth = require("../models/tollBooth");
const Receipt = require("../models/receipt");

const user_id = mongoose.Types.ObjectId("5f57a821518d6346ec8be87b");
const toll_both_id = mongoose.Types.ObjectId("5f57a22fb4c3cb3cb7cde728");
const vehicle_id = mongoose.Types.ObjectId("5f57a2ceb4c3cb3cb7cde72b");
const receipt_id = mongoose.Types.ObjectId("5f57a7f40be441467bceeefe");

describe("Server", () => {
  it("Server is running", (done) => {
    chai
      .request(app)
      .get("/")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equals("success");
        expect(res.body.message).to.equals("Server is live");
        done();
      });
  });
});

describe("User Routes", () => {
  let JWT_TOKEN = "";
  before(function (done) {
    mongoose.connect("mongodb://localhost:27017/toll-plaza-test", {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error"));
    db.once("open", async function () {
      try {
        await Promise.all([
          Receipt.deleteMany({}),
          Vehicle.deleteMany({}),
          User.deleteMany({}),
          TollBooth.deleteMany({}),
        ]);

        await Vehicle.create({
          _id: vehicle_id,
          vehicle_display_id: "test_id_vehicle",
          license_plate: "test_licencse",
          user_id: user_id,
          model: "roadster",
          brand: "tesla",
          vehicle_type: "Car/Jeep/Van",
        });

        await Receipt.create({
          _id: receipt_id,
          receipt_display_id: "testReceiptNumber",
          toll_both_id,
          vehicle_id,
          user_id,
          type: "round",
          total: 100,
        });

        await User.create({
          _id: user_id,
          user_display_id: "test_id_user",
          full_name: "test",
          email: "test@gmail.com",
          driving_license: "test_license",
          password: "test",
          phone: "12390123",
        });

        await TollBooth.create({
          _id: toll_both_id,
          name: "test_booth_name",
          location: "test_location",
        });

        const payload = {
          id: user_id,
          full_name: "test",
          email: "test@gmail.com",
        };

        jwt.sign(payload, "secret", { expiresIn: "12h" }, (err, token) => {
          JWT_TOKEN = token;
          done();
        });
      } catch (err) {
        console.log(err);
        console.log("error creating seed data");
      }
    });
  });

  it("it should not allow user to login without password", (done) => {
    chai
      .request(app)
      .post("/api/user/login")
      .send({ email: "test@gmail.com" })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.message).to.equals("Password is required");
        done();
      });
  });

  it("it should not allow user to login without email", (done) => {
    chai
      .request(app)
      .post("/api/user/login")
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.message).to.equals("Email is required");
        done();
      });
  });

  it("it should return correct message if user does not exists", (done) => {
    chai
      .request(app)
      .post("/api/user/login")
      .send({
        email: "nonexistenEmail@gmals.com",
        password: "test",
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.message).to.equals("User does not exists");
        done();
      });
  });

  it("it should send appropriate message on invalid check in toll request ", (done) => {
    chai
      .request(app)
      .post("/api/user/issue-receipt")
      .set({ Authorization: `Bearer ${JWT_TOKEN}` })
      .send({})
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.message).to.equals("Body parameters are missing");

        done();
      });
  });

  it("it should send success message on valid check in toll ", (done) => {
    chai
      .request(app)
      .post("/api/user/issue-receipt")
      .set({ Authorization: `Bearer ${JWT_TOKEN}` })
      .send({
        toll_both_id: toll_both_id,
        vehicle_id: vehicle_id,
        type: "one_way",
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.receipt_display_id).to.be.a("string");
        done();
      });
  });

  it("it should check if a valid receipt is actually valid", (done) => {
    chai
      .request(app)
      .post("/api/user/validate-receipt")
      .set({ Authorization: `Bearer ${JWT_TOKEN}` })
      .send({ receipt_id: "testReceiptNumber" })
      .end((err, res) => {
        expect(res.body.message).to.equals("Receipt is valid");
        expect(res).to.have.status(200);
        done();
      });
  });

  it("it should check if a non existent receipt is invalid", (done) => {
    chai
      .request(app)
      .post("/api/user/validate-receipt")
      .set({ Authorization: `Bearer ${JWT_TOKEN}` })
      .send({ receipt_id: "doesnotexists" })
      .end((err, res) => {
        expect(res.body.message).to.equals("Receipt is not found");
        expect(res).to.have.status(400);
        done();
      });
  });
});
