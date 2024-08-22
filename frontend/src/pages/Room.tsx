import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';


const URL = "http://localhost:3000";

export default function Room() {
    const [searchParams, setSearchParams] = useSearchParams();
    const name = searchParams.get('name');

    const [socket, setSocket] = useState<null | Socket>(null);
    const [lobby, setLobby] = useState(true)

    useEffect(() => {
      const socket = io(URL)

      socket.on('send-offer', ({roomId})=>{
        alert("Send Offer please");
        setLobby(false);
        socket.emit("offer", {
          sdp: "",
          roomId
        })
      })

      socket.on("offer", ({roomId, offer}) => {
        alert("Send Answer Please");
        socket.emit("answer", {
          sdp: "",
          roomId
        })
      })

      socket.on("lobby", ()=>{
        setLobby(true);
      })
      
      // socket.on("answer", ({roomId, answer}) => {
      //   alert("Connection Done");
      // })

    }, [name])

    if(lobby){
      return <div>
        Waiting for someone
      </div>
    }
    
  return (
    <div>Hi {name}</div>
  )
}
