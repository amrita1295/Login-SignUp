const express=require('express')
const app=express()
const mongoose=require('mongoose')
const PORT=5000
const{MONGOURI}=require('./config/keys')

mongoose.connect(MONGOURI,{
    // useNewUrlParser:true,
    // useUnifiedTopology:true,
    // useFindandModify:false,
    // useCreateIndex:true
})
mongoose.connection.on('connected',()=>{
    console.log("Mongo connected:")
})
mongoose.connection.on('error',(err)=>{
    console.log("error connected:",err)
})
require('./models/roles')
app.use(express.json())
app.use(require('./routes/auth'))
app.listen(PORT,()=>{
    console.log("server is running on ", PORT)
})
