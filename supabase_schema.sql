-- Create leads table
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  name TEXT NOT NULL,
  company TEXT,
  email TEXT NOT NULL,
  need TEXT
);

-- Create services table
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  video_url TEXT,
  display_order INT DEFAULT 0
);

-- Create site_settings table
CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value TEXT
);

-- Enable RLS
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Policies for leads
CREATE POLICY "Anyone can insert leads" ON leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated users can read leads" ON leads FOR SELECT USING (auth.role() = 'authenticated');

-- Policies for services
CREATE POLICY "Anyone can view services" ON services FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage services" ON services ALL USING (auth.role() = 'authenticated');

-- Policies for site_settings
CREATE POLICY "Anyone can view settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage settings" ON site_settings ALL USING (auth.role() = 'authenticated');

-- Initial data
INSERT INTO site_settings (key, value) VALUES ('hero_video_url', 'https://res.cloudinary.com/demo/video/upload/v1631234567/sample.mp4')
ON CONFLICT (key) DO NOTHING;

INSERT INTO services (title, description, video_url, display_order) VALUES
('Asesorías y Consultorías', 'Estrategia de IA personalizada para tu negocio.', 'https://res.cloudinary.com/demo/video/upload/v1631234567/sample.mp4', 1),
('Elaboración de Apps', 'Desarrollo de aplicaciones inteligentes y escalables.', 'https://res.cloudinary.com/demo/video/upload/v1631234567/sample.mp4', 2),
('Seminarios y Capacitaciones', 'Forma a tu equipo en las últimas tecnologías de IA.', 'https://res.cloudinary.com/demo/video/upload/v1631234567/sample.mp4', 3),
('Servicios Audiovisuales con IA', 'Contenido visual de impacto generado por IA.', 'https://res.cloudinary.com/demo/video/upload/v1631234567/sample.mp4', 4)
ON CONFLICT DO NOTHING;
