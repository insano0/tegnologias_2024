document.getElementById('miFormulario').addEventListener('submit', function(event) {
    event.preventDefault();

    const data = document.getElementById('miInput').value;
    fetch('http://sql109.infinityfree.com/handle_data.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `data=${data}`
    })
    .then(response => response.text())
    .then(data => {
        console.log('Respuesta del servidor:', data);
        // Puedes actualizar la página web con los datos recibidos
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

