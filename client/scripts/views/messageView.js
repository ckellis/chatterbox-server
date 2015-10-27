var MessageView = Backbone.View.extend({
  tagName:'li',
  className:"list-group-item userMessageItem",
  template:_.template('<span class="glyphicon glyphicon-user" aria-hidden="true" style="float:left;"></span><span style="background-color:#286090;float:left;"class="badge"> <%=  username %> </span> <%= message %>'),

  initialize: function() {
    //some stuff
  },

  render: function() {
    return this.$el.html(this.template(this.model.attributes));
  },

});
