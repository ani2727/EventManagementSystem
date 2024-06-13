// import React, {useState,useRef} from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Signup = () => 
// {
//     const [Emails,setEmail] = useState('');
//     const [Passwords,setPassword] = useState('');
//     const [StudentIds,setStudentId] = useState('');
//     const [Depts,setDept] = useState('');

//     const imageUrl = 'https://res.cloudinary.com/dkdslxqqx/image/upload/v1717658764/iwlasfaj6duzq9qw55hy.webp';

//     const Email = useRef();
//     const Password = useRef();
//     const StudentId = useRef();
//     const Dept = useRef();
//     const navigate = useNavigate();

    
//     return (
//         <div class="login-container">
//                 <h2>Login</h2>
//                 <form id="login-form">
//                     <div className="form-group">
//                         <input type="text" ref={Email} value={Emails} onChange={e=>setEmail(e.target.value)} placeholder="Username" required />
//                     </div>
//                     <div className="form-group">
//                         <input type="password" ref={Password} value={Passwords} onChange={e=>setPassword(e.target.value)} placeholder="Password" required />
//                     </div>
//                     <div className="form-group">
//                         <input type="text" ref={StudentId} value={StudentIds} onChange={e=>setStudentId(e.target.value)} placeholder="Student Id" required />
//                     </div>
//                     <div className="form-group">
//                         <input type="text" ref={Dept} value={Depts} onChange={e=>setDept(e.target.value)} placeholder="Department" required />
//                     </div>
//                     <button  type="submit">SignUp</button>
//                 </form>
//             </div>
//     )
// }

// export default Signup;