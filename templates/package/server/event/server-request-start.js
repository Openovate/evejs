module.exports = function(request, response) {
	//if path does not starts with /{{name}}
	if((request.path !== '/{{name}}' 
	&& request.path.indexOf('/{{name}}/') !== 0)
	|| response.processing) {
		//do nothing
		return;
	}
	
	response.processing = '{{name}}';
	
	//trim the prefix
	var root 		= this.package('{{name}}').path('action'),
		path 		= request.path.replace('/{{name}}', ''),
		buffer 		= path.split('/'),
		action 		= root + '/index',
		variables 	= [];
	
	//traverse backwards to determine the correct action
	while(buffer.length > 1) {
		//if this is an actual file
		if(this.File(root + buffer.join('/') + '.js').isFile()) {
			//this is the action we want
			action = root + buffer.join('/');
			break;
		}
		
		variables.unshift(buffer.pop());
	}
	
	//set the variables
	request.variables = variables;
	
	//call it, store it in response
	response.action = require(action).load();
	
	//call the request now, if it exists
	if(typeof response.action.request === 'function') {
		response.action.request(request, response);
	}
};