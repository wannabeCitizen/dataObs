/*
* JS file for environment_item.html
*/

Template.environmentItem.events({
  'click #enter-class': function(e) {
     e.preventDefault();
     Router.go('observationList', {_envId:this._id});
  },
  'click #edit-class-params': function(e) {
     e.preventDefault();
     Router.go('editSubjectParameters', {_envId:this._id});
  }
  });

Template.environmentItem.events({
   'click #env-delete': function(e) {
     var result = confirm("Deleting an environment will also delete all observation, subject, and sequence data. Press 'OK' to continue.");
     var envId = this._id
    if (result) {
      Meteor.call('environmentDelete', envId, function(error, result) {
        return 0;
      });
    }
  }
 });

 Template.environmentItem.helpers({
  //shim function until database is clean
  trackModified: function () {
    if (this.lastModified) {
      return true;
    }
  },
   needsSubjects: function() {
     var obj = Subjects.find({envId: this._id}).fetch();
     return $.isEmptyObject(obj)?"pulser":"";
   }
 });
