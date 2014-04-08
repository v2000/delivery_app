<?php
// Session start - needed to be able to use session variables
session_start();

$json = file_get_contents('php://input');
$r = json_decode($json, true);
$response = array('request'=>$r);

$host = "localhost";
$dbname = "myfoodmedb";
$user = "root";
$pass = "";

$myPDO = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8",$user,$pass,array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));

// User id
$userId = $_SESSION["LoginHandlerCurrentUserId"]/1;

// Charateristics id
$charId = $r["id"]/1;

// Insert (true) or delete
$hasChar = $r["haschar"];

if($hasChar){
  // Insert new interest
  $sql = "INSERT INTO personcharacteristics (personId,characteristicId) VALUES($userId,$charId)";
  $query = $myPDO->prepare($sql);
  $query -> execute();
  //echo($sql);
}
else {
  // Delete old interest
  $sql = "DELETE FROM personcharacteristics  WHERE personId = $userId && characteristicId = $charId";
  $query = $myPDO->prepare($sql);
  $query -> execute();
  //echo($sql);
}