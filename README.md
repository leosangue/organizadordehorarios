# Organizador de Horarios - Prepa CEDI

Aplicación web para que estudiantes de la Prepa CEDI consulten y gestionen su horario escolar y actividades personales desde un solo lugar, de forma sencilla y gratuita.

## Integrantes

- Gauss Becerra Reynoso
- Heriberto Eduardo Pineda Ortiz
- Ivan Robles Lazcano
- Leonardo Sandoval Guevara

## Descripción del proyecto

Este proyecto busca que los estudiantes de la Prepa CEDI tengan un acceso más sencillo a sus respectivos horarios, con el objetivo de que sean más organizados y tengan mejor control de su tiempo. La página permite al usuario ver y manejar su horario de manera simple e intuitiva.

## Justificación

Los estudiantes suelen combinar materias escolares con actividades extracurriculares, tareas y compromisos personales. Cuando la información está dispersa en fotos, PDFs, chats o apps genéricas, se vuelve más difícil organizar el tiempo y pueden aparecer:

- estrés
- empalmes de actividades
- entregas tardías
- bajo rendimiento académico

Un sitio web enfocado en organización de horarios ayuda a mejorar la gestión del tiempo, el desempeño académico y el bienestar emocional.

## Objetivo general

Desarrollar un sitio web intuitivo y fácil de usar que permita al usuario organizar eficientemente sus horarios escolares, eventos, trabajo y actividades personales para mejorar su gestión del tiempo.

## Problema que resuelve

Los estudiantes de la Prepa CEDI tienen dificultades para organizar y consultar:

- horarios de clase
- tareas
- actividades extracurriculares
- compromisos personales

Actualmente, deben capturar su horario manualmente o consultarlo en múltiples fuentes. Esto consume tiempo, provoca olvidos y aumenta la posibilidad de conflictos de horario.

## Solución propuesta

Se desarrolló una plataforma web que:

- entrega a los alumnos su horario escolar ya cargado
- permite agregar eventos personales (tareas, trabajo, actividades)
- ofrece visualización en tres formatos:
	- vista diaria
	- vista semanal
	- vista mensual

Con esto, el estudiante puede detectar empalmes, planificar mejor y mantener el control de sus responsabilidades.

## Funcionalidades principales

- Consulta de horario escolar precargado
- Gestión de eventos personalizados
- Vistas diaria, semanal y mensual
- Interfaz enfocada en rapidez y facilidad de uso

## Prototipo

El prototipo contempla las siguientes secciones:

- Vista diaria
- Vista semanal
- Vista mensual
- Módulo para agregar eventos

Nota: para mantener este repositorio ligero, se recomienda guardar las capturas en una carpeta como `docs/` o `public/` y referenciarlas en este README.

## Tecnologías utilizadas

- React
- Vite
- JavaScript (ESModules)
- CSS
- ESLint

## Estructura del proyecto

```text
OrganizadorDeHorarios/
	public/
	src/
		assets/
		App.css
		App.jsx
		index.css
		main.jsx
	index.html
	package.json
	vite.config.js
	eslint.config.js
```

## Instalación y ejecución

### Requisitos

- Node.js 18+ (recomendado)
- npm 9+ (o superior)

### Pasos

1. Clona el repositorio.
2. Instala dependencias:

```bash
npm install
```

3. Inicia el entorno de desarrollo:

```bash
npm run dev
```

4. Para generar build de producción:

```bash
npm run build
```

## Alternativas en el mercado y diferenciador

Existen herramientas como:

- Google Calendar
- When2meet

### Diferenciador de este proyecto

- Enfoque directo en la Prepa CEDI.
- El horario escolar se entrega precargado para el alumno.
- Reduce tiempo perdido en captura y organización manual.
- Prioriza eficiencia y acceso rápido para estudiantes de una institución específica.

## Impacto esperado

- Mayor organización personal
- Mejor administración del tiempo
- Menor estrés académico
- Menos conflictos de horario y retrasos

## Trabajo futuro

- Recordatorios y notificaciones
- Sincronización con calendario externo
- Filtros por materia y tipo de evento
- Mejoras de accesibilidad y experiencia móvil

## Licencia

Este proyecto fue desarrollado con fines académicos.
