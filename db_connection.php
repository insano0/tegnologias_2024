<?php
// Configura las cabeceras para permitir solicitudes CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Credenciales de la base de datos
$servername = "sql109.infinityfree.com";
$username = "if0_37602159";
$password = "tegnologias";
$dbname = "if0_37602159_agendamiento";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
echo "Conexión exitosa";
?>
