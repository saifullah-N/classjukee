const mqtt = require('mqtt')
const express = require('express')
const app = express()
const http = require('http')
const cors = require('cors')
const {
    Server
} = require('socket.io')
const { table, log } = require('console')
const firebase=require('firebase/compat/app')
const fdb = require('firebase/compat/database')
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
   var mArry=[]
io.on('connection',(socket)=>{   
    socket.on('macno', (num) => {
 mArry=[]
        for (let i = 0; i < num; i++) {
            mArry.push(`mach-${i+1}`)
        }
        console.log(mArry);
    })
})
class Data  {    
    
    constructor(machID){
    this.machID =machID;
    this.client = client;
    this.io=io;
    this.rtdb = rtdb;
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
    //     this.getPeices()
    //     this.getTime()
    //     return ({machID:this.machID,time:this.time ,peices:this.peices})
    // }

  async getAtTime(attime) {
    // Get a database reference to our posts
    
     this.ref = this.rtdb.ref(this.machID);

      this.dat= await this.ref.on('value', (snapshot) => {
          return snapshot.val();})

        Object.values(this.dat).forEach((value) => {
            if (value.time == attime) {
                console.log(value)
                console.log(value.peices);}
        })
        
    }
    emmiter(){
       this.io.on('connection', (socket) => {
            socket.on(`subscribeToTimer+${this.machID}`, (interval) => {
                //console.log('client is subscribing to timer with interval ', interval);
                setInterval(() => {
                    this.getPeices()
                    this.getTime()
                    if(this.peices!=null && this.peices!=undefined ){
                        this.timestamp = new Date()

                        this.rtdb.ref(this.machID).push({
                            
                           timestamp: this.timestamp.getHours() +":"+this.timestamp.getMinutes() , 
                            peices :this.peices});
                      
                    }

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
console.log(m1.getAtTime("19:48"))
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