var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyParser = require('body-parser');
var session = require('express-session');
var config = {
    
    user: 'mohitpatni293',
    database: 'mohitpatni293',
    host:'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};
var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(session({
    secret: 'someRandomSecretValue',
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 30}
}));

function createTemplate (data){
   var title = data.title;
   var heading = data.heading;
   var date = data.date;
   var content = data.content;
var htmlTemplate =`
    <html>
        <head>
            <title>
                ${title}
            </title>
             <meta name="viewport" content="width=device-width, initial-scale=1">
              <link href="/ui/style.css" rel="stylesheet" />
        </head>
        <body>
            <div class="container">
            <div class ="menu" >
    
                 <a href="/">Home</a>
               
                   </div>
            <br/>
            <hr/>
            <h4>
           ${heading}
            </h4>
            <div>
               ${date.toDateString()}
            </div>
            <div>
                ${content}
            </div>
            </div>
            </body>
    </html>
    `;
    return htmlTemplate;
}
    
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

function hash(input,salt){
//how to create a hash
var hashed = crypto.pbkdf2Sync(input,salt,10000,512,'sha512');
return ["pbkdf2","10000",salt,hashed.toString('hex')].join('$');
    }
app.get('/hash/:input', function (req, res){
   var hashedString = hash(req.params.input,'this is some random string');
   res.send(hashedString);
   
   /* algorithm md5
    (if use thi algo value is always so hacker store it in own table)
    'password' => 66gaefg211fgsf1f1b2fbd21bbdergr15
    "password-this-is-some-random-string" => 5dvsafb1adg5dfb15dfs1b5s1fb5ds1b5se1b(completely different hah value and no table in the world which stor this particular hash value)
    "password" => "password-this-is-salt" => <hash> => <hash> => <hash> * 10k times*/
});

app.post('/create-user', function (req, res) {
   // username, password
   // {"username": "tanmai", "password": "password"}
   // JSON
   var username = req.body.username;
   var password = req.body.password;
   var salt = crypto.randomBytes(128).toString('hex');
   var dbString = hash(password, salt);
   pool.query('INSERT INTO "user" (username, password) VALUES ($1, $2)', [username, dbString], function (err, result) {
      if (err) {
          res.status(500).send(err.toString());
      } else {
          res.send('User successfully created: ' + username);
      }
   });
});

app.post('/login', function (req, res) {
   var username = req.body.username;
   var password = req.body.password;
   
   pool.query('SELECT * FROM "user" WHERE username = $1', [username], function (err, result) {
      if (err) {
          res.status(500).send(err.toString());
      } else {
          if (result.rows.length === 0) {
              res.status(403).send('username/password is invalid');
          } else {
              // Match the password
              var dbString = result.rows[0].password;
              var salt = dbString.split('$')[2];
              var hashedPassword = hash(password, salt); // Creating a hash based on the password submitted and the original salt
              if (hashedPassword === dbString) {
                
                // Set the session
                req.session.auth = {userId: result.rows[0].id};
                // set cookie with a session id
                // internally, on the server side, it maps the session id to an object
                // { auth: {userId }}
                
                res.send('credentials correct!');
                
              } else {
                res.status(403).send('username/password is invalid');
              }
          }
      }
   });
});

app.get('/check-login', function (req, res){
    if (req.session && req.session.auth && req.session.auth.userId ){
        res.send('you are loged in : ' +req.session.auth.userId.toString());
    } else {
        res.send('you are not loged in');
    }
    
});

app.get('/logout', function(req, res){
   delete req.session.auth;
   res.send('Logged out');
});


var pool = new Pool(config);

app.get('/get-articles', function (req, res) {
   // make a select request
   // return a response with the results
   pool.query('SELECT * FROM article ORDER BY date DESC', function (err, result) {
      if (err) {
          res.status(500).send(err.toString());
      } else {
          res.send(JSON.stringify(result.rows));
      }
   });
});

app.get('/get-comments/:articleName', function (req, res) {
   // make a select request
   // return a response with the results
   pool.query('SELECT comment.*, "user".username FROM article, comment, "user" WHERE article.title = $1 AND article.id = comment.article_id AND comment.user_id = "user".id ORDER BY comment.timestamp DESC', [req.params.articleName], function (err, result) {
      if (err) {
          res.status(500).send(err.toString());
      } else {
          res.send(JSON.stringify(result.rows));
      }
   });
});

app.post('/submit-comment/:articleName', function (req, res) {
   // Check if the user is logged in
    if (req.session && req.session.auth && req.session.auth.userId) {
        // First check if the article exists and get the article-id
        pool.query('SELECT * from article where title = $1', [req.params.articleName], function (err, result) {
            if (err) {
                res.status(500).send(err.toString());
            } else {
                if (result.rows.length === 0) {
                    res.status(400).send('Article not found');
                } else {
                    var articleId = result.rows[0].id;
                    // Now insert the right comment for this article
                    pool.query(
                        "INSERT INTO comment (comment, article_id, user_id) VALUES ($1, $2, $3)",
                        [req.body.comment, articleId, req.session.auth.userId],
                        function (err, result) {
                            if (err) {
                                res.status(500).send(err.toString());
                            } else {
                                res.status(200).send('Comment inserted!');
                            }
                        });
                }
            }
       });     
    } else {
        res.status(403).send('Only logged in users can comment');
    }
});

app.get('/articles/:articleName', function (req, res) {
  // SELECT * FROM article WHERE title = '\'; DELETE WHERE a = \'asdf'
  pool.query("SELECT * FROM article WHERE title = $1", [req.params.articleName], function (err, result) {
    if (err) {
        res.status(500).send(err.toString());
    } else {
        if (result.rows.length === 0) {
            res.status(404).send('Article not found');
        } else {
            var articleData = result.rows[0];
            res.send(createTemplate(articleData));
        }
    }
  });
});

var pool = new Pool(config);
app.get('/db-test', function (req, res) {
//     //make a select request
//     //return a response with the result 
    pool.query('SELECT * FROM test',function(err ,result){
       if(err) {
           res.status(500).send(err.toString());
            } else {
            res.send(JSON.stringify(result.rows));
     }
 });
});


var counter = 0;
app.get('/counter', function (req, res){
    counter = counter + 1;
   res.send(counter.toString()); 
});


var names =[];
app.get('/submit-name' , function(req,res){ // URL:  /submit-name?name = xxx
  //get the name from the request
  var name = req.query.name;//extract name
  names.push(name);
  //JOSON javascrpit Object Notation
  res.send(JSON.stringify(names));//json coverting aray into a string
});


app.get('/profile', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'profile.html'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});




// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
