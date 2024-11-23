window.onload = function () {
    document.getElementById('miFormulario').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevenir el envío predeterminado del formulario

        const username = document.getElementById('username').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        const userData = {
            username: username,
            email: email,
            password: password
        };

        const jsonData = JSON.stringify(userData);
        console.log('Datos del formulario en formato JSON:', jsonData);

        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'registro.php', true); // Reemplaza 'db_connection.php' con la URL del servidor que recibe los datos
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    try {
                        const response = JSON.parse(xhr.responseText);
                        console.log(response); // Manejar la respuesta del servidor
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
