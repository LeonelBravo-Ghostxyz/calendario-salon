import { c as clientPromise } from './database_AVDriSRJ.mjs';
import { ObjectId } from 'mongodb';

const PUT = async ({ params, request }) => {
  try {
    const pass = request.headers.get("x-admin-password");
    if (pass !== "adminbomberos169") {
      return new Response(JSON.stringify({ error: "No autorizado" }), { status: 401 });
    }
    const { id } = params;
    if (!id || !ObjectId.isValid(id)) {
      return new Response(JSON.stringify({ error: "ID de reserva no válido" }), { status: 400 });
    }
    const data = await request.json();
    const client = await clientPromise;
    const db = client.db("salonDB");
    const result = await db.collection("eventos").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          cliente: String(data.cliente),
          turno: String(data.turno),
          telefono: String(data.telefono || ""),
          notas: String(data.notas || "")
        }
      }
    );
    if (result.matchedCount === 0) {
      return new Response(JSON.stringify({ error: "No se encontró la reserva" }), { status: 404 });
    }
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};
const DELETE = async ({ params, request }) => {
  try {
    const pass = request.headers.get("x-admin-password");
    if (pass !== "adminbomberos169") {
      return new Response(JSON.stringify({ error: "No autorizado" }), { status: 401 });
    }
    const { id } = params;
    if (!id || !ObjectId.isValid(id)) {
      return new Response(JSON.stringify({ error: "ID de reserva no válido" }), { status: 400 });
    }
    const client = await clientPromise;
    const db = client.db("salonDB");
    const result = await db.collection("eventos").deleteOne({
      _id: new ObjectId(id)
    });
    if (result.deletedCount === 0) {
      return new Response(JSON.stringify({ error: "No se encontró la reserva para eliminar" }), { status: 404 });
    }
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Error en DELETE:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  DELETE,
  PUT
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
