
export default function socket(io) {
  const userNsp = io.of("/user");
  userNsp.on("connection", (socket) => {
    console.log("user socket connected");
    socket.on("newOrder", async (data, cb) => {
      try {
        console.log("user data ==", data);
        cb({ status: "success", data: order });
        console.log("newOrder", "success");
      } catch (error) {
        cb({ status: "error", message: error.message });
      }
    });
  });
}
