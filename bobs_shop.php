<?php
define('SITE_KEY','6Ldia70UAAAAALVPByqJrI39i0e5iozOpvKvOyHL');
define('SECRET_KEY','6Ldia70UAAAAAFKhdZsL1eqcpRZ4k4ih0Vz29eg7');
$status = "true";

if($_POST){
    function getCaptcha($SecretKey){
        $Response = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=".SECRET_KEY."&response={$SecretKey}");
        $Return = json_decode($Response);
       return $Return;
    }
   $Return = getCaptcha($_POST['g-recaptcha-response']);
    if($Return->success == true && $Return->score > 0.5){
      $status = "true";
    } 
    else{
        $status = "false";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
    <link rel="icon" href="favicon.ico" type="image/x-icon">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
    <link href="https://fonts.googleapis.com/css?family=Oswald:700&display=swap" rel="stylesheet">
    <script src='https://www.google.com/recaptcha/api.js?render=6Ldia70UAAAAALVPByqJrI39i0e5iozOpvKvOyHL'></script>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
<style>
    label{
        letter-spacing: 3px;
        font-size: 1.5em;
        font-family: 'Oswald', sans-serif;
        color:cyan;
    }
    button{
        letter-spacing: 3px;
        font-size: 1.5em;
    }
    .Error{
        font-size: 1.5em;
        font-family: 'Oswald', sans-serif;
        color: red;
    }
    a.n-item:hover{
        color: blue !important;
    }
</style>
    <title>Bob's Emporium</title>
</head>
<html>
<!-- Make Accessable Pictures and features for disabled people -->
<body style="background-color: powderblue">
    <nav class="navbar navbar-dark bg-primary navbar-collapse" style="border-bottom: 5px solid black">
        <a class="display-4 font-weight-bold"><b> Bob's Emporium </b></a>
        <a class="n-item navbar-text text-white display-4 font-weight-bold">Home</a>
        <a class="n-item navbar-text text-white display-4 font-weight-bold">About</a>
    </nav>
    <h1 class="d-flex justify-content-center align-items-center container mt-4 font-weight-bold">Contact Us!</h1>
    <span class="Error d-flex justify-content-center align-items-center container" id="Error" ></span>
    <div class="d-flex justify-content-center align-items-center container mt-1">
        <form id="contactForm" class="card text-white bg-primary mb-3 card border-dark" name="formd" style="max-width: 30rem;">
            <div class="align-items-center card-body">
                <div class="row">
                    <div class="col">
                        <label for="First">First Name</label>
                        <input type="text" name="First" id="First" placeholder="First" class="form-control">
                    </div>
                    <span class="col">
                        <label for="Last">Last Name</label>
                        <input type="text" name="Last" id="Last" placeholder="Last" class="form-control">
                    </div>
                </div>
                <div class="col-auto">
                    <label for="Email">Email</label>
                    <input type="email" name="Email" id="Email" placeholder="E-Mail Address" class="form-control form-control-lg">
                </div>
                <div class="col">
                    <label for="Message">Message</label>
                    <textarea type="text" id="Message" name="Message" placeholder="Send Us A Quick Message!" class="form-control" style="height: 25vh;"></textarea>
                </div>
                <input type="hidden" id="g-recaptcha-response" name="g-recaptcha-response"/>
                <input type="hidden" name="dateTime"/>
                <div class="row">
                    <div class="col">
                        <button class="btn btn-secondary btn-lg btn-block mt-3 mb-1 w-75 ml-5 form-control" type="submit" name="Submit" id="submitButton"><b>Send</b></button>
                    </div>
                </div>
            </form>
        </div>
</body>
</html>
<script>
grecaptcha.ready(function() {
        grecaptcha.execute('<?php echo SITE_KEY; ?>', {action: '/'}).then(function(token) {
            document.getElementById("g-recaptcha-response").value = token;
        });
    });

    var Form = document.getElementById("contactForm");
    
    var error = document.getElementById("Error");

    function Reset(e){
        error.innerHTML = null;
        Form.Submit.innerHTML = "<b>Send</b>";
        e.target.setAttribute("class","form-control")
    }
    
    function Submit(e){
        e.preventDefault();
        var status = '<?php echo $status ?>';
        if(Form.First.value === ""){
            Form.First.setAttribute("class","alert alert-danger")
            error.innerHTML = "Please Enter Your Full Name";
        }
        else if(Form.Last.value === ""){
            Form.Last.setAttribute("class","form-control alert alert-danger")
            error.innerHTML = "Please Enter Your Full Name";
        }
        else if (Form.Email.value === ""){
            Form.Email.setAttribute("class","form-control alert alert-danger")
            error.innerHTML = "Please Enter Your Email";
        }
        else if (Form.Message.value === ""){
            Form.Message.setAttribute("class","form-control alert alert-danger")
            error.innerHTML = "Please Enter A Message"
        } 
        else if( status === false ){
            error.innerHTML = "Sorry, No Robots"
        }
        else{
           var output = "\n\nName: " + Form.Last.value + ", " + Form.First.value + "\n\nEmail: " + Form.Email.value + "\n\nMessage: " + Form.Message.value;
           Form.Submit.innerHTML = "<b>SENT!</b>";
           console.log(output);
        }
    }
    
    document.getElementById("contactForm").First.addEventListener('change',Reset);
    document.getElementById("contactForm").Last.addEventListener('change',Reset);
    document.getElementById("contactForm").Email.addEventListener('change',Reset);
    document.getElementById("contactForm").Message.addEventListener('change',Reset);
    document.getElementById("submitButton").addEventListener('click',Submit);
</script>