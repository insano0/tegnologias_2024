window.onload = function () {
    document.getElementById('miFormulario').addEventListener('submit', function (event) {
        event.preventDefault(); // Evitar la envío por defecto del formulario

        const formData = new FormData(this); // Crear un objeto FormData desde el formulario
        const jsonData = {}; // Crear un objeto para almacenar los datos en formato JSON

        // Convertir FormData a JSON
        formData.forEach((value, key) => {
            jsonData[key] = value;
        });

        const xhr = new XMLHttpRequest();  // Crear un objeto XMLHttpRequest
        xhr.open('POST', 'login.php', true);  // Abrir una solicitud POST a tu endpoint PHP
        xhr.setRequestHeader('Content-Type', 'application/json'); // Configurar el encabezado para enviar JSON

        // Cuando la solicitud se complete
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {  // Solicitud completada y exitosa
                try {
                    const response = JSON.parse(xhr.responseText);  // Analizar la respuesta JSON
                    console.log('Datos obtenidos del servidor:', response);

                    // Manejar la respuesta del login
                    if (response.existe) {
                        console.log(response.mensaje);  // Mostrar mensaje de éxito
                        document.getElementById('datos').innerHTML = response.mensaje;
                        // Puedes añadir lógica adicional aquí si es necesario
                    } else {
                        console.error(response.mensaje);  // Mostrar mensaje de error
                        document.getElementById('datos').innerHTML = response.mensaje;
                    }
                } catch (error) {
                    console.error('Error al analizar la respuesta JSON:', error);
                    document.getElementById('datos').innerHTML = 'Error al analizar la respuesta JSON.';
                }
            } else if (xhr.readyState === 4) {
                console.error('Error en la solicitud:', xhr.statusText);  // Manejar errores de solicitud
                document.getElementById('datos').innerHTML = `Error en la solicitud: ${xhr.statusText}`;
            }
        };

        // Manejar errores de red
        xhr.onerror = function () {
            console.error('Error de red ocurrió durante la solicitud.');
            document.getElementById('datos').innerHTML = 'Error de red ocurrió durante la solicitud.';
        };

        // Enviar los datos en formato JSON al servidor
        xhr.send(JSON.stringify(jsonData));  // Convertir jsonData a cadena JSON y enviar
    });
};
