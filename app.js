$(function() {
    FastClick.attach(document.body);
});
$('#input').on('paste', function(e){
  var target = $(e.target);
  var val = target.val();
  var bad = new RegExp('[^' + 'x0123456789\ \^\÷\/\(\)*+\-' + ']', 'g');
  val = val.replace(bad, '');
  $(e.target).val(val);
}).on('keydown', function(e){
  if ((e.which >= 96 && e.which <= 111) ||
      (e.which >= 48 && e.which <= 57) ||
      (e.which >= 37 && e.which <= 40) ||
      (e.which >= 189 && e.which <= 191) ||
      (e.which >= 91 && e.which <= 93) ||
     e.which == 187 ||
     e.which == 88 ||
     e.which == 86 ||
     e.which == 32 ||
     e.which == 16 ||
     e.which == 9 ||
     e.which == 8) {
  } else {
      e.preventDefault();
  }
}).on('keyup change', function(){calc();});

$('#keys div').click(function(e){
  $('#input').val($('input').val() + $(e.target).text());
  calc();
});
var calc = function() {
  var target = $('#input'),
      val = target.val(),
      bad = new RegExp('[^' + 'x.0-9\÷\/\ \(\)\*\+\-' + ']', 'g'),
      originalval = val,
      previousval = $('#result').text();
  val = val.replace(bad, '');
  if (val != originalval) {
    target.val(val);
  }
  val = val.replace(/x/g, '*')
           .replace(/÷/g, '/');
  try {
    val = eval(val);
    $('#result').removeClass('error');
  } catch (e) {
    $('#result').addClass('error');
    val= previousval;
  }
  console.log('"' + val + '"');
  if ((val || val === 0) && $('#input').val() != val) {
    $('#result').text(val);
  } else if (val === '' || val == ' ') {
    $('#result').removeClass('error').text('')
  } else if (val === undefined || $('#input').val() == val) {
    $('#result').removeClass('error').text('')
  }
};
$('.clearbutton').click(function(){
  $('#input').val('');
  calc();
})
$('#result').click(function(){
  $('#input').val($('#result').text());
  calc();
})
