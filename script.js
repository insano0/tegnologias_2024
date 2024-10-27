document.getElementById('formularioLibro').addEventListener('submit', function(e) {
    e.preventDefault();

    const titulo = document.getElementById('titulo').value;
    const autor = document.querySelector('input[name="autor"]:checked');
    const año = document.getElementById('año').value;
    const editorial = document.querySelector('input[name="editorial"]:checked');
    
    const errorMensaje = document.getElementById('errorMensaje');
    
    if (!titulo || !autor || !año || !editorial) {
        errorMensaje.style.display = 'block';
        return;
    } else {
        errorMensaje.style.display = 'none';
    }

    const fila = document.createElement('tr');
    fila.innerHTML = `<td>${titulo}</td><td>${autor.value}</td><td>${año}</td><td>${editorial.value}</td><td><button onclick="eliminarFila(this)">Eliminar</button></td>`;
    document.getElementById('tablaLibros').appendChild(fila);

    // Guardar los datos en el almacenamiento local
    guardarLibroLocalStorage(titulo, autor.value, año, editorial.value);

    // Opcional: limpiar el formulario después de añadir el libro
    document.getElementById('formularioLibro').reset();
});

// Función para guardar el libro en el almacenamiento local
function guardarLibroLocalStorage(titulo, autor, año, editorial) {
    let libros;
    if (localStorage.getItem('libros') === null) {
        libros = [];
    } else {
        libros = JSON.parse(localStorage.getItem('libros'));
    }
    libros.push({ titulo, autor, año, editorial });
    localStorage.setItem('libros', JSON.stringify(libros));
}

// Función para cargar los libros del almacenamiento local
function cargarLibrosLocalStorage() {
    let libros;
    if (localStorage.getItem('libros') === null) {
        libros = [];
    } else {
        libros = JSON.parse(localStorage.getItem('libros'));
    }
    const tablaLibros = document.getElementById('tablaLibros');
    libros.forEach(libro => {
        const fila = document.createElement('tr');
        fila.innerHTML = `<td>${libro.titulo}</td><td>${libro.autor}</td><td>${libro.año}</td><td>${libro.editorial}</td><td><button onclick="eliminarFila(this)">Eliminar</button></td>`;
        document.getElementById('tablaLibros').appendChild(fila);
    });
}

// Cargar los libros del almacenamiento local al iniciar
cargarLibrosLocalStorage();

// Luego, cargar los libros del XML
fetch('libro.xml')
    .then(response => response.text())
    .then(data => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(data, 'application/xml');
        const libros = xml.getElementsByTagName('libro');
        const tablaLibros = document.getElementById('tablaLibros');
        
        Array.from(libros).forEach(libro => {
            const fila = document.createElement('tr');
            const titulo = libro.getElementsByTagName('titulo')[0].textContent;
            const autor = libro.getElementsByTagName('autor')[0].textContent;
            const año = libro.getElementsByTagName('año')[0].textContent;
            const editorial = libro.getElementsByTagName('editorial')[0].textContent;
            
            fila.innerHTML = `<td>${titulo}</td><td>${autor}</td><td>${año}</td><td>${editorial}</td><td><button onclick="eliminarFila(this)">Eliminar</button></td>`;
            document.getElementById('tablaLibros').appendChild(fila);
        });
    });
    
// Función para eliminar una fila de la tabla y del almacenamiento local
function eliminarFila(button) {
    const fila = button.parentNode.parentNode;
    const titulo = fila.cells[0].textContent;
    
    // Eliminar del almacenamiento local
    let libros = JSON.parse(localStorage.getItem('libros'));
    libros = libros.filter(libro => libro.titulo !== titulo);
    localStorage.setItem('libros', JSON.stringify(libros));
    
    // Eliminar la fila de la tabla
    fila.parentNode.removeChild(fila);
}