import { useState } from "react";
import { Navigate,useNavigate } from "react-router-dom";

function RegisterPage(){

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirectlogin, setRedirectlogin] = useState(false);
    const navigate = useNavigate();
    


    async function register(ev){
        ev.preventDefault();

           const response = await fetch('http://localhost:5000/register',{
                method: 'POST',
                body: JSON.stringify({username,password}),
                headers:{'Content-Type':'application/json'},
            });
       
            if(response.status === 200){
                alert('Registration Succsessful...!');  
                navigate('/login'); 
                setRedirectlogin(true);
            }
            else
            {
                alert('Registration Failed...!');
            }

            if (redirectlogin) {
                //navigate('/login');
            }
       
    }

    return(
       <form className="register" onSubmit={register}> 
            <h1>Register</h1>

            <input type="text" 
                   placeholder="username"
                   value={username}
                   onChange={ev => setUsername(ev.target.value)}/>
            <input type="password" 
                   placeholder="password"
                   value={password}
                   onChange={ev => setPassword(ev.target.value)}/>
            <button>Register</button>
       </form>
    );
}

export default RegisterPage;