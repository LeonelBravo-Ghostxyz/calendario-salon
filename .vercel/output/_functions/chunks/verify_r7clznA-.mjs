const POST = async ({ request }) => {
  const pass = request.headers.get("x-admin-password");
  const realPass = "adminbomberos169";
  if (pass && realPass && pass === realPass) {
    return new Response(JSON.stringify({ valid: true }), { status: 200 });
  }
  return new Response(JSON.stringify({ valid: false }), { status: 401 });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
