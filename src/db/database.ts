import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';

const db = new DatabaseSync(path.join(process.cwd(), 'salon.db'));

try {
  // Intentamos buscar la columna "cliente". Si falla, la tabla es la vieja.
  db.prepare('SELECT cliente FROM eventos LIMIT 1').get();
} catch (e) {
  // Si falla, eliminamos la tabla vieja para que se regenere bien
  db.exec('DROP TABLE IF EXISTS eventos');
}

db.exec(`
  CREATE TABLE IF NOT EXISTS eventos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fecha TEXT NOT NULL,
    cliente TEXT NOT NULL,
    turno TEXT NOT NULL,
    telefono TEXT,
    notas TEXT,
    creado_en TEXT NOT NULL
  )
`);

export default db;