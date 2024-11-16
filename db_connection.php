
<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);



// Credenciales de la base de datos
$servername = "sql212.infinityfree.com";
$username = "if0_37641963";
$password = "cHglxwRYwcacKo";
$dbname = "if0_37641963_gymword";

// Crear la conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Obtener los datos del formulario y escaparlos para evitar inyecciones SQL
$clase = $conn->real_escape_string($_POST['clase']);
$mes = $conn->real_escape_string($_POST['mes']);
$dia = $conn->real_escape_string($_POST['dia']);
$hora = $conn->real_escape_string($_POST['hora']);

// Verificar si se reciben los datos del formulario
if(empty($clase) || empty($mes) || empty($dia) || empty($hora)) {
    die("Error: No se recibieron todos los datos del formulario.");
} else {
    echo "Datos recibidos: Clase: $clase, Mes: $mes, Día: $dia, Hora: $hora<br>";
}

// Preparar la consulta SQL
$sql = "INSERT INTO clases (clase, mes, dia, hora) VALUES ('$clase', '$mes', '$dia', '$hora')";

// Ejecutar la consulta
if ($conn->query($sql) === TRUE) {
    echo "Clase añadida exitosamente";
} else {
    echo "Error al añadir la clase: " . $conn->error;
}

// Cerrar la conexión
$conn->close();
?>
