import "./Signin.css";
import {useNavigate} from "react-router-dom";
import {useState,useRef} from "react"
import axios from "axios";

const Signin = () => 
{
    const [passwordValue,setPasswordValue] = useState("");
    const [emailValue,setEmailValue] = useState("");
    const navigate = useNavigate();

    const handleChangeEmail = (e)=> {
        const newValue = e.target.value;
        setEmailValue(newValue);
    }
    const handleChangePassword = (e) => {
        const newValue = e.target.value;
        setPasswordValue(newValue);
    }

    const email = useRef();
    const password = useRef();

    const handleSignup = (e)=>{
        e.preventDefault();
        const Email = email.current.value;
        const Password = password.current.value;

        axios.post("http://localhost:3001/signup", { Email, Password })
        .then((response) => {
            const data = response.data; 
            if (data.message === "User Already Exists") {
                alert("Email Already Exists");
            } else {
                alert("Registration Successful")
                navigate("/");
            }
        })
        .catch((err) => {
            alert("Enter the Details Properly");
        });

    }
    const handleSignin = (e)=>{
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
        <div className="sign">
            <div className="main">
            <input type="checkbox" id="chk" aria-hidden="true" />

            <div className="signup">
                <form method="post" onSubmit={handleSignup}>
                    <label for="chk" aria-hidden="true">Sign up</label>
                    {/* <input type="text" name="text" placeholder="User name" value={userValue} ref={username} onChange={handleChangeEmail} required=""/> */}
                    <input type="email" name="email" placeholder="Email" value={emailValue} ref={email} onChange={handleChangeEmail} required=""/>
                    <input type="password" name="pswd" placeholder="Password" value={passwordValue} ref={password} onChange={handleChangePassword} required="" />
                    <button type="submit" className="signup-btn">Sign up</button>
                </form>
            </div>

            <div className="login" onSubmit={handleSignin}>
                <form method="post">
                    <label for="chk" aria-hidden="true">Login</label>
                    <input type="email" name="email" placeholder="Email" value={emailValue} ref={email} onChange={handleChangeEmail} required=""/>
                    <input type="password" name="pswd" placeholder="Password" value={passwordValue} ref={password} onChange={handleChangePassword} required="" />
                    <button type="submit" className="signup-btn">Login</button>
                </form>
            </div>
        </div>
        </div>
    );
}
export default Signin;