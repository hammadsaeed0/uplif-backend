import express from "express";
import { connectDB } from "./config/database.js";
const app = express();
import { APP_PORT } from "./config/index.js";
import customerRoute from "./routes/customerRoutes.js";
import router from "./routes/userRoutes.js";
import ErrorMiddleware from "./middleware/Error.js";
import fileupload from "express-fileupload";
import { createServer } from "http";
import { Server } from "socket.io";
import Captainrouter from "./routes/captainroutes.js";
import cors from "cors";
import socket from "./socket/socket.js";
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
connectDB();
socket(io);

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
server.listen(process.env.APP_PORT || 8000, () => {
  console.log(`Server  is running on port 8000`);
});
app.use(ErrorMiddleware);
