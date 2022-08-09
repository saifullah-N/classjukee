
import React, { useEffect, useState } from 'react'
import openSocket from 'socket.io-client';
// import { getMac, subscribeTopieces } from './api'
var socket = openSocket("http://localhost:8080")

function PiecesRow({ machID, PushPeiceData}) {
    const [pieces, setPieces] = useState()
    function subscribeTopieces(cb) {
        socket.on(machID+"pieces", (pieces) => cb(pieces));
        socket.emit(`subscribeTopieces+${machID}`);
    }
    useEffect(() => {
        subscribeTopieces((pieces) => {
            //console.log('pieces :'+pieces);
            // console.log('time :'+time);
            setPieces(pieces)
            PushPeiceData({ machID: machID, pieces: parseInt(pieces) }, parseInt((machID.slice(machID.length - 1)) - 1));

        })

    })
  return (
      <tr>
          <td>{machID}</td>
          <td>{pieces}</td>
          <td>{"efficiency"}</td>
      </tr>
  )
}

export default PiecesRow
