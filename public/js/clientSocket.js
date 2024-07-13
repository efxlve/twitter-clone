var connected = false;

var socketUrl = "https://YOUR-URL.com";

if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
    socketUrl = "http://localhost:3001";
}

var socket = io(socketUrl);
socket.emit("setup", userLoggedIn);

socket.on("connected", () => connected = true);
socket.on("message received", (newMessage) => messageReceived(newMessage));