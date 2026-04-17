// src/pages/api/eventos/[id].ts
import type { APIRoute } from 'astro';
import clientPromise from '../../../db/database';
import { ObjectId } from 'mongodb';

export const PUT: APIRoute = async ({ params, request }) => {
  try {
    const pass = request.headers.get('x-admin-password');
    if (pass !== import.meta.env.ADMIN_PASSWORD) {
      return new Response(JSON.stringify({ error: 'No autorizado' }), { status: 401 });
    }

    const { id } = params;
    
    // Si el ID no cumple el formato de Mongo, devolvemos error antes de tocar la DB
    if (!id || !ObjectId.isValid(id)) {
      return new Response(JSON.stringify({ error: 'ID de reserva no válido' }), { status: 400 });
    }

    const data = await request.json();
    const client = await clientPromise;
    const db = client.db('salonDB');

    // IMPORTANTE: Usamos _id con un nuevo ObjectId(id)
    const result = await db.collection('eventos').updateOne(
      { _id: new ObjectId(id) },
      { 
        $set: {
          cliente: String(data.cliente),
          turno: String(data.turno),
          telefono: String(data.telefono || ''),
          notas: String(data.notas || '')
        } 
      }
    );

    if (result.matchedCount === 0) {
      return new Response(JSON.stringify({ error: 'No se encontró la reserva' }), { status: 404 });
    }
    
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};

export const DELETE: APIRoute = async ({ params, request }) => {
  try {
    const pass = request.headers.get('x-admin-password');
    if (pass !== import.meta.env.ADMIN_PASSWORD) {
      return new Response(JSON.stringify({ error: 'No autorizado' }), { status: 401 });
    }

    const { id } = params;

    // Validación crítica para MongoDB
    if (!id || !ObjectId.isValid(id)) {
      return new Response(JSON.stringify({ error: 'ID de reserva no válido' }), { status: 400 });
    }
    
    const client = await clientPromise;
    const db = client.db('salonDB');
    
    // Eliminamos usando el constructor ObjectId
    const result = await db.collection('eventos').deleteOne({ 
      _id: new ObjectId(id) 
    });
    
    if (result.deletedCount === 0) {
      return new Response(JSON.stringify({ error: 'No se encontró la reserva para eliminar' }), { status: 404 });
    }
    
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error: any) {
    console.error("Error en DELETE:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};