import  React ,{useState,useEffect} from 'react';
import io from 'socket.io-client'
import queryString from 'query-string'
import '../styles.css'
import InfoBar from '../InfoBar/InfoBar';

let socket;
const Teacher = ({history,location})=>{

    const [name,setName] = useState("")
    const [room,setRoom] = useState("")
    const [roomId,setRoomId] = useState("")
    
    const [users, setUsers] = useState([]);
    const [classStatus ,setClassStatus] = useState(false)
    const ENDPOINT ='http://localhost:9000'
    useEffect(()=>{
        
        const {name,room,roomId} = queryString.parse(location.search)

        socket =io(ENDPOINT)
        setName(name)
        setRoom(room)
        setRoomId(roomId)
       
        socket.emit('join',{name,room,roomId,userType:"teacher"},(error)=>{
            if(error) {
                alert(error);
              }
        });

       
       
    },[ENDPOINT,location.search])

    useEffect(()=>{
       
        socket.on("roomData", ({ users }) => {
            setUsers(users);
          });

    },[users])


    


   const startClass =(event)=>{
        event.preventDefault()
        setClassStatus(true)
        
 
        socket.emit('startClass',{roomId},()=>{
            
        });

       

    }

    const EndClass = (event)=>{
        event.preventDefault()
        setClassStatus(false)
        
 
        socket.emit('endClass',{roomId},()=>{
            console.log('endClass')
        });

        history.push('/')

    }

    console.log('usersss',users)
    return (

        <div className="outerContainer">
            <div className="classroom">
            <h3 className="logo">Classroom - {roomId}</h3>
            </div>
             <div style={{position:"absolute", right:"50px",top:"20px"}}>
             <a href={ `http://localhost:3000/invite?room=${room}&roomId=${roomId}`} target="_blank">
                 <button  className="btn-info invite" >Invite</button>
                 </a>
                 <button onClick={(event)=>classStatus?null:startClass(event)} className="btn-info start" >Start Class</button>
                 <button onClick={(event)=>!classStatus?null:EndClass(event)} className="btn-info end"  >End Class</button>
         </div>   

         <div className="container">
          <InfoBar room="Teacher" />
          <div className="activeContainer">
              <ul>
                {users.length>0&& users[0].teacher.map(({name}) => (
                  <div key={name} className="activeItem">
                     <li>{name}</li>
                   
                  </div>
                ))}
              </ul>
              </div>
          </div>
         <div className="container">
          <InfoBar room="Student" />
          <div className="activeContainer">
          <ul>
          {users.length>0&&!users[0].isPrivate&& users[0].student.map(({name}) => (
                 <div key={name} className="activeItem">
                 <li>{name}</li>
               
              </div>
                ))}

</ul></div>
          </div>
        
          </div>
    )
}

export default Teacher