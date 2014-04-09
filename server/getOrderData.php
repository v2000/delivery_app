<?php
session_start();
$userid = $_SESSION['LoginHandlerCurrentUserId'];

// Add the property DBH
// (an instance of PDO)
$host = "localhost";
$dbname = "myfoodmedb";
$user = "root";
$pass = "";



$carrentId =$_POST['carrentId'];
//$myPDO = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8",$user,$pass,array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));

//$sql = "SELECT *,IFNULL((SELECT ID, orderNumber, prodyctName, quontity, deliveryAddress, deliveryTime, optional FROM wp_orderdetails";
//$query = $myPDO->prepare($sql);
//$query->execute();
//$result = $query->fetchAll(PDO::FETCH_ASSOC);
//print(json_encode($result));




$myPDO = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8",$user,$pass);

//$sql = "SELECT type FROM characteristictype";




$sql = "SELECT ID, OrderNummer, prodyctName, quontity, deliveryAddress, deliveryTime, optional, done FROM wp_order_details WHERE OrderNummer='".$carrentId."'";

$query = $myPDO->prepare($sql);
$query->execute();
$result = $query->fetchAll(PDO::FETCH_ASSOC);
print(json_encode($result));
/*
$sql = "DELETE * FROM PERSONS WHERE firstName='Erik'";
$query = $myPDO->prepare($sql);
$query->execute();
*/

/*
<?php

$dns ="mysql:dbname=bookstore;host=localhost";
$myPDO = new PDO($dns , "root", "");

$isbn =$_POST['isbn'];
$mydate =$_POST['mydate'];
$antal =$_POST['antal'];
$sprice =$_POST['sprice'];
$hylla =$_POST['hylla'];

$statement = $myPDO->prepare("UPDATE books SET book_delivery = '".$mydate."', stock='".$antal."', price='".$sprice."', shelf='".$hylla."' WHERE isbn='".$isbn."'");                

$data = array($isbn, $mydate, $antal,  $sprice, $hylla);

$statement->execute($data);

// Go back to leverans.html
header('Location: ../leverans.html');
?>*/