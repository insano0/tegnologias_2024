window.onload = function () {
    document.getElementById('formularioClase2').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission

        const formData = new FormData(this); // Create a FormData object from the form

        const xhr = new XMLHttpRequest();  // Create an XMLHttpRequest
        xhr.open('POST', 'Formulario2.php', true);  // Open a POST request to your PHP endpoint

        // When the request completes
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {  // Request completed
                if (xhr.status === 200) {  // If the request was successful
                    const response = JSON.parse(xhr.responseText);  // Parse the JSON response
                    console.log(response);  // Log the response to the console

                    // Show a success message
                    alert("Datos guardados");

                    // Reset the form
                    document.getElementById('formularioClase2').reset();
                } else {
                    console.error('Error en la solicitud:', xhr.statusText);  // Log an error if something goes wrong
                }
            }
        };

        // Send the form data to the server
        xhr.send(formData);  // Send the FormData object
    });
}
