import { useRef,useState } from "react";
import "./AddEvent.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DeleteEvent = () => 
{

    const [eventname,setEventName] = useState('');
    const [clubname,setClubName] = useState('');
    const [Date,setDate] = useState('');
    const navigate = useNavigate();

    const eventName = useRef();
    const clubName = useRef();
    const dates = useRef();


    const handleDelete = async() => {
        try{
            const EventName = eventName.current.value;
            const ClubName = clubName.current.value;
            const Date = dates.current.value;

           if(EventName.length > 0 && ClubName.length > 0 && Date.length > 0) 
           {
            const res = await axios.post("http://localhost:3001/deleteevent",{EventName,ClubName,Date})
            if(res.data === "Success") {
                setClubName('');
                setEventName('');
                setDate('');
                alert("Delete Successfully");
                navigate("/ecell");
            }
            else alert("Event Not Found")
           }
           else {
            alert("Please fill all the details")
           }
        }
        catch(err) {
            console.log(err);
        }
    }

    return (
        <div>
            <div className="deleteevent">
                <h1>Delete Event</h1>
                <div className="eventname">
                    <label>Event Name</label><input className="delete-event-input" type="text" placeholder="Enter Event Name" value={eventname} ref={eventName} onChange={(e)=>setEventName(e.target.value)} required/>
                </div>
                <div>
                    <label>Club Name</label>
                    <select className="delete-event-input" value={clubname} ref={clubName} onChange={(e)=>setClubName(e.target.value)} required>
                        <option>Select</option><option >CodeClub</option><option >Ecell</option><option >MathClub</option><option >TNP</option>
                        <option >Dept</option><option >HopeHouse</option>
                    </select>
                </div>
                <div>
                <label>Date</label><input className="delete-event-input" type="date"  ref={dates} value={Date} onChange={e => setDate(e.target.value)} required  />
                </div>
                <button className="deleteevent-submit-btn" onClick={handleDelete}>Delete</button>
            </div>
        </div>
    )
}

export default DeleteEvent;