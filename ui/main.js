console.log('Loaded!');
// change the text of main text div
var element = document.getElementById('main-text');
element.innerHTML = "Lets do something new";
//animate image
var main = function() {
  $('#mj').click(function() {
    $('#mj').animate({
      left: '220px'
    }, 200);

  });
};