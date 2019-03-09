<?php
	$captchaURL = 'https://www.google.com/recaptcha/api/siteverify';
	$captchaSecretKey = '6LcxtpUUAAAAAMt7a1_X9tbEjJ4CytHwPAv2A1l8';
	$captchaToken = $_POST['captchaToken'];
	$captcha = file_get_contents($captchaURL . '?secret=' . $captchaSecretKey . '&response=' . $captchaToken);
	$captcha = json_decode($captcha);
	$emailSubmitted = $_POST['emailSubmitted'];	
	
	if ($captcha->{'success'})
	{	
		if (strlen(trim($emailSubmitted)) <= 0)
		{	
			echo json_encode(array('Success' => 2));
		}
		else
		{
			$captchaScore = $captcha->{'score'};
			$captchaAction = $captcha->{'action'};
			$captchaTimestamp = $captcha->{'challenge_ts'};	
			$array = array('Success' => 1,'Email' => $emailSubmitted,'Captcha Score' => $captchaScore,'Action' => $captchaAction,'Time Stamp' => $captchaTimestamp);	
			echo json_encode($array);
		}	
	}
	else
	{	
		echo json_encode(array('Success' => 0));
	}

?>
