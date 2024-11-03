const express = require('express');
const router = express.Router();
const {
    obtenerTareas,
    obtenerTareaPorId,
    crearTarea,
    actualizarTarea,
    eliminarTarea
} = require('../controllers/tareasController'); // Importa los controladores

// Rutas y controladores
router.get('/', obtenerTareas); // GET /tareas
router.get('/:id', obtenerTareaPorId); // GET /tareas/:id
router.post('/', crearTarea); // POST /tareas
router.put('/:id', actualizarTarea); // PUT /tareas/:id
router.delete('/:id', eliminarTarea); // DELETE /tareas/:id

module.exports = router;
