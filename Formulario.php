<?php
include 'db_connection.php'; // Incluir el archivo de conexión

// Establecer el tipo de contenido de la respuesta a JSON
header('Content-Type: application/json');

$clase = $conn->real_escape_string($data['clase']);
$mes = $conn->real_escape_string($data['mes']);
$dia = $conn->real_escape_string($data['dia']);
$hora = $conn->real_escape_string($data['hora']);


// Leer los datos JSON de la solicitud POST
$data = json_decode(file_get_contents('php://input'), true);

$sql = "select * from clases";
// Consulta para insertar los datos
$sql_insert = "INSERT INTO clases (clase, mes, dia, hora) VALUES ('$clase', '$mes', $dia, '$hora')";

$response = [];

if ($conn->query($sql_insert) === TRUE) {
    $response["message"] = "Nuevo registro creado exitosamente";
} else {
    $response["error"] = "Error: " . $sql_insert . " - " . $conn->error;
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
