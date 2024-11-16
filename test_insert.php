<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$servername = "sql212.infinityfree.com";
$username = "if0_37641963";
$password = "cHglxwRYwcacKo";
$dbname = "if0_37641963_gymword";


// Crear la conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
echo "Conexión exitosa a la base de datos '$dbname'";
?>
