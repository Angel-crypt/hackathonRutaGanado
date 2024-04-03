// Importaciones de módulos necesarios
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Principal "mo:base/Principal";
import Debug "mo:base/Debug";
import Nat "mo:base/Nat";
import Iter "mo:base/Iter";

// Definición del actor
actor Activitiesganado {

  // Definición de tipos de datos
  type User = Principal;

  type DatosGanado = {
    numId : Nat;
    peso : Nat;
    raza: Text;
    sexo: Text;
  };

  type Info = {
    nacimiento: Text;
    estado_salud : Text;
    description : Text;
  };

  type Ganado = HashMap.HashMap<Text, Info>;

  // Inicialización 
  var ganado = HashMap.HashMap<User, Ganado>(0, Principal.equal, Principal.hash);

  // Función para obtener el usuario que realiza la llamada
  public shared(msg) func getUser() : async Principal {
    let currentUser = msg.caller;
    return currentUser;
  };

  // Función para agregar
  public shared (msg) func saveCabeza(datosGanado: DatosGanado, info: Info) : async Info {
    let user : Principal = msg.caller;
    let cabeza : Text = Nat.toText(datosGanado.peso) #"/"# datosGanado.raza #"/"# datosGanado.sexo #"/"# Nat.toText(datosGanado.numId);
    let resultGanado = ganado.get(user);

    var finalGanado : Ganado = switch resultGanado {
      case (null) {
        HashMap.HashMap(0, Text.equal, Text.hash);
      };
      case (?resultGanado) resultGanado;
    };

    finalGanado.put(cabeza, info);
    ganado.put(user, finalGanado);

    Debug.print("Tu actividad fue agregada correctamente, <<" # Principal.toText(user) # ">> gracias! :)");
    return info;
  };

  // Función para obtener la información de una cabeza especifica
  public shared func getCabeza(user: Principal, identificador: Text) : async ?Info {
    let resultGanado = ganado.get(user);

    switch resultGanado {
      case (?Ganado) {
        Ganado.get(identificador);
      };
      case (null) null;
    }
  };

  // Función para obtener todas las cabezas del ganado
  public query func getGanado(user : User) : async [(Text,Info)] {
    let result = ganado.get(user);

    var resultsGanado : Ganado = switch result {
    case (null) {
      HashMap.HashMap<Text, Info>(0, Text.equal, Text.hash);
    };
    case (?result) result;
  };

  // Convertir las entradas del mapa en una secuencia
  let GanadoEntries = Iter.toArray<(Text, Info)>(resultsGanado.entries());

  return GanadoEntries;
  };


  // Función para actualizar la información de una cabeza en un identificador específico
  public shared (_msg) func updateCabeza(user: Principal, identificador: Text, newInfo: Info) : async Bool {
    let resultGanado = ganado.get(user);

    switch resultGanado {
      case (?Ganado) {
        if (Ganado.get(identificador) != null) {
          Ganado.put(identificador, newInfo);
          ganado.put(user, Ganado);
          Debug.print("Actividad actualizada correctamente");
          true;
        } else {
          Debug.print("La actividad no existe para el identificador proporcionad0");
          false;
        };
      };
      case (null) {
        Debug.print("No hay ganado registrado para este usuario");
        false;
      };
    }
  };

  // Función para eliminar una cabeza de un identificador específico
  public shared (_msg) func deleteCabeza(user: Principal, identificador: Text) : async Bool {
    let resultGanado = ganado.get(user);

    switch resultGanado {
      case (?Ganado) {
        if (Ganado.get(identificador) != null) {
          Ganado.delete(identificador);
          ganado.put(user, Ganado);
          Debug.print("Cabeza eliminada correctamente");
          true;
        } else {
          Debug.print("La cabeza no existe para la identificador proporcionada");
          false;
        };
      };
      case (null) {
        Debug.print("No hay cabezas registradas para este usuario");
        false;
      };
    }
  };
};