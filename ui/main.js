console.log('Loaded!');
// change the text of main text div
//var element = document.getElementById('main-text');
//element.innerHTML = "Lets do something new";
var button = document.getElementById('counter');
var counter = 0;
button.onClick = function(){
  //make a response to the counter endpint
  
  
  //capture the response and store into variable.
  
  //render the variable in the correct span.
  counter = counter +1;
  var span = document.getElementById('count');
  span.innerHTML = counter.toString();
}; 
