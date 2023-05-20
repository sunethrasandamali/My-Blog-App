import {Link, json,useNavigate} from "react-router-dom";
import {useContext, useEffect, useState } from "react";
import {UserContext} from "./UserContext.js";


function BlogHeader(){

  const [userInfo,setUserInfo] = useState();
  const navigate = useNavigate();

    useEffect(()=>{
      const storedToken = localStorage.getItem("token");
      const storedUsername= localStorage.getItem("username");
      console.log(storedToken);
      console.log(storedUsername);
      setUserInfo(storedUsername);
      
      fetch('http://localhost:3000/profile',{
          credentials: 'include',
          method: 'POST',
          credentials: 'include',
        }).then(response=>{
          response.json().then(userInfo => {
            setUserInfo(userInfo);
        });
      });
    }, []);

    function logout(){
        fetch('http://localhost:3000/logout',{
          credentials: 'include',
          method: 'POST'
        });
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        
        setUserInfo(null);
        navigate('/login'); 
    }

    const username = userInfo;

    return(
        <header>
          <Link to='/' className='logo'>My Blog App</Link>
          <nav>
            {userInfo && (
              <>
                <span>Hello, {username}...! </span>
                <Link to="/createnewpost">Create New Post</Link>
                <a onClick={logout}>Logout</a>
              </>
            )}

            {!userInfo && (
              <>
                <Link to='/login'>Login</Link>
                <Link to='/register'>Register</Link>
              </>
            )}

          </nav>
        </header>
    );
}

export default BlogHeader