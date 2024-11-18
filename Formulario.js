document.addEventListener('DOMContentLoaded', function () {
    mostrarClases();

    document.getElementById('formularioClase').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevenir el envío del formulario

        const clase = document.getElementById('clase').value.trim();
        const mes = document.getElementById('mes').value.trim();
        const dia = document.getElementById('dia').value.trim();
        const hora = document.getElementById('hora').value.trim();
        const errorMensaje = document.getElementById('errorMensaje');

        if (clase && mes && dia && hora) {
            const claseInfo = {
                clase: clase,
                mes: mes,
                dia: dia,
                hora: hora
            };

            const jsonData = JSON.stringify(claseInfo);
            console.log('Datos del formulario en formato JSON:', jsonData);

            enviarDatos(jsonData);
            guardarClase(claseInfo);
            mostrarClases();
            // Limpiar el formulario
            document.getElementById('formularioClase').reset();
            errorMensaje.style.display = 'none';
        } else {
            errorMensaje.style.display = 'block';
        }
    });
});

function guardarClase(claseInfo) {
    let clases = JSON.parse(localStorage.getItem('clases')) || [];
    clases.push(claseInfo);
    localStorage.setItem('clases', JSON.stringify(clases));
}

function mostrarClases() {
    const tablaClases = document.getElementById('tablaClases');
    tablaClases.innerHTML = ''; // Limpiar la tabla
    const clases = JSON.parse(localStorage.getItem('clases')) || [];

    clases.forEach((clase, index) => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${clase.clase}</td>
            <td>${clase.mes}</td>
            <td>${clase.dia}</td>
            <td>${clase.hora}</td>
            <td><button onclick="eliminarClase(${index})">Eliminar</button></td>
        `;
        tablaClases.appendChild(fila);
    });
}

function eliminarClase(index) {
    let clases = JSON.parse(localStorage.getItem('clases')) || [];
    clases.splice(index, 1);
    localStorage.setItem('clases', JSON.stringify(clases));
    mostrarClases(); // Llamada directa para actualizar la tabla
}
/*
function enviarDatos(jsonData) {
    fetch('http://wordgym.rf.gd/Formulario.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: jsonData,
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

*/
function enviarDatos(jsonDatadata) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'wordgym.rf.gd/Formulario.php', true); // Reemplaza 'URL_DEL_SERVIDOR' con la URL del servidor que recibe los datos
    xhr.setRequestHeader('Content-Type', 'application/json;');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText); // Corregido a xhr.responseText
                // Aquí puedes manejar la respuesta del servidor si es necesario
                console.log(response);
            } else {
                console.error('Error en el envío de datos', this.statusText);
            }
        }
    };
    xhr.send(data);
}

