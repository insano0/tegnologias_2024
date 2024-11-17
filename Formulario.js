document.addEventListener('DOMContentLoaded', function () {
    mostrarClases();

    document.getElementById('formularioClase').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevenir el envío del formulario
        const clase = document.getElementById('clase').value;
        const mes = document.getElementById('mes').value;
        const dia = document.getElementById('dia').value;
        const hora = document.getElementById('hora').value;

        if (clase && mes && dia && hora) {
            const claseInfo = {
                clase: clase,
                mes: mes,
                dia: dia,
                hora: hora
            };

            guardarClase(claseInfo);
            mostrarClases();
            // Limpiar el formulario
            document.getElementById('formularioClase').reset();
            document.getElementById('errorMensaje').style.display = 'none';
        } else {
            document.getElementById('errorMensaje').style.display = 'block';
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
