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
  mapsUrl:   "https://www.google.com/maps/search/?api=1&query=Asociaci%C3%B3n+Bello+Horizonte+Puente+Piedra+Lima+Per%C3%BA", // 👈 EDITA

  /* --- WhatsApp (por si Supabase no está configurado, la confirmación llega por aquí) --- */
  whatsapp:  "51999999999",             // 👈 EDITA  (código país + número, sin el +)

  /* --- Supabase (para guardar las confirmaciones) --- */
  supabaseUrl:     "",                  // 👈 EDITA  (ej: https://abcd1234.supabase.co)
  supabaseAnonKey: "",                  // 👈 EDITA  (la clave "anon public")
};
