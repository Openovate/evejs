module.exports = function($) {
	return this.define(function(public) {
		/* Public Properties
		-------------------------------*/
		public.host		= '127.0.0.1';
		public.port		= 1337;
		
		public.resource = null;
		
		/* Private Properties
		-------------------------------*/
		var _events 	= new (require('events').EventEmitter);
		var _formidable = require('formidable');
		
		/* Loader
		-------------------------------*/
		public.__load = function() {
			return new this();
		};
		
		/* Construct
		-------------------------------*/
		/* Public Methods
		-------------------------------*/
		/**
		 * Connect to server
		 *
		 * @return this
		 */
		public.connect = function() {
			this.resource = require('http')
				.createServer(_response.bind(this))
				.listen(this.port, this.host);
				
			console.log('Eden running on http://'+this.host+':'+this.port+'/');
			return this;
		};
		
		/**
		 * Global event listener for the server
		 *
		 * @return this
		 */
		public.listen = function(event, callback) {
			//Argument Testing
			$.load('argument')
				.test(1, 'string')
				.test(2, 'function');
			
			_events.on(event, callback);
			return this;
		};
		
		/**
		 * Sets the identifiable host name
		 *
		 * @param string
		 * @return this
		 */
		public.setHost = function(host) {
			//Argument Testing
			$.load('argument').test(1, 'string');
			
			this.host = host;
			return this;
		};
		
		/**
		 * Sets the identifiable port
		 *
		 * @param string
		 * @return this
		 */
		public.setPort = function(port) {
			//Argument Testing
			$.load('argument').test(1, 'string', 'int');
			
			this.port = port;
			return this;
		};
		
		/**
		 * Global event trigger for the server
		 *
		 * @return this
		 */
		public.trigger = function() {
			//Argument Testing
			$.load('argument').test(1, 'string');
			
			_events.emit.apply(_events, arguments);
			return this;
		};
	
		/* Private Methods
		-------------------------------*/
		var _response = function(request, response) {
			//start in good conscience
			response.state 		= 200;
			response.headers 	= { 'Content-Type': 'text/html' };
			
			//parse out the URL
			request.path 		= $.load('string').toPath(request.url);
			request.pathArray	= $.load('string').pathToArray(request.url);
			request.query 		= $.load('string').pathToQuery(request.url);
			
			request.message 		= '';
			
			//if this is a form submit
			if(request.headers && request.headers['content-type']
			&& request.headers['content-type'].indexOf('multipart/form-data') === 0) {
				//use formidable
				var self = this, form = new _formidable.IncomingForm();
				
				form.parse(request, function(error, fields, files) { 
					//set request message
					request.message = $.load('hash').toQuery(fields);
					request.files 	= [];
					
					var fs = require('fs'), sequence = $.load('sequence');
					
					for(var key in files) {
						sequence.then(function(next) {
							fs.readFile(files[key].path, function(error, data) {
								request.files.push({ name: files[key].name, data: data });
								next();
							});
						});
					}
					
					sequence.then(function(next) {
						_process.bind(self)(request, response);
						next();
					});
				});  
				
				return;
			}
			
			request.on('data', function(data) {
				request.message += data;
				
				//Prevent FLOOD ATTACK, FAULTY CLIENT, NUKE REQUEST
				if(request.message.length > 1e6) {
					request.message = '';
					response.writeHead(413, {'Content-Type': 'text/plain'});
					response.end();
					request.connection.destroy();
				}
			});
			
			request.on('end', _process.bind(this, request, response));
		};
		
		var _process = function(request, response) {
			//wait for the response to be ready
			this.listen('response', function(request, response) {
				try {
					response.writeHead(response.state, response.headers);
					response.end(response.message+'');
					
					//event trigger
					this.trigger('output', request, response);
				} catch(error) {
					response.state = 500;
					//event trigger
					this.trigger('output-error', request, response, error);
					
					if(!response.message) {
						response.message = error.toString();
					}
					
					response.writeHead(response.state, response.headers);
					response.end(response.message);
				}
			}.bind(this));
			
			//request trigger
			this.trigger('request', request, response);
			
			//if response isn't processing
			if(!response.processing) {
				response.state = 404;
				this.trigger('response', request, response);
			}
			
		};
	});
};