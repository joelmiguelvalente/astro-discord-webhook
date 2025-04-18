import fs from 'fs';
import path from 'path';

// Ruta del archivo de configuración JSON por defecto
const jsonPath = path.resolve('./src/lib/default.json');

// Cargar los datos por defecto desde el archivo JSON
export const JsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
