<?php
include 'db_connection.php';

$sql = "INSERT INTO tu_tabla (columna) VALUES ('Valor de prueba')";

if ($conn->query($sql) === TRUE) {
    echo "Nuevo registro creado exitosamente";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
