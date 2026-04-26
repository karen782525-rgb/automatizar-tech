# Automatizar.tech - AI Agency Platform

## Stack Tecnológico
- **Framework**: Next.js 16 (App Router)
- **Estilos**: Tailwind CSS 4 + Framer Motion
- **Base de Datos & Auth**: Supabase
- **Multimedia**: Cloudinary (URLs de video)

## Estructura del Proyecto
- `src/app/`: Rutas de la aplicación (Landing + Panel de Admin).
- `src/components/`: Componentes UI Premium (Hero, Services, Contact, Chatbot).
- `src/lib/`: Configuración del cliente de Supabase.
- `supabase_schema.sql`: Script para configurar la base de datos y políticas de seguridad (RLS).

## Configuración Inicial

### 1. Base de Datos (Supabase)
Es **imprescindible** ejecutar el contenido de `supabase_schema.sql` en el editor SQL de tu proyecto en Supabase. Esto creará las tablas:
- `leads`: Para capturar los contactos.
- `services`: Para gestionar el contenido de los servicios.
- `site_settings`: Para configuraciones globales (como el video del Hero).

### 2. Autenticación
Para acceder al panel `/admin`, debes crear un usuario en la sección de **Authentication** de Supabase.

### 3. Variables de Entorno
El archivo `.env.local` ya ha sido configurado con las credenciales proporcionadas.

## Funcionalidades Premium
- **Hero Video Background**: Video a pantalla completa gestionado desde el admin.
- **Service Cards**: Previsualización de video con toggle de audio interactivo.
- **Lead Capture**: Formulario minimalista conectado a Supabase.
- **AI Chatbot**: Interfaz de asistente avanzada.
- **Admin Dashboard**: Gestión completa de leads y contenido del sitio.
