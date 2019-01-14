var express = require('express'); // require Express
var router = express.Router(); // setup usage of the Express router engine

/* PostgreSQL and PostGIS module and connection setup */
const { Client, Query } = require('pg')

// Setup connection
var username = "postgres" // sandbox username
var password = "root" // read only privileges on our table
var host = "localhost:5432"
var database = "newmap" // database name
var conString = "postgres://"+username+":"+password+"@"+host+"/"+database; // Your Database Connection




var utilitie = `SELECT row_to_json(fc) FROM (
	SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features FROM (
		SELECT 'Feature' As type, ST_AsGeoJSON(lg.location)::json As geometry,
		row_to_json((id, feature_type)) As properties FROM utilities_table As lg
	) As f
) As fc`;

router.get('/utility', function (req, res) {
  var client = new Client(conString);
  client.connect();
  var query = client.query(new Query(utilitie));
  query.on("row", function (row, result) {
      result.addRow(row);
  });
  query.on("end", function (result) {
      res.send(result.rows[0].row_to_json);
      res.end();
  });

})








// tais is ministries table 
// Set up your database query to display GeoJSON
var minister = `SELECT  id,  "ministry_name"  from public.ministries_table`;

/* GET Postgres JSON data */
router.get('/ministeres', function (req, res) {
  var client = new Client(conString);
  client.connect();
  var query = client.query(new Query(minister));
  var add=[];
  query.on('row', function(row) {
      add.push(row);
  });
  query.on('end', function() {
      //console.log(add);
    return res.json(add);
  }); 
})


// Set up your database query to display GeoJSON
var test = `SELECT  id ,"department_name" from public.ministrydepartments_table `;

/* GET Postgres JSON data */
router.get('/department', function (req, res) {
  var client = new Client(conString);
  client.connect();
  var query = client.query(new Query(test));
  var add=[];
  query.on('row', function(row) {
      add.push(row);
  });
  query.on('end', function() {
      //console.log(add);
    return res.json(add);
  }); 
});



// Set up your database query to display GeoJSON
var Subcat = `SELECT id, name from public.subcategory_table;`;

/* GET Postgres JSON data */
router.get('/subcat', function (req, res) {
  var client = new Client(conString);
  client.connect();
  var query = client.query(new Query(Subcat));
  var add=[];
  query.on('row', function(row) {
      add.push(row);
  });
  query.on('end', function() {
      //console.log(add);
    return res.json(add);
  }); 
})

// Set up your database query to display GeoJSON
var inister = `SELECT id, name,subcategory_id from public.feature_table;`;

/* GET Postgres JSON data */
router.get('/subfeature', function (req, res) {
   var client = new Client(conString);
  client.connect();
  var query = client.query(new Query(inister));
  var add=[];
  query.on('row', function(row) {
      add.push(row);
  });
  query.on('end', function() {
      //console.log(add);
    return res.json(add);
  }); 
})

// Set up your database query to display GeoJSON
var Users = `SELECT id, name from public.users;`;

/* GET Postgres JSON data */
router.get('/users', function (req, res) {
  var client = new Client(conString);
  client.connect();
  var query = client.query(new Query(Users));
  var add=[];
  query.on('row', function(row) {
      add.push(row);
  });
  query.on('end', function() {
     // console.log(add);
    return res.json(add);
  }); 
})
 


router.get('/feat/:id',function(req, res){
  var add=req.params.id; 
     //Geting id from request parameter
     // console.log("categories name",add);
      var demo = `Select id,name  FROM feature_table  WHERE subcategory_id ='${add}'`  
console.log(demo);
 var a=[];
   var client = new Client(conString);
    client.connect();
    var query = client.query(new Query(demo));

          query.on('row', function(row) {
            a.push(row);
        });
        query.on('end', function() {
            //console.log("fgdfgdfg",a);
         // return res.json();
          return  res.json(a);
        });
       });


       // Select the taluka and open whole village 
router.get('/Done/:name',function(req, res){

  var add= [];
  console.log('select',add);

})



router.get('/minst/:id',function(req, res){
  var add=req.params.id; 
     //Geting id from request parameter
      console.log("department_id",add);
      var demoMinster = `Select id, department_name  FROM ministrydepartments_table  WHERE ministry_id  ='${add}'`  
      console.log(demoMinster);
      var a=[];
        var client = new Client(conString);
         client.connect();
         var query = client.query(new Query(demoMinster));
            query.on('row', function(row) {
                 a.push(row);
             });
             query.on('end', function() {
                 console.log("fgdfgdfg",a);
            // return res.json();
               return  res.json(a);
             });
            });

       
              // Select the taluka and open whole village 
router.get('/Depart/:department_name',function(req, res){
  var add= [];
   console.log('select',add);
 
 })


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;