-- ==================================================
-- ROLES Y PERMISOS DE ADMIN
-- ==================================================

-- Tabla de roles de usuarios
CREATE TABLE IF NOT EXISTS user_roles (
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  role TEXT NOT NULL DEFAULT 'vecino' CHECK (role IN ('vecino', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

-- Cada usuario solo puede leer su propio rol
CREATE POLICY "users_read_own_role" ON user_roles
  FOR SELECT USING (auth.uid() = user_id);

-- ==================================================
-- POLÍTICAS DE ESCRITURA PARA ADMIN
-- ==================================================
CREATE POLICY "admin_write_administrations" ON administrations
  FOR ALL USING (
    EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "admin_write_news" ON news
  FOR ALL USING (
    EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "admin_write_documents" ON documents
  FOR ALL USING (
    EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin')
  );

-- ==================================================
-- POLÍTICAS DE STORAGE (bucket "pdfs")
-- ==================================================
CREATE POLICY "auth_read_pdfs" ON storage.objects
  FOR SELECT USING (bucket_id = 'pdfs' AND auth.role() = 'authenticated');

CREATE POLICY "admin_insert_pdfs" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'pdfs' AND
    EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "admin_update_pdfs" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'pdfs' AND
    EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "admin_delete_pdfs" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'pdfs' AND
    EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin')
  );

-- ==================================================
-- ASIGNAR ROL ADMIN (ejecutar manualmente)
-- ==================================================
-- 1. Crea el usuario admin en Authentication → Users → Add user
-- 2. Copia su UUID y ejecuta:
--
-- INSERT INTO user_roles (user_id, role)
-- VALUES ('<UUID-del-usuario-admin>', 'admin');