define(function() {
    var c = function() {}, public = c.prototype;
    
    /* Public Properties 
    -------------------------------*/
    public.title        = 'Create User';
    public.header       = 'Create User';
    public.subheader    = 'CRM';
    public.crumbs       = [{ 
        path: '/user',
        icon: 'user', 
        label: 'Users' 
    }, {  label: 'Create User' }];
    
    public.data     = {};
    public.template = controller.path('user/template') + '/form.html';
    
    /* Private Properties
    -------------------------------*/
    var $       = jQuery;
    var _api    = 'http://api.eve.dev:8082/user/create';
    var _listening = false;
    
    /* Loader
    -------------------------------*/
    public.__load = c.load = function() {
        return new c();
    };
    
    /* Construct
    -------------------------------*/
    /* Public Methods
    -------------------------------*/
    public.render = function() {
        $.sequence().setScope(this)
        .then(this.getData)
        .then(this.output)
        .then(this.listen);
        
        return this;
    };

    /**
     * Get Data
     *
     * @param function callback
     * @return this
     */
    public.getData = function(callback) {
        var self = this,

        //store form templates path to array
        forms = [
        controller.path('config') + '/countries.js',
        'text!' + controller.path('user/template') +  'form/basic.html',
        'text!' + controller.path('user/template') +  'form/company.html',
        'text!' + controller.path('user/template') +  'form/contact.html',
        'text!' + controller.path('user/template') +  'form/picture.html',
        'text!' + controller.path('user/template') +  'form/required.html',
        'text!' + controller.path('user/template') +  'form/tabs.html',
        'text!' + controller.path('user/template') +  'form/social.html'];

        //require form templates
        //assign it to main form
        require(forms, function(countries, basic, company, contact, picture,
        required, tabs, social) {

            //load basic form template 
            self.data.basic = Handlebars.compile(basic)({
                user_birthdate : '',
                user_gender    : 'male'
            });

            //load company form template
            self.data.company = Handlebars.compile(company)({
                user_company         : 'example company',
                user_job_title       : 'example job title',
                user_company_street  : 'example street',
                user_company_city    : 'example city',
                user_company_state   : 'example state',
                //We need an array for country code and country name
                //lets create an array inside company and store all country data on it
                country              : countries,
                user_company_postal  : '4012',
                user_company_phone   : '(000)-000-0000',
                company_email        : 'email@example.com'
            });

            //load contact form template
            self.data.contact = Handlebars.compile(contact)({
                user_website  : 'http://www.web-example.com',
                user_phone    : '09298888888'
            });
            
            //load picture form template
            self.data.picture = Handlebars.compile(picture)({
                user_photo : 'example.jpg'
            });

            //load required form template
            self.data.required = Handlebars.compile(required)({
                user_name       : 'example username',
                user_slug       : 'example slug',
                user_email      : 'email@example.com',
                user_password   : 'example password',
                user_confirm    : 'example confirm',
                errors : {
                    user_name       : '',
                    user_slug       : '',
                    user_email      : '',
                    user_password   : '',
                    user_confirm    : ''
                }
            });

            //load tabs template
            self.data.tabs = Handlebars.compile(tabs)({
                request_uri : '',
                path : 'example/path',
                id : 'example_id',
                tabs : [{
                    item : {
                        icon : 'example.icon',
                        label : 'example label'
                    }
                }]
            });

            //load social form template
            self.data.social = Handlebars.compile(social)({
                user_facebook : 'user facebook',
                user_twitter  : 'user twitter',
                user_google   : 'user google'
            });
        });

        callback();
        
        return this;
    };
    
    /**
     * Output
     *
     * @param function callback
     * @return this
     */
    public.output = function(callback) {
        var self = this;
   
        controller
        .setTitle(this.title)
        .setHeader(this.header)
        .setSubheader(this.subheader)
        .setCrumbs(this.crumbs)
        .setBody(self.template, self.data);            
        callback();

        return this;
    };

    /** 
     * Check if we are listening
     *
     * @param function
     * return this
     */
    public.listen = function(callback) {
        // if we are listening, we cant send data
        if(_listening) {
            callback();
            return this;
        }
        
        //if not listening, submit form
        $('#body').on('submit', 'form.package-user-form', { scope: self }, _processSaveData);               
        //set listening to true
        _listening = true;
        callback();

        return this;
    };
    
    /* Private Methods
    -------------------------------*/
    var _processSaveData = function(e) {
        //prevent page from reloading
        e.preventDefault();

        //prepare form data
        var data = $('form.package-user-form').serialize();

        //save data to database
        $.post(_api, data, function(response) {
            
            //display message status
            controller.addMessage('Record successfully saved!');
       });
    };
    
    /* Adaptor
    -------------------------------*/
    return c.load(); 
});