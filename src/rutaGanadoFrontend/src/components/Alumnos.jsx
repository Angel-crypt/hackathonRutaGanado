import React, { useState } from 'react';
import { rutaGanadoBackend } from 'declarations/rutaGanadoBackend';

function ConsultarCabeza() {
  const [arete, setArete] = useState('');
  const [datosCabeza, setDatosCabeza] = useState(null);
  const [error, setError] = useState('');

  function handleConsultarCabeza(event) {
    event.preventDefault();
    rutaGanadoBackend
      .consultCabeza(arete)
      .then((datos) => {
        setDatosCabeza(datos);
        setError('');
      })
      .catch((error) => {
        setDatosCabeza(null);
        setError(`Error: ${error}`);
      });
  }

  return (
    <div>
      <h1>Consultar Datos de Cabeza</h1>
      <form onSubmit={handleConsultarCabeza}>
        <input
          type="text"
          value={arete}
          onChange={(e) => setArete(e.target.value)}
          placeholder="Número de Arete"
        />
        <button type="submit">Consultar</button>
      </form>
      {error && <p>{error}</p>}
      {datosCabeza && (
        <div>
          <h2>Datos de la Cabeza</h2>
          <p>Raza: {datosCabeza.raza}</p>
          <p>Propietario: {datosCabeza.propietario}</p>
          <p>Fecha de Nacimiento: {datosCabeza.fechaNacimiento}</p>
          <p>Ascendencia: {datosCabeza.ascendencia}</p>
          <p>Destino: {datosCabeza.destino}</p>
          <p>Dieta: {datosCabeza.dieta}</p>
          <p>Mejoramiento Genético: {datosCabeza.mejoramientoGenetico}</p>
          <p>Registro de Enfermedades: {datosCabeza.registroEnfermedades}</p>
        </div>
      )}
    </div>
  );
}

export default ConsultarCabeza;
