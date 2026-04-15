import type { APIRoute } from 'astro';
import clientPromise from '../../../db/database';
import { ObjectId } from 'mongodb';

export const PUT: APIRoute = async ({ params, request }) => {
  try {
    const id = params.id;
    if (!id || !ObjectId.isValid(id)) return new Response(JSON.stringify({ error: 'ID inválido' }), { status: 400 });

    const data = await request.json() as Record<string, any>;
    const client = await clientPromise;
    const db = client.db('salonDB');

    await db.collection('eventos').updateOne(
      { _id: new ObjectId(id) },
      { $set: {
          cliente: String(data.cliente),
          socio: Boolean(data.socio || false),
          turno: String(data.turno),
          telefono: String(data.telefono || ''),
          notas: String(data.notas || '')
        }
      }
    );
    
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};

export const DELETE: APIRoute = async ({ params }) => {
  try {
    const id = params.id;
    if (!id || !ObjectId.isValid(id)) return new Response(JSON.stringify({ error: 'ID inválido' }), { status: 400 });
    
    const client = await clientPromise;
    const db = client.db('salonDB');
    
    await db.collection('eventos').deleteOne({ _id: new ObjectId(id) });
    
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};