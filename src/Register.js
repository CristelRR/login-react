import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
    const [id, idchange] = useState("");
    const [nombre, nombrechange] = useState("");
    const [password, passwordchange] = useState("");
    const [email, emailchange] = useState("");
    const [tipo, tipochange] = useState("");
    /*3*/
    const navigate=useNavigate();

    /*4*/
    const IsValidate = () => {
        let isproceed=true;

        let errormessage = 'Please enter the value in ';

        if (id === null || id === '') {
            isproceed = false;
            errormessage += ' id';
        }
        if (nombre === null || nombre === '') {
            isproceed = false;
            errormessage += ' nombre';
        }
        if (password === null || password === '') {
            isproceed = false;
            errormessage += ' Password';
        }
        if (email === null || email === '') {
            isproceed = false;
            errormessage += ' Email';
        }

        if(!isproceed){
            toast.warning(errormessage);
        }/*5*/else{
            if(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)){

            }else{
                isproceed = false;
                toast.warning('Por favor ingresa un correo válido')
            }
        }
        return isproceed;

    }

    const handlesubmit=(e)=>{
        e.preventDefault();
        /*2*/
        let regobj = {id, nombre, password, email, tipo};
        /*4*/
        if (IsValidate()) {
            //console.log(regobj);
            fetch("http://localhost:8000/user/", {
                method: "POST",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(regobj)
            }).then((res) => {
                toast.success('Registro exitoso!!!.')
                navigate('/inicio');
            }).catch((err) => {
                toast.error('Registro fallido :' + err.message);
            });
        }
    }

    return ( 
        <div>
            <div className="header">
                    <Link to={'/'} style={{ color: 'white', padding:'1%' }}>  Home  </Link>
                    <Link to={'/inicio'} style={{ color: 'white', padding:'1%'}}>  Iniciar Sesion  </Link>
            </div>
            <div className="offset-lg-3 col-lg-6">
                <form className="container" onSubmit={handlesubmit}>
                    <div className="card">
                        <div className="card-header">
                            <div>
                                <h1>Registrar Usuario</h1>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>No. Empleado: <span className="errmsg">*</span></label>
                                        <input className="form-control" value={id} onChange={e=>idchange(e.target.value)} required></input>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Nombre: <span className="errmsg">*</span></label>
                                        <input className="form-control" value={nombre} onChange={e=>nombrechange(e.target.value)} required></input>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Correo: <span className="errmsg">*</span></label>
                                        <input className="form-control" value={email} onChange={e=>emailchange(e.target.value)} required></input>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Tipo: <span className="errmsg">*</span></label>
                                        <select className="form-control" value={tipo} onChange={e=>tipochange(e.target.value)} required>
                                            <option value="usuario">Usuario</option>
                                            <option value="administrador">Administrador</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Contraseña: <span className="errmsg">*</span></label>
                                        <input className="form-control" type="password" value={password} onChange={e=>passwordchange(e.target.value)} required></input>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary">Registrar</button>
                        </div>
                    </div>
                </form>

            </div>
        </div>
     );
}
 
export default Register;