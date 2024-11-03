const fs = require('fs');


const leerTareas = () => {
    const data = fs.readFileSync('data/tareas.json', 'utf-8');
    return JSON.parse(data);
};

const guardarTareas = (tareas) => {
    fs.writeFileSync('data/tareas.json', JSON.stringify(tareas, null, 2));
};


const obtenerTareas = (req, res) => {
    const tareas = leerTareas();
    res.json(tareas);
};

const obtenerTareaPorId = (req, res) => {
    const tareas = leerTareas();
    const tarea = tareas.find(t => t.id === parseInt(req.params.id));
    if (!tarea) return res.status(404).json({ error: 'Tarea no encontrada' });
    res.json(tarea);
};

const crearTarea = (req, res) => {
    const { titulo, descripcion } = req.body;
    if (!titulo) return res.status(400).json({ error: 'El título es obligatorio' });
    if (descripcion.length < 20) return res.status(400).json({ error: 'La descripción debe tener al menos 20 caracteres' });

    const tareas = leerTareas();
    const nuevaTarea = {
        id: tareas.length ? tareas[tareas.length - 1].id + 1 : 1,
        titulo,
        descripcion,
        completada: false,
        fecha_creacion: new Date()
    };
    tareas.push(nuevaTarea);
    guardarTareas(tareas);

    res.status(201).json(nuevaTarea);
};

const actualizarTarea = (req, res) => {
    const { titulo, descripcion, completada } = req.body;
    const tareas = leerTareas();
    const tarea = tareas.find(t => t.id === parseInt(req.params.id));
    if (!tarea) return res.status(404).json({ error: 'Tarea no encontrada' });

    if (titulo) tarea.titulo = titulo;
    if (descripcion && descripcion.length >= 20) tarea.descripcion = descripcion;
    if (completada !== undefined) tarea.completada = completada;

    guardarTareas(tareas);
    res.json(tarea);
};

const eliminarTarea = (req, res) => {
    const tareas = leerTareas();
    const index = tareas.findIndex(t => t.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ error: 'Tarea no encontrada' });

    const tareaEliminada = tareas.splice(index, 1);
    guardarTareas(tareas);
    res.json(tareaEliminada[0]);
};

module.exports = {
    obtenerTareas,
    obtenerTareaPorId,
    crearTarea,
    actualizarTarea,
    eliminarTarea
};
