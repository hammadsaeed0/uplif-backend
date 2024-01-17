import express from "express";
import { connectDB } from "./config/database.js";
const app = express();
import customerRoute from "./routes/customerRoutes.js";
import router from "./routes/userRoutes.js";
import ErrorMiddleware from "./middleware/Error.js";
import fileupload from "express-fileupload";
import { Server } from "socket.io";
import Captainrouter from "./routes/captainroutes.js";
import { RideCategory } from "./model/RideCategories.js";
import cors from "cors";
import http from "http";
import { Customer } from "./model/customer.js";
// const { ObjectId } = require("mongodb");
import { ObjectId } from "mongodb";
import { Captain } from "./model/CaptainSchema.js";
import {User} from './model/User.js'
connectDB();

// Use Middlewares
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(
  fileupload({
    useTempFiles: true,
  })
);
// Import User Routes
app.use("/v1", router);
app.use("/customer", customerRoute);
app.use("/captain", Captainrouter);

const server = http.createServer(app);
const io = new Server(8086, {
  cors: {
    cors: true,
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("sendMessage", async (data) => {
    try {
      const otherid = data?.other;
      console.log("other id ==", otherid);
      const userData = await User.findOne({ otherid });
      console.log("other user data ===",userData);
      const finalobj = {
        data: data,
        user: userData
      };
      socket.emit("recieveMessage", { status: "success", data: finalobj });
    } catch (error) {
      console.log("error", error);
    }
  });
  socket.on("newRide", async (data, cb) => {
    try {
      const category = data?.categoryId;
      const userId = data?.userId;
      const categoryData = await RideCategory.findOne({ category });

      const userData = await Customer.findOne({ userId });
      console.log("categoryData form  ===", categoryData);
      console.log("userData form ===", userData);
      const finalData = {
        bidData: data,
        userData: userData,
        categoryData: categoryData,
      };
      socket.emit("bidsForDrivers", { status: "success", data: finalData });
      cb({ status: "success", data: data });
    } catch (error) {
      cb({ status: "error", message: error.message });
    }
  });
  socket.on("acceptBidForUsers", async (data, cb) => {
    try {
      const driverId = data.driverId;
      console.log("driverId form  ===", driverId);
      const category = data?.categoryId;
      const userId = data?.userId;
      const categoryData = await RideCategory.findOne({ category });
      const driverData = await Captain.findOne({ driverId });
      const userData = await Customer.findOne({ userId });
      const finalData = {
        bidData: data,
        userData: userData,
        driverData: driverData,
        categoryData: categoryData,
      };
      socket.emit("acceptedForUsers", { status: "success", data: finalData });
      // console.log(result);
      cb({ status: "success", data: data });
    } catch (error) {
      cb({ status: "error", message: error.message });
      // console.log(error, ";;;;;;;;;;;;;");
    }
  });
  socket.on("acceptRequestForDrivers", async (data, cb) => {
    try {
      const driverId = new ObjectId(data.driverId);
      const userId = new ObjectId(data?.userId);
      const driverData = Captain.findOne({ driverId });
      const userData = Customer.findOne({ userId });
      const finalData = {
        bidData: data,
        userData: userData,
        driverData: driverData,
      };
      socket.emit("acceptedForDrivers", { status: "success", data: finalData });
      // console.log(result);
      cb({ status: "success", data: data });
    } catch (error) {
      cb({ status: "error", message: error.message });
      // console.log(error, ";;;;;;;;;;;;;");
    }
  });
  // socket.on("orderCompleted", async (data, cb) => {
  //   try {
  //     let order = await PharmacyOrder.findByIdAndUpdate(data.id, {
  //       OrderStatus: "completed",
  //     });
  //     // console.log(result);
  //     cb({ status: "success", data: order });
  //     // console.log(result, ";;;;;;;;;;;;;;");

  //     pharmacyNsp.emit("orderCompleted", { status: "success", data: order });
  //     console.log("acceptBid", "success");
  //   } catch (error) {
  //     cb({ status: "error", message: error.message });
  //     // console.log(error, ";;;;;;;;;;;;;");
  //   }
  // });
  // socket.on("cancelOrder", async (data, cb) => {
  //   try {
  //     let order = await PharmacyOrder.findByIdAndUpdate(data.id, {
  //       OrderStatus: "cancelled",
  //     });
  //     // console.log(result);
  //     // console.log(result, ";;;;;;;;;;;;;;");

  //     pharmacyNsp.emit("cancelOrder", { status: "success", data: order });
  //     let pharmacy = await Pharmacy.findById(order.pharmaId);
  //     console.log(pharmacy);
  //     notify(pharmacy.fcmToken, "Cancel Order", `User has cancel his order`);
  //     console.log("cancelOrder", "success");
  //     cb({ status: "success", data: order });
  //   } catch (error) {
  //     console.log();
  //     cb({ status: "error", message: error.message });
  //     // console.log(error, ";;;;;;;;;;;;;");
  //   }
  // });
  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});
app.get("/", async (req, res) => {
  res.send("App Is Running");
});

server.listen(process.env.APP_PORT || 8000, () => {
  console.log(`Server  is running on port 8000`);
});

app.use(ErrorMiddleware);
