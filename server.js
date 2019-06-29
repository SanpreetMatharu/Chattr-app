
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);

const port = process.env.PORT || 3030;

//Static folder to keep all static files
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
})

io.on("connection", (client) => {
    console.log("Connected....");
    client.emit("acknowledge", { data: "Connection establised!" });    

    client.on("MsgToServer", (chattername, msg) => {
        console.log(chattername + "says :" + msg);
        client.emit("MsgToClient", 'Me', msg);
        client.broadcast.emit("MsgToClient", chattername, msg);
        
    })    
})

server.listen(port, () => {
    console.log("Scoket server started at port : " + port);
})