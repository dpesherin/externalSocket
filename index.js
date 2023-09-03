const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const {Server} = require("socket.io")
const http = require("http")

dotenv.config()

const app = express()
const httpServer = http.createServer(app)
const io = new Server(httpServer)

io.on("connection", (client)=>{
    if(!client.handshake.query.user){
        client.disconnect()
    }else{
        client.join(client.handshake.query.user)
    }
})

app.use(express.json())
app.use(cors())

//Example of event creation by REST
app.post("/ping", (req, res)=>{
    if(!req.body.user){
        return res.status(400).json({status: "err", msg: "No user provided"})
    }
    sendPersonal(req.body.user, "pong", "pong")
    res.writeHead(201, {
        'Location': '/ping'
    });
    return res.end('');
})
//End

//Block area
app.all("/*", (req, res)=>{
    return res.status(400).send("method not found")
})

httpServer.listen(process.env.PORT, ()=>{
    console.log("Server was started")
})


function sendPersonal(user, event, msg){
    io.to(user).emit(event, {payload: msg})
}

