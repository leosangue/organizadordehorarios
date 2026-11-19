# Organizador de Horarios - Prepa CEDI (V1)

Primera versión funcional de una app web para estudiantes de la Prepa CEDI, enfocada en organizar clases y eventos personales en una sola plataforma.

## Integrantes

- Gauss Becerra Reynoso
- Heriberto Eduardo Pineda Ortiz
- Ivan Robles Lazcano
- Leonardo Sandoval Guevara

## Objetivo

Facilitar que los alumnos de la Prepa CEDI consulten su horario y administren su tiempo con vistas diaria, semanal y mensual, reduciendo la captura manual de datos y los empalmes de actividades.

## Alcance de la V1

Esta versión ya incluye:

- Paleta de colores, tipografía y componentes base
- Esquema de datos para usuarios, categorías, eventos y horarios
- Prototipo de inicio de sesión
- Prototipo de agregar evento
- Prototipo de vistas diaria, semanal y mensual
- Base inicial de horarios CEDI para validación
- Documentación de entorno de desarrollo y servidor
- Comparativa con Google Calendar y When2meet
- Plan de validación y semana 2

## Diseño base

### Paleta

- Primario: `#0b3c5d`
- Secundario: `#328cc1`
- Acento: `#d9b310`
- Éxito: `#198754`
- Fondo: `#f7f4ea`
- Texto: `#1f2933`

### Tipografía

- Heading: Poppins
- Body: Nunito Sans
- Mono: JetBrains Mono

### Componentes base

- Botón primario / secundario
- Tarjeta (`panel`)
- Chip de categoría
- Tabla de agenda
- Segmentador de vistas

## Modelo de datos (V1)

Entidades definidas:

- `users`
- `categories`
- `events`
- `schedules`

Campos principales:

- Usuario: id, nombre, email, rol, grupo, turno
- Evento: título, descripción, categoría, fecha, hora inicio/fin, fuente, grupo
- Horario: grupo, turno, día, materia, docente, aula

## Prototipos implementados

### Inicio de sesión

Formulario de acceso para simular sesión de alumno y habilitar operaciones de agenda.

### Agregar evento

Formulario con campos:

- título
- descripción
- categoría
- fecha
- hora de inicio y fin

Los eventos se agregan al estado de la aplicación en tiempo real.

### Vistas de agenda

- Diaria: tabla de eventos por fecha
- Semanal: agrupación por días
- Mensual: resumen de eventos por día

## Horarios de grupos CEDI (levantamiento inicial)

Se integró una base preliminar de horarios por grupo (ej. 1A, 2B, 3A) con:

- día
- hora
- materia
- docente
- aula

Importante: este dataset de V1 está pensado para revisión y validación contra fuente oficial de control escolar en semana 2.

## Entorno de desarrollo y servidor

### Stack

- React 19
- Vite 8
- JavaScript
- CSS

### Comandos

```bash
npm install
npm run dev
npm run build
npm run preview
```

### Servidor / despliegue

Para publicar la app se recomienda:

- Vercel (ideal para deploy continuo con GitHub)
- Netlify (alternativa equivalente)

## Alternativas del mercado y diferenciador

| Plataforma | Fortalezas | Limitaciones para este caso |
|---|---|---|
| Google Calendar | Maduro, recordatorios, multi-dispositivo | No entrega horario CEDI precargado por grupo |
| When2meet | Excelente para coordinar disponibilidad en grupo | No es gestor académico integral |
| Organizador CEDI (este proyecto) | Enfoque institucional y horario listo para alumnos | V1 aún en validación de horarios oficiales |

### Diferenciador principal

El proyecto reduce el tiempo de configuración inicial al usar horarios enfocados a la Prepa CEDI, priorizando eficiencia para estudiantes.

## Validación de prototipos

Checklist V1:

- Validar flujo de login con usuarios de prueba
- Validar claridad del formulario de evento
- Medir rapidez para localizar clases en vista semanal
- Levantar feedback de uso en móvil

## Plan semana 2

- Confirmar horarios oficiales con coordinación académica
- Integrar persistencia de datos (localStorage o backend básico)
- Añadir navegación por rutas y estados de sesión más robustos
- Mejorar accesibilidad y notificaciones

## Estructura del proyecto

```text
organizadordehorarios/
  src/
    App.jsx
    App.css
    index.css
    main.jsx
  public/
  package.json
  vite.config.js
  README.md
```

## Estado

Primera versión lista para evaluación funcional y ajustes de semana 2.
