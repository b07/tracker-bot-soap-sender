"use strict"

var request = require('request');
var xmlbuilder = require('xmlbuilder');
var parseString = require('xml2js').parseString;
var fs = require('fs')

fs.readFile('formattedBody.txt', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  //console.log(data);
  var requestOptions = {
      //url: 'https://pure-fortress-41479.herokuapp.com/notify',

      url: "http://localhost:3000/notify",

      body: data,
      headers: {
          "content-type": "text/xml;charset=utf-8",
          'X-EBAY-API-SITEID': 0,
          'X-EBAY-API-COMPATIBILITY-LEVEL': 967,
          'X-EBAY-API-CALL-NAME': 'GetNotificationPreferences'
      }
  };
  var req = request.post( requestOptions, function( error, response, body )    {
     console.log("BOREC");
     console.log(response.statusCode);
     parseString(body, function (err, result) {
         console.dir(result);
     });
  });
});

var token = process.env.CLIENT_TOKEN;



var envelope = xmlbuilder.create('soapenv:Envelope', {encoding: 'UTF-8'});
envelope.att('xmlns:soapenv', 'http://schemas.xmlsoap.org/soap/envelope/');
envelope.att('xmlns:xsd', 'http://www.w3.org/2001/XMLSchema');
envelope.att('xmlns:xsi', 'http://www.w3.org/2001/XMLSchema-instance');

var header = envelope.ele('soapenv:Header');
header.ele('ebl:NotificationSignature').text('nVrjyb0Ob6Jq7vcuqjsl2g==');
var body = envelope.ele('soapenv:Body');
var gitr = body.ele('GetItemTransactionsResponse');
gitr.ele('Timestamp').text('2016-09-15T08:08:31.085Z');
gitr.ele('Ack').text('Success');
gitr.ele('CorrelationID').text('758863186981');
gitr.ele('NotificationEventName').text('FixedPriceTransaction');
gitr.ele('RecipientUserID').text('household_goods1');
gitr.ele('EIASToken').text('nY+sHZ2PrBmdj6wVnY+sEZ2PrA2dj6AAk4KhAJOKog2dj6x9nY+seQ==');
var item = gitr.ele('Item');
item.ele('ListingType').text('StoresFixedPrice');
item.ele('ItemID').text('222190401415');
var seller = item.ele('Seller');
seller.ele('Email').text('vallewdub@gmail.com');
seller.ele('EIASToken').text('nY+sHZ2PrBmdj6wVnY+sEZ2PrA2dj6AAk4KhAJOKog2dj6x9nY+seQ==');
seller.ele('UserID').text('household_goods1');
var sellingStatus = item.ele('SellingStatus');
sellingStatus.ele('ConvertedCurrentPrice').att('currencyID', 'USD').text('14.99');
sellingStatus.ele('CurrentPrice').att('currencyID', 'USD').text('14.99');
sellingStatus.ele('ListingStatus').text('Active');
var transactionarray = gitr.ele('TransactionArray');
var transaction = transactionarray.ele('Transaction');
transaction.ele('AmountPaid').att('currencyID', 'USD').text('14.99');
var buyer = transaction.ele('Buyer');
buyer.ele('EIASToken').text('nY+sHZ2PrBmdj6wVnY+sEZ2PrA2dj6AAk4KhAJOKog2dj6x9nY+seQ==');
buyer.ele('Email').text('horsesrule9@yahoo.com');
buyer.ele('Status').text('Confirmed');
buyer.ele('UserID').text('smakie1');
var buyerInfo = buyer.ele('BuyerInfo');
var shippingAddress = buyerInfo.ele('ShippingAddress');
shippingAddress.ele('Name').text('Connie Williams');
shippingAddress.ele('Street1').text('5617 Ball Ground rd');
shippingAddress.ele('CityName').text('Ball Ground');
shippingAddress.ele('StateOrProvince').text('GA');
shippingAddress.ele('Country').text('US');
shippingAddress.ele('CountryName').text('United States');
shippingAddress.ele('Phone').text('(770) 324-7298');
shippingAddress.ele('PostalCode').text('30107-5023');
shippingAddress.ele('AddressID').text('1792105335022');
shippingAddress.ele('AddressOwner').text('eBay');
shippingAddress.ele('AddressUsage').text('Shipping');


// var a = envelope.doc().end({pretty: true});
// //console.log(a);
// var requestOptions = {
//     url: 'https://fast-eyrie-81175.herokuapp.com/notify',
//     // url: "https://api.sandbox.ebay.com/ws/api.dll",
//     body: a,
//     headers: {
//         'X-EBAY-API-SITEID': 0,
//         'X-EBAY-API-COMPATIBILITY-LEVEL': 967,
//         'X-EBAY-API-CALL-NAME': 'GetNotificationPreferences'
//     }
// };



// var buffer = "";

// var req = request.post( requestOptions, function( error, response, body )    {
// 	console.log("BOREC");
// 	console.log(response.statusCode);
// 	parseString(body, function (err, result) {
// 	    console.dir(result.GetNotificationPreferencesResponse.UserDeliveryPreferenceArray[0].NotificationEnable);
// 	});
// });
