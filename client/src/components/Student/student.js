import  React ,{useState,useEffect} from 'react';
import io from 'socket.io-client'
import queryString from 'query-string'
import '../styles.css'
import InfoBar from '../InfoBar/InfoBar';

let socket;
const Student = ({location})=>{

    const [name,setName] = useState("")
    const [room,setRoom] = useState("")
    const [roomId,setRoomId] = useState("")
    const [permission,setInterface] = useState(false)
    const [message,setMessage] = useState("")
    const [users, setUsers] = useState([]);

    const ENDPOINT ='http://localhost:9000'

    useEffect(()=>{
        const {name,room,roomId} = queryString.parse(location.search)

        socket =io(ENDPOINT)
        setName(name)
        setRoom(room)
        setRoomId(roomId)
       
        socket.emit('join',{name,room,roomId,userType:"student"},(error)=>{
            if(error) {
                alert(error);
              }
        });

       
       
    },[ENDPOINT,location.search])

    useEffect(()=>{
        socket.on('NotAllowed',(message)=>{

            setInterface(false)
            setMessage(message.text)
            console.log('message')
            console.log('message',message)
        })
        socket.on("roomData", ({ users }) => {
            setUsers(users);
          });

          socket.on('allowed',message=>{
            setInterface(true)
          })

          socket.on('closedClass',(message)=>{
            setInterface(false)
            setMessage(message.text)
            console.log('message')
            console.log('message',message)
          })

    })


    

    
    return (
        <div className="outerContainer">
        <div className="classroom">
            <h3 className="logo">Classroom - {roomId}</h3>
            </div>

        
        {
            !permission?<h1>{message}</h1>:
        <React.Fragment>
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
        
          </React.Fragment>}
         
          </div>
        
    )
}

export default Student