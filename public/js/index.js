let socket = io();

socket.on('connect',()=>{
    console.log('connected to server')
})

 socket.emit('createMessage',{
    from:"Anant",
    text:"Hello and Welcome to cachy!!"
 })

 socket.on('newMessage',(message)=>{
    console.info(message)
 })

socket.on('disconnect',()=>{
    console.log('disconnected to server')
})