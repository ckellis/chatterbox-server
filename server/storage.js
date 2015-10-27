 var redisClient = require('redis-js');

 module.exports = {

  initialize:function(){
    redisClient.sadd("users",function(e,d){
      console.log(e,d);
    });
    redisClient.lpush("messages",{username:"Cheyyyyennnne",message:"Some arbi message"},function(e,d){
      console.log(e,d);
    });
    redisClient.sadd("sessions",function(e,d){
      console.log(e,d);
    });


//==============================================TEST DATAAAA

    redisClient.lpush("messages",{username:"Cheyyyyennnne",message:"Some arbi message"},function(e,d){
      console.log(e,d);
    });
    redisClient.lpush("messages",{username:"Cheyyyyennnne",message:"Some arbi message"},function(e,d){
      console.log(e,d);
    });
    redisClient.lpush("messages",{username:"Cheyyyyennnne",message:"Some arbi message"},function(e,d){
      console.log(e,d);
    });
    redisClient.lpush("messages",{username:"Cheyyyyennnne",message:"Some arbi message"},function(e,d){
      console.log(e,d);
    });


  },

  lastTenMessages:function(cb){
    console.log("MESSAGE IN MODULES BEING CALLLLLED",redisClient.lrange("messages",0,10,cb))
    return redisClient.lrange("messages",0,10,cb)
  },
  
  newMessage:function(messageObj){
    redisClient.lpush("messages",messageObj,function(e,d){
      if(e === null){
        return "User Added Succesfully";
      }else{
        return e;
      }
    })
  },

  userCheck:function(userName){
    redisClient.sismember("users",userName,function(e,d){
      if(d !== 1 || e){
        return false;
      }else{
        return true;
      }
    });
  },

  newUser:function(userName,password){
    if(this.userCheck(userName)){
      return "User Already Exists..."
    }else{
      this.sadd(userName,"password",password)
    }

  },

  users:function(){
    return redisClient.smembers("users",function(e,d){
      if(e===null){
        return d;
      }else{
        return e;
      }
    });
  },

  login:function(userName,password){
    var pwdTest = redisClient.hmget(userName,password)
    if(password===pwdTest){
      if(redisClient.sismember("sessions",userName)){
        return "User Already logged in..."
      }else{
        return redisClient.sadd("sessions",userName);
      }
    }
  },

  logout:function(){
    if(redisClient.sismember("sessions",userName)){
      return redisClient.srem("sessions",userName)
    }else{
      return "User was not logged in..."
    }
  }

 }