<?php
$servername = "sql109.infinityfree.com";
$username = "if0_37602159";
$password = "tegnologias";
$dbname = "if0_37602159_XXX";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
echo "Conexión exitosa";
?>
