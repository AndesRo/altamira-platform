# 🏢 Edificio Altamira — Portal de Vecinos

Plataforma informativa exclusiva para la comunidad del Edificio Altamira.

## Stack

- React + TypeScript + Vite
- Tailwind CSS
- Supabase (Auth + PostgreSQL + Storage)
- Vercel (despliegue)

## Setup local

1. `npm install`
2. Copia `.env.example` a `.env.local` y completa credenciales de Supabase.
3. Coloca la foto del edificio en `public/edificio-altamira.jpg`.
4. Ejecuta `sql/schema.sql` en el editor SQL de Supabase.
5. Crea el usuario compartido en Supabase → Authentication.
6. Crea bucket `pdfs` (privado) en Supabase → Storage.
7. `npm run dev`

## Módulos

- `/` → Elecciones (portada principal, informativa)
- `/noticias` → Últimas noticias
- `/documentos` → Reglamentos y documentos PDF
- `/contacto` → Contacto y WhatsApp comunitario

## Deploy

- Sube el repo a GitHub
- Importa en Vercel
- Configura `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY` en Vercel