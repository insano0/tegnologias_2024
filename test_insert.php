<?php
include 'db_connection.php';

$sql = "INSERT INTO persona (correo) VALUES ('prueba@example.com')";

if ($conn->query($sql) === TRUE) {
    echo "Nuevo registro creado exitosamente en la tabla persona.";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$sql = "INSERT INTO agenda (clase, mes, dia, hora) VALUES ('Aeróbicos', 'Enero', 1, '10:00')";

if ($conn->query($sql) === TRUE) {
    echo "Nuevo registro creado exitosamente en la tabla agenda.";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
