import React, { useEffect, useState } from "react";
import { saveAs } from 'file-saver'; 
import _ from "lodash"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function Graph({graphData}) 
{   
    
    const [data, setData] = useState({

        labels: ['mach-1', 'mach-2', 'mach-3', 'mach-4', 'mach-5', 'mach-6'],
        datasets: [
            {
                label: "pieces",
                data: [0,0,0,0,0,0,0],
                backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
            {
                label: "time",
                data: [0,0,0,0,0,0],
                backgroundColor: "rgba(53, 162, 235, 0.5)",
            },
        ],
    })

   const options = {
        responsive: true,
        animations:{
            from:1,
            to: 1,
        },
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Efficiency of Machines",
            },
        },
    };

  function graphSetter(){ setInterval(() => {


        const time = _.map(graphData, "time")
        time.map((t) => {
            if (t === null || t === NaN)
                t = 0
        })
        const labels = _.map(graphData, "machID")
        const pieces = _.map(graphData, "pieces")

        pieces.map((p) => {
            if (p === null || p === NaN)
                p = 0
        })
        const defineData = {

            labels: labels,
            datasets: [
                {
                    label: "pieces",
                    data: pieces,
                    backgroundColor: "rgba(255, 99, 132, 0.5)",
                },
                {
                    label: "time",
                    data: time,
                    backgroundColor: "rgba(53, 162, 235, 0.5)",
                },
            ],
        }
        setData(defineData)
    }, 1000)
}

function saveCanvas() {
    //save to png
    const canvasSave = document.getElementById('stackD');
    canvasSave.toBlob(function (blob) {
        saveAs(blob, "testing.png")
    })
}
    useEffect( () => {
        graphSetter()
    }, [setData, graphSetter])
    
    return (
        <>
            <a onClick={saveCanvas} className="btn btn-primary">Download as PNG</a>
            <div style={{ width: "1100px", margin: "auto auto" }}>
                <Bar id="stackD" options={options} data={data} />
            </div>
        </>
    );
}

export default Graph;