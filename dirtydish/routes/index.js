var express = require('express');
var router = express.Router();
var https = require('https');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'DirtyDish', description: 'DirtyDish is on its way!!!' });
});

function restaurant() {
	this.id: '',
	this.name: '',
	this.locality : '',
	this.street_address: '', 
	this.cuisines : '',
	this.region : '',
	this.lng: '',
	this.phone : '',
	this.postal_code : '',
	this.has_menu: '',
	this.country : '',
	this.lat: '',
	this.locu_id: '',
	this.website_url : '',
	this.twitter_id: '',
	this.similar_ven : '',
	this.open_hours: '',
	this.added datetime: '',
	this.menu_json text: '',
	this.last_modified datetime: ''
};

function restaurantService(req) {

	this.restaurantExistsInDB = function(locu_id) {

		req.getConnection(function(err,conn){
			if (err) return next("Cannot Connect");
			var query = conn.query("SELECT id FROM restaurant where locu_id = '?'", locu_id, function(err,rows){
			if(err){
				console.log(err);
				return next("Mysql error, check your query");
			}
			return rows[0].id!=undefined?true:false;
        	});

	};
};

function open_hours() {
	id: '',
	restaurant_id: '',
	week_day: '',
	open: '',
	close: ''
};

function menu() {
	id:'',
        restaurant_id: '',
	menu_name:'',
	currency_symbol:''
};

function menu_section() {
	menu_id:'',
	section_name:''
}

function menu_section_subsection() {
	id:'',
	section_id:'',
	subsection_name:'',
	section_text1:'',
        section_text2:'',
        section_text3:'',
        section_text4:'',
        section_text5:''
};

function menu_section_subsection_item() {
	id:'',
	subsection_id:'',
	name:'',
	description:'',
	price:'',
	photos:''
};

function optiongroup() {
	id:'',
	item_id:'',
	type:'',
	text:'',
	description:''
};

function optiongroup_option() {
	id:'',
	optiongroup:'',
	name:'',
	price:''
};

function externalids() {
	id:'',
	restaurant_id:'',
	external_id:'',
	url:'',
	mobile_url:''
};

function delivery() {
	id: '',
	restaurant_id:'',
	will_deliver:'',
	hours:'',
	minimum_order:'',
	areas:''
};

function media() {
	id:'',
	restaurant_id:'',
	cover_photo:'',
	venue_photos:'',
	menu_photos:'',
	logos:'',
	videos:''
};


router.get('/restaurant/:v', function(req, res, next) {

/*
req.getConnection(function(err,conn){

        if (err) return next("Cannot Connect");

        var query = conn.query("SELECT * FROM testtable ", function(err,rows){

            if(err){
                console.log(err);
                return next("Mysql error, check your query");
            }
		res.render('index', { title: rows[0].fn, description: ''});
        });

    });
*/
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
  var str = '';
  var req2 = https.request(options, function(res2){
	res2.on('data', function(d){
		str += d;
	});
	res2.on('end', function(){
		var jd = JSON.parse(str);
		res.render('search', { title: 'DirtyDish', results: jd.objects, search: search });
	});
  });
  req2.end();
  req2.on('error', function (e) {
    console.log(e.message);
  });
});

module.exports = router;
