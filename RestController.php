<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST,GET");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
	
	$data = json_decode(file_get_contents("php://input"));
	if(!empty($data) && is_array($data) && count($data) == 500) {
		$allNumbers = true;
		foreach ($data as $value) {
			if (!is_int($value) && !is_float($value)) {
				$allNumbers = false;
				break;
			}	
		}			
		if ($allNumbers) {
			// Just storing to the server because persuing any other option seems a bit out of scope
			// Of course now any client can manipulate the numbers so the GET request can be different numbers from a second client's POST call
			$myfile = fopen("randomNumbers.txt", "w") or die("Server could not record the values");
			fwrite($myfile, file_get_contents("php://input"));
			fclose($myfile);
			echo json_encode(array("message" => "Numbers successfully submitted"));
			http_response_code(200);
		}
		else {
			echo json_encode(array("message" => "Malformed request"));
			http_response_code(400);
		}
	}
	else {
		echo json_encode(array("message" => "Malformed request"));
		http_response_code(400);
	}
}
else if ($_SERVER["REQUEST_METHOD"] == "GET") {
	$myfile = fopen("randomNumbers.txt", "a+") or die("Unable to open file!");

	if (filesize("randomNumbers.txt") > 0) {
		$numbers = fread($myfile,filesize("randomNumbers.txt"));
		$numbers = json_decode($numbers);
		sort($numbers);
		echo json_encode($numbers);
	}
	else {
		echo json_encode(array("message" => "Need to POST numbers first"));
	}
	fclose($myfile);
}
else if ($_SERVER["REQUEST_METHOD"] == "PATCH") {
	$myfile = fopen("randomNumbers.txt", "a+") or die("Unable to open file!");

	if (filesize("randomNumbers.txt") > 0) {
		$numbers = fread($myfile,filesize("randomNumbers.txt"));
		$numbers = json_decode($numbers);
	
		if (count($numbers) <= 1000) {
			fclose($myfile);
			$randomNum = mt_rand(1,1000);
			array_push($numbers, $randomNum);
			$myfile = fopen("randomNumbers.txt", "w") or die("Unable to open file!");
			fwrite($myfile, json_encode($numbers));
			echo json_encode(array("message" => "Successfully added " . $randomNum . " to the list"));
		}
		else {
			echo json_encode(array("message" => "Won't PATCH any more numbers beyond a 1000 count"));
		}
	}
	else {
		echo json_encode(array("message" => "Need to POST numbers first"));
	}
	fclose($myfile);
}
else {
	echo json_encode(array("message" => $_SERVER["REQUEST_METHOD"] . " is not supported"));
	http_response_code(405);
}

?>