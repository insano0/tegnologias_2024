 window.obtenerDatosFiltrados = function() {
    let datos = document.getElementById("datos");

        const claseFiltro = "Aerobicos"; // Puedes cambiar esto según tus necesidades
        const mesFiltro = "Enero"; // Puedes cambiar esto según tus necesidades
        const diaFiltro = 1; // Puedes cambiar esto según tus necesidades
        const horaFiltro = "10:00"; // Puedes cambiar esto según tus necesidades

        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                try {
                    var response = JSON.parse(xhttp.responseText);
                    console.log('Datos obtenidos del servidor:', response);

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

                        // Filtrar datos según los criterios especificados
                        let resultadosFiltrados = [];
                        for (let i = 0; i < clases.length; i++) {
                            if (clases[i] === claseFiltro && meses[i] === mesFiltro && dias[i] == diaFiltro && horas[i] === horaFiltro) {
                                resultadosFiltrados.push({
                                    clase: clases[i],
                                    mes: meses[i],
                                    dia: dias[i],
                                    hora: horas[i]
                                });
                            }
                        }

                        // Mostrar resultados filtrados en la consola
                        console.log('Resultados filtrados:', resultadosFiltrados);

                        // Crear y mostrar elementos para los resultados filtrados
                        if (resultadosFiltrados.length > 0) {
                            datos.innerHTML = ""; // Limpiar contenido anterior
                            resultadosFiltrados.forEach(item => {
                                let resultadoElement = document.createElement("p");
                                resultadoElement.textContent = `Clase: ${item.clase}, Día: ${item.dia}, Mes: ${item.mes}, Hora: ${item.hora}`;
                                datos.appendChild(resultadoElement);
                            });
                        } else {
                            console.log("No se encontraron registros que coincidan con los criterios de filtrado.");
                            datos.innerHTML = "No se encontraron registros que coincidan con los criterios de filtrado.";
                        }
                    } else {
                        console.log("No se encontraron registros en la tabla `clases`");
                        datos.innerHTML = "No se encontraron registros en la tabla `clases`";
                    }
                } catch (e) {
                    console.error("Error al parsear la respuesta JSON:", e);
                    console.error("Respuesta del servidor:", xhttp.responseText);
                }
            } else if (xhttp.readyState == 4) {
                console.error('Error en la solicitud:', xhttp.statusText); // Manejar errores de solicitud
                datos.innerHTML = `Error en la solicitud: ${xhttp.statusText}`;
            }
        }
        xhttp.open("GET", "BOTON.php", true);  // Reemplaza 'BOTON.php' con la ruta correcta a tu archivo PHP
        xhttp.send();
    };

