const USERS_KEY = 'cedi_users'
const EVENTS_KEY = 'cedi_events'
const SESSION_KEY = 'cedi_session'

export const DEMO_USER = {
    id: 'u-1',
    nombre: 'Alumno Demo',
    email: 'alumno@cedi.edu.mx',
    password: 'cedi123',
    rol: 'alumno',
    grupo: '3A',
    turno: 'matutino',
}

export function readUsers() {
    try {
        const saved = JSON.parse(localStorage.getItem(USERS_KEY))
        return Array.isArray(saved) ? saved : [DEMO_USER]
    } catch {
        return [DEMO_USER]
    }
}

export function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export function readEvents(seedEvents) {
    try {
        const saved = JSON.parse(localStorage.getItem(EVENTS_KEY))
        return Array.isArray(saved) ? saved : seedEvents
    } catch {
        return seedEvents
    }
}

export function saveEvents(events) {
    localStorage.setItem(EVENTS_KEY, JSON.stringify(events))
}

export function readSession() {
    try {
        return JSON.parse(localStorage.getItem(SESSION_KEY))
    } catch {
        return null
    }
}

export function saveSession(user) {
    if (user) localStorage.setItem(SESSION_KEY, JSON.stringify(user))
    else localStorage.removeItem(SESSION_KEY)
}
