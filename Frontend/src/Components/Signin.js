import "./Signin.css";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import axios from "axios";

const Signin = () => {
    const navigate = useNavigate();
    const User = useRef();
    const Password = useRef();
    const Id = useRef();
    const Users = useRef();
    const Passwords = useRef();
    const Dept = useRef();

    const imageUrl = 'https://res.cloudinary.com/dkdslxqqx/image/upload/v1717658764/iwlasfaj6duzq9qw55hy.webp';

    const handleSignup = async(e)=>{
        e.preventDefault();
        
        const email = User.current.value;
        const password = Password.current.value;
        const studentId = Id.current.value;
        const dept = Dept.current.value;

        try{
            const result = await axios.post("http://localhost:3001/auth/signup", { email,password,studentId,dept,imageUrl })
            if(result.data === "UserExists") alert("User already exists");
            else {
                localStorage.setItem('userInfo',JSON.stringify(result.data));
                alert("Registered Successfully");
                navigate("/")
            }
        }
        catch(err) {
            console.log(err);
        }

    }

    const handleLogin = async (e) => {
        e.preventDefault();

        const email = Users.current.value;
        const password = Passwords.current.value;

        await axios.post("http://localhost:3001/auth/signin", { email, password })
            .then((res) => {
                localStorage.setItem('userInfo', JSON.stringify(res.data));
                alert("Welcome");
                navigate('/');
            })
            .catch((err) => {
                alert("Invalid Login");
            });
    };

    const handleRegister = () => {
        const container = document.getElementById('container');
        container.classList.add("active");
    };

    const handleLogins = () => {
        const container = document.getElementById('container');
        container.classList.remove("active");
    };

    return (
        <div className="container" id="container">
            <div className="form-container sign-up">
                <form onSubmit={handleSignup}>
                    <h1>Create Account</h1>
                    <input ref={User} type="text" placeholder="Username" />
                    <input ref={Id} type="text" placeholder="Student Id" />
                    <input ref={Password} type="password" placeholder="Password" />
                    <input ref={Dept} type="text" placeholder="Department:PUC1,PUC2,CSE..." />
                    <button type="submit">Sign Up</button>
                </form>
            </div>
            <div className="form-container sign-in">
                <form onSubmit={handleLogin}>
                    <h1>Sign In</h1>
                    {/* <div className="social-icons">
                        <a href="#" className="icon"><i className="fa-brands fa-google-plus-g"></i></a>
                        <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
                        <a href="#" className="icon"><i className="fa-brands fa-github"></i></a>
                        <a href="#" className="icon"><i className="fa-brands fa-linkedin-in"></i></a>
                    </div>
                    <span>or use your email password</span> */}
                    <input ref={Users} type="text" placeholder="Username"  />
                    <input ref={Passwords} type="password" placeholder="Password" />
                    <button type="submit">Sign In</button>
                </form>
            </div>
            <div className="toggle-container">
                <div className="toggle">
                    <div className="toggle-panel toggle-left">
                        <h1>Welcome Back!</h1>
                        <p>Enter your personal details to use all of site features</p>
                        <button className="hidden" id="login" onClick={handleLogins}>Sign In</button>
                    </div>
                    <div className="toggle-panel toggle-right">
                        <h1>Hello, Friend!</h1>
                        <p>Register with your personal details to use all of site features</p>
                        <button className="hidden" id="register" onClick={handleRegister}>Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signin;
