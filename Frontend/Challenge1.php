<?php
    if($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['formSubmit']) && isset($_POST['recaptcha_response'])){

        $fullName = $_POST['fullName'];

        $emailId = $_POST['email'];

        $address = $_POST['address'];

        $message = $_POST['message'];

        if(empty($fullName)){
            echo"<script>alert('Fill Out Name!');</script>";
        }

        $recaptcha_url = 'https://www.google.com/recaptcha/api/siteverify';
        $recaptcha_secret = '6LfV8McUAAAAAGuZktDwyaBRS2BaJxPtSXkURXur';
        $recaptcha_response = $_POST['recaptcha_response'];

        $recaptcha = file_get_contents($recaptcha_url . '?secret=' . $recaptcha_secret . '&response=' . $recaptcha_response);
        $recaptcha = json_decode($recaptcha);

        if ($recaptcha->success) {
            echo "Successfully submitted";
            echo("<script>console.log('FULL NAME: " . $fullName . "');</script>");
            echo("<script>console.log('MESSAGE: " . $message . "');</script>");
        }
    } 
?>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>My Company</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="CompanyLogo" href="./logo.png">
        <script src="https://www.google.com/recaptcha/api.js?render=6LfV8McUAAAAAONgYAZbxSfpefEdCHUglGoC45Iz"></script>
        <script>
            grecaptcha.ready(function () {
                grecaptcha.execute('6LfV8McUAAAAAONgYAZbxSfpefEdCHUglGoC45Iz', { action: 'contact' }).then(function (token) {
                    var recaptchaResponse = document.getElementById('recaptchaResponse');
                    recaptchaResponse.value = token;
            });
        });
        </script>
        <style>
            form{
                background: -webkit-linear-gradient(bottom, #CCCCCC, #EEEEEE 175px);
                background: -moz-linear-gradient(bottom, #CCCCCC, #EEEEEE 175px);
                background: linear-gradient(bottom, #CCCCCC, #EEEEEE 175px);
                margin: auto;
                position: relative;
                width: 550px;
                height: 450px;
                font-family: Tahoma, Geneva, sans-serif;
                font-size: 14px;
                font-style: italic;
                line-height: 24px;
                font-weight: bold;
                color: #09C;
                text-decoration: none;
                border-radius: 10px;
                padding: 10px;
                border: 1px solid #999;
                border: inset 1px solid #333;
                -webkit-box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.3);
                -moz-box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.3);
                box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.3);
            }
            
                input {
                    width: 375px;
                    display: block;
                    border: 1px solid #999;
                    height: 25px;
                    -webkit-box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.3);
                    -moz-box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.3);
                    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.3);
                }

                textarea#message {
                    width: 375px;
                    height: 150px;
                    display: block;
                }

                input[name = message]{
                    width: 100px;
                    position: absolute;
                    right: 20px;
                    bottom: 20px;
                    background: #09C;
                    color: #fff;
                    font-family: Tahoma, Geneva, sans-serif;
                    height: 30px;
                    border-radius: 15px;
                    border: 1p solid #999;
                    }

                    input[name = message]:hover {
                        background: #fff;
                        color: #09C;
                    }

                    textarea:focus, input:focus {
                        border: 1px solid #09C;
                    }
        </style>
    </head>
    <title> HeadStorm Challenge </title>
    <body>
        <form action = "Challenge.php" method="post">
            <div>
                <label>Full Name</label>
                <input type="text" id="fullName" name="fullName" placeholder="John Smith">
                <label>Email Id:</label>
                <input type="text" id="email" name="email" placeholder="john.smith@gmail.com">
                <label>Address</label>
                <input type="text" id="address" name="address" placeholder="McCallum Blvd"> 
                <label>Message</label>
                <textarea id="message" name = "message"></textarea>
                <input type="submit" name="formSubmit">
                <input type="hidden" name="recaptcha_response" id="recaptchaResponse">
            </div>
        </form>
    </body>
</html>