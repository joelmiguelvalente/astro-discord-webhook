import { JsonData } from '../consts';

/**
 * Envía un mensaje estilizado a un webhook de Discord
 * @param {Object} options
 * @param {string} [options.title] - Título del embed
 * @param {string} [options.description] - Descripción o mensaje
 * @param {string} [options.color] - Color en formato hex (#RRGGBB)
 * @param {string} [options.username] - Nombre de usuario a mostrar
 * @param {string} [options.avatar_url] - URL del avatar
 * @param {Object} [options.footer] - Pie de página del embed
 */
export async function sendToDiscordWebhook(options) {
  	const { webhook, title, description, color, username, avatar_url, footer } = options;

	const payload = {
		username: username || JsonData.username,
		avatar_url: avatar_url || JsonData.avatar_url,
		embeds: [{
		   title: title || "",
		   description: description || "",
		   color: parseInt((color || JsonData.color).replace("#", ""), 16),
		   footer: {
		      text: footer?.text || JsonData.footer.text,
		      icon_url: footer?.icon_url || JsonData.footer.icon_url
		   },
		   timestamp: new Date().toISOString()
		}]
	};

  	const response = await fetch(webhook, {
   	method: "POST",
   	headers: { 
   		"Content-Type": "application/json" 
   	},
   	body: JSON.stringify(payload)
  	});

  	if (!response.ok) {
    	const error = await response.text();
    	throw new Error(`Error al enviar el webhook: ${response.status} - ${error}`);
  	}

  	return true;
}