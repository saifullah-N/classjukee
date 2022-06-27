const mqtt = require('mqtt')
const express = require('express')
const app = express()
const http = require('http')
const cors = require('cors')
const _ = require('lodash')
const {
    Server
} = require('socket.io')

const firebase=require('firebase/compat/app')
const fdb = require('firebase/compat/database')
const { database } = require('firebase-admin')
//server creation
app.use(cors())
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});
const firebaseConfig = {
    apiKey: "AIzaSyC5q_GDLC4JHZDqXT3gntvk-bklp-K1s5Q",
    authDomain: "prithviautomation.firebaseapp.com",
    databaseURL: "https://prithviautomation-default-rtdb.firebaseio.com",
    projectId: "prithviautomation",
    storageBucket: "prithviautomation.appspot.com",
    messagingSenderId: "767180062288",
    appId: "1:767180062288:web:240c671d34021729e79b55",
    measurementId: "G-MXLSS4VF4D"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
// const analytics =  firebase.getAnalytics(firebaseApp);
const rtdb= firebase.database();
const host =  '10.1.75.125'//'182.72.162.13'
const port = '1883'//'2123'//'9900'
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`

const connectUrl = `mqtt://${host}:${port}`
// creating mqtt client
 const client= mqtt.connect(connectUrl, {
    clientId,
    clean: true,
    connectTimeout: 4000,
    username: 'iqube',
    password: 'iQube@2019',
    reconnectPeriod: 1000,
})

client.setMaxListeners(Infinity)
   var mArr=[]
io.on('connection',(socket)=>{   
    socket.on('macno', (num) => {
 mArr=[]
        for (let i = 0; i < num; i++) {
            mArr.push(`mach-${i+1}`)
        }
        console.log(mArr);
    })
})
class Data  {    
    
    constructor(machID){
        this.machID =machID;
        this.client = client;
        this.io=io;
        this.rtdb = rtdb;
        this._=_
    }

ChronJob(){
setInterval(()=>{
    this.day=new Date();
    if(this.day.getHours()+":"+this.day.getMinutes()+":"+this.day.getSeconds()=="24:00:0"){
        this.rtdb.ref(this.machID).remove()
        console.log("refresh")
    }


},1000);

}   

connection() {
  this.client.on("connect",()=>{
    console.log("connected");
})}
subscribeToPeices(){
    this.client.subscribe(`priv/${this.machID}/peices`)
}

subscribeToTime(){
    this.client.subscribe(`priv/${this.machID}/time`)
}

getPeices(){
    this.subscribeToPeices()
    this.client.on("message",(topic,payload)=>{ 
        //console.log("called");
        //  console.log(topic);
    if(topic==`priv/${this.machID}/peices`)
            this.peices = payload.toString()
            //   this.time=payload.toString()
        })
     //   this.client.unsubscribe(`priv/${this.machID}/peices`, console.log("unsubsribe"))
        }
        getTime() {
       this.subscribeToTime()   
            this.client.on("message", (topic, payload) => {
              //  console.log("called");
                //  console.log(topic);
                if (topic == `priv/${this.machID}/time`)
              this.time = payload.toString()
              
            })
        
        
      //  this.client.unsubscribe(`priv/${this.machID}/peices`, console.log("unsubsribe"))
    }
    // getData(){
    //     this.connection()
    //     this.getTime()
    //     return ({machID:this.machID,time:this.time ,peices:this.peices})
    // }
    
    // Get a database reference to our posts
    
    
    async getReport() {
    // Get a database reference to our posts
        this.data = 0
        this.report=[]
        this.peicesNow=0
    const snapshot = await this.rtdb.ref(this.machID).once('value')
    if (snapshot.length > 0) {
    var obj = this
    var time=["8:00","8:30", "9:00","9:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30","19:30","20:00","20:30"]
             time.map(function(timebro){                 
                Object.values(snapshot.val()).map((value) => {
                    if (value.timestamp == timebro) {
                        if(value.peices!=0){
                        obj.data =  value.peices;
                         obj.peicesNow = obj.data - obj.peicesNow;
                         obj.report.push(obj.peicesNow); 
                        }
                        else{ 
                            obj.report.push(0)
                        }

                    }
                } )

        })        
        console.log(this.report);  } 
        }
            

    // async getReport(){
    //     this.peicesNow=0
    //     var  obj=this
    //     const snapshot = await this.rtdb.ref(this.machID)
    //     var time=["8:00","8:30", "9:00","9:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30","19:30","20:00"]
    //     time.map(
    //         async function(time){                 
    //             Object.values(snapshot.val()).map((value) => {
    //                 if (value.timestamp == timebro) {
    //                     obj.data =  value.peices;
    //                     // console.log(obj.peicesNow)
    //                 }
    //             } )
    //             obj.peicesNow = obj.data - obj.peicesNow;
    //             obj.report.push(obj.peicesNow);  
    //             //     this.getPeices()
    //     }    
    //     )
    //     console.log(obj.report)
    // }   
    
    
    
        PassReacordToReact() {
            this.getReport()
            this.io.on('connection', (socket) => {
                    socket.emit("getRecord" + this.machID, this.report); 
                socket.on(`subscribeToRecord+${this.machID}`, (interval) => {
                    //console.log('client is subscribing to timer with interval ', interval);         
                })       
                   
                });
            }        
            
         storeRecord() {
      setInterval(()=>{
     this.getPeices()
     this.newTime = new Date()
     this.timeZero = this.newTime.getHours() + ":00:0"
     this.timeThirty = this.newTime.getHours() + ":30:0"
    if ((this.newTime.getHours() + ":" + this.newTime.getMinutes() + ":" + this.newTime.getSeconds()) == this.timeZero || (this.newTime.getHours() + ":" + this.newTime.getMinutes() + ":" + this.newTime.getSeconds()) == this.timeThirty) {
        if (this.peices != null && this.peices != undefined)
       {
             this.rtdb.ref(this.machID).push({
                 peices: parseInt(this.peices),
                 timestamp: this.newTime.getHours() + ":" + this.newTime.getMinutes()

             })}
         else
          {
            this.rtdb.ref(this.machID).push({
             peices: 0,
             timestamp:this.newTime.getHours() + ":" + this.newTime.getMinutes()
         })}
         //formatTime(timestrToSec(this.timeCheck) + timestrToSec("00:30:00"));
     }
 },1000)



    }



    // dummyPusher(){
    //     this.rtdb.ref().push({
    //         peices: 0,
    //        // timestamp: this.newTime.getHours() + ":" + this.newTime.getMinutes()
    //     })
    // }
    
    emmiter(){
       this.io.on('connection', (socket) => {
            socket.on(`subscribeToTimer+${this.machID}`, (interval) => {
                //console.log('client is subscribing to timer with interval ', interval);
                setInterval(() => {
                    this.getPeices()
                    this.getTime()
                    socket.emit(this.machID, this.peices, this.time);
                //    console.log(this.machID, this.peices);
                   // console.log('func:'+this.getPeices());
                }, interval);
            });
        })   

    }
   
}

const m1 = new Data('mach-1')
const m2= new Data('mach-2')
const m3 = new Data('mach-3')
const m4 = new Data('mach-4')
const m5 = new Data('mach-5')
const m6 = new Data('mach-6')

m1.emmiter()
m2.emmiter()
m3.emmiter()
m4.emmiter()
m5.emmiter()
m6.emmiter()
m1.storeRecord()
m2.storeRecord()
m3.storeRecord()
m4.storeRecord()
m5.storeRecord()
m6.storeRecord()
m2.getReport()
m3.getReport()
m4.getReport()  
m5.getReport()
m6.getReport()


m1.PassReacordToReact()
m2.PassReacordToReact()
m3.PassReacordToReact()
m4.PassReacordToReact()
m5.PassReacordToReact()
m6.PassReacordToReact()

m1.ChronJob()
m2.ChronJob()
m3.ChronJob()
m4.ChronJob()
m5.ChronJob()
m6.ChronJob()

// m6.storeRecord()
// newTime=new Date()
// timeZero=newTime.getHours() + ":00:0" 
// timeThirty=newTime.getHours() + ":04:0"    
// console.log((newTime.getHours() + ":" + newTime.getMinutes() + ":" + newTime.getSeconds()) == timeZero || (newTime.getHours() + ":" + newTime.getMinutes() + ":" + newTime.getSeconds()) == timeThirty);
// m1.dummyPusher()

// console.log(m1.getAtTime("19:48"))
// console.log(x);
// setTimeout(()=>{
//  console.log(m1.data)   
// },10000)

// m1.getAtTime("18:15")
// x.connection()
// y.connection()
// x.emmiter()
// y.emmiter()
// setInterval(() => {
// // x.getPeices()
// //     console.log(x.peices)
// x.getTime()
// console.log(x.time);
// }, 1000);
//  setInterval(()=> {
//     x.getPeices()
//     console.log(x.peices);
//     x.getTime()
//     console.log(x.time);
// },1000)

//  //ClassArray
//  var classArray =[]
//  //class creation
// marry.forEach((mid)=>{
//     classArray.push(new Data(mid))
// })     

// console.table(classArray)
// console.log(classArray[0].getData())
server.listen(8080, () => {
    console.log("done dude")
})

/**
         
  async getAtTime(attime) {
    // Get a database reference to our posts
    
     const snapshot = await this.rtdb.ref(this.machID).once('value')

                    Object.values(snapshot.val()).map((value) => {
                        if (value.timestamp == attime) {

                            this.data = value.peices;
                   }
                   else this.data = 0 ;    
                     }
                      ) 
      return  this.data;
        }
        
        */
// if (time==timevar) {
//     

//     });

// }
