var MessagesView = Backbone.View.extend({

  el: '.messagesContainer',
  // events : {"submit" : "onSubmit"},

  initialize: function() {
    var self = this;
    this.listenTo(this.collection,"add",this.render)
    $('input.message').keypress(function (e) {
      if (e.which == 13) {
        e.preventDefault();
        self.onSubmit(e,$("input.message").val());
        $("input.message").val('');
        return false;    //<---- Add this line
      }
    });
    this.render();
  },

  onSubmit : function(e,msg) {
    console.log("ON SUBMIT initialized:",{username:session.username, message:msg});
    
    var newModel = {username:session.username, message:$("input.message").val()};

    this.collection.create(newModel,{
    // this.collection.create({username:session.username, message:$("input.message").val()},{

      wait : true,    // waits for server to respond with 200 before adding newly created model to collection

      success : function(resp){
          console.log('success callback');
          console.log(resp);
      },
      error : function(err) {
          console.log('error callback');
          // this error message for dev only
          console.log(err);
      }
    });
  },

  render: function() {

    this.collection.models.map(function(messageObj){

      this.$el.append(new MessageView({model:messageObj}).render());

    },this);
  }

});



// events : {"submit" : "onSubmit"},
// onSubmit : function(e) {
//   e.preventDefault();
//   this.model.save({name: this.$("#name").val()}, {
//     success : function (newModel) { /* Do something here. */ }
//   });
// }