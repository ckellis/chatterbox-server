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
    return redisClient.lrange("messages",0,10,cb)
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
    console.log("USER CHECK USERNAME: ",userName)
    redisClient.sismember("users",userName,function(e,d){
      console.log("IN USERCHEKKKKK",e,d)
      if(d !== 1 || e){
        return false;
      }else{
        return true;
      }
    });
  },

  newUser:function(newUserObj){
  // newUser:function(userName,password,password2){
    if(newUserObj.pwd2 !== newUserObj.pwd1){
      return {type:"danger",msg:"Passwords did not match"}
    }
    if(this._userCheck(newUserObj.username)){
      return {type:"danger",msg:"Username already exists"};
    }else{
      redisClient.sadd("users",newUserObj.userName,"password", newUserObj.password)
      redisClient.sadd("sessions",newUserObj.userName)
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
    console.log("qqqq",userObj.username)
    console.log("USER CHECK IN LOGIN !!! ",this._userCheck(userObj.username))
    if(this._userCheck(userObj.username)){
      var pwdTest = redisClient.hmget(userObj.username,"password")
      if(password===pwdTest){
        if(redisClient.sismember("sessions",userObj.username)){
          return {type:"danger",msg:"User Already logged in..."}
        }else{
          redisClient.sadd("sessions",userObj.username);
          return {type:"sucess",msg:"User logged in Succesfully"};
        }
      }else{
        return {type:"danger",msg:"Passwords did not match"}
      }
    }else{
      return {type:"danger",msg:"User does not exist"}
    }
  },

  logout:function(){
    if(redisClient.sismember("sessions",userName)){
      redisClient.srem("sessions",userName)
      return {type:"success",msg:"User logged out Succesfully"} 
    }else{
      return {type:"danger",msg:"User was not logged in"}
    }
  }

 }