
import './App.css';
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import Table from 'react-bootstrap/Table'
import { useState, useEffect } from 'react';
import TimeRow from './TimeRow';
import PiecesRow from './PiecesRow';
import Graph from './Graph';
import _ from 'lodash';
import RecordRow from './RecordRow';
import openSocket from 'socket.io-client';
var socket = openSocket("http://localhost:8080")


function Home() {


    var peiceData = []
    var DefaultPeicedata = [{ machID: 'mach-1', pieces: 0 }, { machID: 'mach-2', pieces: 0 }, { machID: 'mach-3', pieces: 0 }, { machID: 'mach-4', pieces: 0 }, { machID: 'mach-5', pieces: 0 }, { machID: 'mach-6', pieces: 0 }];
    var timeData = []
    var DefaultTimedata = [{ machID: 'mach-1', time: 0 }, { machID: 'mach-2', time: 0 }, { machID: 'mach-3', time: 0 }, { machID: 'mach-4', time: 0 }, { machID: 'mach-5', time: 0 }, { machID: 'mach-6', time: 0 }];

    const [graphDataTime, setGraphDataTime] = useState(DefaultTimedata)
    const [graphDatapieces, setGraphDatapieces] = useState(DefaultPeicedata)

    async function PushPeiceData(machineData, index) {
        peiceData[index] = machineData

    }
    async function PushTimeData(peicedata, index) {
        timeData[index] = peicedata

    }
    useEffect(() => {
        setInterval(() => {

            setGraphDataTime(timeData)
            if (graphDataTime.length == 0) {
                setGraphDataTime(DefaultTimedata)
            }
            setGraphDatapieces(peiceData)
            if (graphDatapieces.length == 0) {
                setGraphDatapieces(DefaultPeicedata)
            }

        }
            , 4000)


    }, [setGraphDatapieces, setGraphDataTime]);
    return (
        <div>
                <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button"
                    table="table-to-xls"
                    filename="timeEfficiency"
                    sheet="tablexls"
                    buttonText="Download as XLS" />
                <Table id="table-to-xls"
                    bordered
                    variant='dark'
                >
                    <thead>
                        <tr>
                            <th>machine-id</th>
                            <th>time</th>
                            <th>efficiency</th>
                        </tr>
                    </thead>
                    <tbody>
                        <TimeRow PushTimeData={PushTimeData} machID='mach-1'></TimeRow>
                        <TimeRow PushTimeData={PushTimeData} machID='mach-2'></TimeRow>
                        <TimeRow PushTimeData={PushTimeData} machID='mach-3'></TimeRow>
                        <TimeRow PushTimeData={PushTimeData} machID='mach-4'></TimeRow>
                        <TimeRow PushTimeData={PushTimeData} machID='mach-5'></TimeRow>
                        <TimeRow PushTimeData={PushTimeData} machID='mach-6'></TimeRow>
                    </tbody>
                </Table>
                <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button"
                    table="table-to-xls-pieces"
                    filename="peiceEfficiency"
                    sheet="tablexls"
                    buttonText="Download as XLS" />
                <Table id="table-to-xls-pieces"
                    bordered
                    variant='dark'
                >
                    <thead>
                        <tr>
                            <th>machine-id</th>
                            <th>pieces</th>
                            <th>efficiency</th>
                        </tr>
                    </thead>
                    <tbody>
                        <PiecesRow PushPeiceData={PushPeiceData} machID='mach-1'></PiecesRow>
                        <PiecesRow PushPeiceData={PushPeiceData} machID='mach-2'></PiecesRow>
                        <PiecesRow PushPeiceData={PushPeiceData} machID='mach-3'></PiecesRow>
                        <PiecesRow PushPeiceData={PushPeiceData} machID='mach-4'></PiecesRow>
                        <PiecesRow PushPeiceData={PushPeiceData} machID='mach-5'></PiecesRow>
                        <PiecesRow PushPeiceData={PushPeiceData} machID='mach-6'></PiecesRow>
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
                        <RecordRow machID="mach-1" />
                        <RecordRow machID="mach-2" />
                        <RecordRow machID="mach-3" />
                        <RecordRow machID="mach-4" />
                        <RecordRow machID="mach-5" />
                        <RecordRow machID="mach-6" />
                    </tbody>
                </Table>
            <Graph graphData={graphDatapieces} label="pieces"></Graph>
           <Graph graphData={graphDataTime} label="time"></Graph>
        </div>
    );
}

export default Home;
