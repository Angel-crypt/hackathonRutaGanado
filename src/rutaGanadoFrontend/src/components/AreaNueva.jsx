import React, { useState } from 'react';
import { rutaGanadoBackend } from 'declarations/rutaGanadoBackend';

function App() {
    const initialDatosCabeza = {
        raza: '',
        propietario: '',
        fechaNacimiento: '',
        ascendencia: '',
        destino: '',
        dieta: '',
        mejoramientoGenetico: '',
        registroEnfermedades: '',
    };

    const [message, setMessage] = useState('');
    const [raza, setRaza] = useState('');
    const [propietario, setPropietario] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [ascendencia, setAscendencia] = useState('');
    const [destino, setDestino] = useState('');
    const [dieta, setDieta] = useState('');
    const [mejoramientoGenetico, setMejoramientoGenetico] = useState('');
    const [registroEnfermedades, setRegistroEnfermedades] = useState('');
    const [arete, setArete] = useState('');

    function handleSaveCabeza(event) {
        event.preventDefault();
        const datosCabeza = {
            raza,
            propietario,
            fechaNacimiento,
            ascendencia,
            destino,
            dieta,
            mejoramientoGenetico,
            registroEnfermedades,
        };
        rutaGanadoBackend
            .saveCabeza(datosCabeza, arete)
            .then(() => {
                setMessage('Tu cabeza fue agregada correctamente, gracias!');
            })
            .catch((error) => {
                setMessage(`Error: ${error}`);
            });
    }

    function handleReset(event) {
        event.preventDefault();
        setRaza('');
        setPropietario('');
        setFechaNacimiento('');
        setAscendencia('');
        setDestino('');
        setDieta('');
        setMejoramientoGenetico('');
        setRegistroEnfermedades('');
        setArete('');
        setMessage('');
    }

    return (
        <div>
            <h2>Agregar Datos de Cabeza</h2>
            <form onSubmit={handleSaveCabeza}>
                <input
                    type="text"
                    value={raza}
                    onChange={(e) => setRaza(e.target.value)}
                    placeholder="Raza"
                />
                <input
                    type="text"
                    value={propietario}
                    onChange={(e) => setPropietario(e.target.value)}
                    placeholder="Propietario"
                />
                <input
                    type="text"
                    value={fechaNacimiento}
                    onChange={(e) => setFechaNacimiento(e.target.value)}
                    placeholder="Fecha de Nacimiento"
                />
                <input
                    type="text"
                    value={ascendencia}
                    onChange={(e) => setAscendencia(e.target.value)}
                    placeholder="Ascendencia"
                />
                <input
                    type="text"
                    value={destino}
                    onChange={(e) => setDestino(e.target.value)}
                    placeholder="Destino"
                />
                <input
                    type="text"
                    value={dieta}
                    onChange={(e) => setDieta(e.target.value)}
                    placeholder="Dieta"
                />
                <input
                    type="text"
                    value={mejoramientoGenetico}
                    onChange={(e) => setMejoramientoGenetico(e.target.value)}
                    placeholder="Mejoramiento Genético"
                />
                <input
                    type="text"
                    value={registroEnfermedades}
                    onChange={(e) => setRegistroEnfermedades(e.target.value)}
                    placeholder="Registro de Enfermedades"
                />
                <input
                    type="text"
                    value={arete}
                    onChange={(e) => setArete(e.target.value)}
                    placeholder="Arete"
                />
                <button type="submit" class = 'btn'>Guardar</button>
                <button type="button" class = 'new'onClick={handleReset}>Nuevo ingreso</button>
            </form>
            <p>{message}</p>
        </div>
    );
}

export default App;
