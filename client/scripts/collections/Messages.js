var Messages = Backbone.Collection.extend({

  model: Message,

  url:"http://localhost:3000/test.json",

  initialize: function() {
    // body...
  }


  
});