<?php
session_start();
$userid = $_SESSION['LoginHandlerCurrentUserId'];

// Add the property DBH
// (an instance of PDO)
$host = "localhost";
$dbname = "myfoodmedb";
$user = "root";
$pass = "";

$myPDO = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8",$user,$pass,array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));

$sql = "SELECT *,IFNULL((SELECT id FROM personcharacteristics
WHERE characteristics.id = personcharacteristics.characteristicId
&& personcharacteristics.personId = $userid), FALSE)AS haschar
FROM characteristics";
$query = $myPDO->prepare($sql);
$query->execute();
$result = $query->fetchAll(PDO::FETCH_ASSOC);
print(json_encode($result));

/*
$sql = "DELETE * FROM PERSONS WHERE firstName='Erik'";
$query = $myPDO->prepare($sql);
$query->execute();
*/