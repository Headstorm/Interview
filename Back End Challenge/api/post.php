
<?php
// Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

include_once '../config/Database.php';
include_once '../models/Functions.php';

// Instantiate DB & connect
$database = new Database();
$db = $database->connect();

// Instantiate blog post object
$post = new Functions($db);

// Get raw posted data
$data = json_decode(file_get_contents("php://input"));
//echo $data;
$fail=0;
$all_numeric = true;
if(sizeof($data->list_numbers)==500){
  foreach ($data->list_numbers as $key) {
      if (!(is_numeric($key))) {
          $all_numeric = false;
          break;
      }
  }
  if($all_numeric){
    $a=$post->delete();
    foreach ($data->list_numbers as $d) {
        $post->list_numbers = $d;
        if(!$post->create()) {
          $fail=1;
        }
    }
    if($fail==0){
      echo json_encode(
        array('message' => 'Post Created')
      );
    }
    else{
      //this because while creating something goes wrong and and we want to remove the added records
      if($post->delete()){
        echo json_encode(
          array('message' => 'Something went wrong')
        );
      }
      else {
        echo json_encode(
          array('message' => 'Something went wrong')
        );
      }
    }
  }
  else{
    echo json_encode(
      array('message' => 'Not all elements in array were type integer.')
    );
  }
}
else{
  echo json_encode(
    array('message' => 'List should have 500 numbers.')
  );
}
