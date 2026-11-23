# Organizador de Horarios — Prepa CEDI

> ## 🌐 [Abrir aplicación: organizadordehorarios.vercel.app](https://organizadordehorarios.vercel.app)

Aplicación web creada con React y Vite para consultar horarios, administrar eventos personales y organizar las actividades académicas de los alumnos de la Prepa CEDI.

## Integrantes

- Gauss Becerra Reynoso
- Heriberto Eduardo Pineda Ortiz
- Ivan Robles Lazcano
- Leonardo Sandoval Guevara

## Acceso a la aplicación

- **Sitio publicado:** https://organizadordehorarios.vercel.app
- **Inicio de sesión:** `/`
- **Registro:** `/crear-cuenta`

### Cuenta de demostración

- Correo: `alumno@cedi.edu.mx`
- Contraseña: `cedi123`

## Funcionalidades actuales

- Inicio de sesión con correo y contraseña.
- Registro de nuevas cuentas por grupo.
- Sesión persistente en el navegador.
- Cierre de sesión.
- Calendario mensual navegable entre meses.
- Selección de cualquier día del calendario.
- Botón para volver al mes actual.
- Vista de agenda del día seleccionado.
- Creación de eventos personales con categoría y horario.
- Indicador de cantidad de eventos en los días del calendario.
- Categorías para clases, tareas, exámenes y eventos personales.
- Interfaz adaptable para computadora, tablet y celular.
- Persistencia local de usuarios, sesión y eventos mediante `localStorage`.

## Acceso protegido

Antes de iniciar sesión solamente se muestran las pantallas de **Log in** y **Sign up**.

Después de autenticarse aparecen:

- Encabezado con nombre y grupo del usuario.
- Calendario mensual.
- Agenda del día seleccionado.
- Formulario para agregar eventos.
- Botón para cerrar sesión.

## Datos incluidos

La aplicación contiene información inicial de ejemplo para validar la interfaz:

- Usuario demostrativo.
- Eventos iniciales.
- Categorías académicas.
- Horarios preliminares de grupos CEDI.
- Grupos disponibles al crear una cuenta.

Los usuarios, eventos y sesiones creados se guardan actualmente en el navegador del equipo. Un backend o base de datos real puede integrarse posteriormente sin cambiar el funcionamiento general de la interfaz.

## Tecnologías

- React 19
- React Router
- Vite
- JavaScript
- CSS
- Lucide React

## Rutas

- `/`: inicio de sesión o aplicación autenticada.
- `/crear-cuenta`: registro de una cuenta nueva.

## Ejecución local

```bash
npm install
npm run dev
```

Abrir en el navegador:

```text
http://localhost:5173
```

## Compilación

```bash
npm run build
npm run preview
```

## Despliegue en Vercel

El proyecto está publicado en:

# [organizadordehorarios.vercel.app](https://organizadordehorarios.vercel.app)

La configuración `vercel.json` incluye una regla de rewrites para que React Router conserve rutas como `/crear-cuenta` al recargar o abrir enlaces directamente.

## Estructura principal

```text
organizadordehorarios/
├── public/
├── src/
│   ├── OrganizerApp.jsx
│   ├── OrganizerApp.css
│   ├── storage.js
│   ├── Paginas/
│   │   ├── Crearcuenta.jsx
│   │   └── Crearcuenta.css
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── vercel.json
├── package.json
└── README.md
```

## Estado del proyecto

Versión funcional con acceso, registro, calendario mensual, agenda diaria y persistencia local. La integración con una base de datos real y horarios institucionales oficiales continúa como siguiente etapa.
