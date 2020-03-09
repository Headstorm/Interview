<?php
    $response_data = array();
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
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
            }else{
                //invalid f_name, l_name or email
                $response_data["success"] = false;
                $response_data["error_msg"] = "Invalid data for First Name, Last Name or Email";
            }
        }catch (Exception $e) {
            $response_data["success"] = false;
            $response_data["error_msg"] = $e->getMessage();
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