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
function extractData(data: any) {
  	return {
   	webhook: data.webhook?.toString(),
   	title: data.title?.toString(),
   	description: data.description?.toString(),
   	color: data.color?.toString(),
   	username: data.username?.toString(),
   	avatar_url: data.avatar_url?.toString(),
   	footer_text: data.footer?.text?.toString(),
   	footer_icon_url: data.footer?.icon_url?.toString(),
  	};
}

// Handler principal
export const POST: APIRoute = async ({ request }) => {
  	try {
   	// Obtener los datos del request
   	const data = await getRequestData(request);
   	// Extraer los valores relevantes
   	const { webhook, title, description, color, username, avatar_url, footer_text, footer_icon_url } = extractData(data);
   	// Enviar mensaje a Discord
   	const footer = { text: footer_text, icon_url: footer_icon_url };
   	await sendToDiscordWebhook({ webhook, title, description, color, username, avatar_url, footer });

   	return new Response("Mensaje enviado correctamente", { status: 200 });
  	} catch (error) {
  		// Log para diagnóstico
    	console.error(error);
    	// Responder con un mensaje de error
    	return new Response(`Error: ${error.message}`, { status: 500 });
  	}
};