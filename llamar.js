document.addEventListener("DOMContentLoaded", () => {
    // Cargar tareas al iniciar
    mostrarTareas();
    // LÓGICA: AGREGAR TAREA
    const botonAgregarTarea = document.querySelector("#boton-agregar");
    botonAgregarTarea.addEventListener("click", (event) => {
        event.preventDefault();
        document.querySelector("#form-agregar").style.display = "block";
    });

    const botonBuscar = document.querySelector("#boton-buscar");
    botonBuscar.addEventListener("click", (event) => {
        event.preventDefault();
        document.querySelector("#form-buscar").style.display = "block";
    });

    const botonCerrarFormAgregar = document.querySelector(".boton-cerrar-formAgregar");
    botonCerrarFormAgregar.addEventListener("click", (event) => {
        event.preventDefault();
        document.querySelector("#form-agregar").style.display = "none";
    });

    const botonCerrarFormBuscar = document.querySelector(".boton-cerrar-formBuscar");
    botonCerrarFormBuscar.addEventListener("click", (event) => {
        event.preventDefault();
        document.querySelector("#form-buscar").style.display = "none";
    });

    const formAgregar = document.querySelector("#form-agregar");
    formAgregar.addEventListener("submit", (event) => {
        event.preventDefault();
        
        const nuevaTarea = {
            tarea: formAgregar.tarea.value,
            fecha: formAgregar.fecha.value,
            descripcion: formAgregar.descripcion.value,
            ubicacion: formAgregar.ubicacion.value,
            clave: formAgregar.clave.value
        };
        
        const exito = agregarTarea(nuevaTarea);
        
        if (exito) {
            formAgregar.reset();
            formAgregar.style.display = "none";
            mostrarTareas();
        }
    });
    // LÓGICA: BUSCAR TAREAS
    const formBuscar = document.querySelector("#form-buscar");
    formBuscar.addEventListener("submit", (event) => {
        event.preventDefault();
        
        const tarea = formBuscar.tarea.value || '';
        const fecha = formBuscar.fecha.value || '';
        const clave = formBuscar.clave.value || '';
        const ubicacion = formBuscar.ubicacion.value || '';
        
        const resultados = buscarTareas(tarea, fecha, clave, ubicacion);
        mostrarTareas(resultados);
    });

    document.querySelector("#boton-filtros").addEventListener("click", () => {
        formBuscar.reset();
        mostrarTareas();
    });
    // LÓGICA: MODIFICAR TAREA
    const botonCerrarFormModif = document.querySelector(".boton-cerrar-formModif");
    botonCerrarFormModif.addEventListener("click", (event) => {
        event.preventDefault();
        document.querySelector("#form-modificar").style.display = "none";
    });

    const formModificar = document.querySelector("#form-modificar");
    formModificar.addEventListener("submit", (event) => {
        event.preventDefault();
        
        const datosModificados = {
            clave: formModificar.clave.value,
            tarea: formModificar.tarea.value,
            fecha: formModificar.fecha.value,
            descripcion: formModificar.descripcion.value,
            ubicacion: formModificar.ubicacion.value
        };
        
        modificarTarea(datosModificados);
        
        formModificar.reset();
        formModificar.style.display = "none";
        mostrarTareas();
    });

});