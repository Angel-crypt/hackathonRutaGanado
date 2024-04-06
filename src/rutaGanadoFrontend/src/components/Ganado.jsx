import React, { useEffect, useState } from "react";
import { useCanister } from "@connect2ic/react";
import { actor } from "../../../declarations/rutaGanadoBackend";

function ConsultarCabeza() {

  async function handleConsultarCabeza(event) {
    event.preventDefault();
    const arete = document.getElementById("areteInput").value; // Asegúrate de que el input tenga este ID
    try {
      const datosCabeza = await actor.consultarCabeza(arete);
      if (datosCabeza) {
        console.log("Datos de la Cabeza:", datosCabeza);
        // Actualiza el estado o el DOM aquí para mostrar los datos
      } else {
        console.error("No se encontraron datos o no tienes permisos para verlos.");
      }
    } catch (error) {
      console.error("Error al consultar los datos:", error);
    }
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
