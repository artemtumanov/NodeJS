const socket = require("socket.io");
const http = require("http");
const path = require("path");
const fs = require("fs");
const { nanoid } = require("nanoid");

const DB_Users = [];

const server = http.createServer((req, res) => {
  const indexPath = path.join(__dirname, "index.html");
  const readStream = fs.createReadStream(indexPath);

  readStream.pipe(res);
});

const io = socket(server);

var allClients = [];

io.sockets.on("connection", function (socket) {
  allClients.push(socket);
});

io.on("connection", (client) => {
  console.log(`New client with id: ${client.id} connected!`);

  client.on("client-reconnection", (data) => {
    client.id = data.userID;
    client.userName = data.userName;
    console.log(
      `Client ${client.userName} with id: ${client.id} id reconnected!`
    );
    console.log(allClients.length);

    let counterUsersPayload = {
      usersOnlineCounter: allClients.length,
    };
    client.broadcast.emit("users-counter-update", counterUsersPayload);
  });

  client.on("client-username", (data) => {
    console.log(data);
    client.userName = data.userName;

    const payload = {
      userName: client.userName,
      message: `${client.userName} is connected`,
    };

    const payloadWithUserID = {
      ...payload,
      userID: client.id,
    };
    console.log(payloadWithUserID);
    client.broadcast.emit("server-msg", payload);
    client.emit("server-msg", payloadWithUserID);
    DB_Users.push({
      userID: payloadWithUserID.userID,
      userName: payloadWithUserID.userName,
    });

    let counterUsersPayload = {
      usersOnlineCounter: allClients.length,
    };
    client.broadcast.emit("users-counter-update", counterUsersPayload);
  });

  client.on("client-msg", (data) => {
    console.log(data);
    const payload = {
      userName: data.userName,
      message: data.message,
    };

    client.broadcast.emit("server-msg", payload);
    client.emit("server-msg", payload);
  });

  client.on("disconnect", () => {
    console.log(
      `Client id: ${client.id} name: ${client.userName} is disconnected`
    );
    let payload = {
      userName: client.userName,
    };

    let disconnectedUser = allClients.filter((inArrClient) => {
      return inArrClient.id === client.id;
    });

    let disconnectedUserIndex = allClients.indexOf(disconnectedUser);
    allClients.splice(disconnectedUserIndex, 1);

    client.broadcast.emit("disconnect-user", payload);

    let counterUsersPayload = {
      usersOnlineCounter: allClients.length,
    };
    client.broadcast.emit("users-counter-update", counterUsersPayload);
  });
});

server.listen(5555);
