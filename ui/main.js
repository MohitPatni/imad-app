//console.log('Loaded!');
// change the text of main text div
//var element = document.getElementById('main-text');
//element.innerHTML = "Lets do something new";


//capture the list of name and rander it
          //counter  
      
var button = document.getElementById('counter');

button.onclick = function(){
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





//submit name
var submit = document.getElementById('submit_btn');
submit.onclick = function() {
    
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
}; 
 
     //comment
 var commentInput = document.getElementById('commentid');
 var comment = commentInput.value;
 var submit = document.getElementById('submit_id');
    submit.onclick = function() {

    //Create a request object
   var request  = new XMLHttpRequest();
   request.onreadystatechange = function () {
    if(request.readyState === XMLHttpRequest.DONE) {
       if(request.status === 200){
         var comments = request.responseText;//request.responseText;
            comments = JSON.parase(comments);// convert a string back into an array.
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
    request.open('GET', 'http://mohitpatni293.imad.hasura-app.io/comment-one/'+comment, true);
  request.send(null);
};
   
