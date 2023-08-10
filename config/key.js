//환경변수가 development / production 인지 판단
if (process.env.NODE_ENV==='production'){
    module.exports=require('./prod.js');
} else {
    module.exports=require('./dev.js');
}