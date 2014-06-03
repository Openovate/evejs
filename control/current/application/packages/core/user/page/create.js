define(function() {
	var c = function() {}, public = c.prototype;
	
	/* Public Properties
	-------------------------------*/
	public.title 		= 'Create User';
	public.header 		= 'Create User';
	public.subheader 	= 'CRM';
	public.crumbs 		= [{ 
		path: '/user',
		icon: 'user', 
		label: 'Users' 
	}, {  label: 'Create User' }];
	
	public.data 	= {};
	public.template = controller.path('user/template') + '/form.html';
	
	/* Private Properties
	-------------------------------*/
	var $ 		= jQuery;
	var _api 	= 'http://api.lbc.dev:8082/user';
	
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
		.then(this.output);
		
		return this;
	};
	
	public.getData = function(callback) {
		callback();
		return this;
	};
	
	public.output = function(callback) {
        var self = this;
        controller
        .setTitle(this.title)
        .setHeader(this.header)
        .setSubheader(this.subheader)
        .setCrumbs(this.crumbs)
        .setBody(self.template, self.data);
        $('#body').on('submit', 'form.package-user-form', { scope: self }, _process);               
        callback();
        
        //require template forms
        require([
            'text!' + controller.path('user/template') + '/contact.html',
            'text!' + controller.path('user/template') + '/company.html',
            'text!' + controller.path('user/template') + '/social.html'],
            function(contact, company) {

                //load contact form and handlebars
                contact = Handlebars.compile(contact)({
                    contact : {
                        header           : 'Contact',
                        website         : 'Website',
                        user_website    : '',
                        phone           : 'Phone',
                        phone_number    : ''
                    }
                });

                //append contact form to main form
                $('.package-user-form').append(contact);

                //load company form and handlebars
                company = Handlebars.compile(company)({
                    company : {
                        title                : 'Company',
                        company_name         : 'Company Name',
                        user_company         : '',
                        job_title            : 'job title',
                        user_job_title       : '',
                        street               : 'Street',
                        user_company_street  : '',
                        city                 : 'City',
                        user_company_city    : '',
                        state_province       : 'State/Province',
                        user_company_state   : '',
                        country_title        : 'Country',
                        //We need an array for country code and country name
                        //let create an array inside company and store all country data on it
                        country              : [
                            { code : 'AF', name : 'Afghanistan'}, 
                            { code : 'AL', name : 'Albania'},
                            { code : 'AF', name : 'Afghanistan' },
                            { code : 'AL', name : 'Albania' },
                            { code : 'DZ', name : 'Algeria' },
                            { code : 'AS', name : 'American Samoa' },
                            { code : 'AD', name : 'Andorra' },
                            { code : 'AO', name : 'Angola' },
                            { code : 'AI', name : 'Anguilla' },
                            { code : 'AQ', name : 'Antarctica' },
                            { code : 'AG', name : 'Antigua And Barbuda' },              
                            { code : 'AR', name : 'Argentina' },
                            { code : 'AM', name : 'Armenia' },
                            { code : 'AW', name : 'Aruba' },
                            { code : 'AU', name : 'Australia' },
                            { code : 'AT', name : 'Austria' },
                            { code : 'AZ', name : 'Azerbaijan' },
                            { code : 'BS', name : 'Bahamas' },
                            { code : 'BH', name : 'Bahrain' },
                            { code : 'BD', name : 'Bangladesh' },
                            { code : 'BB', name : 'Barbados' },
                            { code : 'BY', name : 'Belarus' },
                            { code : 'BE', name : 'Belgium' },
                            { code : 'BZ', name : 'Belize' },
                            { code : 'BJ', name : 'Benin' },
                            { code : 'BM', name : 'Bermuda' },
                            { code : 'BT', name : 'Bhutan' },
                            { code : 'BO', name : 'Bolivia' },
                            { code : 'BA', name : 'Bosnia And Herzegowina' },           
                            { code : 'BW', name : 'Botswana' },
                            { code : 'BV', name : 'Bouvet Island' },                    
                            { code : 'BR', name : 'Brazil' },
                            { code : 'IO', name : 'British Indian Ocean Territory' },   
                            { code : 'BN', name : 'Brunei Darussalam' },
                            { code : 'BG', name : 'Bulgaria' },
                            { code : 'BF', name : 'Burkina Faso' },
                            { code : 'BI', name : 'Burundi' },
                            { code : 'KH', name : 'Cambodia' },
                            { code : 'CM', name : 'Cameroon' },
                            { code : 'CA', name : 'Canada' },
                            { code : 'CV', name : 'Cape Verde' },
                            { code : 'KY', name : 'Cayman Islands' },
                            { code : 'CF', name : 'Central African Republic' },         
                            { code : 'TD', name : 'Chad' },
                            { code : 'CL', name : 'Chile' },
                            { code : 'CN', name : 'China' },
                            { code : 'CX', name : 'Christmas Island' },                 
                            { code : 'CC', name : 'Cocos (Keeling) Islands' },
                            { code : 'CO', name : 'Colombia' },
                            { code : 'KM', name : 'Comoros' },
                            { code : 'CG', name : 'Congo' },
                            { code : 'CD', name : 'Congo }, The Democratic Republic Of The' },
                            { code : 'CK', name : 'Cook Islands' },                     
                            { code : 'CR', name : 'Costa Rica' },
                            { code : 'CI', name : 'Cote D\'Ivoire' },                   
                            { code : 'HR', name : 'Croatia (Local Name: Hrvatska)' },
                            { code : 'CU', name : 'Cuba' },
                            { code : 'CY', name : 'Cyprus' },
                            { code : 'CZ', name : 'Czech Republic' },                   
                            { code : 'DK', name : 'Denmark' },
                            { code : 'DJ', name : 'Djibouti' },
                            { code : 'DM', name : 'Dominica' },
                            { code : 'DO', name : 'Dominican Republic' },               
                            { code : 'TP', name : 'East Timor' },
                            { code : 'EC', name : 'Ecuador' },
                            { code : 'EG', name : 'Egypt' },
                            { code : 'SV', name : 'El Salvador' },
                            { code : 'GQ', name : 'Equatorial Guinea' },
                            { code : 'ER', name : 'Eritrea' },
                            { code : 'EE', name : 'Estonia' },
                            { code : 'ET', name : 'Ethiopia' },
                            { code : 'FK', name : 'Falkland Islands (Malvinas)' },
                            { code : 'FO', name : 'Faroe Islands' },                    
                            { code : 'FJ', name : 'Fiji' },
                            { code : 'FI', name : 'Finland' },
                            { code : 'FR', name : 'France' },
                            { code : 'FX', name : 'France }, Metropolitan' },           
                            { code : 'GF', name : 'French Guiana' },
                            { code : 'PF', name : 'French Polynesia' },                 
                            { code : 'TF', name : 'French Southern Territories' },
                            { code : 'GA', name : 'Gabon' },
                            { code : 'GM', name : 'Gambia' },
                            { code : 'GE', name : 'Georgia' },
                            { code : 'DE', name : 'Germany' },
                            { code : 'GH', name : 'Ghana' },
                            { code : 'GI', name : 'Gibraltar' },
                            { code : 'GR', name : 'Greece' },
                            { code : 'GL', name : 'Greenland' },
                            { code : 'GD', name : 'Grenada' },
                            { code : 'GP', name : 'Guadeloupe' },
                            { code : 'GU', name : 'Guam' },
                            { code : 'GT', name : 'Guatemala' },
                            { code : 'GN', name : 'Guinea' },
                            { code : 'GW', name : 'Guinea-Bissau' },
                            { code : 'GY', name : 'Guyana' },
                            { code : 'HT', name : 'Haiti' },
                            { code : 'HM', name : 'Heard And Mc Donald Islands' },      
                            { code : 'VA', name : 'Holy See (Vatican City State)' },
                            { code : 'HN', name : 'Honduras' },
                            { code : 'HK', name : 'Hong Kong' },
                            { code : 'HU', name : 'Hungary' },
                            { code : 'IS', name : 'Iceland' },
                            { code : 'IN', name : 'India' },
                            { code : 'ID', name : 'Indonesia' },
                            { code : 'IR', name : 'Iran (Islamic Republic Of)' },       
                            { code : 'IQ', name : 'Iraq' },
                            { code : 'IE', name : 'Ireland' },
                            { code : 'IL', name : 'Israel' },
                            { code : 'IT', name : 'Italy' },
                            { code : 'JM', name : 'Jamaica' },
                            { code : 'JP', name : 'Japan' },
                            { code : 'JO', name : 'Jordan' },
                            { code : 'KZ', name : 'Kazakhstan' },
                            { code : 'KE', name : 'Kenya' },
                            { code : 'KI', name : 'Kiribati' },
                            { code : 'KP', name : 'Korea }, Democratic People\'s Republic Of' },
                            { code : 'KR', name : 'Korea }, Republic Of' },             
                            { code : 'KW', name : 'Kuwait' },
                            { code : 'KG', name : 'Kyrgyzstan' },
                            { code : 'LA', name : 'Lao People\'s Democratic Republic' },
                            { code : 'LV', name : 'Latvia' },
                            { code : 'LB', name : 'Lebanon' },
                            { code : 'LS', name : 'Lesotho' },
                            { code : 'LR', name : 'Liberia' },
                            { code : 'LY', name : 'Libyan Arab Jamahiriya' },           
                            { code : 'LI', name : 'Liechtenstein' },
                            { code : 'LT', name : 'Lithuania' },
                            { code : 'LU', name : 'Luxembourg' },
                            { code : 'MO', name : 'Macau' },
                            { code : 'MK', name : 'Macedonia }, Former Yugoslav Republic Of' },
                            { code : 'MG', name : 'Madagascar' },
                            { code : 'MW', name : 'Malawi' },
                            { code : 'MY', name : 'Malaysia' },
                            { code : 'MV', name : 'Maldives' },
                            { code : 'ML', name : 'Mali' },
                            { code : 'MT', name : 'Malta' },
                            { code : 'MH', name : 'Marshall Islands' },                 
                            { code : 'MQ', name : 'Martinique' },
                            { code : 'MR', name : 'Mauritania' },
                            { code : 'MU', name : 'Mauritius' },
                            { code : 'YT', name : 'Mayotte' },
                            { code : 'MX', name : 'Mexico' },
                            { code : 'FM', name : 'Micronesia }, Federated States Of' },  
                            { code : 'MD', name : 'Moldova }, Republic Of' },
                            { code : 'MC', name : 'Monaco' },
                            { code : 'MN', name : 'Mongolia' },
                            { code : 'MS', name : 'Montserrat' },
                            { code : 'MA', name : 'Morocco' },
                            { code : 'MZ', name : 'Mozambique' },
                            { code : 'MM', name : 'Myanmar' },
                            { code : 'NA', name : 'Namibia' },
                            { code : 'NR', name : 'Nauru' },
                            { code : 'NP', name : 'Nepal' },
                            { code : 'NL', name : 'Netherlands' },
                            { code : 'AN', name : 'Netherlands Antilles' },             
                            { code : 'NC', name : 'New Caledonia' },
                            { code : 'NZ', name : 'New Zealand' },
                            { code : 'NI', name : 'Nicaragua' },
                            { code : 'NE', name : 'Niger' },
                            { code : 'NG', name : 'Nigeria' },
                            { code : 'NU', name : 'Niue' },
                            { code : 'NF', name : 'Norfolk Island' },
                            { code : 'MP', name : 'Northern Mariana Islands' },         
                            { code : 'NO', name : 'Norway' },
                            { code : 'OM', name : 'Oman' },
                            { code : 'PK', name : 'Pakistan' },
                            { code : 'PW', name : 'Palau' },
                            { code : 'PA', name : 'Panama' },
                            { code : 'PG', name : 'Papua New Guinea' },                 
                            { code : 'PY', name : 'Paraguay' },
                            { code : 'PE', name : 'Peru' },
                            { code : 'PH', name : 'Philippines' },
                            { code : 'PN', name : 'Pitcairn' },
                            { code : 'PL', name : 'Poland' },
                            { code : 'PT', name : 'Portugal' },
                            { code : 'PR', name : 'Puerto Rico' },
                            { code : 'QA', name : 'Qatar' },
                            { code : 'RE', name : 'Reunion' },
                            { code : 'RO', name : 'Romania' },
                            { code : 'RU', name : 'Russian Federation' },
                            { code : 'RW', name : 'Rwanda' },
                            { code : 'KN', name : 'Saint Kitts And Nevis' },
                            { code : 'LC', name : 'Saint Lucia' },
                            { code : 'VC', name : 'Saint Vincent And The Grenadines' },
                            { code : 'WS', name : 'Samoa' },
                            { code : 'SM', name : 'San Marino' },
                            { code : 'ST', name : 'Sao Tome And Principe' },            
                            { code : 'SA', name : 'Saudi Arabia' },
                            { code : 'SN', name : 'Senegal' },
                            { code : 'SC', name : 'Seychelles' },
                            { code : 'SL', name : 'Sierra Leone' },                     
                            { code : 'SG', name : 'Singapore' },
                            { code : 'SK', name : 'Slovakia (Slovak Republic)' },      
                            { code : 'SI', name : 'Slovenia' },
                            { code : 'SB', name : 'Solomon Islands' },                  
                            { code : 'SO', name : 'Somalia' },
                            { code : 'ZA', name : 'South Africa' },                     
                            { code : 'GS', name : 'South Georgia }, South Sandwich Islands' },
                            { code : 'ES', name : 'Spain' },
                            { code : 'LK', name : 'Sri Lanka' },
                            { code : 'SH', name : 'St. Helena' },
                            { code : 'PM', name : 'St. Pierre And Miquelon' },
                            { code : 'SD', name : 'Sudan' },
                            { code : 'SR', name : 'Suriname' },
                            { code : 'SJ', name : 'Svalbard And Jan Mayen Islands' },  
                            { code : 'SZ', name : 'Swaziland' },
                            { code : 'SE', name : 'Sweden' },
                            { code : 'CH', name : 'Switzerland' },
                            { code : 'SY', name : 'Syrian Arab Republic' },             
                            { code : 'TW', name : 'Taiwan' },
                            { code : 'TJ', name : 'Tajikistan' },
                            { code : 'TZ', name : 'Tanzania }, United Republic Of' },
                            { code : 'TH', name : 'Thailand' },
                            { code : 'TG', name : 'Togo' },
                            { code : 'TK', name : 'Tokelau' },
                            { code : 'TO', name : 'Tonga' },
                            { code : 'TT', name : 'Trinidad And Tobago' },              
                            { code : 'TN', name : 'Tunisia' },
                            { code : 'TR', name : 'Turkey' },
                            { code : 'TM', name : 'Turkmenistan' },
                            { code : 'TC', name : 'Turks And Caicos Islands' },         
                            { code : 'TV', name : 'Tuvalu' },
                            { code : 'UG', name : 'Uganda' },
                            { code : 'UA', name : 'Ukraine' },
                            { code : 'AE', name : 'United Arab Emirates' },
                            { code : 'GB', name : 'United Kingdom' },
                            { code : 'US', name : 'United States' },            
                            { code : 'UM', name : 'United States Minor Outlying Islands' },
                            { code : 'UY', name : 'Uruguay' },
                            { code : 'UZ', name : 'Uzbekistan' },
                            { code : 'VU', name : 'Vanuatu' },
                            { code : 'VE', name : 'Venezuela' },
                            { code : 'VN', name : 'Viet Nam' },
                            { code : 'VG', name : 'Virgin Islands (British)' },
                            { code : 'VI', name : 'Virgin Islands (U.S.)' },            
                            { code : 'WF', name : 'Wallis And Futuna Islands' },
                            { code : 'EH', name : 'Western Sahara' },                   
                            { code : 'YE', name : 'Yemen' },
                            { code : 'YU', name : 'Yugoslavia' },
                            { code : 'ZM', name : 'Zambia' },
                            { code : 'ZW', name : 'Zimbabwe'} ],
                        user_company_country : '',
                        postal               : 'Postal',
                        user_company_postal  : '',
                        phone                : 'Phone',
                        user_company_phone   : '',
                        company_email        : 'Company Email',
                        user_company_email   : ''
                    }
                });

                //append company template
                $('.package-user-form').append(company);
        });
        
        return this;
    };
	
	/* Private Methods
	-------------------------------*/
	var _process = function(e) {
		e.preventDefault();
		console.log(this, e.data.scope.title);
	};
	
	/* Adaptor
	-------------------------------*/
	return c.load(); 
});