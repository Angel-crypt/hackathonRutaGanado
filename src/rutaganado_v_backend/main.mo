import Principal "mo:base/Principal";
import Text "mo:base/Text";
import HashMap "mo:base/HashMap";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";

//Por hacer, arreglar el hashmap de certificados porque no debe de ser hash map, mas bien crear un arreglo para cada vaca y que se guarden los certificados

// Actor
actor rutaGanado {
    // Tipos de datos
    //Usuario
    type User = Principal;

    //Certificados
    type Certificado = Text;
    type certificadosCabeza = HashMap.HashMap<Text, Certificado>;
    var certificados = HashMap.HashMap<User, certificadosCabeza>(0, Principal.equal, Principal.hash);
    // Ingreso de cabeza
    //Datos de ingreso
    type DatosCabeza = {
        raza : Text;
        propietario : Text;
        fechaNacimiento : Text;
        ascendencia : Text;
        destino : Text;
        dieta : Text;
        mejoramientoGenetico : Text; //Agregar categorias
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
    public query ({ caller }) func whoami() : async Principal {
        return caller;
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
    public query (msg) func consultCabeza(arete : Arete) : async ?DatosCabeza {
        let user : Principal = msg.caller;
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
    public query (msg) func consultGanado() : async [(Text, DatosCabeza)] {
        let user : Principal = msg.caller;
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
    public shared func updateDatosGanado(user : User, arete : Arete, datosCabeza : DatosCabeza) : async Text {
        // Recuperar el HashMap asociado al usuario
        let resultCabeza = cabeza.get(user);

        switch resultCabeza {
            case (null) {
                Debug.print("Usuario no encontrado en el HashMap.");
                return "El usuario no existe"; // Indicador de usuario no encontrado
            };
            case (?currentCabeza) {
                // Verificar si el arete existe en el HashMap actual
                let currentDatosCabeza = currentCabeza.get(arete);
                switch currentDatosCabeza {
                    case (null) {
                        Debug.print("Arete no encontrado para este usuario.");
                        return "El arete no existe"; // Indicador de arete no encontrado
                    };
                    case (?existingDatosCabeza) {
                        // Actualizar solo los datos especificados
                        let updatedDatosCabeza = {
                            raza = existingDatosCabeza.raza;
                            propietario = existingDatosCabeza.propietario;
                            fechaNacimiento = existingDatosCabeza.fechaNacimiento;
                            ascendencia = existingDatosCabeza.ascendencia;
                            destino = datosCabeza.destino;
                            dieta = datosCabeza.dieta;
                            mejoramientoGenetico = datosCabeza.mejoramientoGenetico;
                            registroEnfermedades = datosCabeza.registroEnfermedades;
                        };

                        // Actualizar los datos del arete con los nuevos datos proporcionados
                        currentCabeza.put(arete, updatedDatosCabeza);
                        cabeza.put(user, currentCabeza);
                        Debug.print("Datos principales del arete actualizados correctamente para el usuario.");
                        return "Datos principales actualizados correctamente";
                    };
                };
            };
        };
    };

    // Función para agregar certificados
    public shared (msg) func guardarCertificado(certificado : Certificado, arete : Arete) : async Certificado {
        let usuario : Principal = msg.caller;
        let id : Text = arete;

        // Recuperar el hashmap de certificados asociado al usuario
        let resultadoCertificados = certificados.get(usuario);

        // Definir una nueva entrada de hashmap si no existe una para el usuario
        var certificadosFinales : certificadosCabeza = switch resultadoCertificados {
            case (null) {
                HashMap.HashMap(0, Text.equal, Text.hash);
            };
            case (?resultadoCertificados) resultadoCertificados;
        };

        // Agregar el certificado al hashmap
        certificadosFinales.put(id, certificado);
        // Actualizar el hashmap de certificados con la nueva entrada
        certificados.put(usuario, certificadosFinales);
        // Imprimir un mensaje de depuración u realizar cualquier otra acción necesaria
        Debug.print("Certificado <<" #certificado # ">> agregado exitosamente para la vaca <<" # id # ">>");

        // Devolver el certificado añadido
        return certificado;
    };

    // Función para consultar certificados
    public query (msg) func consultarCertificados() : async [(Text, Certificado)] {
        let usuario : Principal = msg.caller;
        let resultado = certificados.get(usuario);

        var certificadosUsuario : certificadosCabeza = switch resultado {
            case (null) {
                HashMap.HashMap<Text, Certificado>(0, Text.equal, Text.hash);
            };
            case (?resultado) resultado;
        };

        // Convertir las entradas del hashmap en una secuencia
        let entradasCertificados = Iter.toArray<(Text, Certificado)>(certificadosUsuario.entries());

        return entradasCertificados;
    };

};
