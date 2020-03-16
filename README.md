# 模仿express实现的Small-Express
## 介绍
学习express中间件机制时 制作  

## 中间件机制
* 1 通过get post use接收中间件
* 2 通过method url 匹配出符合条件的中间件序列
* 1 next核心机制 调用next则跳到下一个匹配的中间件 核心机制就是每次调用next函数 都会取出第一个中间件(本质函数) 然后调用该函数 把req res next传递过去

## API
* 1 get  注册get路由中间件
* 2 use  注册路由中间件
* 3 post 注册post路由中间件
* 4 listen 启动http服务 监听端口

## 测试代码
```$xslt
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
```