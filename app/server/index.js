const mqtt = require('mqtt')
const express = require('express')
const jwt = require('jsonwebtoken')
const app = express()
const http = require('http')
const cors = require('cors')
const _ = require('lodash')
const dotenv = require('dotenv')
dotenv.config()
const {
    Server
} = require('socket.io')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
//server creation
app.use(cors())
app.use(express.json());
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});


//mqtt configurations
const host =  '10.1.75.125'//'182.72.162.13'
const port = '2123'//'2123'//'9900'
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
    
    constructor(machID,db){
        this.machID =machID;
        this.client = client;
        this.io=io;
        this.db=db;
    }

ChronJob(){
setInterval(async ()=>{
    this.day=new Date();
    if(this.day.getHours()+":"+this.day.getMinutes()+":"+this.day.getSeconds()=="24:00:0"){
        await this.db.deleteMany({})
        console.log("refresh")
    }


},1000);

}   

connection() {
  this.client.on("connect",()=>{
    console.log("connected");
})}
subscribeTopieces(){
    this.client.subscribe(`priv/${this.machID}/pieces`)
}

subscribeToTime(){
    this.client.subscribe(`priv/${this.machID}/time`)
}

getpieces(){
    this.subscribeTopieces()
    this.client.on("message",(topic,payload)=>{ 
        //console.log("called");
        //  console.log(topic);
    if(topic==`priv/${this.machID}/pieces`)
            this.pieces = payload.toString()
            //   this.time=payload.toString()
        })
     //   this.client.unsubscribe(`priv/${this.machID}/pieces`, console.log("unsubsribe"))
        }
        getTime() {
       this.subscribeToTime()   
            this.client.on("message", (topic, payload) => {
              //  console.log("called");
                //  console.log(topic);
                if (topic == `priv/${this.machID}/time`)
              this.time = payload.toString()
              
            })
        
        
      //  this.client.unsubscribe(`priv/${this.machID}/pieces`, console.log("unsubsribe"))
    }
    
    async getReport() {
    // Get a database reference to our posts
        this.data = 0
        this.report=[]
        this.piecesNow=0
          const snapshot = await this.db.findMany({
            })
            console.log(snapshot)       
    if (snapshot.length > 0) {
    var obj = this
    var time=["8:00","8:30", "9:00","9:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30","19:30","20:00","20:30"]
             
    time.map(function(timebro){                 
                snapshot.map((value) => {
                    if (new Date(value.createdAt).getHours().toLocaleString("en-US", { timeZone: 'Asia/Kolkata' }) + ":" + new Date(value.createdAt).getMinutes().toLocaleString("en-US", { timeZone: 'Asia/Kolkata' }) == timebro) {
                        if(value.pieces!=0){
                        obj.data =  value.pieces;
                         obj.piecesNow = obj.data - obj.piecesNow;
                         obj.report.push(obj.piecesNow); 
                        }
                        else{ 
                            obj.report.push(0)
                        }

                    }
                } )

        })        
        console.log(this.report);  
    } 
        }
            

   
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
     this.getpieces()
     this.newTime = new Date()
     this.timeZero = this.newTime.getHours() + ":00:0"
     this.timeThirty = this.newTime.getHours() + ":30:0"
    if ((this.newTime.getHours() + ":" + this.newTime.getMinutes() + ":" + this.newTime.getSeconds()) == this.timeZero || (this.newTime.getHours() + ":" + this.newTime.getMinutes() + ":" + this.newTime.getSeconds()) == this.timeThirty) {
        if (this.pieces != null && this.pieces != undefined)
       { 
            this.db.create({data :{pieces: this.pieces}}).then(async () => {
                await prisma.$disconnect()
            })
                .catch(async (e) => {
                    console.error(e)
                    await prisma.$disconnect()
                    process.exit(1)
                })
            }
         else
          {
            this.db.create({ data:{pieces:0} }).then(async () => {
                await prisma.$disconnect()
            })
                .catch(async (e) => {
                    console.error(e)
                    await prisma.$disconnect()
                    process.exit(1)
                })
}
         //formatTime(timestrToSec(this.timeCheck) + timestrToSec("00:30:00"));
     }
 },1000)



    }

    // dummyPusher(){
    //     this.rtdb.ref().push({
    //         pieces: 0,
    //        // timestamp: this.newTime.getHours() + ":" + this.newTime.geapp/server/index.jsztMinutes()
    //     })
    // }s
    
    emmitpieces(){
       this.io.on('connection', (socket) => {
            socket.on(`subscribeTopieces+${this.machID}`, (interval) => {
                setInterval(() => {
                    this.getpieces()
                    socket.emit(this.machID+"pieces", this.pieces);
                //    console.log(this.machID, this.pieces);
                   // console.log('func:'+this.getpieces());
                }, interval);
            });
        })   

    }
    emmitTime() {
        this.io.on('connection', (socket) => {
            socket.on(`subscribeToTime+${this.machID}`, (interval) => {
                //console.log('client is subscribing to timer with interval ', interval);
                setInterval(() => {
                    this.getTime()
                    socket.emit(this.machID+"time",this.time);
                    //    console.log(this.machID, this.pieces);
                    // console.log('func:'+this.getpieces());
                }, interval);
            });
        })

    }
   
}

const m1 = new Data('mach-1',prisma.mach1)
const m2= new Data('mach-2',prisma.mach2)
const m3 = new Data('mach-3',prisma.mach3)
const m4 = new Data('mach-4',prisma.mach4)
const m5 = new Data('mach-5',prisma.mach5)
const m6 = new Data('mach-6',prisma.mach6)
 
m1.emmitTime()
m2.emmitTime()
m3.emmitTime()
m4.emmitTime()
m5.emmitTime()
m6.emmitTime()
m1.emmitpieces()
m2.emmitpieces()
m3.emmitpieces()
m4.emmitpieces()
m5.emmitpieces()
m6.emmitpieces()

m2.storeRecord()
m1.storeRecord()
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

server.listen(8080, () => {
    console.log("done dude")
})


//!write signup

//??RESPONSE HANDLERS
async function getDataOfUser(email){
let data =  await prisma.PrithviUser.findMany({
    where: {
        email:email,
    },

})
return data;
}


app.post('/signin', (req, res)=>{
    let userEmail = req.body.email;
    let password = req.body.password;
    console.log({userEmail,password})
    getDataOfUser(userEmail).then((data)=>{
   data = data[0]
    if(data !== undefined && password ==data.password){
        let id = data.id
        jwt.sign({ id },"iQube@2k22",{expiresIn:"5h"},(err,token)=>{
            res.json({
            auth:true,
            token:token
        })} );
    }

    else res.json({auth:false})
    })
})
async function StoreUser(email,password) {
    await prisma.PrithviUser.create({
        data: {
            email:email,
            password:password 

        },
    })

}
app.post('/signup', (req, res)=>{
    console.log(req.body)
 // console.log(req.email, req.password)
 StoreUser(req.body.email, req.body.password)
     .then(async () => {
         await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })


})
function verifyToken(req,res,next) {
    const bearerHeader = req.headers['x-access-token'];
    console.log(bearerHeader)
    if (typeof(bearerHeader)!=undefined){
        //    const bearer =bearerHeader.split(' ');
           const token = bearerHeader;
           req.token = token;
           next();
    }
    else{
        res.json({auth:false});
    }
}

app.get('/',verifyToken,(req,res)=>{
    if(req.token!=undefined && req.token != null)
    jwt.verify(req.token, "iQube@2k22",(err,authData)=>{
    if (err) res.json({auth:false});
    else{
        res.json({
           auth: true 
        })
    }
    
    })
    else res.json({auth:false});
})


//??################################ Prisma Expirimentals ###################################

async function main() {
//     const allUsers = await prisma.Mach1.findMany({
//         // include: {
//         //     posts: true,
//         //     profile: true,
//         // },
//     })
//     console.dir(allUsers, { depth: null })
//     allUsers.forEach(user => {
//         let x = new Date(user.createdAt).getHours().toLocaleString("en-US", { timeZone: 'Asia/Kolkata' }) +":"+ new Date(user.createdAt).getMinutes().toLocaleString("en-US", { timeZone: 'Asia/Kolkata' })
// console.log(x)});
    // await prisma.mach1.deleteMany({})

    // await prisma.mach2.deleteMany({})
    // await prisma.mach3.deleteMany({})
    // await prisma.mach4.deleteMany({})
    // await prisma.mach5.deleteMany({})
    // await prisma.mach6.deleteMany({})
 
}

// async function StoreRecord(){
//     await prisma.Mach1.create({
//         data: {
//             peices:"25"

//         },
//     })
// }
// StoreRecord()
//     .then(async () => {
//         await prisma.$disconnect()
//     })
//     .catch(async (e) => {
//         console.error(e)
//         await prisma.$disconnect()
//         process.exit(1)
//     })

// m1.peices = "25";
// m1.storeRecord()
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })