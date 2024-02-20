import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
    const [id, idupdate] = useState('');
    const [password, passwordupdate] = useState('');

    const usenavigate = useNavigate();

    useEffect(()=>{
        sessionStorage.clear();
    }, []);

    const validate = () => {
        let result = true;
        if (id === '' || id === null) {
            result = false;
            toast.warning('Por favor ingresa un ID');
        }
        if (password === '' || password === null) {
            result = false;
            toast.warning('Por favor ingresa una contraseña');
        }
        return result;
    }


    const ProceedLogin = (e) => {
        e.preventDefault();
        if(validate()){
            console.log('Procesando');
            fetch("http://localhost:8000/user/" + id).then((res) => {
                return res.json();
            }).then((resp) => {
                console.log(resp)
                if (Object.keys(resp).length === 0) {
                    toast.error('Por favor ingresa un No.Empleado válido');
                }else{
                    if(resp.password === password){
                        /*2*/
                        toast.success('Exitoso!!!');
                        sessionStorage.setItem('id', id);
                        if (resp.tipo === 'administrador') {
                            usenavigate('/admin');
                        } else if (resp.tipo === 'usuario') {
                            usenavigate('/usuario');
                        } else {
                            toast.error('Tipo de usuario desconocido');
                        }
                    }else{
                        toast.error('Por favor ingresa credenciales correctas');
                    }
                }
            }).catch((err) => {
                toast.error('Inicio de sesión fallido' + err.message);
            });
        }
    }

    return ( 
        <div className="row">
            <div>
                <div className="header">
                    <Link to={'/'} style={{ color: 'white', padding:'1%' }}>  Home  </Link>
                    <Link to={'/registro'} style={{ color: 'white', padding:'1%'}}>  Registrarse  </Link>
                </div>
            </div>
            <div className="offset-lg-3 col-lg-6" style={{ marginTop: '100px' }}>
                <form onSubmit={ProceedLogin}  className="container">
                    <div className="card">
                        <div className="card-header">
                            <h2>Inicio de sesión</h2>
                        </div>
                        <div className="card-body">
                            <div className="form-group">
                                <label>No. Usuario<span className="errmsg">*</span></label>
                                <input value={id} onChange={e => idupdate(e.target.value)} className="form-control"></input>
                            </div>
                            <div className="form-group">
                                <label>Password <span className="errmsg">*</span></label>
                                <input type="password" value={password} onChange={e => passwordupdate(e.target.value)} className="form-control"></input>
                            </div>
                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary">Ingresar</button> | 
                            <Link className="btn btn-success" to={'/registro'}>Nuevo Usuario</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
 
export default Login;