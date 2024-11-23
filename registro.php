<?php
// process.php
include_once "../conexion.php";
header('Content-Type: application/json');
error_reporting(0);

// Verificar si los datos fueron enviados
if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    // Verificar si se cargó un archivo
    if (isset($_FILES['imagen']) && $_FILES['imagen']['error'] == 0) {
        $targetDir = "../../uploads/"; // Directorio donde deseas guardar el archivo
        $fileName = basename($_FILES['imagen']['name']);
        $targetFilePath = $targetDir . $fileName;
        $targetFilePathBD = "uploads/" . $fileName;
        $fileType = strtolower(pathinfo($targetFilePath, PATHINFO_EXTENSION));

        // Mover el archivo cargado a la ubicación deseada
        if (move_uploaded_file($_FILES['imagen']['tmp_name'], $targetFilePath)) {
            $uploadPath = $targetFilePath; // Ruta para almacenar en la base de datos
        } else {
            $response = ["mensaje" => "Error al subir la imagen:" . $_FILES['imagen']['name']];
            echo json_encode($response);
            exit();
        }
    } else {
        $response = ["mensaje" => "No se subió ninguna imagen o hubo un error al subirla."];
        echo json_encode($response);
        exit();
    }

    // Insertar los datos en la base de datos
    $sql = "INSERT INTO `personas` (`id`, `correo`, `nombre`, `contrasena`, `tipo`, `imagen`)
            VALUES (NULL, '".$_POST["email"]."', '".$_POST["username"]."', PASSWORD('".$_POST["password"]."'), 'usuario', '".$targetFilePathBD."');";

    if ($conn->query($sql) === TRUE) {
        $response = ["mensaje" => "Registro exitoso"];
    } else {
        $response = ["mensaje" => "Error en el registro: " . $conn->error];
    }

    echo json_encode($response);
    $conn->close();
} else {
    $response = ["mensaje" => "Solicitud inválida"];
    echo json_encode($response);
}
?>
