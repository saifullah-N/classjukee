
import './App.css';
// import Home from './Home';
import ReactHTMLTableToExcel from  'react-html-table-to-excel'
import Table from 'react-bootstrap/Table'
import { useState } from 'react';
// import io from 'socket.io-client'
import Row from './Row';
// var socket = io.connect("http://localhost:8080")
function App() {
  // const[ num ,setNum]=useState(1) 
  // function noOfMachine(){
  //   socket.emit('macno',num)
  // }
  const [graphData,setGraphData] =useState([])
const PushData=(machineData)=>{
  graphData.push(machineData)
}
  return (
    <div>
      {/* <input onChange={(e)=>{setNum(e.target.value)}} placeholder='enter no.of machine'></input> */}
      {/* <button onClick={noOfMachine}>submit</button> */}
      <ReactHTMLTableToExcel
        id="test-table-xls-button"
        className="download-table-xls-button"
        table="table-to-xls"
        filename="machinedata"
        sheet="tablexls"
        buttonText="Download as XLS" />
      <Table id="table-to-xls"
      bordered
      variant='dark'
      >
        <thead>
        <tr>
          <th>machine-id</th>
          <th>pieces</th>
          <th>time</th>
        </tr>
        </thead>
        <tbody>
        <Row PushData={PushData}   machID='mach-1'></Row>
        <Row PushData={PushData}   machID='mach-2'></Row>
        <Row PushData={PushData}   machID='mach-3'></Row>
        <Row PushData={PushData}   machID='mach-4'></Row>
        <Row PushData={PushData}   machID='mach-5'></Row>
        <Row PushData={PushData}   machID='mach-6'></Row>

        </tbody>
      </Table>

    </div>
  );
}

export default App;
