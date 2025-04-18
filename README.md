# 🚀 Discord Webhook

```sh
pnpm create astro@latest -- --template basics
```

> 🎯 **Objetivo:** Aprender a enviar mensajes personalizados a Discord usando un formulario en Astro.

## 🌐 Estructura del Proyecto

```text
/
├── public/
├── src/
│   ├── components/
│   │   └── discord-form.astro
│   ├── lib/
│   │   ├── sendToDiscordWebhook.js
│   │   └── default.json
│   ├── pages/
│   │   ├── index.astro
│   │   └── api/send-discord.ts
│   ├── consts.ts
├── .env
└── astro.config.mjs
```

## 🔧 Cómo obtener el Webhook de Discord

1. Entra a tu servidor de Discord.
2. Ve al canal donde quieras que lleguen los mensajes.
3. Haz clic en el icono de engranaje (⚙️) → **Integraciones** → **Webhooks**.
4. Crea uno nuevo, copia la URL. Se verá así:

```
https://discord.com/api/webhooks/000000000000000000/abcdefghijklmnopqrstuvwxyz1234567890abcdef
```

## 🔁 Configuración base constante (`src/lib/default.json`)

```json
{
  "color": "#5865F2",
  "username": "AstroBot",
  "avatar_url": "https://i.imgur.com/AfFp7pu.png",
  "footer": {
    "text": "Enviado DiscordMessage",
    "icon_url": "https://i.imgur.com/5RHR6Ku.png"
  }
}
```

## ⚙️ Comandos útiles

| Comando             | Acción                                 |
|---------------------|----------------------------------------|
| `pnpm install`      | Instala las dependencias               |
| `pnpm dev`          | Inicia el servidor en `localhost:4321`|
| `pnpm build`        | Compila tu proyecto                    |
| `pnpm preview`      | Previsualiza antes de desplegar        |

## 🧠 ¿Y ahora qué?

Ya puedes editar `index.astro` para crear tu formulario, y enviar los datos al webhook usando `/api/send-discord.ts`.