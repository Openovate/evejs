controller
//when the application is initialized
.listen('init', function() {
	//comment test 2
	//set paths
	controller
		.path('auth'			, controller.path('package') + '/core/auth')
		.path('auth/action'		, controller.path('package') + '/core/auth/action')
		.path('auth/asset'		, controller.path('package') + '/core/auth/asset')
		.path('auth/template'	, controller.path('package') + '/core/auth/template');
})

//when a url request has been made
.listen('request', function() {
	//if it doesn't start with user
	if(window.location.pathname.indexOf('/login') !== 0) {
		// we need to validate if user session
		// exists, else we need to redirect user
		// back to login page.
		var session = $.cookie('__acc');

		// If session is undefined
		if(session === undefined) {
			// Redirect back to login page
			return controller.redirect('/login')
		}

		return;
	}
	
	//router -> action
	var action = controller.path('auth/action') + '/index.js';
	
	//load up the action
	require([action], function(action) {
		action.load().render();
	});
})

// when a url request has been made
.listen('request', function() {
	var navigation = controller.path('auth/action') + '/nav.js';

	// load up navigation for user
	require([navigation], function(nav) {
		nav.load().render();
	});
});