
import React, { useEffect,useState } from 'react'
import openSocket from 'socket.io-client';
var socket = openSocket("http://localhost:8080")

function RecordRow({machID}) {

    function getRecord(cb) {
        socket.on("getRecord"+machID, (record) => cb(record));
        socket.emit(`subscribeToRecord+${machID}`);
    }
    const[time, setTime] = useState([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0])
<<<<<<< HEAD
    useEffect(() => {
        getRecord((record) => {
            if (record.length != 0) {
                setTime(record)
            }
            setTime([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
        })
    }, [socket, getRecord])

=======
 useEffect(() => {
    getRecord((record)=>{
       if(record.length != 0) {
        setTime(record)}
        setTime([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0,0,0])
    })
     },[socket,getRecord])
       
>>>>>>> e4dcdd060fe4bfbde8edc7774cbb8e8dd9f7b557
  return (
      <tr>
        <td>{machID}</td>
     {

        time.map((value)=>{
            // console.log(value)   
           return <td>{value}</td>
        })
        
    }
      </tr>
  )
}

export default RecordRow