define(function() {
    var c = function() {
		this.__construct.call(this);
	}, public = c.prototype;
    
    /* Public Properties 
    -------------------------------*/
    public.data     = {};
	public.inner 	= controller.noop;
	public.callback = null;
    
    /* Private Properties
    -------------------------------*/
    var $ = jQuery;
	
    /* Loader
    -------------------------------*/
    public.__load = c.load = function() {
        return new c();
    };
    
    /* Construct
    -------------------------------*/
	public.__construct = function() {
		//reset data because of "pass by ref"
		this.data = {};
	};
    
	/* Public Methods
    -------------------------------*/
    public.render = function(callback) {
		this.callback = callback;
		
        $.sequence()
			.setScope(this)
        	.then(_output)
			.then(_listen);
        
        return this;
    };
	
	public.setData = function(name, value) {
		this.data.name 		= name;
		this.data.value 	= value;
		
		return this;
	};
	
	public.setInnerTemplate = function(template) {
		this.data.inner = template;
		return this;
	};

    /* Private Methods
    -------------------------------*/
    var _output = function(next) {
		//load up the action
		require([controller.path('block/action') + '/field/select.js'], function(action) {
			action = action.load();
			action.setData(this.data.name, _countries, this.data.value);
			action.setInnerTemplate(this.data.inner);
			action.render(function(html) {
				this.callback(html);
				next();
			}.bind(this));
		}.bind(this));
    };

    var _listen = function(next) {
	   	next();
    };
    
    /* Large Data
    -------------------------------*/
	_countries = [ 
        { value : 'AF', label : 'Afghanistan'}, 
        { value : 'AL', label : 'Albania'},
        { value : 'AF', label : 'Afghanistan' },
        { value : 'AL', label : 'Albania' },
        { value : 'DZ', label : 'Algeria' },
        { value : 'AS', label : 'American Samoa' },
        { value : 'AD', label : 'Andorra' },
        { value : 'AO', label : 'Angola' },
        { value : 'AI', label : 'Anguilla' },
        { value : 'AQ', label : 'Antarctica' },
        { value : 'AG', label : 'Antigua And Barbuda' },              
        { value : 'AR', label : 'Argentina' },
        { value : 'AM', label : 'Armenia' },
        { value : 'AW', label : 'Aruba' },
        { value : 'AU', label : 'Australia' },
        { value : 'AT', label : 'Austria' },
        { value : 'AZ', label : 'Azerbaijan' },
        { value : 'BS', label : 'Bahamas' },
        { value : 'BH', label : 'Bahrain' },
        { value : 'BD', label : 'Bangladesh' },
        { value : 'BB', label : 'Barbados' },
        { value : 'BY', label : 'Belarus' },
        { value : 'BE', label : 'Belgium' },
        { value : 'BZ', label : 'Belize' },
        { value : 'BJ', label : 'Benin' },
        { value : 'BM', label : 'Bermuda' },
        { value : 'BT', label : 'Bhutan' },
        { value : 'BO', label : 'Bolivia' },
        { value : 'BA', label : 'Bosnia And Herzegowina' },           
        { value : 'BW', label : 'Botswana' },
        { value : 'BV', label : 'Bouvet Island' },                    
        { value : 'BR', label : 'Brazil' },
        { value : 'IO', label : 'British Indian Ocean Territory' },   
        { value : 'BN', label : 'Brunei Darussalam' },
        { value : 'BG', label : 'Bulgaria' },
        { value : 'BF', label : 'Burkina Faso' },
        { value : 'BI', label : 'Burundi' },
        { value : 'KH', label : 'Cambodia' },
        { value : 'CM', label : 'Cameroon' },
        { value : 'CA', label : 'Canada' },
        { value : 'CV', label : 'Cape Verde' },
        { value : 'KY', label : 'Cayman Islands' },
        { value : 'CF', label : 'Central African Republic' },         
        { value : 'TD', label : 'Chad' },
        { value : 'CL', label : 'Chile' },
        { value : 'CN', label : 'China' },
        { value : 'CX', label : 'Christmas Island' },                 
        { value : 'CC', label : 'Cocos (Keeling) Islands' },
        { value : 'CO', label : 'Colombia' },
        { value : 'KM', label : 'Comoros' },
        { value : 'CG', label : 'Congo' },
        { value : 'CD', label : 'Congo }, The Democratic Republic Of The' },
        { value : 'CK', label : 'Cook Islands' },                     
        { value : 'CR', label : 'Costa Rica' },
        { value : 'CI', label : 'Cote D\'Ivoire' },                   
        { value : 'HR', label : 'Croatia (Local Name: Hrvatska)' },
        { value : 'CU', label : 'Cuba' },
        { value : 'CY', label : 'Cyprus' },
        { value : 'CZ', label : 'Czech Republic' },                   
        { value : 'DK', label : 'Denmark' },
        { value : 'DJ', label : 'Djibouti' },
        { value : 'DM', label : 'Dominica' },
        { value : 'DO', label : 'Dominican Republic' },               
        { value : 'TP', label : 'East Timor' },
        { value : 'EC', label : 'Ecuador' },
        { value : 'EG', label : 'Egypt' },
        { value : 'SV', label : 'El Salvador' },
        { value : 'GQ', label : 'Equatorial Guinea' },
        { value : 'ER', label : 'Eritrea' },
        { value : 'EE', label : 'Estonia' },
        { value : 'ET', label : 'Ethiopia' },
        { value : 'FK', label : 'Falkland Islands (Malvinas)' },
        { value : 'FO', label : 'Faroe Islands' },                    
        { value : 'FJ', label : 'Fiji' },
        { value : 'FI', label : 'Finland' },
        { value : 'FR', label : 'France' },
        { value : 'FX', label : 'France }, Metropolitan' },           
        { value : 'GF', label : 'French Guiana' },
        { value : 'PF', label : 'French Polynesia' },                 
        { value : 'TF', label : 'French Southern Territories' },
        { value : 'GA', label : 'Gabon' },
        { value : 'GM', label : 'Gambia' },
        { value : 'GE', label : 'Georgia' },
        { value : 'DE', label : 'Germany' },
        { value : 'GH', label : 'Ghana' },
        { value : 'GI', label : 'Gibraltar' },
        { value : 'GR', label : 'Greece' },
        { value : 'GL', label : 'Greenland' },
        { value : 'GD', label : 'Grenada' },
        { value : 'GP', label : 'Guadeloupe' },
        { value : 'GU', label : 'Guam' },
        { value : 'GT', label : 'Guatemala' },
        { value : 'GN', label : 'Guinea' },
        { value : 'GW', label : 'Guinea-Bissau' },
        { value : 'GY', label : 'Guyana' },
        { value : 'HT', label : 'Haiti' },
        { value : 'HM', label : 'Heard And Mc Donald Islands' },      
        { value : 'VA', label : 'Holy See (Vatican City State)' },
        { value : 'HN', label : 'Honduras' },
        { value : 'HK', label : 'Hong Kong' },
        { value : 'HU', label : 'Hungary' },
        { value : 'IS', label : 'Iceland' },
        { value : 'IN', label : 'India' },
        { value : 'ID', label : 'Indonesia' },
        { value : 'IR', label : 'Iran (Islamic Republic Of)' },       
        { value : 'IQ', label : 'Iraq' },
        { value : 'IE', label : 'Ireland' },
        { value : 'IL', label : 'Israel' },
        { value : 'IT', label : 'Italy' },
        { value : 'JM', label : 'Jamaica' },
        { value : 'JP', label : 'Japan' },
        { value : 'JO', label : 'Jordan' },
        { value : 'KZ', label : 'Kazakhstan' },
        { value : 'KE', label : 'Kenya' },
        { value : 'KI', label : 'Kiribati' },
        { value : 'KP', label : 'Korea }, Democratic People\'s Republic Of' },
        { value : 'KR', label : 'Korea }, Republic Of' },             
        { value : 'KW', label : 'Kuwait' },
        { value : 'KG', label : 'Kyrgyzstan' },
        { value : 'LA', label : 'Lao People\'s Democratic Republic' },
        { value : 'LV', label : 'Latvia' },
        { value : 'LB', label : 'Lebanon' },
        { value : 'LS', label : 'Lesotho' },
        { value : 'LR', label : 'Liberia' },
        { value : 'LY', label : 'Libyan Arab Jamahiriya' },           
        { value : 'LI', label : 'Liechtenstein' },
        { value : 'LT', label : 'Lithuania' },
        { value : 'LU', label : 'Luxembourg' },
        { value : 'MO', label : 'Macau' },
        { value : 'MK', label : 'Macedonia }, Former Yugoslav Republic Of' },
        { value : 'MG', label : 'Madagascar' },
        { value : 'MW', label : 'Malawi' },
        { value : 'MY', label : 'Malaysia' },
        { value : 'MV', label : 'Maldives' },
        { value : 'ML', label : 'Mali' },
        { value : 'MT', label : 'Malta' },
        { value : 'MH', label : 'Marshall Islands' },                 
        { value : 'MQ', label : 'Martinique' },
        { value : 'MR', label : 'Mauritania' },
        { value : 'MU', label : 'Mauritius' },
        { value : 'YT', label : 'Mayotte' },
        { value : 'MX', label : 'Mexico' },
        { value : 'FM', label : 'Micronesia }, Federated States Of' },  
        { value : 'MD', label : 'Moldova }, Republic Of' },
        { value : 'MC', label : 'Monaco' },
        { value : 'MN', label : 'Mongolia' },
        { value : 'MS', label : 'Montserrat' },
        { value : 'MA', label : 'Morocco' },
        { value : 'MZ', label : 'Mozambique' },
        { value : 'MM', label : 'Myanmar' },
        { value : 'NA', label : 'Namibia' },
        { value : 'NR', label : 'Nauru' },
        { value : 'NP', label : 'Nepal' },
        { value : 'NL', label : 'Netherlands' },
        { value : 'AN', label : 'Netherlands Antilles' },             
        { value : 'NC', label : 'New Caledonia' },
        { value : 'NZ', label : 'New Zealand' },
        { value : 'NI', label : 'Nicaragua' },
        { value : 'NE', label : 'Niger' },
        { value : 'NG', label : 'Nigeria' },
        { value : 'NU', label : 'Niue' },
        { value : 'NF', label : 'Norfolk Island' },
        { value : 'MP', label : 'Northern Mariana Islands' },         
        { value : 'NO', label : 'Norway' },
        { value : 'OM', label : 'Oman' },
        { value : 'PK', label : 'Pakistan' },
        { value : 'PW', label : 'Palau' },
        { value : 'PA', label : 'Panama' },
        { value : 'PG', label : 'Papua New Guinea' },                 
        { value : 'PY', label : 'Paraguay' },
        { value : 'PE', label : 'Peru' },
        { value : 'PH', label : 'Philippines' },
        { value : 'PN', label : 'Pitcairn' },
        { value : 'PL', label : 'Poland' },
        { value : 'PT', label : 'Portugal' },
        { value : 'PR', label : 'Puerto Rico' },
        { value : 'QA', label : 'Qatar' },
        { value : 'RE', label : 'Reunion' },
        { value : 'RO', label : 'Romania' },
        { value : 'RU', label : 'Russian Federation' },
        { value : 'RW', label : 'Rwanda' },
        { value : 'KN', label : 'Saint Kitts And Nevis' },
        { value : 'LC', label : 'Saint Lucia' },
        { value : 'VC', label : 'Saint Vincent And The Grenadines' },
        { value : 'WS', label : 'Samoa' },
        { value : 'SM', label : 'San Marino' },
        { value : 'ST', label : 'Sao Tome And Principe' },            
        { value : 'SA', label : 'Saudi Arabia' },
        { value : 'SN', label : 'Senegal' },
        { value : 'SC', label : 'Seychelles' },
        { value : 'SL', label : 'Sierra Leone' },                     
        { value : 'SG', label : 'Singapore' },
        { value : 'SK', label : 'Slovakia (Slovak Republic)' },      
        { value : 'SI', label : 'Slovenia' },
        { value : 'SB', label : 'Solomon Islands' },                  
        { value : 'SO', label : 'Somalia' },
        { value : 'ZA', label : 'South Africa' },                     
        { value : 'GS', label : 'South Georgia }, South Sandwich Islands' },
        { value : 'ES', label : 'Spain' },
        { value : 'LK', label : 'Sri Lanka' },
        { value : 'SH', label : 'St. Helena' },
        { value : 'PM', label : 'St. Pierre And Miquelon' },
        { value : 'SD', label : 'Sudan' },
        { value : 'SR', label : 'Suriname' },
        { value : 'SJ', label : 'Svalbard And Jan Mayen Islands' },  
        { value : 'SZ', label : 'Swaziland' },
        { value : 'SE', label : 'Sweden' },
        { value : 'CH', label : 'Switzerland' },
        { value : 'SY', label : 'Syrian Arab Republic' },             
        { value : 'TW', label : 'Taiwan' },
        { value : 'TJ', label : 'Tajikistan' },
        { value : 'TZ', label : 'Tanzania }, United Republic Of' },
        { value : 'TH', label : 'Thailand' },
        { value : 'TG', label : 'Togo' },
        { value : 'TK', label : 'Tokelau' },
        { value : 'TO', label : 'Tonga' },
        { value : 'TT', label : 'Trinidad And Tobago' },              
        { value : 'TN', label : 'Tunisia' },
        { value : 'TR', label : 'Turkey' },
        { value : 'TM', label : 'Turkmenistan' },
        { value : 'TC', label : 'Turks And Caicos Islands' },         
        { value : 'TV', label : 'Tuvalu' },
        { value : 'UG', label : 'Uganda' },
        { value : 'UA', label : 'Ukraine' },
        { value : 'AE', label : 'United Arab Emirates' },
        { value : 'GB', label : 'United Kingdom' },
        { value : 'US', label : 'United States' },            
        { value : 'UM', label : 'United States Minor Outlying Islands' },
        { value : 'UY', label : 'Uruguay' },
        { value : 'UZ', label : 'Uzbekistan' },
        { value : 'VU', label : 'Vanuatu' },
        { value : 'VE', label : 'Venezuela' },
        { value : 'VN', label : 'Viet Nam' },
        { value : 'VG', label : 'Virgin Islands (British)' },
        { value : 'VI', label : 'Virgin Islands (U.S.)' },            
        { value : 'WF', label : 'Wallis And Futuna Islands' },
        { value : 'EH', label : 'Western Sahara' },                   
        { value : 'YE', label : 'Yemen' },
        { value : 'YU', label : 'Yugoslavia' },
        { value : 'ZM', label : 'Zambia' },
        { value : 'ZW', label : 'Zimbabwe'} ];
		
    /* Adaptor
    -------------------------------*/
    return c; 
});