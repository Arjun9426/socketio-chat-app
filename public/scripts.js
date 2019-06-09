console.log("scripts.js running ")

let socket = io()

socket.on('connected',()=>{
    console.log("connected " + socket.id )
})

$(function() {
    let msg=$("#chatbox")
    let msgbtn=$("#chatbtn")
    let ulr=$("#ul-receive")
    let uls=$("#ul-sent")

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
        let message=msg.val()
        if(message.startsWith("@")){
            let receiver=message.split(":")[0].substr(1)
            let actual_message=message.split(":")[1]
            uls.append($('<li>'+ "To " + receiver + ": " + actual_message + '</li>'))
        }
        else{
            uls.append($('<li>'+ "Broadcasted: " + message + '</li>'))
        }
        console.log("button clicked !")
        socket.emit('send-msg',{
            user : username,
            message : msg.val()})
    })

    socket.on('received-msg', (data)=>{
        ulr.append($('<li>' +  data.user+ ": " + data.message + '</li>'))
    })

})