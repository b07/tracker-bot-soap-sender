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
        // console.log(result);
        var orders = result.GetOrdersResponse.OrderArray[0].Order;
        for (var i = orders.length - 1; i >= 0; i--) {
          console.log(parseOrderFromOrderArray(orders[i]));
        };
        // console.log(parseOrder(order));
         // console.dir(result.GetOrdersResponse.OrderArray[0].Order[0]);
         // console.dir(result.GetOrdersResponse.OrderArray[0].Order[0].TransactionArray[0].Transaction[0].Buyer);
     });
  });
});


function parseOrderFromOrderArray(order) {
  var out = {};
  out.orderId = order.OrderID[0];
  out.itemId = order.TransactionArray[0].Transaction[0].Item[0] .ItemID[0];
  out.name = order.ShippingAddress[0].Name[0];
  out.EIASToken = order.EIASToken[0];
  out.street = order.ShippingAddress[0].Street1[0];
  out.receive_time = Math.floor(Date.now()/1000);
  out.item_title = order.TransactionArray[0].Transaction[0].Item[0] .Title[0];
  out.price = parseFloat(order.TransactionArray[0].Transaction[0].TransactionPrice[0]['_']);
  out.url = "http://www.ebay.com/sch/i.html?_nkw=" + out.itemId;
  return out;
}