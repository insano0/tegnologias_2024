document.getElementById('formularioClase').addEventListener('submit', function(e) {
    e.preventDefault();

    const clase = document.getElementById('clase').value;
    const mes = document.getElementById('mes').value;
    const dia = document.getElementById('dia').value;
    const hora = document.getElementById('hora').value;

    const errorMensaje = document.getElementById('errorMensaje');
    
    if (!clase || !mes || !dia || !hora) {
        errorMensaje.style.display = 'block';
        return;
    } else {
        errorMensaje.style.display = 'none';
    }

    fetch('http://sql109.infinityfreeapp.com/db_connection.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `clase=${encodeURIComponent(clase)}&mes=${encodeURIComponent(mes)}&dia=${encodeURIComponent(dia)}&hora=${encodeURIComponent(hora)}`
    })
    .then(response => response.text())
    .then(data => {
        console.log('Respuesta del servidor:', data);

        // Aquí puedes actualizar la tabla con los nuevos datos
        const tablaClases = document.getElementById('tablaClases');
        const nuevaFila = document.createElement('tr');
        nuevaFila.innerHTML = `<td>${clase}</td><td>${mes}</td><td>${dia}</td><td>${hora}</td><td><button onclick="eliminarFila(this)">Eliminar</button></td>`;
        tablaClases.appendChild(nuevaFila);

        // Limpiar el formulario
        document.getElementById('formularioClase').reset();
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

function eliminarFila(button) {
    const fila = button.parentNode.parentNode;
    fila.parentNode.removeChild(fila);
}
