//backend의 시작점

const express=require('express')
const app=express()
const port=3000
const mongoose=require('mongoose')

mongoose.connect('mongodb+srv://jhlee:abcd1234@cluster0.wdcxgbu.mongodb.net/?retryWrites=true&w=majority',{
    useNewUrlParser:true,useUnifiedTopology:true
}).then(()=>console.log('MongoDB Connected...'))
.catch(err=>console.log(err))


app.get('/',(req,res)=>res.send('Hello World'))

app.listen(port,()=>console.log(`앱 실행 시작 ${port}`))