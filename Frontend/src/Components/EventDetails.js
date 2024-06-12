import { useLocation,useNavigate } from "react-router-dom"
import axios from "axios";
import "./EventDetails.css"
import {useState, useEffect } from "react";
import getUserInfo from "../utils/userInfo"

const EventDetails = () => 
{
    const location = useLocation();
    const posterData = location.state.posterData;
    const clubData = location.state.clubData;
    const [members,setMembers] = useState([]);
    const navigate = useNavigate();

    const userData = getUserInfo();

    const handleRegister = async() => 
    {
        const email = userData.userName+"@rgukt.ac.in"
        const clubName = posterData.clubName;
        const eventName = posterData.eventName;
        if(email.length > 0 && email.endsWith("@rgukt.ac.in"))
        {
            try{
                const res = await axios.post('http://localhost:3001/register/events',{email,eventName,clubName})
                if(res.data.message === "Success") {
                    alert("Registration Successfull!");
                    if(clubData.clubName === 'DeptClub') navigate('/deptclub',{state:{clubData:clubData}})
                    else navigate('/club',{state:{clubData:clubData}})
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

    useEffect(() => 
    {
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
    
    }, [posterData.clubName,posterData.eventName]);
    
    
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
                
                <button onClick={handleRegister}>Register</button>
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