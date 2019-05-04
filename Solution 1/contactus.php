
<?php

if(isset($_POST['Submitted']))

{
  
  $fname = $_POST['firstname'];

  $lname = $_POST['lastname'];

  $country  =$_POST['country'];

  $phno  =$_POST['phno'];

  $subject  =$_POST['subject'];

  $secretkey = "6LenraAUAAAAALPpZsoomL4wGn_whHxksX9hwLO8";
  $response = $_POST['g-recaptcha-response'];
  $URL = "https://www.google.com/recaptcha/api/siteverify?secret=$secretkey&response=$response";

  $respond = file_get_contents($URL);
  $respond1 = json_decode($respond);

  if($respond1->success)
  {
    echo "Successful!";
  }
  else
  {
    echo "Verification failed :((((";
  }


  if(empty($fname)||empty($lname)) 
{
    echo"<script>alert('First Name and Last Name are mandatory!');</script>";
}
  
   if(!ctype_digit($phno) || strlen($phno)!=10)
  {
    echo"<script>alert('Please enter a valid Phone number');</script>";
  }

  echo 
"<div display='none'>
    <script type='text/javascript'>
        console.log($fname);
    </script>
</div>";

}



?>








<!DOCTYPE html>
<html>
<head>
  <link rel="icon" href="favicon.png">
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
body {
  font-family: Arial, Helvetica, sans-serif;
}

* {
  box-sizing: border-box;
}

input[type=text], select, textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  margin-top: 6px;
  margin-bottom: 16px;
  resize: vertical;
}

input[type=submit] {
  background-color: #4CAF50;
  color: white;
  padding: 12px 20px;
  border: none;
}

input[type=submit]:hover {
  background-color: #45a049;
}

.container {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 10px;
}

/* Create two columns that float next to eachother */
.column {
  float: left;
  width: 50%;
  margin-top: 6px;
  padding: 20px;
}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}

</style>
<script src='https://www.google.com/recaptcha/api.js'></script>
</head>
<title>
  Headstorm
  </title>
<body>
<div class="container">
  <div style="text-align:center">
    <h2>Contact Us</h2>
    <p>Swing by for a cup of coffee, or leave us a message:</p>
  </div>
  <div class="row">
    <div class="column">
      <img src="images.png" style="width:100%">
    </div>
    <div class="column">
      <form action = "contactus.php" method="post">
        <label for="fname">First Name</label>
        <input type="text" id="fname" name="firstname" placeholder="Your name..">
        <label for="lname">Last Name</label>
        <input type="text" id="lname" name="lastname" placeholder="Your last name..">
        <label for="phno">Contact Number</label>
        <input type="text" id="phno" name="phno" placeholder="xxxxxxxxxx">
        <label for="country">Country</label>
        <select id="country" name="country">
          <option value="United States">United States</option>
          <option value="Cananda">Australia</option>
          <option value="India">India</option>
        </select>
        <div class="g-recaptcha" data-sitekey="6LenraAUAAAAAG65OLkwlZI_BGGi5Uirysy9AZsI"></div>
        <label for="subject">Subject</label>
        <textarea id="subject" name="subject" placeholder="Write something.." style="height:170px"></textarea>
        <input type="submit" value="Submit", name = "Submitted">
      </form>
    </div>
  </div>
</div>

</body>
</html>
