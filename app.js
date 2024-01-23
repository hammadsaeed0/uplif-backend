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
import { User } from "./model/User.js";
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
    const userId = data.other;
    const user = await User.findById(userId);
    io.sockets.emit("receiveMessage", {
      status: "success",
      user: user,
      data: data,
    });
  });
  socket.on("newRide", async (data, cb) => {
    try {
      const category = data?.categoryId;
      const userId = data?.userId;
      const categoryData = await RideCategory.findById(category);

      const userData = await Customer.findById(userId);
      console.log("categoryData form  ===", categoryData);
      console.log("userData form ===", userData);
      const finalData = {
        bidData: data,
        userData: userData,
        categoryData: categoryData,
      };

      io.sockets.emit("bidsForDrivers", {
        status: "success",
        data: finalData,
      });
      cb({ status: "success", data: data });
    } catch (error) {
      cb({ status: "error", message: error.message });
      console.log("response from error ==", error);
    }
  });
  socket.on("acceptBidForUsers", async (data, cb) => {
    try {
      const driverId = data.driverId;
      const category = data?.categoryId;
      const userId = data?.userId;
      const categoryData = await RideCategory.findById(category);
      const driverData = await Captain.findById(driverId);
      const userData = await Customer.findById(userId);
      console.log("category id  ===", categoryData);
      console.log("driverId form  ===", driverData);

      const finalData = {
        bidData: data,
        userData: userData,
        driverData: driverData,
        categoryData: categoryData,
      };
      io.sockets.emit("acceptedForUsers", {
        status: "success",
        data: finalData,
      });
      // console.log(result);
      // cb({ status: "success", data: finalData });
    } catch (error) {
      // cb({ status: "error", message: error.message });
      console.log(error, ";;;;;;;;;;;;;");
    }
  });
  socket.on("acceptRequestForDrivers", async (data, cb) => {
    try {
      const driverId = new ObjectId(data.driverId);
      const userId = new ObjectId(data?.userId);
      const driverData = await Captain.findById(driverId);
      const userData = await Customer.findById(userId);
      const finalData = {
        bidData: data,
        userData: userData,
        driverData: driverData,
      };
      console.log(finalData);

      io.sockets.emit("acceptedForDrivers", {
        status: "success",
        data: finalData,
      });
      cb({ status: "success", data: data });
    } catch (error) {
      cb({ status: "error", message: error.message });
      // console.log(error, ";;;;;;;;;;;;;");
    }
  });
  socket.on("startRide", async (data, cb) => {
    try {
      const driverId = data.driverId;
      const obj = {
        driverId: driverId,
      };
      io.sockets.emit("startRide", obj);
    } catch (error) {
      cb({ status: "error", message: error.message });
      // console.log(error, ";;;;;;;;;;;;;");
    }
  });
  socket.on("endRide", async (data, cb) => {
    try {
      const driverId = data.driverId;
      const obj = {
        driverId: driverId,
      };
      io.sockets.emit("endRide", obj);
      cb({ status: "success" });
    } catch (error) {
      cb({ status: "error", message: error.message });
      // console.log(error, ";;;;;;;;;;;;;");
    }
  });
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
