<?php
// process.php
include 'db_connection.php';
header('Content-Type: application/json');
error_reporting(E_ALL); // Mostrar todos los errores
ini_set('display_errors', 1); // Mostrar errores en la salida

// Inicializar la variable de respuesta
$response = [];

// Verificar la conexión a la base de datos
if ($conn->connect_error) {
    $response["mensaje"] = "Error de conexión: " . $conn->connect_error;
    echo json_encode($response);
    exit();
}

// Leer los datos enviados mediante el formulario
$correo = $conn->real_escape_string($_POST['correo']);
$usuario = $conn->real_escape_string($_POST['usuario']);
$contrasena = $conn->real_escape_string($_POST['contrasena']);

// Guardar las variables en el array de respuesta (para verificación)
$response['datos_recibidos'] = [
    'correo' => $correo,
    'usuario' => $usuario,
    'contrasena' => $contrasena
];

// Consulta para insertar los datos en la tabla `personas`
$sql = "INSERT INTO `registro` (`id`, `correo`, `usuario`, `contrasena`) VALUES (NULL, '$correo', '$usuario', PASSWORD('$contrasena'))";

if ($conn->query($sql) === TRUE) {
    $response["mensaje"] = "Registro exitoso";
} else {
    $response["mensaje"] = "Error en el registro: " . $conn->error; // Incluir el error específico
}

// Consulta para obtener los datos
$sql_select = "SELECT * FROM registro";
$result = $conn->query($sql_select);

if ($result->num_rows > 0) {
    $registros = [];
    while ($row = $result->fetch_assoc()) {
        $registros[] = $row;
    }
    $response["registros"] = $registros;
} else {
    $response["registros"] = [];
}

// Cerrar la conexión
$conn->close();

// Devolver la respuesta en formato JSON
echo json_encode($response);
?>
