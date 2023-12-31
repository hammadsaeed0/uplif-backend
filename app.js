import express from "express";
import { connectDB } from "./config/database.js";
const app = express();
import { APP_PORT } from "./config/index.js";
import router from "./routes/userRoutes.js";
import ErrorMiddleware from "./middleware/Error.js";
import fileupload from "express-fileupload";
import { createServer } from "http";
import { Server } from "socket.io";
import chatSchema from "./model/chatSchema.js";
import msgSchema from "./model/Message.js";
import cors from "cors";
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
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

io.on("connection", (socket) => {
  socket.on("sendMessage", async (data) => {
    try {
      const chatId = data.chatId;

      const message = new msgSchema({
        ...data,
      });

      await message.save();

      const chatRooms = await chatSchema.findById(chatId);
      const obj = {
        ...data,
        createdAt: new Date(),
      };

      chatRooms.lastMessage = obj;

      await chatRooms.save();

      io.to(chatId).emit("receiveMessage", {
        newMessage: data,
        status: "success",
      });
    } catch (error) {
      console.log(error);
    }
  });
});

server.listen(process.env.APP_PORT || 8000, () => {
  console.log(`Server  is running on port 8000`);
});
app.use(ErrorMiddleware);
