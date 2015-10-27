var MessageView = Backbone.View.extend({

  template:_.template("<li> <%=  username %> :|: <%= message %> </li>"),

  initialize: function() {
    //some stuff
  },

  render: function() {
    return this.$el.html(this.template(this.model.attributes));
  }

});
