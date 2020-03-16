const smallExpress = require('../src/small-express');
const app = smallExpress();
app.use(function(req,res,next) {
    console.log(1);
    next();
});
app.get('/info',function(req,res,next){
    console.log('info');
    res.json({
        data:'smallExpress'
    })
});
app.listen(1234,err=>{
   if(err) throw err;
   console.log('1234---port----open');
});