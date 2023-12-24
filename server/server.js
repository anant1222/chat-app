const express = require('express')
const http = require('http')
const socketIo = require('socket.io')
const path = require('path')
const publicPath = path.join(__dirname,'/../public')
console.log(publicPath)
const app = express();
const server = http.createServer(app)
let io = socketIo(server)
app.use(express.static(publicPath))

app.get('/h',(req,res)=>{
    res.json({Greet:"Hello and welcome."})
})

io.on('connection',(socket)=>{
    console.log(`a new user added`)

    socket.emit('newMessage',{
        from:'Admin',
        text:"welcome to chat app.",
        createdAt:new Date().getTime()
    })

    socket.broadcast.emit('newMessage',{
        from:'Admin',
        text:"New user joined",
        createdAt:new Date().getTime()
    })
    
    socket.on('createMessage',(message)=>{
        console.log('createMessage', message)
        io.emit('createMessage',{
            from : message.from,
            text : message.text,
            createdAt: new Date().getTime()
        })
    })

    socket.emit('newMessage',{
        from:"Server",
        text:"Hello and connected"
    })

   

    socket.on('disconnect',()=>{
        console.log(`user disconnected`)
    })

})

server.listen(8080,()=>{
    console.log(`Server sucessfully started on http://localhost:8080`)
})