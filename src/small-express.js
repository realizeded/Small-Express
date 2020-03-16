const http = require('http');
class SmallExpress {
    constructor() {
     this.routes = {
         get:[],
         post:[],
         all:[]
     }
    }
    register(path) {
        const info = {};
        if(typeof path === 'string') {
            info.path = path;
            info.stack = [].slice.call(arguments,1);
        } else {
            info.path = "/";
            info.stack = [].slice.call(arguments);
        }
        return info;
    }
    get() {
        let info = this.register.apply(this,arguments);
        this.routes['get'].push(info);
    }
    post() {
        let info = this.register.apply(this,arguments);
        this.routes['post'].push(info);
    }
    use() {
        let info = this.register.apply(this,arguments);
        this.routes['all'].push(info);
    }
    match(path,method) {
           let stack = [];
           let routesArr = [].concat(this.routes[method]).concat(this.routes.all);
           routesArr.forEach(routeInfo=>{
           if(routeInfo.path.indexOf(path)===0) {
               stack = stack.concat(routeInfo.stack);
           }
          });
    return stack;
   }
   handle(stack,req,res) {
        function next(req,res,next) {
            let func = stack.shift();
            if(func) {
                func(req,res,next);
            }
        }
        next(req,res,next);
   }
    listen() {
         let serve = http.createServer((req,res)=>{
             res.json = function(data){
               res.setHeader('Content-Type','application/json');
               res.end(
                   JSON.stringify(data)
               );
             };
             let stack = this.match(req.url,req.method.toLowerCase());
             this.handle(stack,req,res);
         });

         serve.listen(...arguments);
    }
}
module.exports = ()=>{
  return new SmallExpress();
};