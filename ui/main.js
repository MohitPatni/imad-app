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

var submit = document.getElementById('submit_button1');

submit.onclick = function() {
//function myfun(){
    //Create a request object
 
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
                  //register.value = 'Register';
              }
          }
        };

  //make the request
   var username = document.getElementById('user_name').value;
        var password = document.getElementById('mypassword').value;
        console.log(username);
        console.log(password);
        request.open('POST', '/create-user', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({username: username, password: password}));  
    
 
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
}

 
 

