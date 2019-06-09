console.log("scripts.js running ")

let socket = io()

socket.on('connected',()=>{
    console.log("connected " + socket.id )
})

$(function() {
    let msg=$("#chatbox")
    let msgbtn=$("#chatbtn")
    let ul=$("#ul")

    let login=$("#loginbox")
    let loginbtn=$("#loginbtn")

    let logindiv=$('#login-div')
    let chatdiv=$('#chat-div')
    let username=''

    logindiv.show()
    chatdiv.hide()
    loginbtn.click(()=>{
        username=login.val()
        chatdiv.show()
        logindiv.hide()
        socket.emit('login',{
            user: username
        })
    })
    msgbtn.click(()=>{
        console.log("button clicked !")
        socket.emit('send-msg',{
            user : username,
            message : msg.val()})
    })

    socket.on('received-msg', (data)=>{
        ul.append($('<li>' +  data.user+ ": " + data.message + '</li>'))
    })

})