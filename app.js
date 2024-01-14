import express from "express";
import { connectDB } from "./config/database.js";
const app = express();
import customerRoute from "./routes/customerRoutes.js";
import router from "./routes/userRoutes.js";
import ErrorMiddleware from "./middleware/Error.js";
import fileupload from "express-fileupload";
import { Server } from "socket.io";
import Captainrouter from "./routes/captainroutes.js";
import cors from "cors";
import http from "http";
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
