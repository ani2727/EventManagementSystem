import { useRef, useState } from "react";
import "./AddEvent.css"
import axios from "axios";
import { Spinner } from "react-bootstrap";
import { useNavigate,Link,useLocation } from "react-router-dom";

const AddEvent = () => 
{

    const location = useLocation();
    const clubName = location.state.Club;

    const [eventName,setEventName] = useState('');
    const [Tagline,setTagline] = useState('');
    const [Venue,setVenue] = useState('');
    const [Date,setDate] = useState('');
    const [Time,setTime] = useState('');
    const [imageUrl,setImageUrl] = useState('');
    const [description,setDescription] = useState('');
    const [scoordinatorName,setScoordinatorName] = useState('');
    const [scoordinatorEmail,setScoordinatorEmail] = useState('');
    const [fcoordinatorName,setFcoordinatorName] = useState('');
    const [fcoordinatorEmail,setFcoordinatorEmail] = useState('');
    const [branchs,setBranch] = useState('');

    const navigate = useNavigate();

    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null);

    const eventname = useRef();
    const scoordinator = useRef();
    const scoordinatoremail = useRef();
    const fcoordinator = useRef();
    const fcoordinatoremail = useRef();
    const taglinee = useRef();
    const Venues = useRef();
    const dates = useRef();
    const times = useRef();
    const desc = useRef();
    const Branch = useRef();

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
    
        const eventName = eventname.current.value;
        const tagline = taglinee.current.value;
        const venue = Venues.current.value;
        const date = dates.current.value;
        const time = times.current.value;
        const description = desc.current.value;
        const studentCoordinator = scoordinator.current.value;
        const studentCoordinatorEmail = scoordinatoremail.current.value;
        const facultyCoordinator = fcoordinator.current.value;
        const facultyCoordinatorEmail = fcoordinatoremail.current.value;
        const branch = Branch.current.value;
        if(clubName !== 'deptclub')
        {
            try {
                await axios.post('http://localhost:3001/addevent',{eventName,clubName,tagline,studentCoordinator,studentCoordinatorEmail,facultyCoordinator,facultyCoordinatorEmail,venue,date,time,imageUrl,description})
                .then(res => {
                    alert("Event Added Successfully")
                    navigate(`/${clubName}`)
                })
            }
            
            catch(err) {
                console.log(err);
                alert("Event not added");
            }
        }
        else 
        {
            try {
                await axios.post('http://localhost:3001/dept/addevent',{eventName,clubName,tagline,studentCoordinator,studentCoordinatorEmail,facultyCoordinator,facultyCoordinatorEmail,venue,date,time,imageUrl,description,branch})
                .then(res => {
                    console.log(res, "Came to Result")
                    alert("Event Added Successfully")
                    navigate(`/${clubName}`)
                })
            }
            
            catch(err) {
                console.log(err);
                alert("Event not added");
            }
        }
    
    }
    
    const clearFileInput = () => {
        const fileInput = document.getElementById("file-input");
        fileInput.value = ""; 
    };

    return (
        <div className="addEvent">
            <div className="addevent">
                <h1>Add Event</h1>
                <div className="eventname">
                    <label>Event Name</label><input className="add-event-input" type="text" placeholder="Enter Event Name" value={eventName} ref={eventname} onChange={(e)=>setEventName(e.target.value)} required=""/>
                </div>
                <div>
                    <label>Tag Line</label><input placeholder="Tag line" type="text" ref={taglinee} value={Tagline} onChange={(e)=>setTagline(e.target.value)} />
                </div>
                {clubName==="deptclub" ?
                (
                    <div>
                    <label>Branch</label>
                    <select ref={Branch} value={branchs} onChange={(e) => setBranch(e.target.value)} required="">
                        <option >Select branch</option><option >PUC</option><option >CSE</option><option >ECE</option><option >EEE</option>
                        <option >MECH</option><option >CIVIL</option><option >CHEM</option><option>METALLURGY</option>
                    </select>
                </div>
                ):
                (
                    <div></div>
                )
                }
                <div>
                <label>Student Co-ordinator Name</label><input className="add-event-input" type="text" placeholder="Enter Co-ordinator Name" ref={scoordinator} value={scoordinatorName} onChange={(e)=>setScoordinatorName(e.target.value)} required=""/>
                </div>
                <div>
                <label>Student Co-ordinator Mail</label><input className="add-event-input" type="text" placeholder="Enter Co-ordinator Name" ref={scoordinatoremail} value={scoordinatorEmail} onChange={(e)=>setScoordinatorEmail(e.target.value)} required=""/>
                </div>
                <div>
                <label>Faculty Co-ordinator Name</label><input className="add-event-input" type="text" placeholder="Enter Co-ordinator Name" ref={fcoordinator} value={fcoordinatorName} onChange={(e)=>setFcoordinatorName(e.target.value)} required=""/>
                </div>
                <div>
                <label>Faculty Co-ordinator Mail</label><input className="add-event-input" type="text" placeholder="Enter Co-ordinator Name" ref={fcoordinatoremail} value={fcoordinatorEmail} onChange={(e)=>setFcoordinatorEmail(e.target.value)} required=""/>
                </div>
                <div>
                <label>Venue</label><input className="add-event-input" type="text" placeholder="Enter Venue" ref={Venues} value={Venue} onChange={(e)=>setVenue(e.target.value)} required=""/>
                </div>
                <div>
                <label>Date</label><input className="add-event-input" type="date"  ref={dates} value={Date} onChange={e => setDate(e.target.value)} required/>
                </div>
                <div>
                <label>Time</label><input className="add-event-input" type="time"  ref={times} value={Time} onChange={e => setTime(e.target.value)} required/>
                </div>

                <div className="file-input-container">
                    <label>Poster</label>
                    <div>
                        <input ref={fileInputRef} onChange={handleFileChange} id="file-input" type="file" required></input>
                        <span onClick={clearFileInput} className="clear-file-input">&#10006;</span>

                        {uploading ? (<Spinner animation="border" role="status">
                                    <span className="sr-only">Uploading...</span>
                                </Spinner>) : 
                        (<button  onClick={handleUpload}>Upload</button>)}
                    </div>
                </div>
                <div>
                <label>Description</label><textarea type="text" placeholder="Write something about Event" ref={desc} onChange={(e)=>setDescription(e.target.value)} value={description} className="add-event-input"  />
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

