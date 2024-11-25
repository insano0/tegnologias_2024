<?php
include 'db_connection.php';

header('Content-Type: application/json');
error_reporting(E_ALL); // Mostrar todos los errores (cambiar en producción)
ini_set('display_errors', 1);

// Comprobar la conexión a la base de datos
if ($conn->connect_error) {
    die(json_encode(["error" => "Error en la conexión: " . $conn->connect_error]));
}

// Obtener datos JSON de la solicitud
$data = json_decode(file_get_contents('php://input'), true);

// Verificar si la decodificación fue exitosa
if (json_last_error() !== JSON_ERROR_NONE) {
    die(json_encode(["error" => "Error al decodificar JSON: " . json_last_error_msg()]));
}

// Verificar si se ha enviado el correo y la contraseña
if (isset($data["correo"]) && !empty($data["correo"])) {
    if (isset($data["contrasena"]) && !empty($data["contrasena"])) {
    
        // Obtener el correo y la contraseña, escapando para evitar inyecciones SQL
        $correo = $conn->real_escape_string($data["correo"]);
        $contrasena = $conn->real_escape_string($data["contrasena"]);

        // Usar prepared statement para prevenir inyección SQL
        $stmt = $conn->prepare("SELECT * FROM `registro` WHERE `correo` = ?");
        if ($stmt) {
            $stmt->bind_param("s", $correo); // "s" indica que el parámetro es un string
            $stmt->execute();
            $result = $stmt->get_result();
            
            // Comprobar si se encontró un usuario con ese correo
            if ($result->num_rows > 0) {
                // El usuario fue encontrado, verificar la contraseña
                $usuario = $result->fetch_assoc(); // Obtener los datos del usuario
                
                // Comparar la contraseña ingresada con la almacenada (suponiendo que está hasheada)
                if (password_verify($contrasena, $usuario["contrasena"])) {
                    // Contraseña correcta
                    $response = [
                        "existe" => true,
                        "mensaje" => "Inicio de sesión exitoso.",
                        "usuario" => $usuario // Puedes devolver más información del usuario si es necesario
                    ];
                    session_start();  // Iniciar sesión

                    // Almacenar los datos del usuario en la sesión
                    $_SESSION["usuario_id"] = $usuario["id"];  // Ejemplo de ID de usuario
                    $_SESSION["usuario_nombre"] = $usuario["usuario"];  // Ejemplo de nombre del usuario
                    $_SESSION["usuario_correo"] = $usuario["correo"];  // Ejemplo de correo del usuario
                } else {
                    // Contraseña incorrecta
                    $response = ["existe" => false, "mensaje" => "La contraseña es incorrecta."];
                }
            } else {
                // No se encontró un usuario con ese correo
                $response = ["existe" => false, "mensaje" => "No se encontró un usuario con ese correo."];
            }

            $stmt->close();
        } else {
            $response = ["existe" => false, "mensaje" => "Error al preparar la declaración."];
        }

    } else {
        // Si no se ha enviado una contraseña
        $response = ["existe" => false, "mensaje" => "Contraseña no proporcionada o es inválida."];
    }

} else {
    // Si no se ha enviado un correo
    $response = ["existe" => false, "mensaje" => "Correo no proporcionado o es inválido."];
}

echo json_encode($response); // Devolver la respuesta en formato JSON
$conn->close();
?>
