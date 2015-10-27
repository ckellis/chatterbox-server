var MessagesView = Backbone.View.extend({

  el: '.messagesContainer',
  // events : {"submit" : "onSubmit"},

  initialize: function() {
    var self = this;
    this.listenTo(this.collection,"add",this.render)
    $msgInput=$('input.message');
    $msgInput.keypress(function (e) {
      if (e.which == 13) {
        var val = $msgInput.val();
        e.preventDefault();
        console.log(val)
        self.onSubmit(e,val);
        $("input.message").val('');
        return false; 
      }
    });
    this.render();
  },

  onSubmit : function(e,msg) {
    console.log("qqq",msg)
    var newModel = {username:session.username, message:msg};
    this.collection.create(newModel,{
      wait : true,    // waits for server to respond with 200 before adding newly created model to collection
      success : function(resp){
        console.log('success callback');
        console.log(resp);
      },
      error : function(err) {
        console.log('error callback');
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
