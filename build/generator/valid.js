module.exports = {
	cc				: '^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3'
					+ '[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\\\\d{3})\\\\d{11})$$',
	
	email			: '^(([^<>()[\\\\]\\\\.,,:\\\\s@\\\\"]+(\\\\.[^<>()[\\\\]\\\\.,,:\\\\s@\\\\"]+)*)|'
					+ '(\\\\".+\\\\"))@((\\\\[[0-9]{1,3}\\\\.[0-9]{1,3}\\\\.[0-9]{1,3}\\\\.[0-9]{1,3}'
					+ '\\\\])|(([a-zA-Z\\\\-0-9]+\\\\.)+[a-zA-Z]{2,}))$$',
							
	hex				: '^[0-9a-fA-F]{6}$$',
	
	html			: '<\\\\/?\\\\w+((\\\\s+(\\\\w|\\\\w[\\\\w-]*\\\\w)(\\\\s*=\\\\s*(?:\\\\".*?\\\\"|\'.'
					+ '*?\'|[^\'\\\\">\\\\s]+))?)+\\\\s*|\\\\s*)\\\\/?>',
	
	url				: '^(http|https|ftp):\\\\/\\\\/([A-Z0-9][A-Z0-9_-]*(?:.[A-Z0-9][A-Z0-9_-]*)+):?(d+)?\\\\/?',
	alphanum		: '^[a-zA-Z0-9]+$$',
	alphanumscore	: '^[a-zA-Z0-9_]+$$',
	alphanumhyphen	: '^[a-zA-Z0-9-]+',
	alphanumline	: '^[a-zA-Z0-9-_]+$$',
	slug			: '^[a-z0-9-]+'
};