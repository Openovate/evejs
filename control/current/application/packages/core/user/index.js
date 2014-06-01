controller
//when the application is initialized
.listen('init', function() {
	//set paths
	controller
		.path('user'			, controller.path('packages') + '/core/user/')
		.path('user/page'		, controller.path('packages') + '/core/user/page/')
		.path('user/template'	, controller.path('packages') + '/core/user/template/');
})
//when the menu is about to be rendered
.listen('menu', function(e, menu) {
	//add our menu item
	menu.push({
		path	: '/user',
		icon	: 'user',
		label	: 'Users',
		children: [{
			path	: '/user/create',
			label	: 'Create User' }]
		});
})
//when a url request has been made
.listen('request', function() {
	//if it doesn't start with user
	if(window.location.pathname.indexOf('/user') !== 0) {
		//we don't care about it
		return;
	}
	
	//router -> action
	var page = 'index';
	switch(window.location.pathname) {
		case '/user/create':
			page = 'create';
			break;
	}
	
	page = controller.path('user/page') + page + '.js';
	
	//load up the action
	require([page], function(page) {
		page.render();
	});
});