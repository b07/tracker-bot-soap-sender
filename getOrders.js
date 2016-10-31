"use strict"

var request = require('request');
var xmlbuilder = require('xmlbuilder');
var parseString = require('xml2js').parseString;
var fs = require('fs')

fs.readFile('goReq.txt', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  //console.log(data);
  var requestOptions = {
      //url: 'https://pure-fortress-41479.herokuapp.com/notify',
      // url: "http://localhost:4000/notify",
      url: "https://api.ebay.com/ws/api.dll",
      body: data,
      headers: {
          "content-type": "text/xml;charset=utf-8",
          'X-EBAY-API-SITEID': 0,
          'X-EBAY-API-COMPATIBILITY-LEVEL': 967,
          'X-EBAY-API-CALL-NAME': 'GetOrders'
      }
  };
  var req = request.post( requestOptions, function( error, response, body )    {
     console.log("BOREC");
     console.log(response.statusCode);
     parseString(body, function (err, result) {
         console.dir(result.GetOrdersResponse.OrderArray[0].Order);
     });
  });
});
