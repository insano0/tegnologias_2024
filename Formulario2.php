<?php
include 'db_connection.php'; // Incluir el archivo de conexión

// Establecer el tipo de contenido de la respuesta a JSON
header('Content-Type: application/json');

// Manejar errores de reporte
error_reporting(E_ALL);
ini_set('display_errors', 0); // No mostrar errores en la salida, pero registrarlos

// Iniciar el buffer de salida para capturar cualquier salida inesperada
ob_start();

// Inicializar la variable de respuesta
$response = [];

try {
    // Leer los datos enviados mediante el formulario
    if (isset($_POST['clase']) && isset($_POST['mes']) && isset($_POST['dia']) && isset($_POST['hora'])) {
        $clase = $conn->real_escape_string($_POST['clase']);
        $mes = $conn->real_escape_string($_POST['mes']);
        $dia = $conn->real_escape_string($_POST['dia']);
        $hora = $conn->real_escape_string($_POST['hora']);

        // Consulta para insertar los datos
        $sql_insert = "INSERT INTO clases (clase, mes, dia, hora) VALUES ('$clase', '$mes', '$dia', '$hora')";

        if ($conn->query($sql_insert) === TRUE) {
            $response["mensaje"] = "Nuevo registro creado exitosamente";
        } else {
            throw new Exception("Error en el registro: " . $conn->error);
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

    } else {
        throw new Exception("Datos incompletos");
    }
} catch (Exception $e) {
    $response["error"] = $e->getMessage();
}

// Limpiar cualquier salida inesperada
ob_end_clean();

// Cerrar la conexión
$conn->close();

// Devolver la respuesta en formato JSON
echo json_encode($response);
?>
