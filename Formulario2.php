<?php
include 'db_connection.php'; // Incluir el archivo de conexión

// Establecer el tipo de contenido de la respuesta a JSON
header('Content-Type: application/json');

// Manejar errores de reporte
error_reporting(0);

// Leer los datos enviados mediante el formulario
$clase = $conn->real_escape_string($_POST['clase']);
$mes = $conn->real_escape_string($_POST['mes']);
$dia = $conn->real_escape_string($_POST['dia']);
$hora = $conn->real_escape_string($_POST['hora']);

// Consulta para insertar los datos
$sql_insert = "INSERT INTO clases (clase, mes, dia, hora) VALUES ('$clase', '$mes', '$dia', '$hora')";

$response = [];

if ($conn->query($sql_insert) === TRUE) {
    $response["mensaje"] = "Nuevo registro creado exitosamente";
} else {
    $response["mensaje"] = "Error en el registro";
}

// Consulta para obtener los datos
$sql_select = "SELECT * FROM clases";
$result = $conn->query($sql_select);

if ($result->num_rows > 0) {
    $clases = [];
    while($row = $result->fetch_assoc()) {
        $clases[] = $row;
    }
    $response["clases"] = $clases;
} else {
    $response["clases"] = [];
}

// Cerrar la conexión
$conn->close();

// Devolver la respuesta en formato JSON
echo json_encode($response);
?>