module.exports = function(id, request, response) {
	//create the model and save
	var model = this.package('user').model();
	
	model.user_id = id;
	model.user_active = '0';
	
	model.save(function(error) {
		//if there are errors
		if(error) {
			//trigger an error
			this.trigger('user-remove-error', error, request, response);
			return;
		}
		
		//trigger that we are good
		this.trigger('user-remove-success', request, response);
	}.bind(this));
};