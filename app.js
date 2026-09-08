const express=require("express");
const {createServer}=require("node:http")
const app=express();
const port=5000;
const {Server}=require("socket.io");

const server=createServer(app);
const io=new Server(server);

app.use(express.static("public"));

app.get("/",(req,res)=>{
    return res.sendFile('index.html');
})

io.on('connection',(socket)=>{
    console.log("Web Socket Connection Formed with Socket ID:"+socket.id)
    socket.on('message',(msg)=>{
        console.log(msg);
        io.emit(msg)
    });
})

server.listen(port,()=>{
    console.log("Server is Listening...");
});