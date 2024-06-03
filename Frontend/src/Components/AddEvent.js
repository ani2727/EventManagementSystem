import { useRef, useState } from "react";
import "./AddEvent.css"
import axios from "axios";
import { Spinner } from "react-bootstrap";
import { useNavigate,Link } from "react-router-dom";

const AddEvent = () => 
{
    const [eventname,setEventName] = useState('');
    const [clubname,setClubName] = useState('');
    const [Venue,setVenue] = useState('');
    const [Date,setDate] = useState('');
    const [Time,setTime] = useState('');
    const [imageUrl,setImageUrl] = useState('');
    const [description,setDescription] = useState('');
    const navigate = useNavigate();

    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null);

    const eventName = useRef();
    const clubName = useRef();
    const venue = useRef();
    const dates = useRef();
    const times = useRef();
    const desc = useRef();

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        try {
            setUploading(true);
          const formData = new FormData();
          formData.append('image', selectedFile);
          await axios.post(`http://localhost:3001/api/image`, formData)
          .then(res => {
                setSelectedFile(null);
                fileInputRef.current.value = null;
                setImageUrl(res.data);
          })

        } 
        catch (err) {
          console.error('Error uploading image:', err);
        } 
        finally{
            setUploading(false);
        }
      };


      const handleSubmit = async(e) => {
        e.preventDefault();
    
        const EventName = eventName.current.value;
        const ClubName = clubName.current.value;
        const Venue = venue.current.value;
        const Dats = dates.current.value;
        const Tims = times.current.value;
        const Description = desc.current.value;
    
        try {
            await axios.post('http://localhost:3001/addevent',{EventName,ClubName,Venue,Dats,Tims,imageUrl,Description})
            .then(res => {
                alert("Event Added Successfully")
                console.log("Event added");
                navigate("/ecell")
            })
        }
        
        catch(err) {
            console.log(err);
            alert("Event not added");
        }
    
    }
    

    return (
        <div className="addEvent">
            <div className="addevent">
                <h1>Add Event</h1>
                <div className="eventname">
                    <label>Event Name</label><input className="add-event-input" type="text" placeholder="Enter Event Name" value={eventname} ref={eventName} onChange={(e)=>setEventName(e.target.value)} required=""/>
                </div>
                <div>
                    <label>Club Name</label>
                    <select className="add-event-input" value={clubname} ref={clubName} onChange={(e)=>setClubName(e.target.value)}>
                        <option>Select</option><option >Code Club</option><option >Ecell</option><option >Math Club</option><option >TNP</option>
                        <option >Dept</option><option >Hope House</option>
                    </select>
                </div>
                <div>
                <label>Venue</label><input className="add-event-input" type="text" placeholder="Enter Venue" ref={venue} value={Venue} onChange={(e)=>setVenue(e.target.value)} required=""/>
                </div>
                <div>
                <label>Date</label><input className="add-event-input" type="date"  ref={dates} value={Date} onChange={e => setDate(e.target.value)} />
                </div>
                <div>
                <label>Time</label><input className="add-event-input" type="time"  ref={times} value={Time} onChange={e => setTime(e.target.value)} />
                </div>
                <div>
                <label>Poster</label> <input ref={fileInputRef} onChange={handleFileChange} className="add-event-input" type="file"/>
                {uploading ? (<Spinner style={{marginLeft:'-40px'}} animation="border" role="status">
                                    <span className="sr-only">Uploading...</span>
                                </Spinner>) : 
                        (<button style={{marginLeft:'-60px',background:'#535457',color:'white',fontWeight:'bold',borderRadius:'0.3em'}} onClick={handleUpload}>Upload</button>)}
                </div>
                <div>
                <label>Description</label><textarea ref={desc} onChange={(e)=>setDescription(e.target.value)} value={description} className="add-event-input"  />
                </div>

                <button className="addevent-submit-btn" onClick={handleSubmit}>Submit</button>

                <div class="delete-event">
                    <span>Delete an existing Event?</span>
                    <span><Link to="/deleteevent" class="linkcss"><button>Delete Event</button></Link></span>
                </div>
            </div>
        </div>
    )
}

export default AddEvent;

