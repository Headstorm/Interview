<html>

<head>
    <script src='https://www.google.com/recaptcha/api.js'></script>
    <meta charset="UTF-8">
    <!-- Company name title -->
    <title>Headstorm: Front End Challenge     </title>
    <script src='https://www.google.com/recaptcha/api.js'></script>
    <!-- Company logo as icon in browser tab -->
    <link rel="icon" href="headstormLogo.png"></link>

</head>

<!-- Dump all the information from the form submission to browser console -->
<script>
    function logInfo(){
        document.getElementById("info").submit();
        console.log("First Name:" + document.getElementById("fname").value);
        console.log("Last Name:" + document.getElementById("lname").value);
        console.log("Email:" + document.getElementById("email").value);
    }
</script>

<body>
    <h1>Headstorm Front End Challenge</h1>
    <h2>Contact Us</h2>

    <!-- Contact us web form that captures contact information -->
    <form id = "info" action="" method="post" onsubmit = "logInfo()">
        First Name : <input type="text" id="fname" name="fname" placeholder="First Name"><br><br>
        Last Name  : <input type="text" id="lname" placeholder="Last Name"><br><br>
        Email      : <input type="text" id="email" placeholder="name@email.com"><br><br><br>
        <!--Google reCaptcha V3 implement in page. Submission of form requires Google captcha pass -->
        <div class="g-recaptcha" data-sitekey="6LdOU0oeAAAAAKGM9qVXlY7FIDxtRNbVZarCSBTw"></div><br>
        
</form>
<button type="submit" name ="button" form="info" value="submit">Submit</button>

<?php
//Based on code from https://github.com/chinmaymahajan/DreamsCoder-Examples/blob/master/PHP/Google%20API/reCAPTCHA/Google_reCAPTCHA.php
if(isset($_POST['button']))
{

function CheckCaptcha($userResponse) {
        $fields_string = '';
        $fields = array(
            'secret' => '6LdOU0oeAAAAAMTYGw64Weid-BPKXrZoDCSoCXW8',
            'response' => $userResponse
        );
        foreach($fields as $key=>$value)
        $fields_string .= $key . '=' . $value . '&';
        $fields_string = rtrim($fields_string, '&');

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, 'https://www.google.com/recaptcha/api/siteverify');
        curl_setopt($ch, CURLOPT_POST, count($fields));
        curl_setopt($ch, CURLOPT_POSTFIELDS, $fields_string);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, True);

        $res = curl_exec($ch);
        curl_close($ch);

        return json_decode($res, true);
    }


    // Call the function CheckCaptcha
    $result = CheckCaptcha($_POST['g-recaptcha-response']);

    if ($result['success']) {
        //If the user has checked the Captcha box
        echo "Captcha verified Successfully";
	
    } else {
        // If the CAPTCHA box wasn't checked
       echo '<script>alert("Error Message");</script>';
    }
}
    ?>
    
    </body>

</html> 