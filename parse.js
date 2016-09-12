"use strict"

var request = require('request');
var xmlbuilder = require('xmlbuilder');
var parseString = require('xml2js').parseString;


var token = process.env.CLIENT_TOKEN;



var method = xmlbuilder.create('GetNotificationPreferencesRequest', {encoding: 'UTF-8'});
method.att('xmlns', 'urn:ebay:apis:eBLBaseComponents');
var creds = method.ele('RequesterCredentials');
var token = creds.ele('eBayAuthToken').txt(token);
method.ele('ErrorLanguage').txt('en_US');
method.ele('WarningLevel').txt('High');
method.ele('PreferenceLevel').txt('User');

var a = method.doc().end({pretty: true});
console.log(a);
var requestOptions = {
    url: 'http://localhost:4000/notify',
    // url: "https://api.sandbox.ebay.com/ws/api.dll",
    body: a,
    headers: {
        'X-EBAY-API-SITEID': 0,
        'X-EBAY-API-COMPATIBILITY-LEVEL': 967,
        'X-EBAY-API-CALL-NAME': 'GetNotificationPreferences'
    }
};



var buffer = "";

var req = request.post( requestOptions, function( error, response, body )    {
	console.log("BOREC");
	console.log(response.statusCode);
	parseString(body, function (err, result) {
	    console.dir(result.GetNotificationPreferencesResponse.UserDeliveryPreferenceArray[0].NotificationEnable);
	});
});



