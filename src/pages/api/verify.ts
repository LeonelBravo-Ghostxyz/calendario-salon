import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  // Leemos la contraseña que nos manda el frontend
  const pass = request.headers.get('x-admin-password');
  
  // Buscamos la contraseña real en el entorno (compatible con Vercel y local)
  const realPass = import.meta.env.ADMIN_PASSWORD || process.env.ADMIN_PASSWORD;
  
  // Si coinciden, damos luz verde
  if (pass && realPass && pass === realPass) {
    return new Response(JSON.stringify({ valid: true }), { status: 200 });
  }
  
  // Si no coinciden (o si la variable .env no está cargada), rebotamos
  return new Response(JSON.stringify({ valid: false }), { status: 401 });
};