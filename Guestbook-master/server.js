// server.js
// load the things we need
var express = require("express");
var app = express();
var fs = require("fs");
app.use(express.static("public/index/"));
// set the view engine to ejs
app.set("view engine", "ejs");


//haetaan dataa guestbook tietokannasta //

app.get("/bookdata", function(req, res) {
const MongoClient = require("mongodb").MongoClient;

// Connection URL
const url = "mongodb://JuhoLaitinen:admin123@ds026018.mlab.com:26018/meankurssi";

// Database Name
const dbName = "meankurssi";

// yhteydenotto ja datan haku meankurssi tietokannasta ja sen guestbook1 nimisestät hakemistosta

MongoClient.connect(
  url,
  { useNewUrlParser: true },
  function(err, client) {
    if (err) console.log("Tapahtui virhe!");

    const db = client.db(dbName);
    // Query can be copied from Compass
    var query = {};
    db.collection("guestbook1")
      .find(query)
      .limit(10)
      .toArray(function(err, data) {
        if (err) throw err;
        console.log(data);

          res.render("pages/bookdata", { data: data });
      });
    client.close();
  });



});
app.listen(8081);
console.log("App is using port 8081");





// index page
app.get("/", function(req, res) {
  res.render("pages/index",{
    new_heading: "Guestbook Company",
    new_heading2: "Selite",
    new_heading3: "Guestbook"

  });

});
// Datan täyttö vieraskirjaan //
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

/* app.get("/guestbook", function(req, res) {
  res.sendFile(__dirname + "/adduser.html");
});*/


app.get("/guestbook", function(req, res) {
  res.render("pages/guestbook",{
    new_heading: "Guestbook"
  });
});
app.post("/guestbook", function(req, res) {
  const MongoClient = require("mongodb").MongoClient;

  const url = "mongodb://JuhoLaitinen:admin123@ds026018.mlab.com:26018/meankurssi";

  // Database Name
  const dbName = "meankurssi";

  var data = {
    Name: req.body.name,
    Age: req.body.age,
    Email: req.body.email,
    Comment: req.body.comment,
    Company: req.body.company,
    Date: new Date().toDateString()

  };

  MongoClient.connect(
    url,
    { useNewUrlParser: true },
    function(err, client) {
      if (err) console.log("Tapahtui virhe!");

      const db = client.db(dbName);
      // Insert a single document

      db.collection("guestbook1").insertOne(data, function(err, r) {
        console.log(r.insertedCount);

res.redirect("/bookdata")

          client.close();
        });
      });
    }
  );



  app.post("/admin", function(req, res) {
  const MongoClient = require("mongodb").MongoClient;

  // Connection URL
  const url = "mongodb://JuhoLaitinen:admin123@ds026018.mlab.com:26018/meankurssi";

  // Database Name
  const dbName = "meankurssi";



  // yhteydenotto ja datan haku meankurssi tietokannasta ja sen movies nimisestät hakemistosta

  MongoClient.connect(
    url,
    { useNewUrlParser: true },
    function(err, client) {
      if (err) console.log("Tapahtui virhe!");

      const db = client.db(dbName);
      // Query can be copied from Compass
      var query = {"Name": {$in: [req.body.name]}};
      db.collection("guestbook1").deleteOne(query, function(err, data){


    //    .find(query)
      //  .limit(10)
      //  .toArray(function(err, data) {
          if (err) throw err;
          console.log(data);

res.redirect("/admin")
        });
      client.close();
    });



  });

  app.get("/admin", function(req, res) {
    const MongoClient = require("mongodb").MongoClient;

    const url = "mongodb://JuhoLaitinen:admin123@ds026018.mlab.com:26018/meankurssi";

    // Database Name
    const dbName = "meankurssi";

    var data = {
      Name: req.body.name,
      Age: req.body.age,
      Email: req.body.email,
      Comment: req.body.comment,
      Company: req.body.company,
      Date: new Date().toDateString()



    };

    MongoClient.connect(
      url,
      { useNewUrlParser: true },
      function(err, client) {
        if (err) console.log("Tapahtui virhe!");

        const db = client.db(dbName);
        // Insert a single document

        var query = {};
        db.collection("guestbook1")
          .find(query)
          .limit(10)
          .toArray(function(err, data) {
            if (err) throw err;
            console.log(data);

              res.render("pages/admin", { data: data });
          });
        client.close();
      });



    });
    app.post("/modify", function(req, res) {
    const MongoClient = require("mongodb").MongoClient;

    // Connection URL
    const url = "mongodb://JuhoLaitinen:admin123@ds026018.mlab.com:26018/meankurssi";

    // Database Name
    const dbName = "meankurssi";



    // yhteydenotto ja datan haku meankurssi tietokannasta ja sen movies nimisestät hakemistosta

    const mongoose = require("mongoose");
  // Connecto to db
  mongoose.connect("mongodb://JuhoLaitinen:admin123@ds026018.mlab.com:26018/meankurssi");

  // Define data model for a cat
  const guestbook1 = mongoose.models.guestbook1 ||mongoose.model('guestbook1',{ Name: String });


  guestbook1.findOneAndUpdate(
    // username to find
    { Name: req.body.name },
    // username to update
    { Name: req.body.name1 },
    function(err, data) {
      if (err) throw err;

      // we have the updated user returned to us
      console.log(data);
    }
  );

  res.redirect("/modify")
          });

      //});



  //  });

    app.get("/modify", function(req, res) {
      const MongoClient = require("mongodb").MongoClient;
      const mongoose = require("mongoose");
  mongoose.connect("mongodb://JuhoLaitinen:admin123@ds026018.mlab.com:26018/meankurssi");
      const url = "mongodb://JuhoLaitinen:admin123@ds026018.mlab.com:26018/meankurssi";

      // Database Name
      const dbName = "meankurssi";

      var data = {
        Name: req.body.name,
        Name: req.body.name1,
        Age: req.body.age,
        Email: req.body.email,
        Comment: req.body.comment,
        Company: req.body.company,
        Date: new Date().toDateString()



      };

      MongoClient.connect(
        url,
        { useNewUrlParser: true },
        function(err, client) {
          if (err) console.log("Tapahtui virhe!");

          const db = client.db(dbName);
          // Insert a single document

          var query = {};
          db.collection("guestbook1")
            .find(query)
            .limit(10)
            .toArray(function(err, data) {
              if (err) throw err;
              console.log(data);

                res.render("pages/modify", { data: data });
            });
          client.close();
        });



      });

  /*var jsonStr = JSON.stringify(data);
  fs.writeFile("guestbookdata.json", jsonStr, err => {
    if (err) throw err;
    console.log("it's saved!");
  });
  res.statusCode = 302;
  res.setHeader("Location", "http://localhost:8081/bookdata");
  res.end();
});
//tulostus taulukkoon //
/*app.get("/bookdata", function(req, res) {
  var data = require("./guestbookdata.json");

  //parse results

  res.render("pages/bookdata", { data: data });
});
app.listen(8081);
console.log("App is using port 8081"); */
