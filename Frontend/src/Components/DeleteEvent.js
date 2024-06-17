import { useRef, useState } from "react";
import "./AddEvent.css"
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import getUserInfo from "../utils/userInfo";

const DeleteEvent = () => {

    const userData = getUserInfo();
    const [eventname, setEventName] = useState('');
    const [Date, setDate] = useState('');
    const navigate = useNavigate();
    const [branchs,setBranch] = useState('')

    const location = useLocation();
    const clubData = location.state ? location.state.clubData : null;

    const EventName = useRef();
    const dates = useRef();
    const Branch = useRef();

    const handleDelete = async () => {
        try {
            const eventName = EventName.current.value;
            const date = dates.current.value;
            let clubName = '';
            let branch = null;
            if (clubData && clubData.clubName !== 'DeptClub') {
                clubName = clubData.clubName;
            } else {
                branch = userData && userData.dept;
            }

            const res = await axios.post("https://eventmanagementsystem-uvm3.onrender.com/delete/deleteevents", { eventName, clubName, date, branch });
            if (res.data === "Success") {
                alert("Delete Successfully");
                if (clubData && clubData.clubName !== 'DeptClub') {
                    navigate(`/club`, { state: { clubData: clubData } });
                } else {
                    navigate('/deptclub', { state: { clubData: clubData } });
                }
            } else {
                alert("Event Not Found");
            }
        } catch (err) {
            console.error(err);
        }
    }

    if (!clubData) {
        return (
            <div>
                <h1>You Are Not Authorized to view this page</h1>
            </div>
        )
    }

    return (
        <div className="deleteEvent">
            <div className="deleteevent">
                <h1>Delete Event</h1>
                <div className="eventname">
                    <input className="delete-event-input" type="text" placeholder="Event Name" value={eventname} ref={EventName} onChange={(e) => setEventName(e.target.value)} required />
                </div>
                {clubData && clubData.clubName === 'DeptClub' ?
                    (
                        <div>
                            <label>Department</label>
                            <select className="delete-event-input" value={branchs} ref={Branch} onChange={(e) => setBranch(e.target.value)} required>
                                <option>Select</option><option >PUC</option><option >CSE</option><option >ECE</option><option >EEE</option>
                                <option >MECH</option><option >CHEM</option><option>MME</option>
                            </select>
                        </div>
                    ) :
                    (
                        <div></div>
                    )
                }
                <div>
                    <input className="delete-event-input" type="date" ref={dates} value={Date} onChange={e => setDate(e.target.value)} required />
                </div>
                <button className="deleteevent-submit-btn" onClick={handleDelete}>Delete</button>
            </div>
        </div>
    )
}

export default DeleteEvent;
