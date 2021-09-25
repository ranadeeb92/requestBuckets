// const { Server } = require("socket.io");

// let connection = null;

// const connect = (server, corsOriginURL) => {
//   //const io = require("socket.io")(server);
//   const io = new Server(server, {
//     cors: {
//       origin: corsOriginURL,
//       methods: ["GET", "POST"],
//     },
//   });

//   io.on("connection", (socket) => {
//     console.log(socket, "connection");
//     connection = socket;
//     socket.on("statusConnetion", (data) => {
//       console.log(data);
//     });

//     socket.on("disconnect", function () {
//       console.log(socket.id, "Un socket se desconecto");
//     });

//     console.log(`New socket connection: ${socket.id}`);
//   });
// };

// const init = (server) => {
//   if (!connection) {
//     connection = connect(server);
//   }
// };

// const getConnection = () => {
//   if (!connection) {
//     throw new Error("no active connection");
//   }
//   return connection;
// };
// // }

// module.exports = {
//   connect: init,
//   connection: getConnection,
// };
