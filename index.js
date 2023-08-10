//backend의 시작점

const express=require('express');
const app=express();
const port=3000;
//const bodyParser=require('body-parser'); express 4.x 버전 이후로는 bodyParser가 내장되어 있어서 따로 설치 안해도 OK.
const config=require('./config/key');
const { User } = require('./models/User');


app.use(express.json());
//application/x-www-form-urlencodeed (이렇게 된 데이터를 분석해서 가져올 수 있게 해줌)
app.use(express.urlencoded({extended:true})); 
//application/json


const mongoose=require('mongoose');

mongoose.connect(config.mongoURI,{
    useNewUrlParser:true,useUnifiedTopology:true
}).then(()=>console.log('MongoDB Connected...'))
.catch(err=>console.log(err))


app.get('/',(req,res)=>res.send('Hello World! nodemon적용!'))

app.post('/register',async (req, res)=> {
    //회원 가입 할때 필요한 정보들을 client에서 가져오면
    //그것들을 DB에 넣어준다.

    //body parser를 통해 body에 담긴 정보를 가져온다
    const user=new User(req.body)

    //mongoDB 메서드, user모델에 저장
    const result = await user.save().then(()=>{
        res.status(200).json({
        success: true
        })
    }).catch((err)=>{
        res.json({ success: false, err })
    })



    // Mongoose6부터 callback 문법이 사용되지 않아 코드 오류남
    // user.save((err,userInfo)=>{
    //     if(err) return res.json({success:false, err})
    //     return res.status(200).json({
    //         success:true
    //     })

    // }) 

})



app.listen(port,()=>console.log(`앱 실행 시작 ${port}`))