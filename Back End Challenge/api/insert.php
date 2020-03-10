
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
if(sizeof($data->list_numbers)==1){
    $post->list_numbers = (int)$data->list_numbers[0];
    if($post->create()){
      $result = $post->read();
      // Get row count
      $num = $result->rowCount();
      // Check if any posts
      if($num > 0) {
        // Post array
        $posts_arr = array();
        // $posts_arr['data'] = array();

        while($row = $result->fetch(PDO::FETCH_ASSOC)) {
          extract($row);
          // Push to "data"
          array_push($posts_arr, (int)$list_numbers);
          // array_push($posts_arr['data'], $post_item);
        }
        // Turn to JSON & output
        echo json_encode(
          array('message' => '1 record added','list_numbers' => $posts_arr)
        );
      }
      else{
        echo json_encode(
          array('message' => 'No Record Found')
        );
      }
    }
    else{
      echo json_encode(
        array('message' => 'Something went wrong')
      );
    }
  }
else{
  echo json_encode(
    array('message' => 'List should have only 1 number.')
  );
}
