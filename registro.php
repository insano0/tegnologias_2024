<?php
// process.php
include_once "../conexion.php";
header('Content-Type: application/json');
error_reporting(0);

//$data = json_decode(file_get_contents('php://input'), true);


// Aquí puedes procesar los datos
//$response = ["nombre" => $data["nombre"] ];

/*$data["contrasena"] 
$data["tipo"]  */

// Handle file upload
$targetDir = "../../uploads/"; // Directory where you want to save the file
$fileName = basename($_FILES['imagen']['name']);
$targetFilePath = $targetDir . $fileName;
$targetFilePathBD = "uploads/" . $fileName;
$fileType = strtolower(pathinfo($targetFilePath, PATHINFO_EXTENSION));



//$response = ["mensaje" => $_FILES['imagen']['name']];      
    // Move the uploaded file to the desired location
    if (move_uploaded_file($_FILES['imagen']['tmp_name'], $targetFilePath)) {
        $uploadPath = $targetFilePath; // Path to be stored in the database
    } else {
        $response = ["mensaje" => "Error al subir la imagen:" . $_FILES['imagen']['name']];
        echo json_encode($response);
        exit();
    }

$sql = "INSERT INTO `personas` (`id`, `correo`, `nombre`, `contrasena`, `tipo`,`imagen`)
        VALUES (NULL, '".$_POST["correo"]."', '".$_POST["nombre"]."', PASSWORD('".$_POST["contrasena"]."'), '".$_POST["tipo"]."','".$targetFilePathBD."');";

if ($conn->query($sql) === TRUE) {
    $response = ["mensaje" => "Registro exitoso"];
} else {
    $response = ["mensaje" => "Error en el registro"];
}

echo json_encode($response);
$conn->close();



?>
