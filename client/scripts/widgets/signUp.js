$(document).ready(function(){

  window.session = {username:undefined};
  var signupToggle = new SignUpWidget();

  function initializeSuccess(e){
    window.initialObjs = e.map(function(userObj){
      return new Message({username: userObj.username,message:userObj.message})
    });
    window.MessagesCol = new Messages(window.initialObjs);
    window.MessagesView = new MessagesView({collection: window.MessagesCol});
  };

  function signInSuccess(obj){
    displayMessage(obj);
    signupToggle.signInSuccess()
  };

  function signOutSuccess(obj){
    displayMessage(obj);
    window.session.username = undefined;
    signupToggle.reset();
  };

  function ajaxCall(obj,cb,url,type){
    $.ajax({
      url:url,//mandatory? might want a default.
      type: type || "GET",
      headers: {"datatype": "JSON"},
      crossDomain: true,
      data: (obj ? JSON.stringify(obj) : ""),
      success:function(e){
        window.session.username = (obj ? obj.username : window.session.username);
        cb(JSON.parse(e));
      },
      error:function(e){
        displayMessage(JSON.parse(e.responseText));
      }
    });
  };

  ajaxCall(null, initializeSuccess,"http://localhost:3000/initial.json");

  function signUp(signUpObj){
    ajaxCall(signUpObj,signInSuccess,"http://localhost:3000/signup","POST"); 
  };

  function login(signUpObj){
    ajaxCall(signUpObj,signInSuccess,"http://localhost:3000/signin","POST");
  };

  function logOut(){
    ajaxCall(window.session,signOutSuccess,"http://localhost:3000/signout","POST");
  };


  function signupChk(signin){
   if(signin){
     var username = $(".usernameSignIn").val();
     var pwd = $(".passwordSignIn").val();
     if(username === "" || pwd === ""){
       displayMessage({type:"danger",msg:"Missing necessary fields"});
       return false;
     }else{
       return {username:username,pwd:pwd};
     }
   }else{
     var username = $(".usernameSignUp").val();
     var pwdInitial = $(".passwordSignUp").val();
     var pwdConfirmation = $(".passwordConfirm").val();
     if(username === "" || pwdConfirmation === "" || pwdInitial ===""){
       displayMessage({type:"danger",msg:"Missing necessary fields"});
       return false;
     }
     if(pwdConfirmation !== pwdInitial){
       displayMessage({type:"danger",msg:"Passwords do not match"});
       return false;
     }else{
       return {username:username,pwd1:pwdInitial,pwd2:pwdConfirmation};
     }
   }
  }


  function displayMessage(e){
    $newDiv = $('<div class="alert alert-'+ e.type +'" role="alert"> \
                  <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> \
                  <span class="sr-only">'+ e.type +':</span>'
                  + e.msg + 
                '</div>');
    $(".leftCol").append($newDiv);
    $newDiv.fadeOut(3000);
  }


  function SignUpWidget(){
    this.mode = true;
    this.$userSignUp = $( ".usersignup" );
    this.$userLogin = $( ".userlogin" );
    this.$signupBtn = $( ".signup" );
    this.$signinBtn = $( ".signin" );
    this.$userinfo = $(".userinfo");
    this.$usernameDisplay = $(".usernameDisplay");
    this.$logoutBtn = $('.logout').on('click',function(e){
                          logOut();
                        });
    this.$sessionBtns = $(".sessionBtns");


    this.signInSuccess = function(){
      console.log("in the obj")
      this.$usernameDisplay.html(window.session.username);
      this.$userSignUp.hide( "blind", function() {
        // Animation complete.
      });
      this.$userLogin.hide( "blind", function() {
        // Animation complete.
      });
      this.$sessionBtns.hide("blind",function(){

      });
      this.$usernameDisplay.show("blind",function(){
      });

      this.$logoutBtn.show("blind",function(){
        // other stuff
      });

    },

    this.reset = function(){
      this.$logoutBtn.hide("blind",function(){
        // other stuff
      });
      this.$usernameDisplay.hide("blind",function(){

      });
      this.$userLogin.show( "blind", function() {
        // Animation complete.
      }); 
      this.$sessionBtns.show("blind",function(){

      });
    },

    this.toggle = function(){
      if(this.mode){
        this.mode = !this.mode;
        this.$userSignUp.show( "blind", function() {
          // Animation complete.
        });
        this.$userLogin.hide("blind", function() {
          // Animation complete.
        });          
      }else{
        this.mode = !this.mode;
        this.$userSignUp.hide( "blind", function() {
          // Animation complete.
        });
        this.$userLogin.show( "blind", function() {
          // Animation complete.
        }); 
      }          
    }
    this.$signupBtn.click(function() {
      if(!this.mode){
        var signUpObj = signupChk(false) //can be false, or an obj containing the credentials.
        if(signUpObj){ //toggles signup or singin mode for the check fxn
          signUp(signUpObj);
        }
      }else{
        this.toggle();  
      }       
    }.bind(this));

    this.$signinBtn.click(function() {
      if(this.mode){
        var signUpObj = signupChk(true) //can be false, or an obj containing the credentials.
        if(signUpObj){ //toggles signup or singin mode for the check fxn
          login(signUpObj);
        }
      }else{
        this.toggle();  
      }     
    }.bind(this));
  };

});
