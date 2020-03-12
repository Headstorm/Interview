<?php
    include("../config.php");
    $response_data = array();

    //if POST request and recaptcha token is sent
    if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST["response"])) {
        $recaptcha_url = "https://www.google.com/recaptcha/api/siteverify";
        $recaptcha_response = $_POST["response"];
    
        $recaptcha = file_get_contents($recaptcha_url . "?secret=" . $RECAPTCHA_SECRET_KEY . "&response=" . $recaptcha_response);
        $recaptcha = json_decode($recaptcha);
      
        //validate that request came from contact_us action and that reCAPTCHA passed
        if ($recaptcha->action === "contact_us" && $recaptcha->score >= 0.5) {
            //Verified - success
            try {
                $f_name = $_POST['f_name'];
                $l_name = $_POST['l_name'];
                $email = $_POST['email'];
                $message = $_POST['message'];

                //some validation
                $fname_valid = validate($f_name, "name");
                $lname_valid = validate($l_name, "name");
                $email_valid = validate($email, "email");

                if($fname_valid && $lname_valid && $email_valid) {
                    //valid data
                    $response_data["success"] = true;
                    $response_data["score"] = $recaptcha->score;
                }else{
                    //invalid f_name, l_name or email
                    $response_data["success"] = false;
                    $response_data["score"] = $recaptcha->score;
                    $response_data["error_msg"] = "Invalid data for First Name, Last Name or Email";
                }
            }catch (Exception $e) {
                $response_data["success"] = false;
                $response_data["score"] = $recaptcha->score;
                $response_data["error_msg"] = $e->getMessage();
            }
        }else {
          //Not verified - unsuccessful
          $response_data["success"] = false;
          $response_data["score"] = $recaptcha->score;
          $response_data["error_msg"] = "reCAPTCHA validation failed";
        }
    
        echo json_encode($response_data);
    }
            
    function validate($string, $type){
        if($type === "name"){
            if(preg_match("/^[A-Za-z]{1,40}$/", $string)){
                //valid name
                $result = True;
            }else{
                //invalid name
                $result = False;
            }
        }elseif($type === "email"){
            if(filter_var($string, FILTER_VALIDATE_EMAIL)){
                //valid email
                $result = True;
            }else{
                //invalid email
                $result = False;
            }
        }
        return $result;
    }
?>