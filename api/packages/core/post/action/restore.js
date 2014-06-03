module.exports = function(controller, request, response) {
	//1. VALIDATE
	//if no id was set
	if(!request.variables[0]) {
		//setup an error response
		response.message = JSON.stringify({ 
			error: true, 
			message: 'No ID set' });
		
		//trigger that a response has been made
		controller.server.trigger('response', request, response);
		
		return;
	}
	
	//2. TRIGGER
	controller
		//when there is an error
		.once('post-restore-error', function(error) {
			//setup an error response
			response.message = JSON.stringify({ 
				error: true, 
				message: error.message });
			
			//trigger that a response has been made
			controller.server.trigger('response', request, response);
		})
		//when it is successfull
		.once('post-restore-success', function() {
			//set up a success response
			response.message = JSON.stringify({ error: false });
			
			//trigger that a response has been made
			controller.server.trigger('response', request, response);
		})
		//Now call to remove the post
		.trigger('post-restore', controller, request.variables[0]);
};