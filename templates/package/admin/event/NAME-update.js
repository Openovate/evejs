define(function() {
	return function(e, id, settings, request, action) {
		//validate
		var errors = this.package('{{name}}').getErrors(settings);
		
		//if there are errors
		if(errors.length) {
			//trigger an error
			this.trigger('{{name}}-update-error', { 
				message: 'There was an error in the form.',
				validation: errors }, request, action);
			
			return;
		}
		
		//Convert to server date format
		//NOTE: BULK GENERATE
		{{#loop fields ~}}
		{{~#if value.field ~}}
		{{~#when value.field.[0] '==' 'datetime' ~}}
		if(settings.{{../../key}}) {
			settings.{{../../key}} = this.Time().toDate(settings.{{../../key}}, 'Y-m-d H:i:s');
		}
		
		{{/when~}}
		{{~#when value.field.[0] '==' 'date' ~}}
		if(settings.{{../../key}}) {
			settings.{{../../key}} = this.Time().toDate(settings.{{../../key}}, 'Y-m-d');
		}
		
		{{/when~}}
		{{~#when value.field.[0] '==' 'time' ~}}
		if(settings.{{../../key}}) {
			settings.{{../../key}} = this.Time().toDate(settings.{{../../key}}, 'H:i:s');
		}
		
		{{/when~}}
		{{~#when value.field.[0] '==' 'password' ~}}
		if(settings.{{../../key}}) {
			settings.{{../../key}} = this.String().md5(''+settings.{{../../key}});
		}
		
		{{/when~}}
		{{~/if~}}
		{{~/loop}}
		
		//track progress
		this.on('progress', function progress(e, percent) {
			this.trigger('{{name}}-update-progress', percent, request, action);
		});
		
		//send to server
		this.package('{{name}}').update(id, settings, function(error, response) {
			//stop listening to the progress
			this.off('progress');
			
			//if there is an error
			if(error) {
				//Add to gritter
				//trigger an error
				this.trigger('{{name}}-update-error', error, request, action);
				return;
			}
			
			if(!response.error) {
				this.trigger('{{name}}-update-success', request, action)		
				return;
			}
			
			error = { message: response.message };
			
			if(response.validation && response.validation instanceof Array) {
				error.validation = response.validation 
			}
			
			this.trigger('{{name}}-update-error', error, request, action);
		}.bind(this)).send();
	};
});