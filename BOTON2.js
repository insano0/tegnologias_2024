window.onload = function () {
    let datos = document.getElementById("datos");
    ajax();

    function ajax() {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                var response = JSON.parse(xhttp.responseText);
                console.log(response);

                // Variables para almacenar la información de la tabla `clases`
                let clases = [];
                let dias = [];
                let meses = [];
                let horas = [];

                if (response.clases && response.clases.length > 0) {
                    response.clases.forEach(item => {
                        clases.push(item.clase);
                        dias.push(item.dia);
                        meses.push(item.mes);
                        horas.push(item.hora);
                    });

                    // Mostrar las variables en la consola
                    console.log("Clases:", clases);
                    console.log("Días:", dias);
                    console.log("Meses:", meses);
                    console.log("Horas:", horas);

                    // Crear elementos para mostrar las variables
                    let clasesElement = document.createElement("p");
                    clasesElement.textContent = "Clases: " + clases.join(", ");

                    let diasElement = document.createElement("p");
                    diasElement.textContent = "Días: " + dias.join(", ");

                    let mesesElement = document.createElement("p");
                    mesesElement.textContent = "Meses: " + meses.join(", ");

                    let horasElement = document.createElement("p");
                    horasElement.textContent = "Horas: " + horas.join(", ");

                    // Adjuntar elementos a datos
                    datos.appendChild(clasesElement);
                    datos.appendChild(diasElement);
                    datos.appendChild(mesesElement);
                    datos.appendChild(horasElement);
                } else {
                    console.log("No se encontraron registros en la tabla `clases`");
                }
            }
        }
        xhttp.open("GET", "BOTON.php", true);  // Reemplaza 'BOTON.php' con la ruta correcta a tu archivo PHP
        xhttp.send();
    }
}
