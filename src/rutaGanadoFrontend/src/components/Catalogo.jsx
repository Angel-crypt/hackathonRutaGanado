import React, { useState,  useEffect } from 'react';
import { rutaGanadoBackend } from '../../../declarations/rutaGanadoBackend';

function App() {

    const [error, setError] = useState(null);
    const [ganado, setGanado] = useState([]);

    async function handleGetGanado() {
        try {
            const ganadoResponse = await rutaGanadoBackend.consultGanado();
            setGanado(ganadoResponse);
            console.log(ganadoResponse);
        } catch (error) {
            setError(error.message);
        }
    }
    useEffect(() => {
        handleGetGanado();
    }, []);

    return (
        <div>
            <h2>Consultar Cabeza</h2>
            {error && <p>Error: {error}</p>}
            {ganado && ganado.map((cabeza, index) => (
                <div key={index}>
                    <h3>Cabeza {index + 1}:</h3>
                    <p>Raza: {cabeza.raza}</p>
                    <p>Propietario: {cabeza.propietario}</p>
                    <p>Fecha Nacimiento: {cabeza.fechaNacimiento}</p>
                    <p>Ascendencia: {cabeza.ascendencia}</p>
                </div>
                
            ))}
        </div>
    );
}


export default App;