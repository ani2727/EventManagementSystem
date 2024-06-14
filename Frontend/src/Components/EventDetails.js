// import { useLocation,useNavigate } from "react-router-dom"
// import axios from "axios";
// import "./EventDetails.css"
// import {useState, useEffect } from "react";
// import getUserInfo from "../utils/userInfo"

// const EventDetails = () => 
// {
//     const location = useLocation();
//     const posterData = location.state.posterData;
//     const clubData = location.state.clubData;
//     const [members,setMembers] = useState([]);
//     const navigate = useNavigate();

//     const userData = getUserInfo();

//     const handleRegister = async() => 
//     {
//         const email = userData.userName+"@rgukt.ac.in"
//         const clubName = posterData.clubName;
//         const eventName = posterData.eventName;
//         if(email.length > 0 && email.endsWith("@rgukt.ac.in"))
//         {
//             try{
//                 const res = await axios.post('http://localhost:3001/register/events',{email,eventName,clubName})
//                 if(res.data.message === "Success") {
//                     alert("Registration Successfull!");
//                     if(clubData.clubName === 'DeptClub') navigate('/deptclub',{state:{clubData:clubData}})
//                     else navigate('/club',{state:{clubData:clubData}})
//                 }
//                 else {
//                     console.log(res.data.message)
//                     alert("You are already Registered for this Event")
//                 }
//             }
//             catch(err) {
//                 console.log(err);
//             }
//         }
//         else alert("Please Enter your Domain Email Properly")
//     }

//     useEffect(() => 
//     {
//         let isMounted = true; 
//         const fetchData = async () => {
//             try {
//                 const clubName = posterData.clubName;
//                 const eventName = posterData.eventName;
//                 const res = await axios.get(`http://localhost:3001/register/users?clubName=${clubName}&eventName=${eventName}`);
//                 if (isMounted) {
//                     setMembers(res.data.members);
//                 }
//             } catch (err) {
//                 console.log(err);
//             }
//         };
    
//         fetchData();

//         return () => {
//             isMounted = false;
//         };
    
//     }, [posterData.clubName,posterData.eventName]);
    
    
//     return (
//         <div className="event-details-container">
            
//             <div className="event-details">
//                 <ul>
//                     <h1>{posterData.eventName}-{posterData.taline}</h1>
//                     <li>clubName:{posterData.clubName}</li>
//                     <li>Venue:{posterData.venue}</li>
//                     <li>Date:{posterData.date}</li>
//                     <li>Time:{posterData.time}</li>
//                     <li>Student Co-ordinator:{posterData.studentCoordinator}</li>
//                     <li>Student Co-ordinator Email:{posterData.studentCoordinatorEmail}</li>
//                     <li>Faculty Co-ordinator:{posterData.facultyCoordinator}</li>
//                     <li>Faculty Co-ordinator:{posterData.facultyCoordinatorEmail}</li>
//                     <li>Agenda:{posterData.description}</li>

//                 </ul>
                
//                 <button onClick={handleRegister}>Register</button>
//             </div>
//             <div className="registered-members">
//                 <h3>Registered Members</h3>
//                 {members.length > 0 ?
//                     (
//                         <ul>
//                             {members.map((member,index)=> (
//                                 <li key={index} style={{listStyleType:'decimal'}}>{member.email}</li>
//                             ))}
//                         </ul>
//                     ):
//                     (
//                         <p>No Members Registered For this event</p>
//                     )
//                 }

//             </div>
            
//         </div>
//     )
// }

// export default EventDetails;


import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./EventDetails.css";
import { useState, useEffect } from "react";
import getUserInfo from "../utils/userInfo";

const EventDetails = () => {
  const location = useLocation();
  const posterData = location.state.posterData;
  const clubData = location.state.clubData;
  const [members, setMembers] = useState([]);
  const navigate = useNavigate();

  const userData = getUserInfo();

  const handleRegister = async () => {
    const email = userData.userName + "@rgukt.ac.in";
    const clubName = posterData.clubName;
    const eventName = posterData.eventName;
    if (email.length > 0 && email.endsWith("@rgukt.ac.in")) {
      try {
        const res = await axios.post("http://localhost:3001/register/events", {
          email,
          eventName,
          clubName,
        });
        if (res.data.message === "Success") {
          alert("Registration Successful!");
          if (clubData.clubName === "DeptClub") navigate("/deptclub", { state: { clubData: clubData } });
          else navigate("/club", { state: { clubData: clubData } });
        } else {
          console.log(res.data.message);
          alert("You are already Registered for this Event");
        }
      } catch (err) {
        console.log(err);
      }
    } else alert("Please Enter your Domain Email Properly");
  };

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const clubName = posterData.clubName;
        const eventName = posterData.eventName;
        const res = await axios.get(`http://localhost:3001/register/users?clubName=${clubName}&eventName=${eventName}`);
        if (isMounted) {
          setMembers(res.data.members);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [posterData.clubName, posterData.eventName]);

  return (
    <div className="event-details-container">
      <div className="event-details">
        <h1 className="event-title">{posterData.eventName}</h1>
        <div className="event-info">
          <div className="info-item">
            <span className="info-label">Club Name:</span>
            <span className="info-value">{posterData.clubName}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Venue:</span>
            <span className="info-value">{posterData.venue}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Date:</span>
            <span className="info-value">{posterData.date}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Time:</span>
            <span className="info-value">{posterData.time}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Student Coordinator:</span>
            <span className="info-value">{posterData.studentCoordinator}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Student Coordinator Email:</span>
            <span className="info-value">{posterData.studentCoordinatorEmail}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Faculty Coordinator:</span>
            <span className="info-value">{posterData.facultyCoordinator}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Faculty Coordinator Email:</span>
            <span className="info-value">{posterData.facultyCoordinatorEmail}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Agenda:</span>
            <span className="info-value">{posterData.description}</span>
          </div>
        </div>
        <button onClick={handleRegister} className="register-btn">
          Register
        </button>
      </div>
      <div className="registered-members">
        <h3>Registered Members</h3>
        {members.length > 0 ? (
          <ul>
            {members.map((member, index) => (
              <li key={index} style={{ listStyleType: "decimal" }} className="member-email">
                {member.email}
              </li>
            ))}
          </ul>
        ) : (
          <p>No Members Registered For this event</p>
        )}
      </div>
    </div>
  );
};

export default EventDetails;
