const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const {Server} = require("socket.io")
const http = require("http")

dotenv.config()

const app = express()
const httpServer = http.createServer(app)
const io = new Server(httpServer)

app.use(express.json())
app.use(cors())

app.get("/", (req, res)=>{
    return res.send("Hello from server")
})

httpServer.listen(process.env.PORT, ()=>{
    console.log("Server was started")
})

