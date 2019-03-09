<!DOCTYPE html>
<html>
<head>
<title>7Seas</title>
<link rel="icon" href="boat.jpg">
<script src="https://www.google.com/recaptcha/api.js?render=6LcxtpUUAAAAABaq3XrKOoOU896yRC8cd5kBKv-L"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

</head>

<body>
<h1>Welcome to the 7 Seas! May Poseidon smile upon you!</h1>
<p>Don't worry about trying to contact us. We'll find you if you provide an email. So go ahead guy and put it there!</p>

<form method="post" id="emailSubmit">
      <input type="email" id="email" placeholder="Email:" size="50"><br><br>
      <button type="submit">Submit</button>
</form>

<script>
$('#emailSubmit').submit(function() {
	event.preventDefault();
	grecaptcha.ready(function () {
		grecaptcha.execute('6LcxtpUUAAAAABaq3XrKOoOU896yRC8cd5kBKv-L', { action: 'emailSubmit' }).then(function (token) {
			var email = $('#email').val();
			$.post('verify.php', {captchaToken:token, emailSubmitted:email}, function(result) {
				var parsedResult = JSON.parse(result);
				if (parsedResult.Success == 1) {
					console.log(result);
					alert("All your email are belong to us");
				}
				else if (parsedResult.Success == 0) {
					alert("Oh no! It's a bot!");
				}
				else
				{
					alert("Got to provide an email guy");
				}
			});
		});
	});
});
</script>

<br>

<form method="post" id="randomNumbers">
	<button type="submit">REST number test</button>
</form>

<script>
$('#randomNumbers').submit(function() {
	event.preventDefault();
	var randNumbers = [];
	for (i = 0; i < 500; i++) {
		randNumbers.push(Math.floor(Math.random() * 1000 + 1));
	}	
	var jsonMessage = JSON.stringify(randNumbers);
	var request = new XMLHttpRequest();
	request.onreadystatechange = function() {
    		if (this.readyState == 4) {
      			console.log(this.responseText);
    		}
  	};
	
	request.open("POST", "/data", true);
	request.setRequestHeader("Content-type", "application/json");
	request.send(jsonMessage);
});
</script>


</body>
</html>
