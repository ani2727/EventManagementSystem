import { useLocation,useNavigate } from "react-router-dom"
import axios from "axios";
import "./EventDetails.css"
import { useRef, useState, useEffect } from "react";

const EventDetails = () => 
{
    const location = useLocation();
    const [Email,setEmail] = useState('');
    const posterData = location.state.posterData;
    const [members,setMembers] = useState([]);
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
                    alert("Registration Successfull!");
                    navigate(`/${ClubName}`);

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const ClubName = posterData.ClubName;
                const EventName = posterData.EventName;
                const res = await axios.get(`http://localhost:3001/register/user?ClubName=${ClubName}&EventName=${EventName}`);
                setMembers(res.data.members);
            } catch (err) {
                console.log(err);
            }
        };
    
        fetchData();
    
    }, [posterData.ClubName, posterData.EventName]);
    
    
    return (
        <div className="event-details-container">
            <div className="event-details">
                <ul>
                    <li>EventName:{posterData.EventName}</li>
                    <li>ClubName:{posterData.ClubName}</li>
                    <li>Venue:{posterData.Venue}</li>
                    <li>Date:{posterData.Date}</li>
                    <li>Time:{posterData.Time}</li>
                    <li>Agenda:{posterData.Description}</li>
                </ul>
                
                <input ref={email} value={Email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Enter your Email" required/><button onClick={handleRegister}>Register</button>
            </div>
            <div class="registered-members">
                <h3>Registered Members</h3>
                {members.length > 0 ?
                    (
                        <ul>
                            {members.map((member,index)=> (
                                <li key={index} style={{listStyleType:'decimal'}}>{member.Email}</li>
                            ))}
                        </ul>
                    ):
                    (
                        <p>No Members Registered For this event</p>
                    )
                }

            </div>
            
        </div>
    )
}

export default EventDetails;