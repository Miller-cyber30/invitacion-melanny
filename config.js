/* ============================================================
   CONFIGURACIÓN — EDITA SOLO ESTE ARCHIVO
   Cambia los valores marcados con  👈 EDITA
   (Los otros datos ya están puestos: nombre, edad, lugar)
   ============================================================ */
window.CONFIG = {

  /* --- Datos de la cumpleañera --- */
  nombre: "Melanny",
  nombreCompleto: "Melanny Ponte Espinoza",
  edad: 11,

  /* --- Fecha y hora de la fiesta --- */
  // Para el conteo regresivo (formato: AÑO-MES-DÍA T HORA:MIN)
  fechaISO:  "2026-10-18T16:00:00",     // 👈 EDITA
  // Como quieres que se LEA en la tarjeta
  fechaTexto:"Sábado 18 de Octubre",    // 👈 EDITA
  hora:      "4:00 p. m.",              // 👈 EDITA

  /* --- Lugar --- */
  lugar:     "Asociación Bello Horizonte",
  direccion: "Mz. C — Lt. 2B, Puente Piedra, Lima",
  // Link del mapa (puedes reemplazarlo con tu ubicación exacta de Google Maps)
  mapsUrl:   "https://maps.app.goo.gl/jrmjnVaec4koTjNV9", // 👈 EDITA

  /* --- WhatsApp (por si Supabase no está configurado, la confirmación llega por aquí) --- */
  whatsapp:  "51968332181",             // 👈 EDITA  (código país + número, sin el +)

  /* --- Supabase (para guardar las confirmaciones) --- */
  supabaseUrl:     "https://qhvcvjxdjcxodhasbigg.supabase.co/rest/v1/",                  // 👈 EDITA  (ej: https://abcd1234.supabase.co)
  supabaseAnonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFodmN2anhkamN4b2RoYXNiaWdnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg2NjcxNzksImV4cCI6MjEwNDI0MzE3OX0.bIiboF7IjTGjhCrqYsue71pJ1r_KuIrWvIxs8OuSx6o",                  // 👈 EDITA  (la clave "anon public")
};
