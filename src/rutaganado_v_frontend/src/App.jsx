import { useState } from "react";
import { rutaganado_v_backend } from "declarations/rutaganado_v_backend";

function App() {
  const [message, setMessage] = useState("");
  const [datosCabeza, setDatosCabeza] = useState({
    raza: "",
    propietario: "",
    fechaNacimiento: "",
    ascendencia: "",
    destino: "",
    dieta: "",
    mejoramientoGenetico: "",
    registroEnfermedades: "",
  });
  const [arete, setArete] = useState("");

  function handleSaveCabeza() {
    rutaganado_v_backend
      .saveCabeza(datosCabeza, arete)
      .then(() => {
        setMessage("Tu cabeza fue agregada correctamente, gracias!");
      })
      .catch((error) => {
        setMessage(`Error: ${error}`);
      });
  }

  return (
    <main>
      <section>
        <label htmlFor="raza">Raza:</label>
        <input
          id="raza"
          type="text"
          value={datosCabeza.raza}
          onChange={(e) =>
            setDatosCabeza({ ...datosCabeza, raza: e.target.value })
          }
        />
      </section>
      <section>
        <label htmlFor="propietario">Propietario:</label>
        <input
          id="propietario"
          type="text"
          value={datosCabeza.propietario}
          onChange={(e) =>
            setDatosCabeza({ ...datosCabeza, propietario: e.target.value })
          }
        />
      </section>
      <section>
        <label htmlFor="fechaNacimiento">Fecha de Nacimiento:</label>
        <input
          id="fechaNacimiento"
          type="text"
          value={datosCabeza.fechaNacimiento}
          onChange={(e) =>
            setDatosCabeza({ ...datosCabeza, fechaNacimiento: e.target.value })
          }
        />
      </section>
      <section>
        <label htmlFor="ascendencia">Ascendencia:</label>
        <input
          id="ascendencia"
          type="text"
          value={datosCabeza.ascendencia}
          onChange={(e) =>
            setDatosCabeza({ ...datosCabeza, ascendencia: e.target.value })
          }
        />
      </section>
      <section>
        <label htmlFor="destino">Destino:</label>
        <input
          id="destino"
          type="text"
          value={datosCabeza.destino}
          onChange={(e) =>
            setDatosCabeza({ ...datosCabeza, destino: e.target.value })
          }
        />
      </section>
      <section>
        <label htmlFor="dieta">Dieta:</label>
        <input
          id="dieta"
          type="text"
          value={datosCabeza.dieta}
          onChange={(e) =>
            setDatosCabeza({ ...datosCabeza, dieta: e.target.value })
          }
        />
      </section>
      <section>
        <label htmlFor="mejoramientoGenetico">Mejoramiento Genético:</label>
        <input
          id="mejoramientoGenetico"
          type="text"
          value={datosCabeza.mejoramientoGenetico}
          onChange={(e) =>
            setDatosCabeza({
              ...datosCabeza,
              mejoramientoGenetico: e.target.value,
            })
          }
        />
      </section>
      <section>
        <label htmlFor="registroEnfermedades">Registro de Enfermedades:</label>
        <input
          id="registroEnfermedades"
          type="text"
          value={datosCabeza.registroEnfermedades}
          onChange={(e) =>
            setDatosCabeza({
              ...datosCabeza,
              registroEnfermedades: e.target.value,
            })
          }
        />
      </section>
      <section>
        <label htmlFor="arete">Arete:</label>
        <input
          id="arete"
          type="text"
          value={arete}
          onChange={(e) => setArete(e.target.value)}
        />
      </section>
      <button onClick={handleSaveCabeza}>Subir Cabeza</button>
      <section id="message">{message}</section>
    </main>
  );
}

export default App;
