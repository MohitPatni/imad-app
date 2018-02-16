console.log('Loaded!');
// change the text of main text div
//var element = document.getElementById('main-text');
//element.innerHTML = "Lets do something new";
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
    //Not done yet
  };
  //make a request 
  request.open('GET', 'http://mohitpatni293.imad.hasura-app.io/counter', true);
  request.send(null);
}; 
//submit name
var nameinput = document.getElementById('name');
var name = nameinput.value;
var submit = document.getElementById('submit_btn');
submit.onclick = function(){
    //make arequest to the server and send the name
    
    //capture the list of name and rander it
    var name = ['name1','name2','name3','name4'];
    var list ='';
    for (var i=0;i<name.length;i++){
    list = '<li>'+ name +'</li>';
}
var ui =  document.getElementById('namelist');
ui.innerHTML.list;
        };