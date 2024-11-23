<?php
include 'db_connection.php'; // Incluir el archivo de conexión

// Establecer el tipo de contenido de la respuesta a JSON
header('Content-Type: application/json');

// Inicializar la variable de respuesta
$response = [];

try {
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

} catch (Exception $e) {
    $response["error"] = $e->getMessage();
}

// Cerrar la conexión
$conn->close();

// Devolver la respuesta en formato JSON
echo json_encode($response);
?>
