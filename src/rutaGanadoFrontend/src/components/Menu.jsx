
import {BrowserRouter, Route, Link, Routes} from 'react-router-dom';
import Login from "./Bienvenida";
import Areas from "./Areas";
import Alumnos from "./Alumnos";

const Menu = () => {
  
  return (
        
    <BrowserRouter>
    
        <Link to='/' className="navbar-brand">AjoloTics</Link>
        <Link to='/areas' className="dropdown-item" >Cabeza</Link>
        <Link to='/alumnos' className="dropdown-item" >Ganado</Link>

        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/areas" element={<Areas />} />
            <Route path="/alumnos" element={<Alumnos />} />
        </Routes>
    </BrowserRouter>

  )
}



export default Menu

