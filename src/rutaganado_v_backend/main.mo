import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import HashMap "mo:base/HashMap";
import Debug "mo:base/Debug";
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
        propietari0 : Text;
        nacimiento : Nat;
        ascendencia : Text;
    };
    // Arete de ganado
    type Arete = Nat;

    // Hashmap de ganado
    type Ganado = HashMap.HashMap<Text, DatosCabeza>;

    // Inicializar el arreglo
    var ganado = HashMap.HashMap<User, Ganado>(0, Principal.equal, Principal.hash);
    // Funciones 
    // Función para obtener el usuario que realiza la llamada
    public shared (msg) func getUser() : async Principal {
        let currentUser = msg.caller;
        return currentUser;
    };

    // Funcion para agregar
    public shared (msg) func saveCabeza(datosCabeza:DatosCabeza, arete:Arete) : async DatosCabeza {
        let user : Principal = msg.caller;
        let cabeza : Text = Nat.toText(arete);
        let resultGanado = ganado.get(user);

        var finalGanado : Ganado = switch resultGanado {
            case(null){
                HashMap.HashMap(0, Text.equal, Text.hash);
            };
            case (?resultGanado) resultGanado;
        };

        finalGanado.put(cabeza, datosCabeza);
        ganado.put(user, finalGanado);
        Debug.print("Tu cabeza <<" #cabeza# ">> fue agregada correctamente, <<" # Principal.toText(user) # ">> gracias! :)");
        return datosCabeza;
    };
};
