const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const saltRounds=10;


const userSchema=mongoose.Schema({
    name: {
        type: String,
        maxlength:50
    },
    email:{
        type:String,
        trim:true,
        unique:1
    },
    password:{
        type:String,
        minlength:5
    },
    lastname:{
        type:String,
        maxlength:50
    },
    role:{
        type:Number,
        default:0
    },
    image:String,
    token:{
        type:String
    },
    tokenExp:{ //토큰 유효기간
        type:Number
    }
})

//User 정보를 저장하기 전(user.save)에 무엇을 한다는 것 
userSchema.pre('save',function(next){
    var user=this;

    if (user.isModified('password')){ //field 중에 password가 변환될때만 비밀번호를 암호화 해준다.
         //비밀번호를 암호화 시키기
        bcrypt.genSalt(saltRounds,function(err,salt){
            if (err) return next(err);
            
            bcrypt.hash(user.password, salt, function(err,hash){
                if (err) return next(err);
                user.password = hash; //플레인 pw를 hash로 바꿔줌.
                next();
            })
        })
    } else {
        next();
    }
}) 

const User=mongoose.model('User',userSchema)

module.exports={User}