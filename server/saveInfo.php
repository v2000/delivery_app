
<?php
//try
//{
  

 $json = file_get_contents('php://input');

 // packa upp och tvinga associativ array
 $data = json_decode($json, true);

 $response = array();
  
  //$num=json_decode("carrentId");
  //$num=66;
  
  $db = new PDO('mysql:host=localhost;dbname=myfoodmedb','root','');
  $rows = $db->exec("UPDATE wp_order_details SET extraInfo='".$data['info']."' WHERE OrderNummer='".$data['id']."'");
  echo("AAAAAAAAAAAAAAAAA");
/*}
catch(PDOException $e)
{
  die("Error: ".$e->getMessage());
}*/
