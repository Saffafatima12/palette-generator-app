
// READING IMAGE //   
   

let base64Image;
$(".file-upload-input").change(function() {
    let reader = new FileReader();
    reader.onload = function(e) {
        let dataURL = reader.result;
        $('.file-upload-image').attr("src", dataURL);
        base64Image = dataURL.replace("data:image/png;base64,","");
        console.log(base64Image);
    }
    
    
      reader.readAsDataURL($(".file-upload-input")[0].files[0]);   // TO READ EMPTY WHEN NO IMAGE OR TEXT //
      $("color_1").text("");
      $("color_2").text("");
      $("color_3").text("");
      $("color_4").text("");
      $("color_5").text("");
      $("color_6").text("");

});
    
    
    
// WHEN PREDICT BUTTON IS CLICKED //    

$("#predict-button").click(function(){
    
    $("#loading").text( "Relax, I am figuring it out..."); // MESSAGE TO TELL THE USER TO WAIT
    $(".sk-cube-grid").show();
    
    // hide normally!
    let message = { // COLLECT THE INPUTS FROM USER AS JSON
        image: base64Image,
        name: $("#cluster-number").val()
    }
    
    console.log(message);

        
    // POPULATE THE COLOR NAMES AND CIRCLES 
        
    $.post("http://127.0.0.1:5000/", JSON.stringify(message), function(response){
            
       $.each( response, function( i, val ) {
         $( "#color_" + i ).text( val);
         $( "#circle_" + i ).css( "background-color", val);
         $( "#color_" + i ).css( "color", val);
       
            
       });
            
       console.log(response);
        
       });       
          
    }); 
    
    


// TO ERASE THE LOADING STATEMENT WHEN THE COLORS LOAD    
    
$("body").on('DOMSubtreeModified', "#color_1", function(){
   // console.log("changed");
      $("#loading").empty();
      $(".sk-cube-grid").hide();
});
   
   
// TO ERASE THE LOADING ICON WHEN THE PAGE IS LOADED

$(document).ready(function() {
  $(".sk-cube-grid").hide();
});
   
   
   
    
// TO ERASE THE OLD COLORS BEFORE THE NEW ONES ARE DISPLAYED 
 
$("#reset-button").click(function(){
      $(".clear").text(".");
      $(".clear1").css( "background-color", "white");
     

});  
 

// FOR THE UPLOAD BUTTON

var btnUpload = $("#upload_file"),
		btnOuter = $(".button_outer");
	btnUpload.on("change", function(e){
		var ext = btnUpload.val().split('.').pop().toLowerCase();
		if($.inArray(ext, ['gif','png','jpg','jpeg']) == -1) {
			$(".error_msg").text("Not an Image...");
		} else {
			$(".error_msg").text("");
			btnOuter.addClass("file_uploading");
			setTimeout(function(){
				btnOuter.addClass("file_uploaded");
			},3000);
			var uploadedFile = URL.createObjectURL(e.target.files[0]);
			setTimeout(function(){
				$("#uploaded_view").append('<img src="'+uploadedFile+'" />').addClass("show");
			},3500);
		}
	});
	$(".file_remove").on("click", function(e){
		$("#uploaded_view").removeClass("show");
		$("#uploaded_view").find("img").remove();
		btnOuter.removeClass("file_uploading");
		btnOuter.removeClass("file_uploaded");
	});
	
	
// FOR THE FILE selector

function readURL(input) {
  if (input.files && input.files[0]) {

    var reader = new FileReader();

    reader.onload = function(e) {
      $('.image-upload-wrap').hide();

      $('.file-upload-image').attr('src', e.target.result);
      $('.file-upload-content').show();

      $('.image-title').html(input.files[0].name);
    };

    reader.readAsDataURL(input.files[0]);

  } else {
    removeUpload();
  }
}

function removeUpload() {
  $('.file-upload-input').replaceWith($('.file-upload-input').clone());
  $('.file-upload-content').hide();
  $('.image-upload-wrap').show();
}
$('.image-upload-wrap').bind('dragover', function () {
        $('.image-upload-wrap').addClass('image-dropping');
    });
    $('.image-upload-wrap').bind('dragleave', function () {
        $('.image-upload-wrap').removeClass('image-dropping');
});


// FOR SCROLLING


$(document).ready(function(){
  // Add smooth scrolling to all links
  $("a").on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){
   
        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });
});
