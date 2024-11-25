<?php
// process.php
include_once "../db_conexion.php";
header('Content-Type: application/json');
error_reporting(0); // Mostrar todos los errores (puedes cambiarlo a E_ALL en desarrollo)

// Verificar si se ha enviado el correo por POST
if (isset($_POST["correo"]) && !empty($_POST["correo"])) {
    if (isset($_POST["contrasena"]) && !empty($_POST["contrasena"])) {
    
        // Obtener el correo y la contraseña, escapando para evitar inyecciones SQL
        $correo = $conn->real_escape_string($_POST["correo"]);
        $contrasena = $conn->real_escape_string($_POST["contrasena"]);

        // Usar prepared statement para prevenir inyección SQL
        $stmt = $conn->prepare("SELECT * FROM `registro` WHERE `correo` = ?");
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
        // Si no se ha enviado una contraseña
        $response = ["existe" => false, "mensaje" => "Contraseña no proporcionada o es inválida."];
    }

} else {
    // Si no se ha enviado un correo
    $response = ["existe" => false, "mensaje" => "Correo no proporcionado o es inválido."];
}

echo json_encode($response);
$conn->close();
?>
