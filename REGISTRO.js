window.onload = function () {
    document.getElementById('miFormulario').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevenir el envío predeterminado del formulario

        const formData = new FormData(this); // Crear un objeto FormData desde el formulario
        let allFieldsFilled = true;

        // Verificar que todos los campos estén llenos
        for (const [key, value] of formData.entries()) {
            if (!value) {
                allFieldsFilled = false;
                break;
            }
        }

        if (!allFieldsFilled) {
            alert("Por favor, completa todos los campos antes de enviar el formulario.");
            return;
        }

        // Registrar los datos del formulario en la consola
        console.log("Datos del formulario antes de enviarlos:");
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
                        const response = JSON.parse(xhr.responseText);  // Parsear la respuesta JSON
                        console.log(response);  // Imprimir la respuesta en la consola

                        // Mostrar un mensaje de éxito
                        alert(response.mensaje || "Datos guardados");

                        // Limpiar el formulario
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
};
