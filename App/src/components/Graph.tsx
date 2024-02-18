// import { useState } from 'react';
// import ReactApexChart from 'react-apexcharts';

// import { getDatabase, ref, onValue } from "firebase/database";
// import { initializeApp } from "firebase/app";

// const firebaseConfig = {
//     apiKey: "AIzaSyBXt6-eqE6nJow0NFsgx3cnC8D-Dr6mktc",
//     authDomain: "esp32AgriPod.firebaseapp.com",
//     databaseURL: "https://esp32AgriPod-default-rtdb.firebaseio.com",
//     projectId: "esp32AgriPod",
//     storageBucket: "esp32AgriPod.appspot.com",
//     messagingSenderId: "263555950590",
//     appId: "1:263555950590:web:07df4c56bdd5f504cbc2af",
//     measurementId: "G-1T50KHVWZP"
// };

// // Initialize Firebase
// initializeApp(firebaseConfig);

// const GraphComponent = (num: any) => {
//     let heartRate = [0, 0, 0];

//     console.log(num)
//     const [heartBeat, setHeartBeat] = useState()
//     const [chartData, setChartData] = useState({
//         series: [{
//             name: 'Desktops',
//             data: heartRate
//         }],
//         options: {
//             chart: {
//                 height: 100,
//                 type: 'line',
//                 zoom: {
//                     enabled: false
//                 }
//             },
//             dataLabels: {
//                 enabled: false
//             },
//             stroke: {
//                 curve: 'straight'
//             },
//             title: {
//                 text: 'Heartbeat',
//                 align: 'left'
//             },
//             grid: {
//                 row: {
//                     colors: ['#f3f3f3', 'transparent'],
//                     opacity: 0.5
//                 },
//             },
//             // xaxis: {
//             //     categories: [''],
//             // }
//         }
//     });


//     const getData = () => {

//         const database = getDatabase();
//         // Point to the root or a specific part of your database

//         const dataRef = ref(database);

//         onValue(dataRef, (snapshot) => {
//             const dbData = snapshot.val();
//             setHeartBeat(dbData.heartRate)
//             pushAndPop(dbData.heartRate)
//             addData()
//         }, {
//             onlyOnce: true
//         });
//     }

//     setInterval(() => {
//         getData()
//     }, 3000)


//     const addData = () => {
//         setChartData({
//             series: [{
//                 name: 'Desktops',
//                 data: heartRate
//             }],
//             options: chartData.options
//         });
//     };


//     function pushAndPop(element: any) {
//         heartRate.push(element);
//         if (heartRate.length > 5) {

//             heartRate.shift();
//         }else {
//             heartRate.push(0)
//         }
//         console.log(heartRate, "element", element)
//     }


//     return (
//         <div>
//             <div id="chart">
//                 <ReactApexChart options={chartData.options} series={chartData.series} type="line" height={350} />
//                 <p className=''>Heartbeat: {heartBeat}</p>
//             </div>
//             <div id="html-dist"></div>
//         </div>
//     );
// };

// export default GraphComponent;
