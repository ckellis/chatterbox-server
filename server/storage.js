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
    redisClient.lpush("messages",{username:"Cheyyyyennnne",message:"Some arbi message"},function(e,d){
      console.log(e,d);
    });
    redisClient.lpush("messages",{username:"Cheyyyyennnne",message:"Some arbi message"},function(e,d){
      console.log(e,d);
    });
    

  },

  lastTenMessages:function(cb){
    return redisClient.lrange("messages",0,10,cb).reverse();
  },

  newMessage:function(messageObj){
    redisClient.lpush("messages",messageObj,function(e,d){
      if(e === null){
        return {msg:"User Added Succesfully"};
      }else{
        return e;
      }
    });
  },

  _userCheck:function(userName){

    return redisClient.sismember("users",userName);
  },

  newUser:function(newUserObj){
    if(newUserObj.pwd2 !== newUserObj.pwd1){
      return {type:"danger",msg:"Passwords did not match"}
    }
    if(this._userCheck(newUserObj.username)){
      return {type:"danger",msg:"Username already exists"};
    }else{

      redisClient.sadd("users",newUserObj.username) //add user to registered users
      redisClient.hmset(newUserObj.username,"password", newUserObj.pwd1) //setup user hash containing pwd
      redisClient.sadd("sessions",newUserObj.username) //log user in.
      return {type:"success",msg:"User Succesfully Created"}
    }
  },

  users:function(){
    return redisClient.smembers("users",function(e,d){
      if(e===null){
        return d;
      }else{
        return {type:"danger",msg:"Something went wrong retreiving the users collection..."};
      }
    });
  },

  login:function(userObj){

    if(this._userCheck(userObj.username)){
      var pwdTest = redisClient.hvals(userObj.username)[0]
      if(userObj.pwd===pwdTest){
        if(redisClient.sismember("sessions",userObj.username)){
          return {type:"danger",msg:"User Already logged in..."}
        }else{
          redisClient.sadd("sessions",userObj.username);
          return {type:"success",msg:"User logged in Succesfully"};
        }
      }else{
        return {type:"danger",msg:"Passwords did not match"}
      }
    }else{
      return {type:"danger",msg:"User does not exist"}
    }
  },

  logout:function(userObj){
    if(redisClient.sismember("sessions",userObj.username)){
      redisClient.srem("sessions",userObj.username);
      return {type:"success",msg:"User logged out Succesfully"} 
    }else{
      return {type:"danger",msg:"User was not logged in"}
    }
  }

 }