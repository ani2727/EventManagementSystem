import "./Signin.css";
import {useNavigate} from "react-router-dom";
import {useState, useRef} from "react"
import axios from "axios";

const Signin = () => 
{
    const [Emails,setEmail] = useState('');
    const [Passwords,setPassword] = useState('');

    const navigate = useNavigate();

    const Email = useRef();
    const Password = useRef();

    const handleLogin = async(e)=>{
        e.preventDefault();

        const email = Email.current.value;
        const password = Password.current.value;

        await axios.post("http://localhost:3001/auth/signin",{email,password})
        .then((res)=> {
            console.log(res);
            localStorage.setItem('userInfo',JSON.stringify(res.data));
            navigate("/")
        })
        .catch((err)=>{
            alert("Invalid Login");
        });
    }


    return (

            <div class="login-container">
                <h2>Login</h2>
                <form id="login-form">
                    <div class="form-group">
                        <input type="text" ref={Email} value={Emails} onChange={e=>setEmail(e.target.value)} placeholder="username" required />
                    </div>
                    <div class="form-group">
                        <input type="password" ref={Password} value={Passwords} onChange={e=>setPassword(e.target.value)} placeholder="Password" required />
                    </div>
                    
                    <button onClick={handleLogin} >Login</button>
                </form>
            </div>
    );
}
export default Signin;