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

// Consulta para obtener los datos
$sql = "SELECT * FROM clases"; // Asegúrate de que el nombre de la tabla sea correcto
$result = $conn->query($sql);

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
