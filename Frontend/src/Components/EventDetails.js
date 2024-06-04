import { useLocation,useNavigate } from "react-router-dom"
import axios from "axios";
import "./EventDetails.css"
import { useRef, useState } from "react";

const EventDetails = () => 
{
    const location = useLocation();
    const [Email,setEmail] = useState('');
    const posterData = location.state.posterData;
    const navigate = useNavigate();

    const email = useRef();

    const handleRegister = async() => 
    {
        const Email = email.current.value;
        const ClubName = posterData.ClubName;
        const EventName = posterData.EventName;
        if(Email.length > 0 && Email.endsWith("@rgukt.ac.in"))
        {
            try{
                const res = await axios.post('http://localhost:3001/event/register',{Email,EventName,ClubName})
                if(res.data.message === "Success") {
                    console.log(res.data.message);
                    alert("Registration Successfull!");
                    navigate("/ecell");
                }
                else {
                    console.log(res.data.message)
                    alert("You are already Registered for this Event")
                }
            }
            catch(err) {
                console.log(err);
            }
        }
        else alert("Please Enter your Domain Email Properly")
    }

    
    return (
        <div className="event-details-container">
            <div className="event-details">
                <ul>
                    <li>EventName:{posterData.EventName}</li>
                    <li>ClubName:{posterData.ClubName}</li>
                    <li>Venue:{posterData.Venue}</li>
                    <li>Date:{posterData.Date}</li>
                    <li>Time:{posterData.Time}</li>
                </ul>
                
                <input ref={email} value={Email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Enter your Email" required/><button onClick={handleRegister}>Register</button>
            </div>
            
        </div>
    )
}

export default EventDetails;