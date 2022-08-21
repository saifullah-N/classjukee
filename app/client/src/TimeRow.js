
import React, { useEffect, useState } from 'react'
import openSocket from 'socket.io-client';
// import { getMac, subscribeToTime } from './api'

var socket = openSocket("http://localhost:5000")


function TimeRow({machID,PushTimeData}) {
    
function subscribeToTime(cb) {
        socket.on(machID+"time", (time) => cb(time));
        socket.emit(`subscribeToTime+${machID}`);}
const [time,setTime]=useState()
useEffect(()=>{
  subscribeToTime((time)=>{
    //console.log('pieces :'+pieces);
    // console.log('time :'+time);
   setTime(time)
    PushTimeData({ machID: machID, time: parseInt(time) }, parseInt((machID.slice(machID.length - 1))-1));
   
  })
  
})
return (
  <tr>
          <td>{machID}</td>
          <td>{time}</td>
          <td>{"efficiency"}</td>
      </tr>
  )
}

export default TimeRow