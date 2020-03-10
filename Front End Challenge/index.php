<!DOCTYPE html>
<html>
   <head>
     <meta charset="utf-8">
     <meta name="viewport" content="width=device-width">
     <title>Head Storm</title>
      <script src='https://www.google.com/recaptcha/api.js?render=6Ldxt98UAAAAAFIGjpvvEeAvN1AleuGe2UkblgxR'></script>
      <script type="text/javascript">
      grecaptcha.ready(function () {
           grecaptcha.execute('6Ldxt98UAAAAAFIGjpvvEeAvN1AleuGe2UkblgxR', { action: 'index' })
           .then(function(token) {
     // add token value to form
     document.getElementById('recaptchaResponse').value = token;
      });
    });
      </script>
     <link rel="shortcut icon" type="image/ico" href="images/logo.ico">

     <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
     <script src="js/main.js"></script>
     <script src="js/validation.js"></script>

     <script src="js/simple-scrollspy.min.js"></script>
     <link rel="stylesheet" href="css/main.css">
     <link href="https://fonts.googleapis.com/css?family=Montserrat:400,500,700,900|Ubuntu:400,500,700" rel="stylesheet">
     <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
     <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.7.1/js/bootstrap-datepicker.min.js"></script>
   </head>
   <body>
     <header>
       <nav>
         <ul class="header-left">
           <li class="header-logo"><a id="cpy-name" href="#">HEAD STORM</a></li>
         </ul>
         <input type="checkbox" id="chk">
         <label for="chk" class="show-menu">
           <i class="fa fa-bars"></i>
         </label>
         <ul id="hr" class="header-right responsive-menu">
           <label for="chk" class="hide-menu">
             <i class="fa fa-remove"></i>
           </label>
           <li class="header-nav"><a id="contact-btn" href="#">CONTACT US</a></li>
         </ul>
       </nav>
     </header>
      <main>
        <div class="main-div black-grey">
          <section class="index-section">
            <h1 class="white landing-font">Welcome,</h1>
            <h2 class="orange landing-font">HEAD STORM</h2>
          </section>
        </div>
        <div class="contact-div orange">
          <div class="popup-header fade-in">
            <h1>Contact Us</h1>
          </div>
            <section class="contact-section">
              <form class="form-group form-validate" id="form_contact" method="post">
                <div class="" id="alert" style="margin:30px 60px;">
                  <div class="alert alert-success alert-msg">
                  <strong>Success!</strong>
                  </div>
                  <div class="alert alert-danger alert-msg">
                    <strong>Error!</strong>
                  </div>
                </div>
                <div class="contact-container fade-in">
                  <div class="contact-content">
                    <div class="contact-content-part2">
                      <label class="content1"><b>Address</b></label>
                      <label class="content2">15455 Dallas Pkwy, Addison, TX 75001</label>
                      <label class="content1"><b>Phone</b></label>
                      <label class="content2">+1-XXX-XXX-XXXX</label>
                      <label class="content1"><b>E-mail</b></label>
                      <label class="content2">headstorm@gmail.com</label>
                    </div>
                    <div class="contact-content-part1">
                        <label><b>Feel free to contact us:</b></label></br></br>
                        <label class="require-red"></label>
                        <input type="text" placeholder="Name" class="curve-text-box required name-validate" id="Name">
                        <label class="require-red"></label>
                        <input type="text" placeholder="Subject" class="curve-text-box required" id="Subject">
                        <label class="require-red"></label>
                        <input type="text" placeholder="E-mail" class="curve-text-box required email-validate" id="Email">
                        <label class="require-red"></label>
                        <input type="text" placeholder="Your Message" class="curve-text-box required" id="message">
                        <input type="hidden" value="" name="recaptcha_response" id="recaptchaResponse">
                        <div class="contact-footer">
                          <button type="submit" id="contact_msg" class="orange-button" style="margin-top:15px;">Submit</button>
                        </div>
                    </div>
                  </div>
                </div>
              </form>
            </section>
        </div>
      </main>
      <footer>
        <section class="footer-section-1">
          <a class="social-icon" target="_blank" href="">
            <i class="fa fa-facebook"></i>
          </a>
          <a class="social-icon" target="_blank "href="">
            <i class="fa fa-instagram"></i>
          </a>
          <a class="social-icon" target="_blank "href="">
            <i class="fa fa-pinterest"></i>
          </a>
          <a class="social-icon" target="_blank "href="">
            <i class="fa fa-youtube-play"></i>
          </a>
        </section>
        <section class="footer-section-2">
          <h1>Head Storm</h1>
          <p>&copy;Head Storm.All rights reserved.</p>
        </section>
      </footer>

   </body>
</html>
<script type="text/javascript">
$('.alert-success').hide();
$('.alert-danger').hide();
$(document).ready(function(){
  //alert("1");
  //$('.alert').hide();

  $('#form_contact').on('submit',function(event){
    //alert("frfr");
    event.preventDefault();
    if(validation()){
      var name=document.getElementById("Name").value;
      var subject=document.getElementById("Subject").value;
      var email=document.getElementById("Email").value;
      var msg=document.getElementById("message").value;
      var myObj = { Name : name, Subject : subject, Email : email,Message : msg };
      console.log(myObj);
      $.ajax({
        url:"includes/index.inc.php",
        method:"POST",
        data:$(this).serialize(),
        success:function(data){
          //alert("\"success\"");
          //alert(JSON.stringify(data.trim()));
          if(String(data.trim())=="success"){
            //alert("false"+"="+data);
            //$('#alert').show();
            //alert("ytfyfty");
            console.log("Recaptcha Success");
            $('.alert-success').show();
            $('.alert-success').fadeIn('slow', function(){
               $('.alert-success').delay(3000).fadeOut();
            });
            document.getElementById('form_contact').reset();
            var x = document.getElementById("form_contact").querySelectorAll(".validate_input");
            for(var i=0;i<x.length;i++){
              x[i].classList.remove("validate_input");}
          }
          else{
            //alert("true");
            //$('#alert').show();
            console.log(data.trim());
            $('.alert-danger').show();
            $('.alert-danger').fadeIn('slow', function(){
               $('.alert-danger').delay(3000).fadeOut();
            });
            document.getElementById('form_contact').reset();
            var x = document.getElementById("form_contact").querySelectorAll(".validate_input");
            for(var i=0;i<x.length;i++){
              x[i].classList.remove("validate_input");
            }
          }
        }
      })


    }
  });
});

$('#cpy-name').click(function(event){
  $('html,body').animate({
  scrollTop: $(".main-div").offset().top-100},
  'slow');
});

$('#contact-btn').click(function(event){
  //alert("rvtt");
$('html,body').animate({
scrollTop: $(".contact-div").offset().top},
'slow');
if ( $(window).width() <= 1300 ) {
  $(".header-right").addClass("header-hundred");
  $(".header-right").removeClass("header-nine");
  $(".header-right").removeClass("header-zero");
}
});

$(window).on('resize', function(){
//alert("yyy");
var win = $(this); //this = window
if (win.width() > 1300)
{
  //alert("ufufv");
  $(".header-right").removeClass("header-hundred");
  $(".header-right").addClass("header-nine");
  $(".header-right").removeClass("header-zero");
  $(".changing-footer").css("display","block");
}
else if(win.width() <= 1300){
  $(".header-right").addClass("header-hundred");
  $(".header-right").removeClass("header-nine");
  $(".header-right").removeClass("header-zero");
  $(".changing-footer").css("display","none");
}
})

$('.fa-bars').click(function(event){
if ( $(window).width() <= 1300 ) {
$(".header-right").removeClass("header-hundred");
$(".header-right").removeClass("header-nine");
$(".header-right").addClass("header-zero");
}
});

$('.fa-remove').click(function(event){

if ( $(window).width() <= 1300 ) {
//  alert("fvfv");
$(".header-right").addClass("header-hundred");
$(".header-right").removeClass("header-nine");
$(".header-right").removeClass("header-zero");
//alert("fvfv4");
}
// else{
//   $(".header-right").css("right","9%");
// }
    });

</script>

?>
