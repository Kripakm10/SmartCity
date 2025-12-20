var express=require('express');
var cors=require('cors');
var dotenv=require('dotenv');
dotenv.config();
var path = require('path')

const port=process.env.port
require('./connection');

const app = express();
app.use(express.json());
app.use(cors())

const userroute=require('./route/userroute')



app.use('/api',userroute)


app.use('/uploads',express.static(path.join(__dirname,"uploads")))

app.listen(port,()=>{
    console.log(`Server is up and running in ${port}`)
})
