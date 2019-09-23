<doctype html>
<html>
	<head>
		<title>golden skoop</title>
		<header>
             <h1>...</h1>
        </header>
        <link rel="shortcut icon" type="image/png" href="/favicon.png"/>
        <script src="https://www.google.com/recaptcha/api.js?render=6Lc_dLkUAAAAABy1WDl6NmGlEglh4QYZEV05dRXa"></script>
        <script>
                 grecaptcha.ready(function () {
                 grecaptcha.execute('6Lc_dLkUAAAAABy1WDl6NmGlEglh4QYZEV05dRXa', { action: 'contact' }).then(function (token) {
                var recaptchaResponse = document.getElementById('recaptchaResponse');
                recaptchaResponse.value = token;
            });
        });
    </script>
	</head>
	<body>
		<link href="main.css" rel="stylesheet"/>
		<img src="logo8.png" width="300" height = "300"/>
		<h1>Contact Us</h1>
		<form method='POST'>
	 		 Name:<br>
	  		<input type="text" name="Name" id='Name'><br>
	 		 Email:<br>
	 		 <input type="text" name="Email" id='Email'><br>
	 		 Message:<br>
	 		 <input type="text" name="Message" id='Message'><br>
	 		 <input type="submit" name='submit' value="Submit">
	 		  <input type="hidden" name="recaptcha_response" id="recaptchaResponse">
		</form>
	<?php
	    $name = $_POST['Name'];
	    $email = $_POST['Email'];
	    $message= $_POST['Message'];
	    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['recaptcha_response'])) {

    // Build POST request:
    $recaptcha_url = 'https://www.google.com/recaptcha/api/siteverify';
    $recaptcha_secret = '6Lc_dLkUAAAAAA363tKksdrEMqTQ_CfZ0haF15bA';
    $recaptcha_response = $_POST['recaptcha_response'];

    // Make and decode POST request:
    $recaptcha = file_get_contents($recaptcha_url . '?secret=' . $recaptcha_secret . '&response=' . $recaptcha_response);
    $recaptcha = json_decode($recaptcha);

    // Take action based on the score returned:
    if ($recaptcha->score >= 0.5) {
        // Verified 
        echo "<script>console.log(".json_encode($name).")</script>";
	    echo "<script>console.log(".json_encode($email).")</script>";
	    echo "<script>console.log(".json_encode($message).")</script>";
	    echo "<script type='text/javascript'>alert('message sent');</script>";
    } else {
        
    } 
}	?>
	<body>
</html>