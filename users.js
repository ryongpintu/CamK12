const users=[]
const rooms=[]
const addUser = ({ id, name, room,roomId,userType}) => {
    
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    const roomIndex = rooms.findIndex(room=>room.roomId === roomId)
    let roomDetail=  rooms[roomIndex]
    
    if(roomIndex == -1 && userType=='teacher'){

      rooms.push({
        room,
        roomId,
        isPrivate:true,
        teacher:[{name,id,userType}],
        student:[]
      })

    }else{

      console.log('roomDetail',roomDetail.student)
      if(userType== 'student'){
        rooms[roomIndex].student.push({name,id,userType})

      }
     
    }


    const existingRooms = rooms.find((room) => room.roomId === roomId);
  

    
    const user = { id, name, room ,roomId ,existingRooms};
  
    users.push(user);
  
    return { user };

    
  }
  
  const removeUser = (id) => {
    const userData = users.find((user) => user.id === id);
     console.log("userData",userData)
    if(userData){
    const RoomData = rooms.filter((room) => room.roomId === userData.roomId);
    console.log("RoomData",RoomData)
    let index = RoomData[0].student.findIndex((user) => user.id === id);
    console.log("userDatindex a",RoomData[0].student, index)
    if(index != -1) RoomData[0].student.splice(index, 1)
    return RoomData[0]
    }
  }
  

  const removeRoomHistory = (roomId) => {

    const index = rooms.findIndex((room) => room.roomId === roomId);
    
    if(index != -1) rooms.splice(index, 1)

    return rooms
    
  }
  const getUser = (id) => users.find((user) => user.id === id);
  
  const getUsersInRoom = (room) => users.filter((user) => user.room === room);
  
  const getRoomData = (roomId) => rooms.filter((room) => room.roomId === roomId);
  
  const setRoomToPublic =(roomId) =>{
    let index = rooms.findIndex((room) => room.roomId === roomId);
    rooms[index].isPrivate =false
    return rooms[index]
  }
  module.exports = { addUser, removeUser, getUser, getUsersInRoom,getRoomData , setRoomToPublic,removeRoomHistory };