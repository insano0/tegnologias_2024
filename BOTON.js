window.onload = function () {
    const xhr = new XMLHttpRequest();  // Crear un objeto XMLHttpRequest
    xhr.open('GET', 'BOTON.php', true);  // Abrir una solicitud GET a tu archivo PHP

    // Función que se ejecuta cuando la solicitud se completa
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {  // La solicitud se ha completado
            if (xhr.status === 200) {  // Si la solicitud fue exitosa
                const data = JSON.parse(xhr.responseText);  // Analizar la respuesta JSON
                console.log('Datos obtenidos del servidor:', data);  // Ver la respuesta en la consola en formato JSON

                // Verificar si hay un error en la respuesta
                if (data.error) {
                    console.error(data.error);
                    alert(data.error);
                    return;
                }

                // Variables para almacenar la información de la tabla `clases`
                let clases = [];
                let dias = [];
                let meses = [];
                let horas = [];

                if (data.clases && data.clases.length > 0) {
                    data.clases.forEach(item => {
                        clases.push(item.clase);
                        dias.push(item.dia);
                        meses.push(item.mes);
                        horas.push(item.hora);
                    });

                    // Aquí puedes utilizar las variables como necesites
                    console.log("Clases:", clases);
                    console.log("Días:", dias);
                    console.log("Meses:", meses);
                    console.log("Horas:", horas);
                } else {
                    console.log("No se encontraron registros en la tabla `clases`");
                }

                // Definir la función para mostrar los horarios al hacer clic en el botón
                window.mostrarHorarios = function () {
                    const claseFiltro = "Aerobicos"; // Puedes cambiar esto según tus necesidades
                    const mesFiltro = "Enero"; // Puedes cambiar esto según tus necesidades
                    const diaFiltro = 1; // Puedes cambiar esto según tus necesidades
                    const horaFiltro = "10:00"; // Puedes cambiar esto según tus necesidades

                    console.log('Filtros aplicados:', { claseFiltro, mesFiltro, diaFiltro, horaFiltro });

                    const resultadosFiltrados = filtrarDatos(claseFiltro, mesFiltro, diaFiltro, horaFiltro);
                    console.log('Resultados filtrados:', resultadosFiltrados);  // Aquí ves los resultados filtrados en la consola

                    // Mostrar resultados en un mensaje emergente
                    if (resultadosFiltrados.length > 0) {
                        alert(JSON.stringify(resultadosFiltrados, null, 2));
                    } else {
                        alert("No se encontraron registros que coincidan con los criterios de filtrado.");
                    }
                };

                // Función para filtrar datos
                function filtrarDatos(claseFiltro, mesFiltro, diaFiltro, horaFiltro) {
                    let resultados = [];
                    for (let i = 0; i < clases.length; i++) {
                        if (clases[i] === claseFiltro && meses[i] === mesFiltro && dias[i] == diaFiltro && horas[i] === horaFiltro) {
                            resultados.push({
                                clase: clases[i],
                                mes: meses[i],
                                dia: dias[i],
                                hora: horas[i]
                            });
                        }
                    }
                    return resultados;
                }

                // Verificar si la función mostrarHorarios está definida
                console.log('Función mostrarHorarios está definida:', typeof window.mostrarHorarios === 'function');

            } else {
                console.error('Error en la solicitud:', xhr.statusText);  // Registrar un error si algo sale mal
                alert('Error en la solicitud: ' + xhr.statusText);
            }
        }
    };

    xhr.send();  // Enviar la solicitud
};
