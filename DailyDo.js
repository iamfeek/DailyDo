ConsistentDB = new Mongo.Collection("itemList");



if (Meteor.isClient) {
  Template.body.helpers({
    itemList: function(){
      return ConsistentDB.find();
    },
    countItem: function(){
      return ConsistentDB.find().count();

    },
    countDone: function(){
      return ConsistentDB.find({checked: true}).count();
    },
    getDonePrecentage: function(){
      var getDonePrecentage = (ConsistentDB.find({checked: true}).count() / ConsistentDB.find().count()) * 100
      return getDonePrecentage;
    }
  });

  Template.body.events({
    'submit .addItem': function (event) {
        var addItem = event.target.addItem.value;
        ConsistentDB.insert({
          item: addItem,
          dateCreated: new Date()
        });
        event.target.addItem.value = "";
        return false;     
    }
  });

  Template.items.events({
    'click .delete': function(){
      ConsistentDB.remove(this._id);
    },
    'click .toggle-check': function(){
      ConsistentDB.update(this._id, {$set: {checked: !this.checked, dateCreated: new Date()}})
    }
  })


}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}


