<?php
// Incluir el archivo de conexión a la base de datos
include 'db.php';

// Obtener los datos enviados desde el formulario
$usuario_id = $_POST['usuario_id'];
$tipo_clase = $_POST['tipo_clase'];
$clase_id = $_POST['clase_id'];

// Validar si los datos están completos
if (empty($usuario_id) || empty($tipo_clase) || empty($clase_id)) {
    echo "Todos los campos son obligatorios.";
    exit;
}

// Verificar si hay cupos disponibles en la clase seleccionada
$query = "SELECT cupos_disponibles FROM Clases WHERE tipo = '$tipo_clase' AND id = $clase_id";
$result = $conn->query($query);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();

    // Si hay cupos disponibles, proceder con la reserva
    if ($row['cupos_disponibles'] > 0) {
        // Registrar la reserva en la tabla Reservas
        $query = "INSERT INTO Reservas (usuario_id, clase_id) VALUES ($usuario_id, $clase_id)";
        
        if ($conn->query($query) === TRUE) {
            // Reducir el número de cupos disponibles en la clase
            $query = "UPDATE Clases SET cupos_disponibles = cupos_disponibles - 1 WHERE id = $clase_id";
            $conn->query($query);

            echo "Reserva realizada con éxito.";
        } else {
            echo "Error al registrar la reserva: " . $conn->error;
        }
    } else {
        echo "No hay cupos disponibles para esta clase.";
    }
} else {
    echo "Clase no encontrada o el tipo de clase no coincide.";
}

// Cerrar la conexión
$conn->close();
?>
