import type { APIRoute } from "astro";
import { sendToDiscordWebhook } from "../../lib/sendToDiscordWebhook.js";

// Función para obtener los datos del request según el tipo de contenido
async function getRequestData(request: Request) {
  	const contentType = request.headers.get("content-type") || "";
  	//
  	if (contentType.includes("application/json")) {
    	return await request.json();
  	}
  	//
  	if (contentType.includes("application/x-www-form-urlencoded") || contentType.includes("multipart/form-data")) {
   	return await request.formData();
  	}
  	//
  	throw new Error("Content-Type no válido. Solo se permite JSON o FORM");
}

// Función para extraer los valores del formulario o JSON
function extractData(formData: FormData) {
  return {
    webhook: formData.get('webhook')?.toString(),
    title: formData.get('title')?.toString(),
    description: formData.get('description')?.toString(),
    color: formData.get('color')?.toString(),
    username: formData.get('username')?.toString(),
    avatar_url: formData.get('avatar_url')?.toString(),
    footer_text: formData.get('footer_text')?.toString(),         // ¡cambio importante!
    footer_icon_url: formData.get('footer_icon_url')?.toString(), // ¡cambio importante!
    file: formData.get('file'),
  };
}

// Handler principal
export const POST: APIRoute = async ({ request }) => {
  	try {
   	// Obtener los datos del request
   	const data = await getRequestData(request);
   	// Extraer los valores relevantes
   	const { webhook, title, description, color, username, avatar_url, footer_text, footer_icon_url, file } = extractData(data);
   	// Enviar mensaje a Discord
   	const footer = { text: footer_text, icon_url: footer_icon_url };
   	await sendToDiscordWebhook({ webhook, title, description, color, username, avatar_url, footer, file });

   	return new Response("Mensaje enviado correctamente", { status: 200 });
  	} catch (error) {
  		// Log para diagnóstico
    	console.error(error);
    	// Responder con un mensaje de error
    	return new Response(`Error: ${error.message}`, { status: 500 });
  	}
};