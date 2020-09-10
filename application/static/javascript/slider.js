

$('#slider').on('input change',function(){
$('#cluster-number').val($(this).val());
});

$('#cluster-number').keyup(function(e){
  if (e.keyCode==13) {   //only activates after pressing Enter key
  var val = $(this).val().replace(/\D/g,'');   // check only for digits
  $('#slider').val(val);
  }
});

