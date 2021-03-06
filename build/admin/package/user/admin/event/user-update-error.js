define(function() {
	return function(e, error, request, action) {
		//is there a message
		if(error.message) {
			this.notify('Form Error', error.message, 'error');
		}
		
		//set the error to true
		request.error = true;
		
		//recall the form
		if(error.validation) {
			//set the field errors
			request.errors = error.validation;
		}
		
		//recall the response
		action.response(request);
	};
});