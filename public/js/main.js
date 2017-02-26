$(document).ready(function(){
  $('.signup_form').on('submit', function(event){
    var formJSON = $('.signup_form').serializeJSON();
    event.preventDefault();
    submitUserData(formJSON);
  })
});

function submitUserData( formJSON ){
  $.ajax({
    type: "POST",
    url: '/save-user',
    data: formJSON,
    success: hideFormShowSuccess
  });
}

function hideFormShowSuccess(){
  $('.signup-form-wrap').fadeOut(function(){
    $('.signup-form-success-wrap').fadeIn();
  });
}
