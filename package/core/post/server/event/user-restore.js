module.exports = function(controller, id) {
	//remove
	controller
	.user()
	.store()
	.restore(id, function(error) {
		//if there are errors
		if(error) {
			//trigger an error
			controller.trigger('user-restore-error', error);
			return;
		}
		
		//trigger that we are good
		controller.trigger('user-restore-success');
	});
};