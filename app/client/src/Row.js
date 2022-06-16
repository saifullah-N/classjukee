import React, { useEffect, useState } from 'react'
import openSocket from 'socket.io-client';
// import { getMac, subscribeToTimer } from './api'

var socket = openSocket("http://localhost:8080")
function Row({machID,PushData}) {
    
function subscribeToTimer(cb) {
        socket.on(machID, (peices,time) => cb(peices,time));
        socket.emit(`subscribeToTimer+${machID}`, 1000);}
const [peices,setPeices]=useState()
const [time,setTime]=useState()
useEffect(()=>{
  subscribeToTimer((peices,time)=>{
    //console.log('peices :'+peices);
    // console.log('time :'+time);

   setPeices(peices)
   setTime(time)

    PushData({ machID :machID,peices :peices,time :time})
  })

})
  return (
      <tr>
          <td>{machID}</td>
          <td>{peices}</td>
          <td>{time}</td>
      </tr>
  )
}

export default Row