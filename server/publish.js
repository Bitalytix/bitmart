Meteor.publish('markers', function() {
  return Markers.find();
});
//
//Meteor.publish('privateLists', function() {
//  if (this.userId) {
//    return Lists.find({userId: this.userId});
//  } else {
//    this.ready();
//  }
//});
//
//Meteor.publish('todos', function(listId) {
//  check(listId, String);
//
//  return Todos.find({listId: listId});
//});

//Meteor.publish('posts', function() {
//    return Posts.find();
//});
