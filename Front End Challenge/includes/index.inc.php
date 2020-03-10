
<?php // Check if form was submitted:
   if ($_SERVER['REQUEST_METHOD'] === 'POST') {
       // Build POST request:
       $recaptcha_url = 'https://www.google.com/recaptcha/api/siteverify';
       $recaptcha_secret = '6Ldxt98UAAAAALzlyA4-1mjM8MOagBrgjqO2ZFp-';
       $recaptcha_response = $_POST['recaptcha_response'];

       // Make and decode POST request:
       $recaptcha = file_get_contents($recaptcha_url . '?secret=' . $recaptcha_secret . '&response=' . $recaptcha_response);
       $recaptcha = json_decode($recaptcha);
       if($recaptcha->success==true){
         if($recaptcha->score >= 0.5){
           echo "success";
         }
       }
       else{
         echo "Recaptcha Error.";
       }
   }
