const express = require('express');
const tareasRoutes = require('./routes/tareas'); // Importa las rutas de tareas
const app = express();
const PORT = 3000;

app.use(express.json()); // Middleware para manejar JSON
app.use('/tareas', tareasRoutes); // Usa las rutas de tareas

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});


