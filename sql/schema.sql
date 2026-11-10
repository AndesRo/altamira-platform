-- ==================================================
-- ESQUEMA BD - EDIFICIO ALTAMIRA
-- ==================================================

-- Tabla: Administraciones (Candidaturas para elección)
CREATE TABLE IF NOT EXISTS administrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  summary TEXT NOT NULL,
  full_description TEXT,
  pdf_url TEXT,
  contact_name TEXT,
  order_index INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla: Noticias
CREATE TABLE IF NOT EXISTS news (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  published_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla: Documentos
CREATE TABLE IF NOT EXISTS documents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL DEFAULT 'General',
  file_url TEXT NOT NULL,
  uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==================================================
-- ROW LEVEL SECURITY - Solo usuarios autenticados
-- ==================================================
ALTER TABLE administrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- Políticas de lectura para usuarios autenticados
CREATE POLICY "auth_read_administrations" ON administrations
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "auth_read_news" ON news
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "auth_read_documents" ON documents
  FOR SELECT USING (auth.role() = 'authenticated');

-- ==================================================
-- STORAGE: Bucket privado para PDFs
-- ==================================================
-- Ejecutar manualmente desde el panel de Supabase:
-- 1. Storage -> New Bucket -> nombre: "pdfs" -> Public: NO
-- 2. Policies del bucket: allow SELECT to authenticated