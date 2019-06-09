let express=require('express')

let app=express()

let path=require('path')

let socketio=require('socket.io')

let http=require('http')

let server=http.createServer(app)

let io=socketio(server)

let serverport=process.env.PORT || 1234
app.use('/',express.static(path.join(__dirname , 'public')))




app.use('/about',express.static(path.join(__dirname , 'public/about')))

/// a dictonary of username vs socketid
let usersocketinfo={}

io.on('connection', (socket)=>{
    console.log("new connection setup at " + socket.id)

    socket.emit('connected')
    socket.on('login', (data) =>{
        usersocketinfo[data.user]=socket.id;
        console.log(usersocketinfo)
    })
    socket.on('send-msg', (data)=>{
        console.log("message received at server : " + data.message)
      
        if(data.message.startsWith('@')){
            let receiver=data.message.split(':')[0].substr(1)
            let receiversocket=usersocketinfo[receiver]
            let effectivemessage=data.message.split(':')[1]

            data.message=effectivemessage
            io.to(receiversocket).emit('received-msg',data)
        }else{
            socket.broadcast.emit('received-msg',data)
        }
    })
})

server.listen(serverport)