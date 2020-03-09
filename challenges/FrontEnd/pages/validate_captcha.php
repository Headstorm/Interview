<?php
  include("../config.php");

  $response_data = array();
  if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST["response"])) {
    $recaptcha_url = "https://www.google.com/recaptcha/api/siteverify";
    $recaptcha_response = $_POST["response"];

    $recaptcha = file_get_contents($recaptcha_url . "?secret=" . $RECAPTCHA_SECRET_KEY . "&response=" . $recaptcha_response);
    $recaptcha = json_decode($recaptcha);
  
    if ($recaptcha->action === "contact_us" && $recaptcha->score >= 0.5) {
      //Verified - success
      $response_data["success"] = true;
      $response_data["score"] = $recaptcha->score;
    }else {
      //Not verified - unsuccessful
      $response_data["success"] = false;
      $response_data["score"] = $recaptcha->score;
    }

    echo json_encode($response_data);
  }

  if($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST["key"])) {
    $key_name = $_POST["key"];
    if($key_name === "RECAPTCHA_SITE_KEY") {
      $response_data["key"] = $RECAPTCHA_SITE_KEY;
    }
    echo json_encode($response_data);
  }
?>