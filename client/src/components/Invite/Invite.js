import React ,{useState} from 'react';
import queryString from 'query-string'
import './invite.css'
import {  Link} from "react-router-dom";

const Invite = ({location})=>{
    const [name,setName] = useState("")
    
    const {room,roomId} = queryString.parse(location.search)
    
    return (
        <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join Room</h1>
        <div>
          <input placeholder="Name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} />
        </div>
       
        <Link onClick={e => (!name || !room || !roomId) ? e.preventDefault() : null} to={`/student?name=${name}&room=${room}&roomId=${roomId}`}>
          <button className={'button mt-20'} type="submit">Join</button>
        </Link>
      </div>
    </div>
    )
}

export default Invite
