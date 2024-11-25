window.onload = function () {
    document.getElementById('miFormulario').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission

        const formData = new FormData(this); // Create a FormData object from the form

        // You don't need to serialize form data manually; FormData does that for you
        // FormData automatically handles file inputs, so no need for custom JSON handling

        const xhr = new XMLHttpRequest();  // Create an XMLHttpRequest
        xhr.open('POST', 'login.php', true);  // Open a POST request to your PHP endpoint

        // When the request completes
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {  // Request completed
                if (xhr.status === 200) {  // If the request was successful
                    const response = JSON.parse(xhr.responseText);  // Parse the JSON response
                    console.log(response);  // Log the response to the console
                } else {
                    console.error('Error in the request:', xhr.statusText);  // Log an error if something goes wrong
                }
            }
        };

        // Send the form data with the file to the server
        xhr.send(formData);  // Send the FormData object, which includes the file
    });
}
