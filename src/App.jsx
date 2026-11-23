import { useMemo, useState } from 'react'
import './App.css'

const PALETTE = [
  { name: 'Primario', value: '#0b3c5d' },
  { name: 'Secundario', value: '#328cc1' },
  { name: 'Acento', value: '#d9b310' },
  { name: 'Éxito', value: '#198754' },
  { name: 'Fondo', value: '#f7f4ea' },
  { name: 'Texto', value: '#1f2933' },
]

const TYPOGRAPHY = {
  heading: 'Poppins, Montserrat, system-ui, sans-serif',
  body: 'Nunito Sans, Segoe UI, Roboto, sans-serif',
  mono: 'JetBrains Mono, Consolas, monospace',
}

const BASE_COMPONENTS = ['Botón primario', 'Botón secundario', 'Tarjeta', 'Chip de categoría', 'Tabla de agenda', 'Modal (siguiente iteración)']

const DATA_SCHEMAS = {
  users: {
    id: 'string',
    nombre: 'string',
    email: 'string',
    rol: 'alumno | docente | admin',
    grupo: 'string',
    turno: 'matutino | vespertino',
    passwordHint: 'string',
  },
  categories: {
    id: 'string',
    nombre: 'Clase | Tarea | Examen | Personal',
    color: 'hex',
  },
  events: {
    id: 'string',
    titulo: 'string',
    descripcion: 'string',
    categoriaId: 'string',
    date: 'YYYY-MM-DD',
    startTime: 'HH:MM',
    endTime: 'HH:MM',
    creadoPor: 'userId',
    fuente: 'CEDI | Manual',
    grupo: 'string | null',
  },
  schedules: {
    id: 'string',
    grupo: 'string',
    turno: 'matutino | vespertino',
    dia: 'Lunes..Viernes',
    startTime: 'HH:MM',
    endTime: 'HH:MM',
    materia: 'string',
    docente: 'string',
    aula: 'string',
  },
}

const USERS = [
  {
    id: 'u-1',
    nombre: 'Alumno Demo',
    email: 'alumno@cedi.edu.mx',
    rol: 'alumno',
    grupo: '3A',
    turno: 'matutino',
    passwordHint: 'cedi123',
  },
]

const CATEGORIES = [
  { id: 'cat-class', nombre: 'Clase', color: '#0b3c5d' },
  { id: 'cat-homework', nombre: 'Tarea', color: '#d97904' },
  { id: 'cat-exam', nombre: 'Examen', color: '#a61b1b' },
  { id: 'cat-personal', nombre: 'Personal', color: '#198754' },
]

const CEDI_GROUP_SCHEDULES = [
  { id: 'sc-1', grupo: '1A', turno: 'matutino', dia: 'Lunes', startTime: '07:00', endTime: '07:50', materia: 'Matemáticas I', docente: 'Mtra. López', aula: 'A-2' },
  { id: 'sc-2', grupo: '1A', turno: 'matutino', dia: 'Lunes', startTime: '08:00', endTime: '08:50', materia: 'Química I', docente: 'Mtro. Torres', aula: 'Lab 1' },
  { id: 'sc-3', grupo: '1A', turno: 'matutino', dia: 'Martes', startTime: '07:00', endTime: '07:50', materia: 'Comunicación', docente: 'Mtra. Pérez', aula: 'B-1' },
  { id: 'sc-4', grupo: '2B', turno: 'matutino', dia: 'Miércoles', startTime: '09:00', endTime: '09:50', materia: 'Historia', docente: 'Mtro. Rivera', aula: 'C-3' },
  { id: 'sc-5', grupo: '3A', turno: 'matutino', dia: 'Jueves', startTime: '10:00', endTime: '10:50', materia: 'Inglés III', docente: 'Mtra. Cruz', aula: 'B-4' },
  { id: 'sc-6', grupo: '3A', turno: 'matutino', dia: 'Viernes', startTime: '11:00', endTime: '11:50', materia: 'Física', docente: 'Mtro. Salinas', aula: 'Lab 2' },
]

const today = new Date()
const isoToday = today.toISOString().slice(0, 10)

const INITIAL_EVENTS = [
  {
    id: 'ev-1',
    titulo: 'Matemáticas I',
    descripcion: 'Clase regular',
    categoriaId: 'cat-class',
    date: isoToday,
    startTime: '07:00',
    endTime: '07:50',
    creadoPor: 'sistema',
    fuente: 'CEDI',
    grupo: '1A',
  },
  {
    id: 'ev-2',
    titulo: 'Entregar tarea de historia',
    descripcion: 'Subir PDF al aula virtual',
    categoriaId: 'cat-homework',
    date: isoToday,
    startTime: '18:00',
    endTime: '18:30',
    creadoPor: 'u-1',
    fuente: 'Manual',
    grupo: null,
  },
]

const WEEK_DAYS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']

const SITE_NAV = [
  { id: 'diseno-base', label: 'Diseño base' },
  { id: 'esquema-datos', label: 'Esquema' },
  { id: 'prototipos', label: 'Prototipos' },
  { id: 'vistas-agenda', label: 'Vistas' },
  { id: 'horarios-cedi', label: 'Horarios CEDI' },
  { id: 'entorno', label: 'Entorno y mercado' },
  { id: 'validacion', label: 'Semana 2' },
]

function toDateOnly(dateValue) {
  const d = new Date(dateValue)
  d.setHours(0, 0, 0, 0)
  return d
}

function getWeekStart(dateValue) {
  const d = toDateOnly(dateValue)
  const day = d.getDay()
  const diff = day === 0 ? -6 : 1 - day
  d.setDate(d.getDate() + diff)
  return d
}

function formatHumanDate(dateValue) {
  return new Date(`${dateValue}T00:00:00`).toLocaleDateString('es-MX', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

function eventCategoryName(categoryId) {
  return CATEGORIES.find((cat) => cat.id === categoryId)?.nombre ?? 'Sin categoría'
}

function App() {
  const [activeView, setActiveView] = useState('diaria')
  const [selectedDate, setSelectedDate] = useState(isoToday)
  const [events, setEvents] = useState(INITIAL_EVENTS)
  const [currentUser, setCurrentUser] = useState(null)
  const [loginForm, setLoginForm] = useState({ email: '', password: '' })
  const [eventForm, setEventForm] = useState({
    titulo: '',
    descripcion: '',
    categoriaId: 'cat-personal',
    date: isoToday,
    startTime: '17:00',
    endTime: '18:00',
  })

  const weekStart = useMemo(() => getWeekStart(selectedDate), [selectedDate])
  const weekEnd = useMemo(() => {
    const e = new Date(weekStart)
    e.setDate(weekStart.getDate() + 6)
    return e
  }, [weekStart])

  const dailyEvents = useMemo(() => {
    return events
      .filter((ev) => ev.date === selectedDate)
      .sort((a, b) => a.startTime.localeCompare(b.startTime))
  }, [events, selectedDate])

  const weeklyEvents = useMemo(() => {
    return events
      .filter((ev) => {
        const current = toDateOnly(ev.date)
        return current >= weekStart && current <= weekEnd
      })
      .sort((a, b) => `${a.date}${a.startTime}`.localeCompare(`${b.date}${b.startTime}`))
  }, [events, weekStart, weekEnd])

  const monthlyEvents = useMemo(() => {
    const selected = new Date(`${selectedDate}T00:00:00`)
    const month = selected.getMonth()
    const year = selected.getFullYear()
    return events.filter((ev) => {
      const current = new Date(`${ev.date}T00:00:00`)
      return current.getMonth() === month && current.getFullYear() === year
    })
  }, [events, selectedDate])

  const weekBuckets = useMemo(() => {
    const buckets = {}
    WEEK_DAYS.forEach((d) => {
      buckets[d] = []
    })
    weeklyEvents.forEach((ev) => {
      const dayName = new Date(`${ev.date}T00:00:00`).toLocaleDateString('es-MX', { weekday: 'long' })
      const fixedDay = dayName.charAt(0).toUpperCase() + dayName.slice(1)
      if (!buckets[fixedDay]) buckets[fixedDay] = []
      buckets[fixedDay].push(ev)
    })
    return buckets
  }, [weeklyEvents])

  const monthSummary = useMemo(() => {
    const summary = {}
    monthlyEvents.forEach((ev) => {
      summary[ev.date] = (summary[ev.date] ?? 0) + 1
    })
    return summary
  }, [monthlyEvents])

  function handleLoginSubmit(e) {
    e.preventDefault()
    const user = USERS.find((u) => u.email.toLowerCase() === loginForm.email.toLowerCase())
    if (!user) {
      alert('Usuario no encontrado. Usa alumno@cedi.edu.mx para demo.')
      return
    }
    setCurrentUser(user)
  }

  function handleAddEventSubmit(e) {
    e.preventDefault()
    if (!currentUser) {
      alert('Inicia sesión para agregar eventos.')
      return
    }

    const newEvent = {
      id: `ev-${events.length + 1}`,
      titulo: eventForm.titulo,
      descripcion: eventForm.descripcion,
      categoriaId: eventForm.categoriaId,
      date: eventForm.date,
      startTime: eventForm.startTime,
      endTime: eventForm.endTime,
      creadoPor: currentUser.id,
      fuente: 'Manual',
      grupo: currentUser.grupo,
    }

    setEvents((prev) => [...prev, newEvent])
    setEventForm((prev) => ({ ...prev, titulo: '', descripcion: '' }))
  }

  const selectedDateObject = new Date(`${selectedDate}T00:00:00`)
  const monthLabel = selectedDateObject.toLocaleDateString('es-MX', { month: 'long', year: 'numeric' })

  return (
    <main className="app-shell">
      <header className="site-header panel" aria-label="Navegación principal">
        <p className="kicker">Estructura del sitio - Gauss</p>
        <nav className="site-nav">
          {SITE_NAV.map((item) => (
            <a key={item.id} href={`#${item.id}`}>{item.label}</a>
          ))}
        </nav>
      </header>

      <header className="hero">
        <p className="kicker">Primera versión del proyecto</p>
        <h1>Organizador de Horarios - Prepa CEDI</h1>
        <p>
          V1 con lineamientos visuales, esquema de datos, prototipos de acceso y agenda, comparación de alternativas y plan de trabajo para semana 2.
        </p>
      </header>

      <section id="diseno-base" className="panel">
        <h2>1) Paleta, tipografía y componentes base</h2>
        <div className="swatches">
          {PALETTE.map((color) => (
            <article className="swatch" key={color.name}>
              <span style={{ background: color.value }} aria-hidden="true" />
              <strong>{color.name}</strong>
              <code>{color.value}</code>
            </article>
          ))}
        </div>
        <div className="design-grid">
          <div>
            <h3>Tipografía</h3>
            <ul>
              <li>Heading: {TYPOGRAPHY.heading}</li>
              <li>Body: {TYPOGRAPHY.body}</li>
              <li>Mono: {TYPOGRAPHY.mono}</li>
            </ul>
          </div>
          <div>
            <h3>Componentes base</h3>
            <ul>
              {BASE_COMPONENTS.map((component) => (
                <li key={component}>{component}</li>
              ))}
            </ul>
            <div className="button-row">
              <button type="button" className="btn btn-primary">Botón primario</button>
              <button type="button" className="btn btn-secondary">Botón secundario</button>
            </div>
          </div>
        </div>
      </section>

      <section id="esquema-datos" className="panel">
        <h2>2) Esquema de usuarios, eventos, categorías y horarios</h2>
        <div className="schema-grid">
          <article>
            <h3>Users</h3>
            <pre>{JSON.stringify(DATA_SCHEMAS.users, null, 2)}</pre>
          </article>
          <article>
            <h3>Categories</h3>
            <pre>{JSON.stringify(DATA_SCHEMAS.categories, null, 2)}</pre>
          </article>
          <article>
            <h3>Events</h3>
            <pre>{JSON.stringify(DATA_SCHEMAS.events, null, 2)}</pre>
          </article>
          <article>
            <h3>Schedules</h3>
            <pre>{JSON.stringify(DATA_SCHEMAS.schedules, null, 2)}</pre>
          </article>
        </div>
      </section>

      <section id="prototipos" className="panel split">
        <article>
          <h2>3) Prototipo: inicio de sesión</h2>
          <p className="hint">Demo: usa alumno@cedi.edu.mx</p>
          <form className="form" onSubmit={handleLoginSubmit}>
            <label>
              Correo
              <input
                type="email"
                value={loginForm.email}
                onChange={(e) => setLoginForm((prev) => ({ ...prev, email: e.target.value }))}
                required
              />
            </label>
            <label>
              Contraseña
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm((prev) => ({ ...prev, password: e.target.value }))}
                required
              />
            </label>
            <button type="submit" className="btn btn-primary">Iniciar sesión</button>
            <a className="account-link" href="/crear-cuenta">¿No tienes cuenta? Crear una cuenta</a>
          </form>
          {currentUser ? (
            <p className="status success">Sesión activa: {currentUser.nombre} ({currentUser.grupo})</p>
          ) : (
            <p className="status">Aún sin sesión activa.</p>
          )}
        </article>

        <article>
          <h2>4) Prototipo: agregar evento</h2>
          <form className="form" onSubmit={handleAddEventSubmit}>
            <label>
              Título
              <input
                type="text"
                value={eventForm.titulo}
                onChange={(e) => setEventForm((prev) => ({ ...prev, titulo: e.target.value }))}
                required
              />
            </label>
            <label>
              Descripción
              <textarea
                rows="3"
                value={eventForm.descripcion}
                onChange={(e) => setEventForm((prev) => ({ ...prev, descripcion: e.target.value }))}
              />
            </label>
            <label>
              Categoría
              <select
                value={eventForm.categoriaId}
                onChange={(e) => setEventForm((prev) => ({ ...prev, categoriaId: e.target.value }))}
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                ))}
              </select>
            </label>
            <div className="grid-2">
              <label>
                Fecha
                <input
                  type="date"
                  value={eventForm.date}
                  onChange={(e) => setEventForm((prev) => ({ ...prev, date: e.target.value }))}
                />
              </label>
              <label>
                Inicio
                <input
                  type="time"
                  value={eventForm.startTime}
                  onChange={(e) => setEventForm((prev) => ({ ...prev, startTime: e.target.value }))}
                />
              </label>
            </div>
            <label>
              Fin
              <input
                type="time"
                value={eventForm.endTime}
                onChange={(e) => setEventForm((prev) => ({ ...prev, endTime: e.target.value }))}
              />
            </label>
            <button type="submit" className="btn btn-secondary">Guardar evento</button>
          </form>
        </article>
      </section>

      <section id="vistas-agenda" className="panel">
        <h2>5) Prototipos de vista diaria, semanal y mensual</h2>
        <div className="toolbar">
          <div className="segmented">
            <button type="button" className={activeView === 'diaria' ? 'active' : ''} onClick={() => setActiveView('diaria')}>Diaria</button>
            <button type="button" className={activeView === 'semanal' ? 'active' : ''} onClick={() => setActiveView('semanal')}>Semanal</button>
            <button type="button" className={activeView === 'mensual' ? 'active' : ''} onClick={() => setActiveView('mensual')}>Mensual</button>
          </div>
          <label>
            Fecha base
            <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
          </label>
        </div>

        {activeView === 'diaria' && (
          <article className="agenda-card">
            <h3>Agenda diaria: {formatHumanDate(selectedDate)}</h3>
            {dailyEvents.length === 0 ? (
              <p className="status">No hay eventos para esta fecha.</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Hora</th>
                    <th>Evento</th>
                    <th>Categoría</th>
                    <th>Fuente</th>
                  </tr>
                </thead>
                <tbody>
                  {dailyEvents.map((ev) => (
                    <tr key={ev.id}>
                      <td>{ev.startTime} - {ev.endTime}</td>
                      <td>{ev.titulo}</td>
                      <td><span className="chip">{eventCategoryName(ev.categoriaId)}</span></td>
                      <td>{ev.fuente}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </article>
        )}

        {activeView === 'semanal' && (
          <article className="agenda-card">
            <h3>
              Agenda semanal: {weekStart.toLocaleDateString('es-MX')} - {weekEnd.toLocaleDateString('es-MX')}
            </h3>
            <div className="week-grid">
              {WEEK_DAYS.map((day) => (
                <section key={day}>
                  <h4>{day}</h4>
                  {(weekBuckets[day] ?? []).length === 0 ? (
                    <p className="hint">Sin eventos</p>
                  ) : (
                    <ul>
                      {weekBuckets[day].map((ev) => (
                        <li key={ev.id}>
                          <strong>{ev.startTime}</strong> {ev.titulo}
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>
          </article>
        )}

        {activeView === 'mensual' && (
          <article className="agenda-card">
            <h3>Resumen mensual: {monthLabel}</h3>
            <div className="month-grid">
              {Array.from({ length: 31 }).map((_, idx) => {
                const day = idx + 1
                const yyyyMm = selectedDate.slice(0, 7)
                const key = `${yyyyMm}-${String(day).padStart(2, '0')}`
                return (
                  <div key={key}>
                    <span>{day}</span>
                    <strong>{monthSummary[key] ?? 0} evento(s)</strong>
                  </div>
                )
              })}
            </div>
          </article>
        )}
      </section>

      <section id="horarios-cedi" className="panel">
        <h2>6) Horarios de grupos de la Prepa CEDI (levantamiento inicial)</h2>
        <p className="hint">
          Esta primera versión incluye una base preliminar para validación con coordinación académica. En semana 2 se confirma contra fuente oficial.
        </p>
        <table>
          <thead>
            <tr>
              <th>Grupo</th>
              <th>Turno</th>
              <th>Día</th>
              <th>Horario</th>
              <th>Materia</th>
              <th>Docente</th>
              <th>Aula</th>
            </tr>
          </thead>
          <tbody>
            {CEDI_GROUP_SCHEDULES.map((item) => (
              <tr key={item.id}>
                <td>{item.grupo}</td>
                <td>{item.turno}</td>
                <td>{item.dia}</td>
                <td>{item.startTime} - {item.endTime}</td>
                <td>{item.materia}</td>
                <td>{item.docente}</td>
                <td>{item.aula}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section id="entorno" className="panel split">
        <article>
          <h2>7) Entorno de desarrollo y servidor</h2>
          <ul>
            <li>Frontend: React + Vite</li>
            <li>Comando local: <code>npm run dev</code></li>
            <li>Build producción: <code>npm run build</code></li>
            <li>Preview local: <code>npm run preview</code></li>
            <li>Servidor recomendado para despliegue: Vercel o Netlify</li>
          </ul>
        </article>
        <article>
          <h2>8) Google Calendar vs When2meet vs CEDI</h2>
          <table>
            <thead>
              <tr>
                <th>Plataforma</th>
                <th>Ventaja</th>
                <th>Limitación</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Google Calendar</td>
                <td>Maduro, recordatorios y sincronización</td>
                <td>No entrega horario CEDI precargado por grupo</td>
              </tr>
              <tr>
                <td>When2meet</td>
                <td>Excelente para coordinar reuniones</td>
                <td>No es gestor académico completo</td>
              </tr>
              <tr>
                <td>Organizador CEDI</td>
                <td>Enfoque directo en alumnos CEDI + horario listo</td>
                <td>V1 aún en validación de dataset institucional</td>
              </tr>
            </tbody>
          </table>
        </article>
      </section>

      <section id="validacion" className="panel">
        <h2>9) Validación de prototipos y plan semana 2</h2>
        <div className="week2-grid">
          <article>
            <h3>Validación V1 (checklist)</h3>
            <ul>
              <li>Probar flujo de login demo con 5 estudiantes</li>
              <li>Revisar claridad de formulario de alta de evento</li>
              <li>Medir tiempo para encontrar una clase en vista semanal</li>
              <li>Recoger feedback de usabilidad en móvil</li>
            </ul>
          </article>
          <article>
            <h3>Plan semana 2</h3>
            <ul>
              <li>Validar horarios oficiales con control escolar CEDI</li>
              <li>Agregar persistencia (localStorage o backend inicial)</li>
              <li>Implementar navegación por rutas</li>
              <li>Añadir recordatorios y mejoras de accesibilidad</li>
            </ul>
          </article>
        </div>
      </section>

      <footer className="site-footer">
        <p>Organizador de Horarios CEDI - Versión 1</p>
      </footer>
    </main>
  )
}

export default App
