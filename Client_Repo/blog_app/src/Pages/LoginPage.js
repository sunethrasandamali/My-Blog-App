import { createContext, useContext, useState } from "react";
import { Navigate,useNavigate } from "react-router-dom";


import {UserContext} from "../UserContext";

function LoginPage(){

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const navigate = useNavigate();
    // const {setUserInfo} = useContext(UserContext);
    const [userInfo, setUserInfo] = useState('');

    async function login(ev){
        ev.preventDefault();

            const response = await fetch('http://localhost:5000/login',{
                method: 'POST',
                body: JSON.stringify({username,password}),
                headers:{'Content-Type':'application/json'},
                credentials: 'include',
            });
       
            if(response.ok){
                response.json().then(userInfo => {
                 setUserInfo(userInfo);
                 localStorage.setItem("token", userInfo.id);
                 localStorage.setItem("username", userInfo.username);
                 console.log(userInfo);
                 
                    
                });
                setRedirect(true);
                  
            }
            else
            {
                alert('Wrong Credintials...! Try Again');
            }

            if (redirect) {
                navigate('/');
                window.location.reload();
            }
    }

    return(
       <form className="login" onSubmit={login}>
            <h1>Login</h1>
            <input type="text" 
                   placeholder="username"
                   value={username}
                   onChange={ev => setUsername(ev.target.value)}/>

            <input type="password" 
                   placeholder="password"
                   value={password}
                   onChange={ev => setPassword(ev.target.value)}/>
                   
            <button>Login</button>
       </form>
    );
}

export default LoginPage;