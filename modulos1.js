// Agregar nueva tarea al LocalStorage
function agregarTarea(nuevaTarea) {
    let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

    // Verificar que no exista otra tarea con la misma clave (número de tarea)
    const existe = tareas.some(t => t.clave === nuevaTarea.clave);
    if (existe) {
        alert("Ya existe una tarea con ese número de clave.");
        return false;
    }

    tareas.push(nuevaTarea);
    localStorage.setItem("tareas", JSON.stringify(tareas));
    return true;
}

// Mostrar las tareas en el DOM
function mostrarTareas(tareasParam = null) {
    const cont = document.querySelector('#listadoTareas');
    cont.innerHTML = ""; // Limpiar listado previo

    const tareas = tareasParam || JSON.parse(localStorage.getItem("tareas")) || [];

    if (tareas.length === 0) {
        cont.innerHTML = "<p>No hay tareas registradas</p>";
        return;
    }

    tareas.forEach(t => {
        cont.innerHTML += `
            <div class="tarea">
                <div class="info">
                    <p><strong>Tarea:</strong> ${t.tarea}</p>
                    <p><strong>Fecha:</strong> ${t.fecha}</p>
                    <p><strong>Descripcion:</strong> ${t.descripcion}</p>
                    <p><strong>Ubicacion:</strong> ${t.ubicacion}</p>
                    <p><strong>Numero de tarea:</strong> ${t.clave}</p>
                </div>
                <div class="botones">
                    <button class="boton-modificar" onclick="cargarFormModificar('${t.clave}')">Modificar</button>
                    <button class="boton-eliminar" onclick="eliminarTarea('${t.clave}')">Eliminar</button>
                </div>
            </div>
        `;
    });
}

// Buscar tareas filtrando por múltiples campos
function buscarTareas(tareaBuscada, fechaBuscada, claveBuscada, ubicacionBuscada) {
    const tareas = JSON.parse(localStorage.getItem("tareas")) || [];
    
    return tareas.filter(t =>
        t.tarea.toLowerCase().includes(tareaBuscada.toLowerCase()) && 
        t.fecha.includes(fechaBuscada) && 
        t.clave.includes(claveBuscada) &&
        t.ubicacion.toLowerCase().includes(ubicacionBuscada.toLowerCase())
    );
}

// Cargar los datos en el formulario de modificar
function cargarFormModificar(clave) {
    const tareas = JSON.parse(localStorage.getItem("tareas")) || [];
    const tareaObj = tareas.find(t => t.clave === clave);

    const form = document.querySelector("#form-modificar");
    form.querySelector("#titulo-modificar").textContent = `Modificar tarea: ${tareaObj.tarea}`;
    
    // Rellenar inputs
    form.clave.value = tareaObj.clave; // Input oculto para saber cuál modificar
    form.tarea.value = tareaObj.tarea;
    form.fecha.value = tareaObj.fecha;
    form.descripcion.value = tareaObj.descripcion;
    form.ubicacion.value = tareaObj.ubicacion;
    
    form.style.display = "block"; // Mostrar el formulario
}

// Guardar los cambios modificados
function modificarTarea(datos) {
    let tareas = JSON.parse(localStorage.getItem("tareas")) || [];
    const index = tareas.findIndex(t => t.clave === datos.clave);
    
    if (index !== -1) {
        // Actualizamos los campos
        tareas[index].tarea = datos.tarea;
        tareas[index].fecha = datos.fecha;
        tareas[index].descripcion = datos.descripcion;
        tareas[index].ubicacion = datos.ubicacion;
        
        localStorage.setItem("tareas", JSON.stringify(tareas));
    }
}

// Eliminar tarea por clave
function eliminarTarea(clave) {
    let tareas = JSON.parse(localStorage.getItem("tareas")) || [];
    tareas = tareas.filter(t => t.clave !== clave);
    localStorage.setItem("tareas", JSON.stringify(tareas));
    mostrarTareas(); // Refrescar vista
}