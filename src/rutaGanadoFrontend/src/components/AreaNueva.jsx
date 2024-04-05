import { useCanister } from "@connect2ic/react";
import React, { useEffect, useState } from "react";
import { rutaGanadoBackend } from "declarations/rutaGanadoBackend";

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
        // Assuming rutaganado_v_backend is defined somewhere and has a function saveCabeza
        rutaGanadoBackend.saveCabeza(datosCabeza, arete)
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
                    onChange={(e) => setDatosCabeza({ ...datosCabeza, raza: e.target.value })}
                />
            </section>
            {/* Other input sections for different attributes */}
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
