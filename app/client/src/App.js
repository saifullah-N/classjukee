
import './App.css';
import ReactHTMLTableToExcel from  'react-html-table-to-excel'
import Table from 'react-bootstrap/Table'
import { useState ,useEffect} from 'react';
import Row from './Row';
import Graph from './Graph';
import _ from 'lodash';
import RecordRow from './RecordRow';
import openSocket from 'socket.io-client';
var socket = openSocket("http://localhost:8080")


function App() {


  var data = [{ machID: 'mach-1', peices: 0, time: 0 }, { machID: 'mach-2', peices: 0, time: 0 }, { machID: 'mach-3', peices: 0, time: 0 },{ machID: 'mach-4', peices: 0, time: 0 },{ machID: 'mach-5', peices: 0, time: 0 },{ machID: 'mach-6', peices: 0, time: 0 }];
  var Defaultdata = [{ machID: 'mach-1', peices: 0, time: 0 }, { machID: 'mach-2', peices: 0, time: 0 }, { machID: 'mach-3', peices: 0, time: 0 }, { machID: 'mach-4', peices: 0, time: 0 }, { machID: 'mach-5', peices: 0, time: 0 }, { machID: 'mach-6', peices: 0, time: 0 }];
  const [graphData, setGraphData] =useState(Defaultdata)
  async function PushData(machineData,index){
   data[index] = machineData

}
useEffect(() => {
  setInterval(() => {

  setGraphData(data)
    if (graphData.length == 0) {
      setGraphData(Defaultdata)
    }
  
  }
  ,4000)
  

  },[setGraphData,Graph]);
  return (
    <>

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
     <ReactHTMLTableToExcel
        id="test-table-xls-button"
        className="download-table-xls-button"
        table="table-to-xls-report"
        filename="report"
        sheet="tablexls"
        buttonText="Download as XLS" />
      <Table id="table-to-xls-report" 
      bordered
      variant='dark'>
          <thead>
            <tr>
              <th>mach-id</th>
              <th>8:00-8:30</th>
              <th>8:30-9:00</th>
              <th>9:00-9:30</th>
              <th>10:00-10:30</th>
              <th>10:30-11:00</th>
              <th>11:00-11:30</th>
              <th>11:30-12:00</th>
              <th>12:00-12:30</th>
              <th>12:30-13:00</th>
              <th>13:00-13:30</th>
              <th>13:30-14:00</th> 
              <th>14:00-14:30</th>
              <th>14:00-15:00</th>
              <th>15:00-15:30</th>
              <th>15:30-16:00</th>
              <th>16:00-16:30</th>
              <th>16:30-17:00</th>
              <th>17:00-17:30</th>
              <th>17:30-18:00</th>
              <th>18:00-18:30</th>
              <th>18:30-19:00</th>
              <th>19:00-20:00</th>
              <th>20:00-21:30</th>
            </tr>
          </thead>
          <tbody>
           <RecordRow machID="mach-1"/>
          <RecordRow machID="mach-2" />
          <RecordRow machID="mach-3" />
          <RecordRow machID="mach-4" />
          <RecordRow machID="mach-5" /> 
          <RecordRow machID="mach-6" />
            </tbody>
          </Table>
        <Graph graphData={graphData}></Graph>
    </>
  );
}

export default App;
