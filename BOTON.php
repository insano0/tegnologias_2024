<?php
include 'db_connection.php'; // Incluir el archivo de conexión

header('Content-Type: application/json');

// Verificar la conexión
if ($conn->connect_error) {
    echo json_encode(["error" => "Conexión fallida: " . $conn->connect_error]);
    exit();
}

// Consulta para obtener la información de la tabla `clases`
$sql = "SELECT clase, dia, mes, hora FROM clases";
$result = $conn->query($sql);

$response = [];

if ($result->num_rows > 0) {
    $clases = [];
    while ($row = $result->fetch_assoc()) {
        $clases[] = $row;
    }
    $response['clases'] = $clases;
} else {
    $response['mensaje'] = "No se encontraron registros";
}

// Cerrar la conexión
$conn->close();

echo json_encode($response);
?>
