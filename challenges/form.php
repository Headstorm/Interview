<?php
    define('reCAPTCHA_site_key','6LdVmqQUAAAAACU3MugTx6I3BXgKjZhxOM1vitgs');
    define('reCAPTCHA_secret_key', '6LdVmqQUAAAAAAcaqI4oj_aTt_UDka1hE_p_wbpO');
?>


<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Startup</title>
        <link rel = "icon" href = "download.png">
        <script src="https://www.google.com/recaptcha/api.js?render=reCAPTCHA_site_key=<?php echo reCAPTCHA_site_key; ?>"></script>
        
    </head>
    <body>

   
        <h2>Contact Form</h2>
        <form action = "#" method = "POST">
            <p>First Name: <br><input type="text" placeholder="ex: John"/> </p>                <p>Last Name:<br> <input type="text" placeholder="ex: Doe"/> </p>
            <p>Phone:<br> <input type="tel" pattern = "[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="ex: 123-456-7890"/> </p>
            <input type = "text" id = "g-recapcha-response" name = "g-recapcha-response">
            <p><input type = "submit" value = "Submit"></p>
         </form>

         <script>
            grecaptcha.ready(function() {
                grecaptcha.execute('reCAPTCHA_site_key', {action: 'homepage'})
                .then(function(token) {
                   console.log(token);
                });
            });
         </script>

    </body>

</html> 