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

// Crear la conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Obtener los datos del formulario
$clase = $_POST['clase'];
$mes = $_POST['mes'];
$dia = $_POST['dia'];
$hora = $_POST['hora'];

// Preparar la consulta SQL
$sql = "INSERT INTO clases (clase, mes, dia, hora) VALUES ('$clase', '$mes', '$dia', '$hora')";

// Ejecutar la consulta
if ($conn->query($sql) === TRUE) {
    echo "Clase añadida exitosamente";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

// Cerrar la conexión
$conn->close();
?>
