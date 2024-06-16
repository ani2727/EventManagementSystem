import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./Signin.css";

const Signin = () => {
    const navigate = useNavigate();
    const User = useRef();
    const Password = useRef();
    const Id = useRef();
    const Users = useRef();
    const Passwords = useRef();
    const Dept = useRef();

    const defaultImageUrl = 'https://res.cloudinary.com/dkdslxqqx/image/upload/v1717658764/iwlasfaj6duzq9qw55hy.webp';

    const [isPopupOpen, setPopupOpen] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [popupImage, setPopupImage] = useState(defaultImageUrl);
    const [header,setHeader] = useState('');

    const openPopup = (head,message, imageUrl = defaultImageUrl) => {
        setPopupMessage(message);
        setPopupImage(imageUrl);
        setHeader(head)
        setPopupOpen(true);
    }

    const closePopup = () => {
        setPopupOpen(false);
        navigate('/');
    }

    const handleSignup = async (e) => {
        e.preventDefault();

        const email = User.current.value;
        const password = Password.current.value;
        const studentId = Id.current.value;
        const dept = Dept.current.value;
        if (!email || !password || !studentId || !dept) {
            alert("Please fill all the details properly");
        } else {
            try {
                const result = await axios.post("http://localhost:3001/auth/signup", { email, password, studentId, dept, imageUrl: defaultImageUrl });
                if (result.data === "UserExists") {
                    openPopup("OOPS!","UserName Exists. Try again",'https://png.pngtree.com/png-vector/20221215/ourmid/pngtree-wrong-icon-png-image_6525689.png')
                } else {
                    localStorage.setItem('userInfo', JSON.stringify(result.data));
                    openPopup('Thank You','Your details have been successfully submitted. Thanks', 'https://res.cloudinary.com/dkdslxqqx/image/upload/v1718458077/404-tick_e51zjo.png');
                }
            } catch (err) {
                alert(err);
            }
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault();

        const email = Users.current.value;
        const password = Passwords.current.value;

        try {
            const res = await axios.post("http://localhost:3001/auth/signin", { email, password });
            localStorage.setItem('userInfo', JSON.stringify(res.data));
            openPopup("Thank You",'Welcome back! You have successfully signed in.', 'https://res.cloudinary.com/dkdslxqqx/image/upload/v1718458077/404-tick_e51zjo.png');
        } catch (err) {
            openPopup("OOPS!","Invalid Login",'https://png.pngtree.com/png-vector/20221215/ourmid/pngtree-wrong-icon-png-image_6525689.png')
        }
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
        <>
            {isPopupOpen ? (
                <div className='popup-container'>
                    <div className="popup open-popup">
                        <img src={popupImage} alt='Success' />
                        <h2>{header}</h2>
                        <p>{popupMessage}</p>
                        <button type='button' className="popup-btn" onClick={closePopup}>OK</button>
                    </div>
                </div>
            ) : (
                <div className="container" id="container">
                    <div className="form-container sign-up">
                        <form onSubmit={handleSignup}>
                            <h1>Create Account</h1>
                            <input ref={User} type="text" placeholder="Username" />
                            <input ref={Id} type="text" placeholder="Student Id" />
                            <input ref={Password} type="password" placeholder="Password" />
                            <input ref={Dept} type="text" placeholder="Department: PUC1, PUC2, CSE..." />
                            <button type="submit">Sign Up</button>
                        </form>
                    </div>
                    <div className="form-container sign-in">
                        <form onSubmit={handleLogin}>
                            <h1>Sign In</h1>
                            <input ref={Users} type="text" placeholder="Username" />
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
            )}
        </>
    );
};

export default Signin;
