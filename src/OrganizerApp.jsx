import { useEffect, useMemo, useState } from 'react'
import {
    CalendarDays,
    ChevronLeft,
    ChevronRight,
    Clock3,
    LogOut,
    Plus,
    UserRound,
} from 'lucide-react'
import {
    readEvents,
    readSession,
    readUsers,
    saveEvents,
    saveSession,
    saveUsers,
} from './storage'
import './OrganizerApp.css'

const CATEGORIES = [
    { id: 'cat-class', name: 'Clase', color: '#22c55e' },
    { id: 'cat-homework', name: 'Tarea', color: '#f59e0b' },
    { id: 'cat-exam', name: 'Examen', color: '#ef4444' },
    { id: 'cat-personal', name: 'Personal', color: '#12b886' },
]

const CEDI_SCHEDULES = [
    { id: 'sc-1', title: 'Matemáticas I', day: 1, startTime: '07:00', endTime: '07:50', room: 'A-2' },
    { id: 'sc-2', title: 'Química I', day: 1, startTime: '08:00', endTime: '08:50', room: 'Lab 1' },
    { id: 'sc-3', title: 'Comunicación', day: 2, startTime: '07:00', endTime: '07:50', room: 'B-1' },
    { id: 'sc-4', title: 'Historia', day: 3, startTime: '09:00', endTime: '09:50', room: 'C-3' },
    { id: 'sc-5', title: 'Inglés III', day: 4, startTime: '10:00', endTime: '10:50', room: 'B-4' },
    { id: 'sc-6', title: 'Física', day: 5, startTime: '11:00', endTime: '11:50', room: 'Lab 2' },
]

function toIsoDate(date) {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
}

const today = new Date()
const isoToday = toIsoDate(today)

const INITIAL_EVENTS = [
    {
        id: 'ev-welcome',
        titulo: 'Matemáticas I',
        descripcion: 'Clase CEDI',
        categoriaId: 'cat-class',
        date: isoToday,
        startTime: '07:00',
        endTime: '07:50',
        creadoPor: 'sistema',
        fuente: 'CEDI',
    },
]

function categoryFor(id) {
    return CATEGORIES.find((category) => category.id === id) ?? CATEGORIES[3]
}

export default function OrganizerApp({ initialMode = 'login' }) {
    const [authMode, setAuthMode] = useState(initialMode)
    const [currentUser, setCurrentUser] = useState(() => readSession())
    const [events, setEvents] = useState(() => readEvents(INITIAL_EVENTS))
    const [selectedDate, setSelectedDate] = useState(isoToday)
    const [loginForm, setLoginForm] = useState({ email: '', password: '' })
    const [signupForm, setSignupForm] = useState({ name: '', email: '', password: '', group: '3A' })
    const [eventForm, setEventForm] = useState({
        title: '',
        categoryId: 'cat-personal',
        startTime: '17:00',
        endTime: '18:00',
    })
    const [showEventForm, setShowEventForm] = useState(false)

    useEffect(() => saveSession(currentUser), [currentUser])
    useEffect(() => saveEvents(events), [events])

    const selectedDateObject = useMemo(() => new Date(`${selectedDate}T12:00:00`), [selectedDate])

    const monthDays = useMemo(() => {
        const year = selectedDateObject.getFullYear()
        const month = selectedDateObject.getMonth()
        const first = new Date(year, month, 1)
        const mondayOffset = (first.getDay() + 6) % 7
        const start = new Date(year, month, 1 - mondayOffset)
        return Array.from({ length: 42 }, (_, index) => {
            const date = new Date(start)
            date.setDate(start.getDate() + index)
            return date
        })
    }, [selectedDateObject])

    const dayEvents = useMemo(() =>
        events
            .filter((event) => event.date === selectedDate)
            .sort((a, b) => a.startTime.localeCompare(b.startTime)),
        [events, selectedDate])

    function handleLogin(event) {
        event.preventDefault()
        const user = readUsers().find((item) =>
            item.email.toLowerCase() === loginForm.email.trim().toLowerCase()
            && item.password === loginForm.password,
        )
        if (!user) {
            alert('Correo o contraseña incorrectos.')
            return
        }
        setCurrentUser(user)
    }

    function handleSignup(event) {
        event.preventDefault()
        const email = signupForm.email.trim().toLowerCase()
        const users = readUsers()
        if (users.some((user) => user.email.toLowerCase() === email)) {
            alert('Ese correo ya tiene una cuenta.')
            return
        }
        const user = {
            id: `u-${Date.now()}`,
            nombre: signupForm.name.trim(),
            email,
            password: signupForm.password,
            rol: 'alumno',
            grupo: signupForm.group,
            turno: 'matutino',
        }
        saveUsers([...users, user])
        setCurrentUser(user)
    }

    function changeMonth(amount) {
        const next = new Date(selectedDateObject.getFullYear(), selectedDateObject.getMonth() + amount, 1, 12)
        setSelectedDate(toIsoDate(next))
    }

    function addEvent(event) {
        event.preventDefault()
        if (!eventForm.title.trim()) return
        const newEvent = {
            id: `ev-${Date.now()}`,
            titulo: eventForm.title.trim(),
            descripcion: '',
            categoriaId: eventForm.categoryId,
            date: selectedDate,
            startTime: eventForm.startTime,
            endTime: eventForm.endTime,
            creadoPor: currentUser.id,
            fuente: 'Manual',
        }
        setEvents((previous) => [...previous, newEvent])
        setEventForm({ title: '', categoryId: 'cat-personal', startTime: '17:00', endTime: '18:00' })
        setShowEventForm(false)
    }

    if (!currentUser) {
        return (
            <main className="auth-page">
                <section className="auth-card">
                    <aside className="auth-brand">
                        <div className="brand-mark"><CalendarDays size={28} /></div>
                        <div>
                            <p className="brand-name">CEDI Agenda</p>
                            <p className="brand-copy">Tu horario, tus tareas y tus clases en un solo lugar.</p>
                        </div>
                    </aside>

                    <div className="auth-content">
                        <div className="auth-tabs" role="tablist">
                            <button
                                type="button"
                                className={authMode === 'login' ? 'active' : ''}
                                onClick={() => setAuthMode('login')}
                            >
                                Log in
                            </button>
                            <button
                                type="button"
                                className={authMode === 'signup' ? 'active' : ''}
                                onClick={() => setAuthMode('signup')}
                            >
                                Sign up
                            </button>
                        </div>

                        {authMode === 'login' ? (
                            <form className="auth-form" onSubmit={handleLogin}>
                                <div>
                                    <p className="auth-kicker">Bienvenido de vuelta</p>
                                    <h1>Inicia sesión</h1>
                                </div>
                                <label>
                                    Correo electrónico
                                    <input
                                        type="email"
                                        value={loginForm.email}
                                        onChange={(event) => setLoginForm((previous) => ({ ...previous, email: event.target.value }))}
                                        placeholder="alumno@cedi.edu.mx"
                                        required
                                    />
                                </label>
                                <label>
                                    Contraseña
                                    <input
                                        type="password"
                                        value={loginForm.password}
                                        onChange={(event) => setLoginForm((previous) => ({ ...previous, password: event.target.value }))}
                                        placeholder="Tu contraseña"
                                        required
                                    />
                                </label>
                                <button type="submit" className="auth-submit">Iniciar sesión</button>
                                <p className="auth-demo">Demostración: <strong>alumno@cedi.edu.mx</strong> · <strong>cedi123</strong></p>
                            </form>
                        ) : (
                            <form className="auth-form" onSubmit={handleSignup}>
                                <div>
                                    <p className="auth-kicker">Comienza ahora</p>
                                    <h1>Crea tu cuenta</h1>
                                </div>
                                <label>
                                    Nombre
                                    <input
                                        type="text"
                                        value={signupForm.name}
                                        onChange={(event) => setSignupForm((previous) => ({ ...previous, name: event.target.value }))}
                                        placeholder="Tu nombre"
                                        required
                                    />
                                </label>
                                <label>
                                    Correo electrónico
                                    <input
                                        type="email"
                                        value={signupForm.email}
                                        onChange={(event) => setSignupForm((previous) => ({ ...previous, email: event.target.value }))}
                                        placeholder="nombre@cedi.edu.mx"
                                        required
                                    />
                                </label>
                                <div className="auth-row">
                                    <label>
                                        Contraseña
                                        <input
                                            type="password"
                                            value={signupForm.password}
                                            onChange={(event) => setSignupForm((previous) => ({ ...previous, password: event.target.value }))}
                                            placeholder="Mínimo 4 caracteres"
                                            minLength="4"
                                            required
                                        />
                                    </label>
                                    <label>
                                        Grupo
                                        <select
                                            value={signupForm.group}
                                            onChange={(event) => setSignupForm((previous) => ({ ...previous, group: event.target.value }))}
                                        >
                                            <option>1A</option><option>1B</option><option>2A</option><option>2B</option>
                                            <option>3A</option><option>3B</option>
                                        </select>
                                    </label>
                                </div>
                                <button type="submit" className="auth-submit">Crear cuenta</button>
                            </form>
                        )}
                    </div>
                </section>
            </main>
        )
    }

    const monthLabel = selectedDateObject.toLocaleDateString('es-MX', { month: 'long', year: 'numeric' })

    return (
        <main className="app-page">
            <header className="app-header">
                <div className="app-brand">
                    <span className="brand-mark small"><CalendarDays size={20} /></span>
                    <strong>CEDI Agenda</strong>
                </div>
                <div className="user-actions">
                    <span className="user-avatar"><UserRound size={18} /></span>
                    <div className="user-copy">
                        <strong>{currentUser.nombre}</strong>
                        <span>Grupo {currentUser.grupo}</span>
                    </div>
                    <button type="button" className="icon-button" onClick={() => setCurrentUser(null)} title="Cerrar sesión">
                        <LogOut size={19} />
                    </button>
                </div>
            </header>

            <section className="calendar-layout">
                <article className="calendar-panel">
                    <div className="calendar-toolbar">
                        <div>
                            <p>Calendario</p>
                            <h1>{monthLabel}</h1>
                        </div>
                        <div className="calendar-controls">
                            <button type="button" onClick={() => changeMonth(-1)} aria-label="Mes anterior"><ChevronLeft size={19} /></button>
                            <button type="button" onClick={() => setSelectedDate(isoToday)}>Hoy</button>
                            <button type="button" onClick={() => changeMonth(1)} aria-label="Mes siguiente"><ChevronRight size={19} /></button>
                        </div>
                    </div>

                    <div className="weekday-row">
                        {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map((day) => <span key={day}>{day}</span>)}
                    </div>
                    <div className="calendar-grid">
                        {monthDays.map((date) => {
                            const iso = toIsoDate(date)
                            const outside = date.getMonth() !== selectedDateObject.getMonth()
                            const count = events.filter((event) => event.date === iso).length
                            return (
                                <button
                                    type="button"
                                    key={iso}
                                    className={`calendar-day${outside ? ' outside' : ''}${iso === selectedDate ? ' selected' : ''}${iso === isoToday ? ' today' : ''}`}
                                    onClick={() => setSelectedDate(iso)}
                                >
                                    <span className="day-number">{date.getDate()}</span>
                                    {count > 0 && <span className="day-dot"><b>{count}</b></span>}
                                </button>
                            )
                        })}
                    </div>
                </article>

                <aside className="agenda-panel">
                    <div className="agenda-heading">
                        <div>
                            <p>Agenda</p>
                            <h2>{selectedDateObject.toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'long' })}</h2>
                        </div>
                        <button type="button" className="add-button" onClick={() => setShowEventForm((previous) => !previous)}>
                            <Plus size={18} /> Agregar
                        </button>
                    </div>

                    {showEventForm && (
                        <form className="event-form" onSubmit={addEvent}>
                            <input
                                type="text"
                                value={eventForm.title}
                                onChange={(event) => setEventForm((previous) => ({ ...previous, title: event.target.value }))}
                                placeholder="Nombre del evento"
                                required
                            />
                            <select
                                value={eventForm.categoryId}
                                onChange={(event) => setEventForm((previous) => ({ ...previous, categoryId: event.target.value }))}
                            >
                                {CATEGORIES.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
                            </select>
                            <div className="time-row">
                                <input type="time" value={eventForm.startTime} onChange={(event) => setEventForm((previous) => ({ ...previous, startTime: event.target.value }))} />
                                <input type="time" value={eventForm.endTime} onChange={(event) => setEventForm((previous) => ({ ...previous, endTime: event.target.value }))} />
                            </div>
                            <button type="submit">Guardar evento</button>
                        </form>
                    )}

                    <div className="event-list">
                        {dayEvents.length === 0 ? (
                            <div className="empty-state">
                                <Clock3 size={28} />
                                <p>No tienes eventos este día</p>
                            </div>
                        ) : dayEvents.map((event) => {
                            const category = categoryFor(event.categoriaId)
                            return (
                                <article className="event-item" key={event.id}>
                                    <span className="event-color" style={{ background: category.color }} />
                                    <div>
                                        <strong>{event.titulo}</strong>
                                        <p>{event.startTime} – {event.endTime}</p>
                                    </div>
                                    <span className="event-category">{category.name}</span>
                                </article>
                            )
                        })}
                    </div>
                </aside>
            </section>
        </main>
    )
}
