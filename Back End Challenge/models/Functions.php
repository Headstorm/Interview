<?php
  class functions {
    // DB stuff
    private $conn;
    private $table = 'api_table';

    // Post Properties
    public $list_numbers;

    // Constructor with DB
    public function __construct($db) {
      $this->conn = $db;
    }

    // Get Posts
    public function read() {
      // Create query
      $query = 'SELECT * FROM ' . $this->table.' ORDER BY list_numbers';

      // Prepare statement
      $stmt = $this->conn->prepare($query);

      // Execute query
      $stmt->execute();

      return $stmt;
    }

    // Create Post
    public function create() {
          // Create query
          $query = 'INSERT INTO ' . $this->table . ' SET list_numbers = :list_numbers';

          // Prepare statement
          $stmt = $this->conn->prepare($query);

          // Clean data
          $this->title = htmlspecialchars(strip_tags($this->list_numbers));

          // Bind data
          $stmt->bindParam(':list_numbers', $this->list_numbers);

          // Execute query
          if($stmt->execute()) {
            return true;
      }

      // Print error if something goes wrong
      printf("Error: %s.\n", $stmt->error);

      return false;
    }

    // Delete Post
    public function delete() {
          // Create query
          $query = 'DELETE FROM ' . $this->table;

          // Prepare statement
          $stmt = $this->conn->prepare($query);

          // Execute query
          if($stmt->execute()) {
            return true;
          }

          // Print error if something goes wrong
          printf("Error: %s.\n", $stmt->error);

          return false;
    }

  }
