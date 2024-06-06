import { useLocation,useNavigate } from "react-router-dom"
import axios from "axios";
import "./EventDetails.css"
import { useRef, useState, useEffect } from "react";

const EventDetails = () => 
{
    const location = useLocation();
    const [Emails,setEmail] = useState('');
    const posterData = location.state.posterData;
    const [members,setMembers] = useState([]);
    const navigate = useNavigate();

    const Email = useRef();

    const handleRegister = async() => 
    {
        const email = Email.current.value;
        const clubName = posterData.clubName;
        const eventName = posterData.eventName;
        if(email.length > 0 && email.endsWith("@rgukt.ac.in"))
        {
            try{
                const res = await axios.post('http://localhost:3001/event/register',{email,eventName,clubName})
                if(res.data.message === "Success") {
                    alert("Registration Successfull!");
                    navigate(`/${clubName}`);

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
                const clubName = posterData.clubName;
                const eventName = posterData.eventName;
                const res = await axios.get(`http://localhost:3001/register/user?clubName=${clubName}&eventName=${eventName}`);
                setMembers(res.data.members);
            } catch (err) {
                console.log(err);
            }
        };
    
        fetchData();
    
    }, [posterData.clubName, posterData.eventName]);
    
    
    return (
        <div className="event-details-container">
            <div className="event-details">
                <ul>
                    <li>EventName:{posterData.eventName}</li>
                    <li>ClubName:{posterData.clubName}</li>
                    <li>Venue:{posterData.venue}</li>
                    <li>Date:{posterData.date}</li>
                    <li>Time:{posterData.time}</li>
                    <li>Agenda:{posterData.description}</li>
                    <li>Student Co-ordinator:{posterData.studentCoordinator}</li>
                    <li>Student Co-ordinator Email:{posterData.studentCoordinatorEmail}</li>
                    <li>Faculty Co-ordinator:{posterData.facultyCoordinator}</li>
                    <li>Faculty Co-ordinator:{posterData.facultyCoordinatorEmail}</li>
                </ul>
                
                <input ref={Email} value={Emails} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Enter your Email" required/><button onClick={handleRegister}>Register</button>
            </div>
            <div class="registered-members">
                <h3>Registered Members</h3>
                {members.length > 0 ?
                    (
                        <ul>
                            {members.map((member,index)=> (
                                <li key={index} style={{listStyleType:'decimal'}}>{member.email}</li>
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