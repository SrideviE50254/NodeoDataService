var http = require("http");
var express = require("express");
var request = require("request");
var app = express();
var url = 'http://itcf4d.intern.itelligence.de:8000/sap/opu/odata/ITS/DAIRY_COCKPIT_SRV/';
var auth = 'Basic ' + new Buffer("IN21598" + ':' + "Dattasai*1").toString('base64');

app.get('/', function (req, res) {
    
    var csrfToken;
    request({
              url:url+"VendorF4HelpSet?$format=json&sap-client=400",
              headers:{
                "Authorization":auth,
                "Content-Type":"application/json",
                "x-csrf-token":"Fetch"
              }
      
    }, function (error, response, body) {
      if (!error && response.statusCode == 200) {   
          csrfToken = response.headers['x-csrf-token'];
          console.log(csrfToken);
          res.json(body);
      }
    });
})

app.listen(process.env.PORT || 8080, process.env.IP || "0.0.0.0", function(){
  console.log("App started");
});