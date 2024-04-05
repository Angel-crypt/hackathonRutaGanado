import Principal "mo:base/Principal";
import Text "mo:base/Text";
import HashMap "mo:base/HashMap";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";
import Bool "mo:base/Bool";
// Importaciones

// Actor
actor rutaGanado {
    // Tipos de datos
    //Usuario
    type User = Principal;

    // Ingreso de cabeza
    //Datos de ingreso
    type DatosCabeza = {
        raza : Text;
        propietario : Text;
        fachaNacimiento : Text;
        ascendencia : Text;
        destino : Text;
        dieta : Text;
        vacunas : Text;
        certificados : Text;
        mejoramientoGenetico : Text;
        registroEnfermedades : Text;
    };

    // Arete de cabeza
    type Arete = Text;

    // Hashmap de cabeza
    type Cabeza = HashMap.HashMap<Text, DatosCabeza>;

    // Inicializar el arreglo
    var cabeza = HashMap.HashMap<User, Cabeza>(0, Principal.equal, Principal.hash);
    // Funciones
    // Función para obtener el usuario que realiza la llamada
    public shared (msg) func getUser() : async Principal {
        let currentUser = msg.caller;
        return currentUser;
    };

    // Funcion para agregar
    public shared (msg) func saveCabeza(datosCabeza : DatosCabeza, arete : Arete) : async DatosCabeza {
        let user : Principal = msg.caller;
        let id : Text = arete;
        let resultCabeza = cabeza.get(user);

        var finalCabeza : Cabeza = switch resultCabeza {
            case (null) {
                HashMap.HashMap(0, Text.equal, Text.hash);
            };
            case (?resultCabeza) resultCabeza;
        };

        finalCabeza.put(id, datosCabeza);
        cabeza.put(user, finalCabeza);
        Debug.print("Tu cabeza <<" #id # ">> fue agregada correctamente, <<" # Principal.toText(user) # ">> gracias! :)");
        return datosCabeza;
    };

    // Funcion para consultar especificacmente
    public query func consultCabeza(user : User, arete : Arete) : async ?DatosCabeza {
        let resultCabeza = cabeza.get(user);

        switch resultCabeza {
            case (?cabeza) {
                return cabeza.get(arete);
            };
            case (null) {
                return null;
            };
        };
    };

    // Funcion para consultar el ganado
    public query func consultGanado(user : User) : async [(Text, DatosCabeza)] {
        let result = cabeza.get(user);

        var resultsGanado : Cabeza = switch result {
            case (null) {
                HashMap.HashMap<Text, DatosCabeza>(0, Text.equal, Text.hash);
            };
            case (?result) result;
        };

        // Convertir las entradas del mapa en una secuencia
        let GanadoEntries = Iter.toArray<(Text, DatosCabeza)>(resultsGanado.entries());

        return GanadoEntries;
    };

    // Función para actualizar datos específicos en DatosGanado en el HashMap
public shared func updateDatosGanado(user: User, arete: Arete, newData: DatosCabeza): async Bool {
    // Recueperar el HashMap asocidado al usuario
    let resultCabeza =  cabeza.get(user);

    switch resultCabeza {
        case (?Cabeza) {
            // Verficiar si el arete existe en el HashMap
            if (Cabeza.get(arete) != null) {
                // Actualizar los datos de la cabeza
                Cabeza.put(arete, newData);
                cabeza.put(user, Cabeza);
                Debug.print("Datos del ganado actualizados para el arete " # arete);
                return true; // Indicador de éxito
            } else {
                Debug.print("Arete " # arete # " no encontrado en el HashMap.");
                return false; // Indicador de arete no encontrado
            }
        };
        case (null) {
            Debug.print("Usuario no encontrado en el HashMap.");
            return false; // Indicador de usuario no encontrado
        };
    };
};

};