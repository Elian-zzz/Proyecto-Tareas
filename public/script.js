const form = document.getElementById("formTarea");
const nombreInput = document.getElementById("nombreTarea");
const descInput = document.getElementById("descTarea");
const completadaInput = document.getElementById("completadaTarea");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const nuevaTarea = {
    nombre: nombreInput.value,
    descripcion: descInput.value
  };
  fetch("/api/ingresar_usuarios", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(nuevaTarea),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        alert("Tarea agregada correctamente");
        form.reset();
        boton.click(); // Actualiza la lista
      } else {
        alert("Error al agregar tarea");
      }
    })
    .catch(() => alert("Error de conexión con el servidor"));
});
const boton = document.getElementById("activarAPI");
const resultado = document.getElementById("resultado");
// Escucha al boton
boton.addEventListener("click", () => {
  fetch("/api/usuarios")
    .then((res) => res.json())
    .then((data) => {
      if (!Array.isArray(data) || data.length === 0) {
        resultado.innerHTML = "<p>No hay tareas disponibles.</p>";
        return;
      }
      const lista = document.createElement("ul");
      lista.className = "tareas";
      data.forEach((tarea) => {
        const item = document.createElement("li");
        item.className = tarea.completada ? "completada" : "";
        item.innerHTML = `
          <span class="titulo">${tarea.nombre}</span>
          <span class="descripcion">${tarea.descripcion}</span>
        `;
        lista.appendChild(item);
      });
      resultado.innerHTML = "";
      resultado.appendChild(lista);
    })
    .catch(() => {
      resultado.innerHTML = "<p>Error al obtener las tareas.</p>";
    });
});
