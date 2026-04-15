import type { APIRoute } from 'astro';
import db from '../../db/database';

export const GET: APIRoute = async () => {
  try {
    const stmt = db.prepare('SELECT * FROM eventos ORDER BY turno ASC');
    const eventos = stmt.all();
    return new Response(JSON.stringify(eventos), { 
      status: 200, 
      headers: { 'Content-Type': 'application/json' } 
    });
  } catch (error: any) {
    console.error("Error GET:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json() as Record<string, any>;
    
    if (!data.fecha || !data.cliente || !data.turno) {
      return new Response(JSON.stringify({ error: 'Faltan datos requeridos' }), { status: 400 });
    }

    const stmt = db.prepare('INSERT INTO eventos (fecha, cliente, turno, telefono, notas, creado_en) VALUES (?, ?, ?, ?, ?, ?)');
    const info = stmt.run(String(data.fecha), String(data.cliente), String(data.turno), String(data.telefono || ''), String(data.notas || ''), String(data.creado_en));
    
    return new Response(JSON.stringify({ success: true, id: info.lastInsertRowid }), { status: 201 });
  } catch (error: any) {
    console.error("Error POST:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};