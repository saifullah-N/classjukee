
import React, { useEffect, useState } from 'react'
import openSocket from 'socket.io-client';
// import { getMac, subscribeToTimer } from './api'

var socket = openSocket("http://localhost:8080")


function Row({machID,PushData}) {
    
function subscribeToTimer(cb) {
        socket.on(machID, (pieces,time) => cb(pieces,time));
        socket.emit(`subscribeToTimer+${machID}`);}
const [pieces,setPeices]=useState()
const [time,setTime]=useState()
useEffect(()=>{
  subscribeToTimer((pieces,time)=>{
    //console.log('pieces :'+pieces);
    // console.log('time :'+time);

   setPeices(pieces)
   setTime(time)
    PushData({ machID: machID, pieces: parseInt(pieces), time: parseInt(time) }, parseInt((machID.slice(machID.length - 1))-1));
   
  })
  
})
return (
  <tr>
          <td>{machID}</td>
          <td>{pieces}</td>
          <td>{time}</td>
      </tr>
  )
}

export default Row