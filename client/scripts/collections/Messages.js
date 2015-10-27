var Messages = Backbone.Collection.extend({

  model: Message,

  url:"http://localhost:3000/test.json",

  initialize: function() {
    this.listenTo(this,"add",this.checkSize)
    // body...
  },
  checkSize:function(){
    if(this.length >= 15){
      var shifted = this.shift();
    }
  }


  
});