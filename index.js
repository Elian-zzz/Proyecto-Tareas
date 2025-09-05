const express = require("express");
const path = require("path");
const db = require("./db");
const app = express();

app.use(express.json()); // Middleware para JSON
const puerto = 3000;

app.use(express.static(path.join(__dirname, "public")));

// Consulta raíz
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "pagina.html"));
});

// API GET para obtener tareas
app.get("/api/usuarios", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id_tarea,nombre,descripcion FROM Tarea"
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Error en la consulta" });
  }
});

// API POST para agregar tarea
app.post("/api/ingresar_usuarios", async (req, res) => {
  const { nombre, descripcion, completada } = req.body;
  if (!nombre || !descripcion) {
    return res.json({ success: false, error: "Datos incompletos" });
  }
  try {
    await db.query("INSERT INTO Tarea (nombre,descripcion) VALUES (?, ?)", [
      nombre,
      descripcion,
      completada,
    ]);
    res.json({ success: true });
  } catch (err) {
    res.json({ success: false, error: "Error al insertar" });
  }
});

// Ejemplo de busqueda a con querys url
app.get("/search", (req, res) => {
  const query = req.query.nombre; // ejemplo: /search?q=algo
  res.send(`Buscaste: ${query}`);
});

// Servidor escuchando en el puerto 3000
app.listen(puerto, () => {
  console.log("Servidor escuchando en http://localhost:" + puerto);
});
