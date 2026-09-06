# 🎀 Invitaciones de cumpleaños — Melanny (11 años)

Tres invitaciones digitales con temática Hello Kitty (estética kawaii), animaciones,
música y confirmación de asistencia (RSVP) guardada en Supabase.

## Archivos
- `index.html` — menú para ver y elegir las 3 invitaciones.
- `invitacion-1.html` — **Dulce y Elegante** (rosado suave, moños, dorado).
- `invitacion-2.html` — **Kawaii Festivo** (colorida, globos, lunares).
- `invitacion-3.html` — **Moderna Interactiva** (fondo animado, efecto vidrio, cuenta regresiva).
- `admin.html` — ver las confirmaciones que llegaron (privado).
- `config.js` — **el ÚNICO archivo que debes editar** (fecha, hora, WhatsApp, Supabase).
- `shared.js` / `shared.css` — lógica y estilos comunes (no editar).
- `supabase/schema.sql` — script para crear la tabla de confirmaciones.
- `vercel.json` — configuración para Vercel.

## Qué editar en `config.js`
1. `fechaISO` y `fechaTexto` → la fecha real de la fiesta.
2. `hora` → la hora.
3. `whatsapp` → tu número (código país + número, sin el +).
4. `supabaseUrl` y `supabaseAnonKey` → cuando crees tu proyecto en Supabase.

## Puesta en marcha (resumen)
1. Sube esta carpeta a **GitHub**.
2. Crea un proyecto en **Supabase** y corre `supabase/schema.sql`.
3. Copia la URL y la clave `anon public` a `config.js`.
4. Conecta el repo en **Vercel** y despliega.

> Nota: "Hello Kitty" es marca registrada de Sanrio. La gatita de estos diseños es un
> dibujo original de estilo kawaii, no el personaje oficial.
