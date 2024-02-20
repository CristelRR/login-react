import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
    const usenavigate=useNavigate();

    useEffect(()=>{
        let id = sessionStorage.getItem('id');
        if(id === '' || id === null){
            usenavigate('/inicio');
        }
    });
    
    return ( 
        <div>
            <div className="header">
                <Link to={'/'} style={{ color: 'white', padding:'1%' }}>Home</Link>
                <Link to={'/inicio'} style={{ color: 'white', padding:'1%'}}>Iniciar sesión</Link>
            </div>
            <h1 className="text-center">Bienvenidos!!!</h1>
        </div>
     );
}
 
export default Home;