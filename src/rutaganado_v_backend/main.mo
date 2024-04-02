import Text "mo:base/Text";
import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Hash "mo:base/Hash";
import Nat "mo:base/Nat";

actor appTareas {
  type Task = {
    userPrincipal : Principal;
    nameTarea : Text;
    description : Text;
  };

  var tasks = HashMap.HashMap<Nat, Task>(1, Nat.equal, Hash.hash);

  stable var taskIdCount : Nat = 0;

  public func createTask (task : Task) : async () {
    //1. Autor

    //2. Preparar los datos
    let id : Nat = taskIdCount;
    taskIdCount+=1;

    //3. Crear tarea
    tasks.put(id,task);

    //4. Return confirmacion
    ();
  };

  public query func readTask (id : Nat) : async ?Task {
    //1, Autor

    //2. Pedir datos
    let taskRes : ?Task = tasks.get(id);

    //3. Return la tarea requerida o Null
    return taskRes;
  };

  public func updateTask (task : Task, id: Nat) : async Text {
    //1. Autor

    //2. Pedir datos
    let taskRes : ?Task = tasks.get(id);

    //3. Validar si existe
    
    switch (taskRes) {
      case (null){
        return "Estas tratando de actualizar una tarea que no existe";
      };
      case (?currentTask){
    //4. Actualizar los nuevos datos de Tarea
      let updatedTask : Task = {
        userPrincipal = currentTask.userPrincipal;
        nameTarea = task.nameTarea;
        description = task.description;
        };

    //5. Actualizar tarea
      tasks.put(id, updatedTask);

    //6. Return suceso
      return "Actualizacion correcta!";
      };
    };
  };

  public func deleteTask (id: Nat) : async Text {
    //1. Autor

    //2. Pedir datos
    let taskRes : ?Task = tasks.get(id);

    //3. Validar si existe
    
    switch (taskRes) {
      case (null){
        return "Estas tratando de eliminar una tarea que no existe";
      };
      case (?currentTask){
    //4. Eliminar tarea
        ignore tasks.remove(id);

    //5. Return suceso
      return "Eliminacion correcta!";
      };
    };
  };
};