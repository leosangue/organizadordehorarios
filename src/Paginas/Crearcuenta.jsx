import { useState } from 'react';
import './Crearcuenta.css';

function Crearcuenta() {
    const [form, setForm] = useState({ email: '', password: '', nombre: '' });

    function handleSubmit(event) {
        event.preventDefault();
        alert(`Cuenta creada para ${form.nombre}.`);
        setForm({ email: '', password: '', nombre: '' });
    }

    return (
        <main>
            <div className="crearcuenta">
                <div className="crearcuenta_contenedor">
                    <h2>Bienvenido al organizador de horarios CEDI</h2>
                    <p>Crea una nueva cuenta con tu correo institucional</p>
                    <form className="crearcuenta_form" onSubmit={handleSubmit}>
                        <input
                            type="email"
                            placeholder="Correo electrónico"
                            value={form.email}
                            onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Contraseña"
                            value={form.password}
                            onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Nombre de usuario"
                            value={form.nombre}
                            onChange={(event) => setForm((prev) => ({ ...prev, nombre: event.target.value }))}
                            required
                        />

                        <button type="submit">
                            Crear cuenta
                        </button>
                        <a className="crearcuenta_volver" href="/">Volver al inicio de sesión</a>
                    </form>
                </div>
            </div>
        </main>
    );
}

export default Crearcuenta;