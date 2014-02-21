

// Sample for handling the rendering

var emitter = new EventEmitter();
var api_url = 'https://api.github.com/';
function loadRepos(user){
	 emitter.on('data.repos', renderRepos);
	$.get(api_url+'users/'+user+'/repos',function(repos){
		console.log(repos);
		  emitter.emit('data.repos', repos);
		  repos.forEach(function(repo){
		    loadBranches(repo);
		    loadCollaborators(repo);
		  });
		  emitter.on('data.branches.*', renderBranches);
		  emitter.on('data.collaborators.*', renderCollaborators);
	},'jsonp');
}

function loadBranches(repo){
	$.get(repo.html_url+'/branches',function(branches){
		 emitter.emit('data.branches.'+repo.name, branches);
	},'jsonp');	
}

function loadCollaborators(repo){
	$.get(repo.html_url+'/collaborators',function(collaborators){
		 emitter.emit('data.collaborators.'+repo.name, collaborators);
	},'jsonp');	
}

// render repositories data
function renderRepos(data, type){ 
	data.forEach(function(repo){
		    list.push('<tr><td>'
		    	+'<a href="">'+repo.name+'</a>'
		    	+)
		  });
	$('#repos').html()
}

// render branches data
function renderBranches(data, type){ }

// render collaborators data
function renderCollaborators(data, type){ }

