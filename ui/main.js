//console.log('Loaded!');
// change the text of main text div
//var element = document.getElementById('main-text');
//element.innerHTML = "Lets do something new";

         //submit name
/*var submit = document.getElementById('submit_btn');

submit.onclick=function() {
    
    //Create a request object
  var request  = new XMLHttpRequest();
  
  //capture the response and store into variable.
  request.onreadystatechange = function () {
    if(request.readyState === XMLHttpRequest.DONE) {
        //take some action
         if(request.status === 200){
            //capture the list of name and rander it
             var names = request.responseText;
             names = JSON.parse(names);// convert a string back into an array.
             var list ='';
             for (var i=0 ; i < names.length ; i++){
                     list += '<li>'+ names[i] +'</li>';
                    }
            var ul =  document.getElementById('namelist');
            ul.innerHTML = list;
        }
    }
    //Not done yet
  };

  //make the request
 var nameInput = document.getElementById('name');
 var name = nameInput.value;
  request.open('GET', 'http://mohitpatni293.imad.hasura-app.io/submit-name?name='+ name, true);
  request.send(null);
}; */
/*function loadLoginForm () {
    var loginHtml = `
        <h3>Login/Register to unlock awesome features</h3>
        <input type="text" id="username" placeholder="username" />
        <input type="password" id="password" />
        <br/><br/>
        <input type="submit" id="login_btn" value="Login" />
        <input type="submit" id="register_btn" value="Register" />
        `;
    document.getElementById('login_area').innerHTML = loginHtml;
    
//login username password
var submit = document.getElementById('submit_button');

submit.onclick = function() {
//function myfun(){
    //Create a request object
  var request  = new XMLHttpRequest();
  
  //capture the response and store into variable.
  request.onreadystatechange = function () {
    if(request.readyState === XMLHttpRequest.DONE) {
        //take some action
         if(request.status === 200){
            //capture the list of name and rander it
           console.log('User loged in');
           alert('loged in successfully');
        }else if (request.status === 403){
         alert('Username/Password incorrect');   
        } else if (request.status === 500) {
            alert('Something went wrong on server');
        }
    }
    //Not done yet
  };

  //make the request
 var username = document.getElementById('username').value;
 var password = document.getElementById('password').value;
 console.log(username);
 console.log(password);
  request.open('POST', 'http://mohitpatni293.imad.hasura-app.io/login', true);
  request.setRequestHeader('Content-Type', 'application/json');
  request.send(JSON.stringify( {username: username, password: password} ) );
};

   var register = document.getElementById('submit_button1');
    register.onclick = function () {
        // Create a request object
        var request = new XMLHttpRequest();
        
        // Capture the response and store it in a variable
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
              // Take some action
              if (request.status === 200) {
                  alert('User created successfully');
                  register.value = 'Registered!';
              } else {
                  alert('Could not register the user');
                  register.value = 'Register';
              }
          }
        };
        
        // Make the request
        var username = document.getElementById('user_name').value;
        var password = document.getElementById('mypassword').value;
        console.log(username);
        console.log(password);
        request.open('POST', 'http://mohitpatni293.imad.hasura-app.io/create-user', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({username: username, password: password}));  
        register.value = 'Registering...';
    
    };

 //counter  
      var button = document.getElementById('counter');

button.onclick=function(){
  //Create a request object
  var request  = new XMLHttpRequest();
  
  //capture the response and store into variable.
  request.onreadystatechange = function () {
    if(request.readyState === XMLHttpRequest.DONE) {
        //take some action 
        if(request.status === 200){
            var counter = request.responseText;
            var span = document.getElementById('count');
            span.innerHTML = counter.toString();
        }
    }
   
  };
  //make the request 
  request.open('GET', 'http://mohitpatni293.imad.hasura-app.io/counter', true);
  request.send(null);
}; 


         //comment
          var commentInput = document.getElementById('commentid');
 var comment = commentInput.value;
 function fun1() {
  document.getElementById('submit_id').submit;
    //Create a request object
   var request  = new XMLHttpRequest();
   request.onreadystatechange = function () {
    if(request.readyState === XMLHttpRequest.DONE) {
       if(request.status === 200){
         var comments = request.responseText;//request.responseText;
             comments = JSON.parse(comments);  // convert a string back into an array.
             var list ='';
             for (var i=0 ; i < comments.length ; i++){
                     list += '<li>'+ comments[i] +'</li>';
                    }
            var ul =  document.getElementById('commentlist');
            ul.innerHTML = list; 
       }
  //takr a action
     
    }
     };
  //capture the response and store into variable.
 //Not done yet
 var commentInput = document.getElementById('commentid');
 var comment = commentInput.value;
    request.open('GET', 'http://mohitpatni293.imad.hasura-app.io/comment-one?comment='+comment, true);
  request.send(null);
}*/

function loadLoginForm () {
    var loginHtml = `
        <h3>Login/Register to unlock awesome features</h3>
        <input type="text" id="username" placeholder="username" />
        <input type="password" id="password" />
        <br/><br/>
        <input type="submit" id="login_btn" value="Login" />
        <input type="submit" id="register_btn" value="Register" />
        `;
    document.getElementById('login_area').innerHTML = loginHtml;
    
    // Submit username/password to login
    var submit = document.getElementById('login_btn');
    submit.onclick = function () {
        // Create a request object
        var request = new XMLHttpRequest();
        
        // Capture the response and store it in a variable
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
              // Take some action
              if (request.status === 200) {
                  submit.value = 'Sucess!';
              } else if (request.status === 403) {
                  submit.value = 'Invalid credentials. Try again?';
              } else if (request.status === 500) {
                  alert('Something went wrong on the server');
                  submit.value = 'Login';
              } else {
                  alert('Something went wrong on the server');
                  submit.value = 'Login';
              }
              loadLogin();
          }  
          // Not done yet
        };
        
        // Make the request
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        console.log(username);
        console.log(password);
        request.open('POST', 'http://mohitpatni293.imad.hasura-app.io/login', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({username: username, password: password}));  
        submit.value = 'Logging in...';
        
    };
    
    var register = document.getElementById('register_btn');
    register.onclick = function () {
        // Create a request object
        var request = new XMLHttpRequest();
        
        // Capture the response and store it in a variable
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
              // Take some action
              if (request.status === 200) {
                  alert('User created successfully');
                  register.value = 'Registered!';
              } else {
                  alert('Could not register the user');
                  register.value = 'Register';
              }
          }
        };
        
        // Make the request
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        console.log(username);
        console.log(password);
        request.open('POST', 'http://mohitpatni293.imad.hasura-app.io/create-user', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({username: username, password: password}));  
        register.value = 'Registering...';
    
    };
}

function loadLoggedInUser (username) {
    var loginArea = document.getElementById('login_area');
    loginArea.innerHTML = `
        <h3> Hi <i>${username}</i></h3>
        <a href="/logout">Logout</a>
    `;
}

function loadLogin () {
    // Check if the user is already logged in
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                loadLoggedInUser(this.responseText);
            } else {
                loadLoginForm();
            }
        }
    };
    
    request.open('GET', 'http://mohitpatni293.imad.hasura-app.io/check-login', true);
    request.send(null);
}

function loadArticles () {
        // Check if the user is already logged in
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            var articles = document.getElementById('articles');
            if (request.status === 200) {
                var content = '<ul>';
                var articleData = JSON.parse(this.responseText);
                for (var i=0; i< articleData.length; i++) {
                    content += `<li>
                    <a href="/articles/${articleData[i].title}">${articleData[i].heading}</a>
                    (${articleData[i].date.split('T')[0]})</li>`;
                }
                content += "</ul>";
                articles.innerHTML = content;
            } else {
                articles.innerHTML('Oops! Could not load all articles!');
            }
        }
    };
    
    request.open('GET', 'http://mohitpatni293.imad.hasura-app.io/get-articles', true);
    request.send(null);
}


// The first thing to do is to check if the user is logged in!
loadLogin();

// Now this is something that we could have directly done on the server-side using templating too!
loadArticles();
 
 

