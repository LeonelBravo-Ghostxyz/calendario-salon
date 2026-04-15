import type { APIRoute } from 'astro';
import db from '../../../db/database';

export const PUT: APIRoute = async ({ params, request }) => {
  try {
    const id = params.id;
    if (!id) return new Response(JSON.stringify({ error: 'ID requerido' }), { status: 400 });

    const data = await request.json() as Record<string, any>;
    const stmt = db.prepare('UPDATE eventos SET cliente = ?, turno = ?, telefono = ?, notas = ? WHERE id = ?');
    stmt.run(String(data.cliente), String(data.turno), String(data.telefono || ''), String(data.notas || ''), String(id));
    
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};

export const DELETE: APIRoute = async ({ params }) => {
  try {
    const id = params.id;
    if (!id) return new Response(JSON.stringify({ error: 'ID requerido' }), { status: 400 });
    
    const stmt = db.prepare('DELETE FROM eventos WHERE id = ?');
    stmt.run(String(id));
    
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};