var AppView = Backbone.View.extend({
  el: '#app',

  initialize: function() {
    // this.set('messages', new messagesView({collection: Messages}));
    // this.render();
  },

  render: function() {
    this.get('messages').render();
  }

});
