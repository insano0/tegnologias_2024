window.onload = function () {
    document.getElementById('miFormulario').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevenir el envío predeterminado del formulario

        const usuario = document.getElementById('usuario').value.trim();
        const correo = document.getElementById('correo').value.trim();
        const contrasena = document.getElementById('contrasena').value.trim();

        const userData = {
            usuario: usuario,
            correo: correo,
            contrasena: contrasena
        };

        const jsonData = JSON.stringify(userData);
        console.log('Datos del formulario en formato JSON:', jsonData);

        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'registro.php', true); // Reemplaza 'registro.php' con la URL del servidor que recibe los datos
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) { // Solicitud completada
                if (xhr.status === 200) { // Si la solicitud fue exitosa
                    try {
                        const response = JSON.parse(xhr.responseText);
                        console.log(response); // Manejar la respuesta del servidor

                        // Mostrar un mensaje de éxito
                        alert(response.mensaje || "Datos guardados");

                        // Limpiar el formulario
                        document.getElementById('miFormulario').reset();
                    } catch (e) {
                        console.error('Error al parsear la respuesta JSON:', e);
                    }
                } else {
                    console.error('Error en el envío de datos:', xhr.statusText);
                }
            }
        };
        xhr.send(jsonData); // Enviar los datos en formato JSON
    });
}
