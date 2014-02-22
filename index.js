

// Sample for handling the rendering

var emitter = new EventEmitter();

var normalize = function(str){return str.replace('_','.');};
var api_url = 'https://api.github.com/';
function loadRepos(user){
	 emitter.on('data.repos', renderRepos);
	$.get(api_url+'users/'+user+'/repos',function(repos){
		if(typeof repos.data.forEach ==='undefined'){
			alert(!!repos.data.message ? repos.data.message : '?' );
			return false;
		}
		  emitter.emit('data.repos', repos.data);
		  repos.data.forEach(function(repo){
		    loadBranches(repo);
		    loadCollaborators(repo);
		  });
		  emitter.on('data.branches.*', renderBranches);
		  emitter.on('data.collaborators.*', renderCollaborators);
	},'jsonp');
}

function loadBranches(repo){
	$.get(repo.url+'/branches',function(branches){
		 emitter.emit('data.branches.'+repo.name, branches.data);
	},'jsonp');	
}

function loadCollaborators(repo){
	$.get(repo.url+'/collaborators',function(collaborators){
		 emitter.emit('data.collaborators.'+repo.name, collaborators.data);
	},'jsonp');	
}

// render repositories data
function renderRepos(type,data){ 
	var list =[];
	data.forEach(function(repo){
		
		    list.push('<tr><td>'
		    	+'<a href="#">'+repo.name+'</a>'
		    	+'<span id="data_branches_'+repo.name+'"></span>'
		    	+'</td><td id="data_collaborators_'+repo.name+'">'
		    	+'</td><td>'+repo.created
		    	+'</td></tr>');
		  });
	console.log($('tbody','#'+normalize(type)),list);
	$('tbody','#'+normalize(type)).html(list.join());
}

// render branches data
function renderBranches(type,data){ 
	console.log('renderBranches',type,data);
	var list =[];
	data.forEach(function(branch){
		list.push(branch.name);
	});
	$('#'+normalize(type)).html('('+list.join(',')+')');
}

// render collaborators data
function renderCollaborators(type,data){ 
	console.log('renderCollaborators',type,data);
	
	var list =[];
	data.forEach(function(collaborator){
		list.push('<a href="#">'+collaborator.name+'</a>');
	});
	$('#'+normalize(type)).html(list.join(','));
}

$(document).ready(function(){
	$('input[type="submit"]').on('click',function(e){
		e.preventDefault();
		var user = $('input#github').val();
		loadRepos(user);
	})
});

