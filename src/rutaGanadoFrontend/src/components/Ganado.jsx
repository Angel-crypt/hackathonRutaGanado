import React, { useState } from 'react';
import { rutaGanadoBackend } from '../../../declarations/rutaGanadoBackend';

function App() {
  const [arete, setArete] = useState('');
  const [datosCabeza, setDatosCabeza] = useState(null);
  const [error, setError] = useState(null);

  async function handleConsultarCabeza() {
    try {
      const datosCabeza = await rutaGanadoBackend.consultCabeza(arete);
      setDatosCabeza(datosCabeza);
      console.log(datosCabeza);
    } catch (error) {
      setError(error.message);
    }
  
    function handleGetCabeza() {
      set Raza
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
          <label>Raza:</label><br />
        </div>
      )}
    </div>
  );
}

export default App;
