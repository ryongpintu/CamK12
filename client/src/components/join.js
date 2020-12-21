import React ,{useState} from 'react';
import './join.css'
import {  Link} from "react-router-dom";

const Join = ()=>{
    const [name,setName] = useState("")
    const [room,setRoom] = useState("")
    
    return (
        <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Create Room</h1>
        <div>
          <input placeholder="Name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} />
        </div>
        <div>
          <input placeholder="Room" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)} />
        </div>
        <Link onClick={e => (!name || !room) ? e.preventDefault() : null} to={`/teacher?name=${name}&room=${room}&roomId=${Math.floor(Math.random()*10000000)}`}>
          <button className={'button mt-20'} type="submit">Create</button>
        </Link>
      </div>
    </div>
    )
}

export default Join
