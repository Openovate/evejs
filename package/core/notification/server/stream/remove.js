module.exports = (function() { 
	var c = function(controller, channel, socket) {
        this.__construct.call(this, controller, channel, socket);
    }, public = c.prototype;

	/* Public Properties
    -------------------------------*/
    public.controller = null;
    public.channel 	  = null;
    public.socket  	  = null;
    public.clients 	  = [];
    
	/* Private Properties
    -------------------------------*/
    /* Loader
    -------------------------------*/
    public.__load = c.load = function(controller, channel, socket) {
        return new c(controller, channel, socket);
    };
    
	/* Construct
    -------------------------------*/
	public.__construct = function(controller, channel, socket) {
		//set request and other usefull data
		this.controller = controller;
		this.channel 	= channel;
		this.socket 	= socket;
	};
	
	/* Public Methods
    -------------------------------*/
	public.render = function() {
		// on notify client action
		this.socket
			// clean up all listeners first
			.removeAllListeners('notification-clear')
			// on notify client action
			.on('notification-clear', function(data) {
			// listen to events
			this.controller
				// on notification broadcast error
				.once('notification-remove-error', _error.bind(this))
				// on notification remove success
				.once('notification-remove-success', _success.bind(this))
				// trigger notification remove
				.trigger('notification-remove', this.controller, data);

		}.bind(this));
	};
	
	/* Private Methods
    -------------------------------*/
    var _response = function(error, data) {
		//if there are errors
		if(error) {
			_error.call(this, error);
			return;
		}
		
		//no error
		_success.call(this, data);
	};
	
	var _success = function(data) {
		// setup success message
		var message = {
			error 	: false,
			result  : data
		};
		
		// do not listen to error anymore
		this.controller.unlisten('notification-remove-error');
		// send response to all except sender
		this.socket.emit('notification-cleared', message);
	};
	
	var _error = function(error) {
		// setup an error response
		var message = {
			error 	: true,
			message : error.message
		};
		
		// do not listen to success anymore
		this.controller.unlisten('notification-remove-success');
		// send error response to sender only
		this.socket.emit('notification-cleared', message);
	};

	/* Adaptor
	-------------------------------*/
	return c; 
})();