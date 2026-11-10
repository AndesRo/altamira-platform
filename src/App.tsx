import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AdminRoute } from './components/admin/AdminRoute';
import { Layout } from './components/Layout';
import { AdminLayout } from './components/admin/AdminLayout';
import { Login } from './pages/Login';
import { Elections } from './pages/Elections';
import { NewsPage } from './pages/News';
import { NewsDetail } from './pages/NewsDetail';
import { Documents } from './pages/Documents';
import { Contact } from './pages/Contact';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminAdministrations } from './pages/admin/AdminAdministrations';
import { AdminNews } from './pages/admin/AdminNews';
import { AdminDocuments } from './pages/admin/AdminDocuments';
import { AdminContact } from './pages/admin/AdminContact';
import { InstallPWA } from './components/InstallPWA';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          {/* Sitio público de vecinos */}
          <Route
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Elections />} />
            <Route path="noticias" element={<NewsPage />} />
            <Route path="noticias/:id" element={<NewsDetail />} />
            <Route path="documentos" element={<Documents />} />
            <Route path="contacto" element={<Contact />} />
          </Route>

          {/* Panel de administración */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminRoute>
                  <AdminLayout />
                </AdminRoute>
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="administraciones" element={<AdminAdministrations />} />
            <Route path="noticias" element={<AdminNews />} />
            <Route path="documentos" element={<AdminDocuments />} />
            <Route path="contacto" element={<AdminContact />} />
          </Route>
        </Routes>
        <InstallPWA />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
