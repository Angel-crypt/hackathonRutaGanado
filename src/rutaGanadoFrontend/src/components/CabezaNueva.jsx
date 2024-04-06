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
        <div className="container p-sm-2">
            <h2 className="text-center p-sm-2">Agregar Datos de Cabeza</h2>
            <div className="row">
                <form className="col-md-6" onSubmit={handleSaveCabeza}>
                  <input
                        type="text"
                        value={arete}
                        onChange={(e) => setArete(e.target.value)}
                        placeholder="Arete"
                        className="form-control mb-2"
                    />
                    <input
                        type="text"
                        value={raza}
                        onChange={(e) => setRaza(e.target.value)}
                        placeholder="Raza"
                        className="form-control mb-2"
                    />
                  
                    <input
                        type="text"
                        value={ascendencia}
                        onChange={(e) => setAscendencia(e.target.value)}
                        placeholder="Ascendencia"
                        className="form-control mb-2"
                    />
                    <input
                        type="text"
                        value={destino}
                        onChange={(e) => setDestino(e.target.value)}
                        placeholder="Destino"
                        className="form-control mb-2"
                    />
                    <input
                        type="text"
                        value={dieta}
                        onChange={(e) => setDieta(e.target.value)}
                        placeholder="Dieta"
                        className="form-control mb-2"
                    />
                    <input
                        type="text"
                        value={mejoramientoGenetico}
                        onChange={(e) => setMejoramientoGenetico(e.target.value)}
                        placeholder="Mejoramiento Genético"
                        className="form-control mb-2"
                    />
                    <input
                        type="text"
                        value={registroEnfermedades}
                        onChange={(e) => setRegistroEnfermedades(e.target.value)}
                        placeholder="Registro de Enfermedades"
                        className="form-control mb-2"
                    />
               
                    <button type="submit" className="btn btn-primary mr-2">Guardar</button>
                    <button type="button" className="btn btn-secondary" onClick={handleReset}>Nuevo ingreso</button>
                </form>
                <div className="col-md-6">
                <input
                        type="text"
                        value={propietario}
                        onChange={(e) => setPropietario(e.target.value)}
                        placeholder="Propietario"
                        className="form-control mb-2"
                    />
                </div>
                  
                <input
                        type="text"
                        value={fechaNacimiento}
                        onChange={(e) => setFechaNacimiento(e.target.value)}
                        placeholder="Fecha de Nacimiento"
                        className="form-control mb-2"
                    />
                <div class="alert"><p>{message}</p></div>
            </div>
        </div>
    );
}

export default App;
