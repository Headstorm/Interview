<?php
  include("../config.php");

  $response_data = array();
  if($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST["key"])) {
    $key_name = $_POST["key"];
    if($key_name === "RECAPTCHA_SITE_KEY") {
      $response_data["key"] = $RECAPTCHA_SITE_KEY;
    }
    echo json_encode($response_data);
  }
?>