import { c as clientPromise } from './database_AVDriSRJ.mjs';

const GET = async () => {
  try {
    const client = await clientPromise;
    const db = client.db("salonDB");
    const eventos = await db.collection("eventos").find({}).sort({ turno: 1 }).toArray();
    return new Response(JSON.stringify(eventos), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};
const POST = async ({ request }) => {
  try {
    const pass = request.headers.get("x-admin-password");
    if (pass !== "adminbomberos169") {
      return new Response(JSON.stringify({ error: "No autorizado" }), { status: 401 });
    }
    const data = await request.json();
    if (!data.fecha || !data.cliente || !data.turno) {
      return new Response(JSON.stringify({ error: "Faltan datos requeridos" }), { status: 400 });
    }
    const client = await clientPromise;
    const db = client.db("salonDB");
    const result = await db.collection("eventos").insertOne({
      fecha: String(data.fecha),
      cliente: String(data.cliente),
      socio: Boolean(data.socio || false),
      turno: String(data.turno),
      telefono: String(data.telefono || ""),
      notas: String(data.notas || ""),
      creado_en: String(data.creado_en)
    });
    return new Response(JSON.stringify({ success: true, id: result.insertedId }), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
