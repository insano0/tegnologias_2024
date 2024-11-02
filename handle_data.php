<?php
include 'db_connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Obtén los datos del POST
    $data = $_POST['data'];

    // Inserta los datos en la base de datos
    $sql = "INSERT INTO tu_tabla (columna) VALUES ('$data')";
    if ($conn->query($sql) === TRUE) {
        echo "Nuevo registro creado exitosamente";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $conn->close();
}
?>
