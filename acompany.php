<?php
	const secret_key = '6LeWFkIdAAAAAH3RwwjiDTdMR3ArbS3w-JA7i6_d';
	$data_flag = false;
	$console_data = false;

	if($_POST) {
		global $data_flag;

		function recaptcha_data() {
			$token = $_POST['token'];
			$url = "https://www.google.com/recaptcha/api/siteverify?secret=".secret_key."&response={$token}";
			
			return file_get_contents($url);
		}

		$data = json_decode(recaptcha_data());

		if ($data->success) {
			$data_flag = true;
			$console_data = [
				"name" => $_POST['name'],
				"email" => $_POST['email'],
				"message" => $_POST['message']
				];
		}
	}
?>


<!doctype html>
<html>
<head>
	<title>ACompany</title>
	<link rel="icon" href="acompany.png" type="image/png" />
	<style>
		span {display:block; padding:10px;}
		label {display:block;}
		div {background-color:skyblue;}
		i {color:red;}
	</style>

	<script>
		var field_states = new Map();
		var field_names = ['name', 'email', 'message'];
		var site_key = '6LeWFkIdAAAAAKklQkoq0myAtdCIRsmxKYxoKQwx';

		function setup() {
			for (var i=0; i < field_names.length; i++) {
				var name = document.getElementById(field_names[i]);
				if (name) {
					field_states.set(name, 0);
					name.addEventListener('keyup', empty_check);
					name.addEventListener('blur', empty_check);
				}
			}

			var flag = <?php echo json_encode($data_flag); ?>;
			if (flag) {
				console.log('Name: ' + <?php echo json_encode($console_data['name']); ?>);
				console.log('Email: ' + <?php echo json_encode($console_data['email']); ?>);
				console.log('Message: ' + <?php echo json_encode($console_data['message']); ?>);
			}
		}

		function process_data(form) {
			var interval;

			// we use 2 passes through this function.
			// first pass gets the recaptcha token and returns false to stop submition
			//   when the 'execute' promise fires, the returned token is put into
			//   the hidden 'token' field so the server can get it in POST values.
			//	 Also, we set a time interval. We need this because the hidden field takes
			//   time to fill and it won't get sent in POST.
			if (document.contact_form.token.value == false) {
				// all input fields must be equal to 1
				for (var i = 0; i < field_names.length; i++) {
					if (field_states.get(field_names[i]) !== 1) {
						return -1;
					}
				}

				// get recaptcha token and store it in hidden field
				grecaptcha.execute(site_key, {action: 'contact_form'}).then(
					function(token) {
						interval = setInterval(function() {
							if (document.contact_form.token.value) {
								clearInterval(interval);
								document.contact_form.submit();
							}
						}, 500);
						
						document.contact_form.token.value = token;
					});

				return false;
			}

			// second time through, just submit form.
			return true;
		}

		function field_is_empty(text) {
			// scan characters in text
			// looking for all spaces
			for (var i = 0; i < text.length; i++) {
				if (text[i] != ' ') {
					return false;
				}
			}

			return true;
		}

		function empty_check(obj) {
			var text = obj.target.value;
			var asterisk = document.getElementById('ast' + obj.target.name);

			if (!asterisk) {
				return -1;
			}

			if (!text || field_is_empty(text)) {
				asterisk.style.color = 'red';
				field_states.set(obj.target.name, 0);
				return -1;
			}
			else {
				asterisk.style.color = 'skyblue';
				field_states.set(obj.target.name, 1);
				return 1;
			}

			
		}
	</script>

	<script src="https://www.google.com/recaptcha/api.js?render=6LeWFkIdAAAAAKklQkoq0myAtdCIRsmxKYxoKQwx"></script>
</head>

<body onload="setup()">
	<h1>ACompany</h1>
	<hr>
	<center>
		<div>
			<h3>Contact us</h3>
			<form name="contact_form" method="POST" action="acompany.php" onsubmit="return process_data()">
				<input type="hidden" name="token"></input>
				<span>
					<label for="name" id="lblname">Name</label>
					<input type="text" name="name" id="name" required></input> <i id='astname'>*</i>
				</span>

				<span>
					<label for="email" id="lblemail">Email</label>
					<input type="email" name="email" id="email" required></input> <i id='astemail'>*</i>
				</span>

				<span>
					<label for="message" id="lblmessage">Message</label>
					<textarea name="message" id="message" required></textarea> <i id='astmessage'>*</i>
				</span>

				<span>
					<input type="submit" value="Send it"></input>
				</span>
			</form>

			<p>
				<i>*</i> means this field's input is required.
			</p>
		</div>
	</center>
</body>
</html>