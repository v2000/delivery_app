<?php
class LoginHandler {

  private $pdo;
  private $usertablename;

    // arguments with default values
    // change these if you want
  private function initialSetUpMySql(
    $host = "localhost",
    $dbname = "woodelivery",
    $dbusername = "root",
    $dbpassword = "",
    $usertablename = "wp_couriers"
  ){

    // create our pdo instance
    $this->pdo = new PDO(
      "mysql:host=$host;charset=utf8", 
      $dbusername, 
      $dbpassword
    );

    // create our database if it does not exist
    $q = $this -> pdo -> prepare("CREATE DATABASE IF NOT EXISTS $dbname");
    $q -> execute();

    // switch to the database
    $q = $this -> pdo -> prepare("USE $dbname");
    $q -> execute();

    // create our user table if it does not exist
    $q = $this -> pdo -> prepare(
      "CREATE TABLE IF NOT EXISTS wp_couriers (".
      "ID int(11) unsigned NOT NULL AUTO_INCREMENT,".
      "courier_login varchar(60) DEFAULT NULL,".
      "courier_pass varchar(60) DEFAULT NULL,".
      "courier_firstName varchar(60) DEFAULT NULL,".
      "courier_lastName varchar(60) DEFAULT NULL,".
      "PRIMARY KEY (ID))"
    );
    $q -> execute();

    // remember user table name as a property
    $this -> usertablename = $usertablename;
  }

/*  public function registerUser($username,$password,$firstname,$lastname,$minLen = 5){

    // do not accept usernames or passwords below a certain length
    //не принимаем имена пользователей и пароли ниже длиной certainkind
    if(strlen($username) < $minLen || strlen($password) < $minLen){
      $response['authenticated'] = false;
      return $response;
    };

    // check if the username is already taken
    // then do not accept
    $q = $this -> pdo -> prepare(
      "SELECT COUNT(*) as count FROM $this->usertablename ".
      "WHERE userName = '$username'"
    );
    $q -> execute();
    $r = $q -> fetchAll();

    if($r[0]["count"] != 0){
      // user exists so no go
      $response['authenticated'] = false;
      return $response;
    };

    // create user
    $q = $this -> pdo -> prepare(
      "INSERT INTO $this->usertablename (firstName, lastName, userName, password) ".
      "VALUES ('$firstname','$lastname','$username','$password')"
    );
    $q -> execute();

    // automatically login user after registration
    return $this -> login($username,$password);

  }*/

  public function login($username,$password){
    $q = $this -> pdo -> prepare(
      "SELECT id FROM $this->usertablename ".
      "WHERE courier_login = '$username' && courier_pass = '$password'"
    );
    
    // check if login is ok
    $q -> execute();
    $r = $q -> fetchAll();

    if(count($r) === 0){
      // combination of username and password does not exist
      // so no go
      return $response['authenticated'] = false;
    }

    // store the user in a session variable
    $_SESSION["LoginHandlerCurrentUser"] = $username;
    $_SESSION["LoginHandlerCurrentUserId"] = $r[0]["id"];
    $response['authenticated'] = true;
    $response['username'] = $username;
    return $response;
  }

  public function getUser(){

    // return false if no logged in user
    if (!isset($_SESSION["LoginHandlerCurrentUser"])){
      return false;
    }
    $username = $_SESSION["LoginHandlerCurrentUser"];
    
    return $username;
  }

   public function getUserId(){

    // return false if no logged in user
    if (!isset($_SESSION["LoginHandlerCurrentUserId"])){
      return false;
    }
    $username = $_SESSION["LoginHandlerCurrentUserId"];
    
    return $username;
  }

  public function logOut(){

     // delete user from session variables
     unset($_SESSION["LoginHandlerCurrentUser"]);
     unset($_SESSION["LoginHandlerCurrentUserId"]);

     // return true to show that we succeeded
     return true;
  }

  private function handleRequests(){

    // We are lazy and do not want to write $_REQUEST
    // a gazillions times below...
    $json = file_get_contents('php://input');

    // packa upp och tvinga associativ array
    $r = json_decode($json, true);
    //$r = $_REQUEST;

    // Do nothing if no action is sent
    if(!isset($r["loginHandlerAction"])){return false;}

    // Read method/action and username and password
    $action = $r["loginHandlerAction"];
    $username = isset($r["username"]) ? $r["username"] : '';
    $password = isset($r["password"]) ? $r["password"] : '';
    $firstname = isset($r["firstname"]) ? $r["firstname"] : '';
    $lastname = isset($r["lastname"]) ? $r["lastname"] : '';

    // Call method corresponding to action if it exist
    // echo as json and die (stop running php)
    if (method_exists($this, $action) ){ 
      // $this -> {$action} lets us read the name of the
      // method we want to call from a variable, nifty ;)
      die(json_encode($this->{$action}($username,$password,$firstname,$lastname))); 
    } 

  }


  public function __construct(){

    // Our constructor, runs when we create a
    // a new LoginHandler

    // Session start - needed to be able to use session variables
    session_start();

    // Create our PDO instance 
    // and create database and/or table if non existing

    $this -> initialSetUpMySQL();

    // Listen to requests to the Loginhandler
    $this -> handleRequests();

  }

}