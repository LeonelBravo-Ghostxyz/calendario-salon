import type { APIRoute } from 'astro';
import clientPromise from '../../db/database';

export const GET: APIRoute = async () => {
  try {
    const client = await clientPromise;
    const db = client.db('salonDB');
    
    // .find({}) trae todo, .sort({ turno: 1 }) ordena, y .toArray() lo hace un array normal
    const eventos = await db.collection('eventos').find({}).sort({ turno: 1 }).toArray();
    
    return new Response(JSON.stringify(eventos), { 
      status: 200, 
      headers: { 'Content-Type': 'application/json' } 
    });
  } catch (error: any) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json() as Record<string, any>;
    
    if (!data.fecha || !data.cliente || !data.turno) {
      return new Response(JSON.stringify({ error: 'Faltan datos requeridos' }), { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('salonDB');
    
    const result = await db.collection('eventos').insertOne({
      fecha: String(data.fecha),
      cliente: String(data.cliente),
      socio: Boolean(data.socio || false),
      turno: String(data.turno),
      telefono: String(data.telefono || ''),
      notas: String(data.notas || ''),
      creado_en: String(data.creado_en)
    });
    
    return new Response(JSON.stringify({ success: true, id: result.insertedId }), { status: 201 });
  } catch (error: any) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};