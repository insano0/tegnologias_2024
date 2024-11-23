window.onload = function () {
    document.getElementById('miFormulario').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevenir el envío predeterminado del formulario

        const formData = new FormData(this); // Crear un objeto FormData desde el formulario

        // Registrar los datos del formulario en la consola
        for (const [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }

        const xhr = new XMLHttpRequest();  // Crear un XMLHttpRequest
        xhr.open('POST', 'registro.php', true);  // Abrir una solicitud POST a tu endpoint PHP

        // Cuando la solicitud se completa
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {  // Solicitud completada
                if (xhr.status === 200) {  // Si la solicitud fue exitosa
                    try {
                        //console.log(xhr.responseText);  // Imprimir la respuesta en la consola
                        const response = JSON.parse(xhr.responseText);  // Parsear la respuesta JSON
                        console.log(response);  // Imprimir la respuesta en la consola

                        // Mostrar un mensaje de éxito
                        alert(response.mensaje || "Datos guardados");

                        // Limpiar el formulario (Aquí es donde se limpia el formulario)
                        document.getElementById('miFormulario').reset();
                    } catch (error) {
                        console.error('Error al parsear la respuesta JSON:', error);
                    }
                } else {
                    console.error('Error en la solicitud:', xhr.statusText);  // Imprimir un error si algo sale mal
                }
            }
        };

        // Enviar los datos del formulario al servidor
        xhr.send(formData);  // Enviar el objeto FormData
    });
}
