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

    const fila = document.createElement('tr');
    fila.innerHTML = `<td>${clase}</td><td>${mes}</td><td>${dia}</td><td>${hora}</td><td><button onclick="eliminarFila(this)">Eliminar</button></td>`;
    document.getElementById('tablaClases').appendChild(fila);

    // Guardar los datos en el almacenamiento local
    guardarClaseLocalStorage(clase, mes, dia, hora);

    // Opcional: limpiar el formulario después de añadir la clase
    document.getElementById('formularioClase').reset();
});

// Función para guardar la clase en el almacenamiento local
function guardarClaseLocalStorage(clase, mes, dia, hora) {
    let clases;
    if (localStorage.getItem('clases') === null) {
        clases = [];
    } else {
        clases = JSON.parse(localStorage.getItem('clases'));
    }
    clases.push({ clase, mes, dia, hora });
    localStorage.setItem('clases', JSON.stringify(clases));
}

// Función para cargar las clases del almacenamiento local
function cargarClasesLocalStorage() {
    let clases;
    if (localStorage.getItem('clases') === null) {
        clases = [];
    } else {
        clases = JSON.parse(localStorage.getItem('clases'));
    }
    const tablaClases = document.getElementById('tablaClases');
    clases.forEach(clase => {
        const fila = document.createElement('tr');
        fila.innerHTML = `<td>${clase.clase}</td><td>${clase.mes}</td><td>${clase.dia}</td><td>${clase.hora}</td><td><button onclick="eliminarFila(this)">Eliminar</button></td>`;
        tablaClases.appendChild(fila);
    });
}

// Cargar las clases del almacenamiento local al iniciar
cargarClasesLocalStorage();

// Función para eliminar una fila de la tabla y del almacenamiento local
function eliminarFila(button) {
    const fila = button.parentNode.parentNode;
    const clase = fila.cells[0].textContent;

    // Eliminar del almacenamiento local
    let clases = JSON.parse(localStorage.getItem('clases'));
    clases = clases.filter(claseItem => claseItem.clase !== clase);
    localStorage.setItem('clases', JSON.stringify(clases));

    // Eliminar la fila de la tabla
    fila.parentNode.removeChild(fila);
}
