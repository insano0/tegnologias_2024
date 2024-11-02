<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');


include 'db_connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Obtén los datos del POST
    $data = $_POST['data'];

    // Validar los datos
    if (!empty($data)) {
        // Inserta los datos en la base de datos
        $sql = "INSERT INTO tu_tabla (columna) VALUES ('$data')";
        if ($conn->query($sql) === TRUE) {
            echo "Nuevo registro creado exitosamente";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    } else {
        echo "Error: No se proporcionaron datos";
    }

    $conn->close();
} else {
    echo "Método de solicitud no permitido";
}
?>
