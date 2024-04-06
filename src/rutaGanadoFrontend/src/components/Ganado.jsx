import React, { useState } from 'react';
import { rutaGanadoBackend } from '../../../declarations/rutaGanadoBackend';

function App() {
  const [arete, setArete] = useState('');
  const [datosCabeza, setDatosCabeza] = useState(null);
  const [error, setError] = useState(null);

  async function handleConsultarCabeza() {
    try {
      const datosCabezaResponse = await rutaGanadoBackend.consultCabeza(arete);
      setDatosCabeza(datosCabezaResponse);
      console.log(datosCabezaResponse);
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div>
      <h2>Consultar Cabeza</h2>
      <input
        type="text"
        value={arete}
        onChange={(e) => setArete(e.target.value)}
        placeholder="Ingrese el número de arete"
      />
      <button onClick={handleConsultarCabeza}>Consultar</button>
      {error && <p>Error: {error}</p>}
      {datosCabeza && (
        <div>
          <h3>Datos de la Cabeza:</h3>
          {datosCabeza.map((data, index) => (
            <div key={index}>
              <label>Raza: </label>
              <strong>{data.raza}</strong>
            </div>
          ))}
          {datosCabeza.map((data, index) => (
            <div key={index}>
              <label>Propìetasrio: </label>
              <strong>{data.propietario}</strong>
            </div>
          ))}
          {datosCabeza.map((data, index) => (
            <div key={index}>
              <label>Fecha Nacimiento: </label>
              <strong>{data.fechaNacimiento}</strong>
            </div>
          ))}
          {datosCabeza.map((data, index) => (
            <div key={index}>
              <label>Ascendencia: </label>
              <strong>{data.ascendencia}</strong>
            </div>
          ))}
          {datosCabeza.map((data, index) => (
            <div key={index}>
              <label>Destino: </label>
              <strong>{data.destino}</strong>
            </div>
          ))}
          {datosCabeza.map((data, index) => (
            <div key={index}>
              <label>Dieta: </label>
              <strong>{data.dieta}</strong>
            </div>
          ))}
          {datosCabeza.map((data, index) => (
            <div key={index}>
              <label>Mejoramiento Genetico: </label>
              <strong>{data.mejoramientoGenetico}</strong>
            </div>
          ))}
          {datosCabeza.map((data, index) => (
            <div key={index}>
              <label>Registro de Enfermedades: </label>
              <strong>{data.registroEnfermedades}</strong>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;