var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));


var articles = {
            'article-one' : {
    title: 'Article One|Mohit Patni',
    heading: 'Article one',
    date: 'Feb 15 2018',
    content: `
            <p>
            Hi, My Name Is Mohit Patni.
            </p>
            <p>
            I have done B.sc in Computer science from DAVV university Indore with 66%.As my roots are from Sonkatch. So I completed my 12<sup>th</sup> from SP School with 77%
            </p>
            <p>
            I am fresher but
            </p>
            <p>
            My strengths are my attitude that I like to take challenges that I CAN do it, self motivated person, self disciplined I am a good team player as well as has a good ability to lead the team. I can adopt to any kind of environment. I am a good listener and quick learner.
            </p>
            <p>
            My short term goal is to get placed in a reputed company which will give me an opportunity to enhance my skills and Knowledge.
            </p>
            <p>
            My long term goal would be reaching the higher position in company like CEO.
            </p>
            
            `
            },
            'article-two' : {
            title: 'Article Two|Mohit Patni',
            heading: 'Article Two',
             date: 'Feb 16 2018',
             content: `
            <p>
            Hi, My Name Is Mohit Patni.
            </p>
            <p>
            My long term goal would be reaching the higher position in company like CEO.
            </p>
            
       
            `},
            'article-three' : { 
            title: 'Article Three|Mohit Patni',
            heading: 'Article Three',
            date: 'Feb 16 2018',
            content: `
            <p>
            Hi, My Name Is Mohit Patni.
            </p>
            <p>
            My long term goal would be reaching the higher position in company like CEO.
            </p>
            `}
};
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
            <meta name="viewport" content="width-device-width,intial-scale=1">
              <link href="/ui/style.css" rel="stylesheet" />
        </head>
        <body>
            <div class="container">
            <div>
                <a href="/">Home</a>
            </div>
            <hr/>
            <h4>
           ${heading}
            </h4>
            <div>
               ${date}
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

app.get('/comment', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'commentme.html'));
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




app.get('/:articleName',function(req,res){
    //articleName == article-one
    //articles[articleName] == {} content object of article one
    var articleName = req.params.articleName;//extract the article name and use in article obj.
     res.send(createTemplate(articles[articleName]));
});
var comments= [];
app.get('/articleOne-comment', function(req, res){
     var comment = req.params.comment;//extract name
  comments.push(comment);
  //JOSON javascrpit Object Notation
  res.send(JSON.stringify(comments));//json coverting aray into a string
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
