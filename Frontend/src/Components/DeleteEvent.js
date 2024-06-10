import { useRef,useState } from "react";
import "./AddEvent.css"
import axios from "axios";
import { useNavigate,useLocation } from "react-router-dom";

const DeleteEvent = () => 
{

    const [eventname,setEventName] = useState('');
    const [clubname,setClubName] = useState('');
    const [Date,setDate] = useState('');
    const [branchs,setBranch] = useState('');
    const navigate = useNavigate();

    const location = useLocation();
    const club = location.state.club;

    const EventName = useRef();
    const ClubName = useRef();
    const dates = useRef();
    const Branch = useRef();


    const handleDelete = async() => {
        try{
            const eventName = EventName.current.value;
            const date = dates.current.value;
            let clubName = '';
            let branch = '';
            if(club !== 'deptclub') clubName = ClubName.current.value;
            else branch = Branch.current.value;
            const res = await axios.post("http://localhost:3001/delete/deleteevents",{eventName,clubName,date,branch})
            if(res.data === "Success") {
                setClubName('');
                setEventName('');
                setDate('');
                alert("Delete Successfully");
                navigate(`/${club}`);
            }
            else alert("Event Not Found")
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
                    <label>Event Name</label><input className="delete-event-input" type="text" placeholder="Enter Event Name" value={eventname} ref={EventName} onChange={(e)=>setEventName(e.target.value)} required/>
                </div>
                {club === 'deptclub' ?
                (
                    <div>
                    <label>Department</label>
                    <select className="delete-event-input" value={branchs} ref={Branch} onChange={(e)=>setBranch(e.target.value)} required>
                        <option>Select</option><option >PUC</option><option >CSE</option><option >ECE</option><option >EEE</option>
                        <option >MECH</option><option >CHEM</option><option>MME</option>
                    </select>
                    </div>
                ):
                (
                    <div>
                    <label>Club Name</label>
                    <select className="delete-event-input" value={clubname} ref={ClubName} onChange={(e)=>setClubName(e.target.value)} required>
                        <option>Select</option><option >CodeClub</option><option >Ecell</option><option >MathClub</option><option >TNP</option>
                        <option >HopeHouse</option>
                    </select>
                    </div>
                )
                }
                <div>
                <label>Date</label><input className="delete-event-input" type="date"  ref={dates} value={Date} onChange={e => setDate(e.target.value)} required  />
                </div>
                <button className="deleteevent-submit-btn" onClick={handleDelete}>Delete</button>
            </div>
        </div>
    )
}

export default DeleteEvent;