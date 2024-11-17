<?php
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
// Obtener los datos del formulario
$clase = $conn->real_escape_string($_POST['clase']);
$mes = $conn->real_escape_string($_POST['mes']);
$dia = $conn->real_escape_string($_POST['dia']);
$hora = $conn->real_escape_string($_POST['hora']);

// Consulta para insertar los datos
$sql_insert = "INSERT INTO clases (clase, mes, dia, hora) VALUES ('$clase', '$mes', $dia, '$hora')";

if ($conn->query($sql_insert) === TRUE) {
    echo "Nuevo registro creado exitosamente<br>";
} else {
    echo "Error: " . $sql_insert . "<br>" . $conn->error;
}

// Consulta para obtener los datos
$sql_select = "SELECT * FROM clases";
$result = $conn->query($sql_select);

if ($result->num_rows > 0) {
    // Imprimir los datos de cada fila
    while($row = $result->fetch_assoc()) {
        echo "Clase: " . $row["clase"] . " - Mes: " . $row["mes"] . " - Día: " . $row["dia"] . " - Hora: " . $row["hora"] . "<br>";
    }
} else {
    echo "No se encontraron registros.";
}

// Cerrar la conexión
$conn->close();
?>
