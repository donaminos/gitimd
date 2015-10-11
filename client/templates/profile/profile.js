Template.profile.rendered = function() {
    $('[name=keywords]').select2({
        tags: true,
        tokenSeparators: [",", " "],
    });
};

AutoForm.addHooks(['editUserProfile'],{
    onSuccess: function () {
        Meteor.setTimeout(function (){
            $('[name=keywords]').select2({
                tags: true,
                tokenSeparators: [",", " "],
            });
        },500);
    }
});

Template.profile.helpers({
    usersCollection: Meteor.users,
    currentUser: function () {
	return Meteor.user();
    },
    s2Opts: function () {
        var arr=[];
        var res=Meteor.user();
        if (res && res.keywords)
            res.keywords.forEach(function (el) {
		var obj={label: el, value: el};
		arr.push(obj);
            });
	return arr;
    }    
});
 
Template.profile.events({
    'click .addTeam': function () {
	//create team
	var name=$('.newTeamName').val();
	if (name && (name.length>0)) {
	    Teams.insert({name:name, members:[{id:Meteor.userId(),status:'creator'}]}, function (e,r){
		if (!e)
		    //route to team edit
		    Router.go('/teams/'+r);
	    });
	} else {
	    $(".err").text("New team name can't be empty!");
	};
    }
});
