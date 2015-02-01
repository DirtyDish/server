var express = require('express');
var router = express.Router();
var https = require('https');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'DirtyDish', description: 'DirtyDish is on its way!!!' });
});

router.get('/restaurant/:v', function(req, res, next) {
  var v = req.param("v");
  var locu = 'api.locu.com';
  var options = {
    hostname: locu,
    port: 443,
    path: '/v1_0/venue/'+v+'/?api_key=3bcdf4f86e625369901fe9258e924c83105cdafa',
    method: 'GET'
  };
  var str = '';
  var req2 = https.request(options, function(res2){
        res2.on('data', function(d){
          	str += d;               
        });
	res2.on('end', function(){
 		var jd = JSON.parse(str);
                res.render('restaurant', { title: 'DirtyDish', jd: jd.objects[0]});
	});
  });
  req2.end();
  req2.on('error', function (e) {
    console.log(e.message);
  });
});

router.post('/search', function(req, res, next) {
  var search = req.body.search;
  var locu = 'api.locu.com';  
  var options = {
    hostname: locu,
    port: 443,
    path: '/v1_0/venue/search/?name='+search+'&locality=toronto&api_key=3bcdf4f86e625369901fe9258e924c83105cdafa',
    method: 'GET'
  };
  var req2 = https.request(options, function(res2){
	res2.on('data', function(d){
		var jd = JSON.parse(d);
		
		res.render('search', { title: 'DirtyDish', results: jd.objects, search: search });
	});
  });
  req2.end();
  req2.on('error', function (e) {
    console.log(e.message);
  });
});

module.exports = router;
