<?php

if(isset($_POST['hello']))

{
  
  $namee = $_POST['name'];

  $emaill = $_POST['email'];

  $messagee  =$_POST['message'];

$secretkey = "6Lez46IUAAAAAE61qEntFvyUr1Ndl39LyxA76_2B";
$response = $_POST['g-recaptcha-response'];
$URL = "https://www.google.com/recaptcha/api/siteverify?secret=$secretkey&response=$response";
$respond = file_get_contents($URL);
$respond1 = json_decode($respond);



  if($respond1->success)
  {
    echo "Successful!";
    console.log($namee);
    console.log($emaill);
    console.log($messagee);
  }
  else
  {
    echo "Verification failed";
  }
}

?>


<!DOCTYPE html>
<html lang="en">
    <head>
        <link rel="icon" href="download.png">
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Headstorm Challenge</title>
        <!-- Latest compiled and minified CSS -->
        <!-- Optional theme -->
        <link rel="stylesheet" href="form.css" >
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" >
        <!-- Optional theme -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" >
        <script src='https://www.google.com/recaptcha/api.js'></script>
    </head>
    <body >
        <div class="container">
            <div class="row">
                <div class="col-md-6 col-md-offset-3">
                    <h2>Contact Us</h2> 
                    <p> Send your message in the form below and we will get back to you ASAP!</p>
                    <form role="form" method="post" id="reused_form" action = "formpage.php">
                        <div class="form-group">
                            <label for="name"> Name:</label>
                            <input type="text" class="form-control" id="name" name="name" required maxlength="50">
                        </div>
                        <div class="form-group">
                            <label for="email"> Email:</label>
                            <input type="email" class="form-control" id="email" name="email" required maxlength="50">
                        </div>
                        <div class="form-group">
                            <label for="name"> Message:</label>
                            <textarea class="form-control" type="textarea" name="message" id="message" placeholder="Your Message Here" maxlength="6000" rows="7"></textarea>
                        </div>
                        <div class="g-recaptcha" data-sitekey="6Lez46IUAAAAAC-4bK6nkODF__-xuEFEqjdEAIRm"></div>
                        <button type="submit" class="btn btn-lg btn-success pull-right" id="submitt" name = "hello">Post It! &rarr;</button>
                    </form>
                    <div id="success_message" style="width:100%; height:100%; display:none; "> <h3>Sent your message successfully!</h3> </div>
                    <div id="error_message" style="width:100%; height:100%; display:none; "> <h3>Error</h3> Sorry there was an error sending your form. 
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>