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
        propietario : Text;
        fachaNacimiento : Text;
        ascendencia : Text;
        vacunas : Text;
        certificados : Text;
        mejoramientoGenetico : Text;
        registroEnfermedades : Text;
    };
    
    // Arete de cabeza
    type Arete = Nat;

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
    public shared (msg) func saveCabeza(datosCabeza:DatosCabeza, arete:Arete) : async DatosCabeza {
        let user : Principal = msg.caller;
        let id : Text = Nat.toText(arete);
        let resultCabeza = cabeza.get(user);

        var finalCabeza : Cabeza = switch resultCabeza {
            case(null){
                HashMap.HashMap(0, Text.equal, Text.hash);
            };
            case (?resultCabeza) resultCabeza;
        };


        finalCabeza.put(id, datosCabeza);
        cabeza.put(user, finalCabeza);
        Debug.print("Tu cabeza <<" #id# ">> fue agregada correctamente, <<" # Principal.toText(user) # ">> gracias! :)");
        return datosCabeza;
    };
};
