export async function onRequest(context) {
  const { request, env } = context;
  const STORAGE_KEY = "ssap_v2_data";

  // GET Request: Pull data from the cloud
  if (request.method === "GET") {
    const data = await env.SSAP_DATA.get(STORAGE_KEY);
    return new Response(data || "[]", {
      headers: { "Content-Type": "application/json" }
    });
  }

  // POST Request: Overwrite cloud data with new JSON
  if (request.method === "POST") {
    const body = await request.text();
    await env.SSAP_DATA.put(STORAGE_KEY, body);
    return new Response("Success", { status: 200 });
  }
}
