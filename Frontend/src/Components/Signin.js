import "./Signin.css";
import {useNavigate} from "react-router-dom";
import {useState,useRef} from "react"
import axios from "axios";

const Signin = () => 
{
    const [Email,setEmail] = useState('');
    const [Password,setPassword] = useState('');

    const navigate = useNavigate();

    const email = useRef();
    const password = useRef();

    // const handleSignup = (e)=>{
    //     e.preventDefault();
    //     const Email = email.current.value;
    //     const Password = password.current.value;

    //     axios.post("http://localhost:3001/signup", { Email, Password })
    //     .then((response) => {
    //         const data = response.data; 
    //         if (data.message === "User Already Exists") {
    //             alert("Email Already Exists");
    //         } else {
    //             alert("Registration Successful")
    //             navigate("/");
    //         }
    //     })
    //     .catch((err) => {
    //         alert("Enter the Details Properly");
    //     });

    // }
    const handleLogin = (e)=>{
        e.preventDefault();
        const Email = email.current.value;
        const Password = password.current.value;

        axios.post("http://localhost:3001/signin",{Email,Password})
        .then((res)=> {
            const data = res.data;
            if(data.message === "Success") 
            {
                alert("Hey Welcome");
                navigate("/");
                
            }
            else alert("You haven't Registered to Login")
            
            
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
                    <input type="text" ref={email} value={Email} onChange={e=>setEmail(e.target.value)} placeholder="Username" required />
                </div>
                <div class="form-group">
                    <input type="password" ref={password} value={Password} onChange={e=>setPassword(e.target.value)} placeholder="Password" required />
                </div>
                <button onClick={handleLogin} type="submit">Login</button>
                </form>
            </div>
    );
}
export default Signin;