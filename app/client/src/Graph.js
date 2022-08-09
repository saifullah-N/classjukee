import React, { useEffect, useState } from "react";
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

function Graph({graphData ,label}) {   
//     if(label=="pieces"){
//     console.log(_.map(graphData, label))
// }
    const [data, setData] = useState({

        labels: ['mach-1', 'mach-2', 'mach-3', 'mach-4', 'mach-5', 'mach-6'],
        datasets: [
            {
                label: label,
                data: [0,0,0,0,0,0,0],
                backgroundColor: "rgba(255, 99, 132, 0.5)",
            }
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
                text: `Efficiency of Machines based on ${label}`,
            },
        },
    };

  function graphSetter(){ setInterval(() => {


        const plotData = _.map(graphData,label);
        plotData.map((t) => {
            if (t === null || t === NaN)
                t = 0
        })
        const labels = _.map(graphData, "machID")

        // pieces.map((p) => {
        //     if (p === null || p === NaN)
        //         p = 0
        // })
        const defineData = {

            labels: labels,
            datasets: [
                {
                    label: label,
                    data: plotData,
                    backgroundColor: "rgba(255, 99, 132, 0.5)",
                }
                // {
                //     label: "time",
                //     data: time,
                //     backgroundColor: "rgba(53, 162, 235, 0.5)",
                // },
            ],
        }
        setData(defineData)
    }, 1000)
}


    useEffect( () => {
        graphSetter()
    }, [setData, graphSetter])
    
    return (
        <>
            <div style={{ width: "1200px", margin: "auto auto" }}>
                <Bar options={options} data={data} />
            </div>
        </>
    );
}

export default Graph;