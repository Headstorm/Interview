<?php 
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['recaptcha_response'])) {

    $fname = $_POST['fname'];
    $lname = $_POST['lname'];
    $email = $_POST['email'];
    $phonenumber = $_POST['phonenumber'];
    $comments = $_POST['comments'];
    $contactchoice = $_POST['contactchoice'];
    
    $recaptcha_url = 'https://www.google.com/recaptcha/api/siteverify';
    $recaptcha_secret = '6LfsrSIbAAAAAJ9R2lx7EZaX-mTMlHPQ9nYbqQKg';
    $recaptcha_response = file_get_contents($recaptcha_url . 'recaptcha_secret=' . $recaptcha_secret . '&response=' . $recaptcha_response);
    $response_keys = json.decode($recaptcha_response, true);
    header('Content-type: application/json');

    if ($response_keys["success"]) {
        echo json_encode(array('success' => 'true'));
    } else {
        echo json_encode(array('success' => 'false'));
    }

} ?>
