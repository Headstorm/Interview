<?php

/*Doccumentation for how use this REST API is included in the sumbitnums.html file*/
    header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
    header("Content-Type:application/json"); //sends the http json header to browser
    function connect(){
        //Connection to my database
        $dbServername = "localhost";
        $dbUsername = "nurudeen_agb";
        $dbPassword = "head.storm";
        $dbName = "nurudeen_headstormapi";
        $con = mysqli_connect($dbServername,$dbUsername,$dbPassword,$dbName);
        //checking if connection to the database was successful
        if(!$con){
            die("Connection failed: ". mysqli_connect_error());
        }
        else
        print_r ("Connection successful");
        echo nl2br("\r\n");
        return $con;
    }
    
    /*This function retrieves the requsted data from the database and returns the sorted list of numbers*/
    function readsortedfromDB($listName){
        $con = connect();
        $sql = "SELECT * FROM posts WHERE listName = '$listName';";
        $result = mysqli_query($con,$sql);
        if( $result){
           echo "      Succesful";
       }
       else{
           echo "Error " .$sql . "<br>" .mysqli_error($con);
       }
        $jsonResult = mysqli_fetch_assoc($result);
        //print_r($jsonResult);
        $post = json_decode($jsonResult['nums'], TRUE);
        $nums = $post['nums'];
        sort($nums);
       return $nums;
    }
    
    /*This function accepts a JSON formated string of 500 numbers and posts to the database*/
    function writetoDB($listName,$nums)
    {

        $con = connect();
        $sql = "INSERT INTO posts (listName, nums)
        VALUES ('$listName', '$nums');";
        
        
        $post = json_decode($nums, TRUE);
        $nums2 = $post['nums'];
        if ($nums2[499] == NULL){
            echo "      Please enter 500 numbers";
        }
        else{
            //echo "      complete";
        if( mysqli_query($con, $sql)){
            echo "Record created Succesfully";
           }
        else{
            echo "Error " .$sql . "<br>" .mysqli_error($con);
           }
        }
        mysqli_close($con);
    }
    
    
    /*This switch statement is responds to the html requests that come through*/
    switch($_SERVER['REQUEST_METHOD'])
    {
        case 'GET': $the_request = &$_GET; 
                    echo "GET works";
                    $listName = $_GET["listName"];
                    echo nl2br("\r\n");
                    echo $listName;
                    $apiresponse = readsortedfromDB($listName);
                    if($apiresponse == NULL)
                    echo "         List does not exist";
                    else
                    print_r($apiresponse);
                    break;
        case 'POST': $the_request = &$_POST; 
                    if(isset($_POST["listName"]) && isset($_POST["nums"])){
                    echo "Post works";
                    }
                    else
                    echo "Please enter a 'listName' and your 'nums' string";
                    $nameofList = $_POST['listName'];
                    $inputnums = $_POST['nums'];
                    writetoDB($nameofList,$inputnums);
                    break;
        default:
    }
    
?>

