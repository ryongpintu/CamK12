const express = require('express');
const app = express();
const mongoose = require('mongoose');
const socketio = require('socket.io')

const { addUser, removeUser, getUser, getUsersInRoom,getRoomData,setRoomToPublic ,removeRoomHistory} = require('./users');

// DB Config
const db = require('./keys').mongoURI;
console.log(db)
// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true }) // Let us remove that nasty deprecation warrning :)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


const PORT  = process.env.PORT || 9000
const router = require('./router')

app.use(router)
const expressServer = app.listen(PORT,()=>{
    console.log(`Server started at ${PORT}`)
});

const io = socketio(expressServer);


io.on('connection',(socket)=>{



    socket.on('join',({name,room,roomId ,userType},callback)=>{

        const {error ,user}= addUser({id:socket.id,name,room,roomId,userType})

       
        if(userType == "teacher"){

           socket.join(user.roomId)

        }else{

            if(user.existingRooms.isPrivate){

                socket.emit('NotAllowed',{text:`Class not started yet wait for Teacher to start`})
            }else{
                socket.emit('allowed')
            }

             socket.join(user.roomId)
           
        }

        io.to(roomId).emit('roomData',{
            room:roomId,users:getRoomData(roomId)
        })

        callback()
    })


    socket.on('startClass',(message,callback)=>{
      
        const room = getRoomData(message.roomId)
        // set room to publict 
         let room1 =setRoomToPublic(message.roomId)
         console.log(room)
         console.log("room1",room1)

         io.to(room1.roomId).emit('allowed')
         io.to(room1.roomId).emit('roomData', { users:getRoomData(room1.roomId)});
    

       callback()
    })


    socket.on('endClass',(message)=>{

        const room = getRoomData(message.roomId)
        io.to(room[0].roomId).emit('closedClass',{text:`Class has finished thank you for joining`})
         
        const rooms= removeRoomHistory(room[0].roomId)

          console.log("roomshistory",rooms)
        })

   
    socket.on('disconnect',()=>{
        console.log('user has left !!!')

        const user = removeUser(socket.id)
        
        if(user){
              io.to(user.roomId).emit('roomData', { room:user.roomId,users:getRoomData(user.roomId)});
        }
    
    })


})