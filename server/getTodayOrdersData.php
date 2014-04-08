<?php
session_start();
$userid = $_SESSION['LoginHandlerCurrentUserId'];

// Add the property DBH
// (an instance of PDO)
$host = "localhost";
$dbname = "myfoodmedb";
$user = "root";
$pass = "";

//$myPDO = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8",$user,$pass,array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));

//$sql = "SELECT *,IFNULL((SELECT ID, orderNumber, prodyctName, quontity, deliveryAddress, deliveryTime, optional FROM wp_orderdetails";
//$query = $myPDO->prepare($sql);
//$query->execute();
//$result = $query->fetchAll(PDO::FETCH_ASSOC);
//print(json_encode($result));




$myPDO = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8",$user,$pass);

//$sql = "SELECT type FROM characteristictype";
$sql = "SELECT ID, OrderNummer, prodyctName, quontity, deliveryAddress, deliveryTime, optional FROM wp_order_details";
$query = $myPDO->prepare($sql);
$query->execute();
$result = $query->fetchAll(PDO::FETCH_ASSOC);
print(json_encode($result));
/*
$sql = "DELETE * FROM PERSONS WHERE firstName='Erik'";
$query = $myPDO->prepare($sql);
$query->execute();
*/