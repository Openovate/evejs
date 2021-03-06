module.exports = function() {
	this
	.path('{{name}}', __dirname)
	.path('{{name}}/action', __dirname + '/action')
	.path('{{name}}/event', __dirname + '/event');
	
	//get event path
	var events = this.package('{{name}}').path('event');
	
	//get files in the event folder
	this.Folder(events).getFiles(null, false, function(error, files) {
		//loop through files  
		for(var callback, i = 0; i < files.length; i++) {
			//accept only js
			if(files[i].getExtension() !== 'js') {
				continue;
			}
			
			//get callback
			callback = require(files[i].path);
			
			//only listen if it is a callback
			if(typeof callback !== 'function') {
				continue;
			}
			
			//now listen
			this.on(files[i].getBase(), callback);
		}
		
		//is it installed?
		this.package('{{name}}').search().setRange(1).getRow(function(error) {
			//if no table
			if(error && error.code === 'ER_NO_SUCH_TABLE') {
				console.log('\x1b[33m%s\x1b[0m', 'Installing {{name}} package ...');
				require('./install')(this.database().setup, true, function(error) {
					if(error) {
						console.log('\x1b[31m%s\x1b[0m', error);
						return;
					}
					
					console.log('\x1b[32m%s\x1b[0m', '{{name}} package installed!');
				});
			} 
		}.bind(this));
	}.bind(this));
};