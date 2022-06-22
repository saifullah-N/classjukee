
import './App.css';

import ReactHTMLTableToExcel from  'react-html-table-to-excel'
import Table from 'react-bootstrap/Table'
import { useState ,useEffect} from 'react';

import Row from './Row';
import Graph from './Graph';
import _ from 'lodash';

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
    <div>
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
   
        <Graph graphData={graphData}></Graph>

    </div>
  );
}

export default App;
