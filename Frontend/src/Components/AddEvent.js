// import { useRef, useState } from "react";
// import "./AddEvent.css"
// import axios from "axios";
// import { Spinner } from "react-bootstrap";
// import { useNavigate,useLocation } from "react-router-dom";
// import getUserInfo from "../utils/userInfo"

// const AddEvent = () => 
// {
//     const userData = getUserInfo();

//     const location = useLocation();
//     const clubData = location.state.clubData;
//     const clubName = clubData.clubName;

//     const [eventName,setEventName] = useState('');
//     const [Tagline,setTagline] = useState('');
//     const [Venue,setVenue] = useState('');
//     const [Date,setDate] = useState('');
//     const [Time,setTime] = useState('');
//     const [imageUrl,setImageUrl] = useState('');
//     const [description,setDescription] = useState('');
//     const [scoordinatorName,setScoordinatorName] = useState('');
//     const [scoordinatorEmail,setScoordinatorEmail] = useState('');
//     const [fcoordinatorName,setFcoordinatorName] = useState('');
//     const [fcoordinatorEmail,setFcoordinatorEmail] = useState('');
//     const [branchs,setBranch] = useState('');
//     const [mode,setMode] = useState('');

//     const navigate = useNavigate();

//     const [selectedFile, setSelectedFile] = useState(null);
//     const [uploading, setUploading] = useState(false);
//     const fileInputRef = useRef(null);

//     const eventname = useRef();
//     const scoordinator = useRef();
//     const scoordinatoremail = useRef();
//     const fcoordinator = useRef();
//     const fcoordinatoremail = useRef();
//     const taglinee = useRef();
//     const Venues = useRef();
//     const dates = useRef();
//     const times = useRef();
//     const desc = useRef();
//     const Branch = useRef();
//     const Mode = useRef();

//     const handleFileChange = (e) => {
//         setSelectedFile(e.target.files[0]);
//     };

//     const handleUpload = async () => {
//         try {
//             setUploading(true);
//           const formData = new FormData();
//           formData.append('image', selectedFile);
//           await axios.post(`http://localhost:3001/api/image`, formData)
//           .then(res => {
//                 setImageUrl(res.data);
//           })

//         } 
//         catch (err) {
//           console.error('Error uploading image:', err);
//         } 
//         finally{
//             setUploading(false);
//         }
//       };
    
//       const handleSubmit = async(e) => {
//         e.preventDefault();
    
//         const eventName = eventname.current.value;
//         const tagline = taglinee.current.value;
//         const venue = Venues.current.value;
//         const date = dates.current.value;
//         const time = times.current.value;
//         const description = desc.current.value;
//         const studentCoordinator = scoordinator.current.value;
//         const studentCoordinatorEmail = scoordinatoremail.current.value;
//         const facultyCoordinator = fcoordinator.current.value;
//         const facultyCoordinatorEmail = fcoordinatoremail.current.value;
//         const eventMode = Mode.current.value;
//         if(clubName !== 'DeptClub')
//         {
//             try {
//                 await axios.post('http://localhost:3001/add/event',{eventName,clubName,tagline,studentCoordinator,studentCoordinatorEmail,facultyCoordinator,facultyCoordinatorEmail,venue,date,time,imageUrl,description,eventMode})
//                 .then(res => {
//                     alert("Event Added Successfully");
//                     navigate('/club',{state:{clubData:clubData}})
//                 })
//             }
            
//             catch(err) {
//                 alert("Event not added");
//             }
//         }
//         else 
//         {
//             const branch = Branch.current.value;
//             if(userData.isSuperAdmin)
//             {
//                 try {
//                     const res = await axios.post('http://localhost:3001/add/dept/event',{eventName,clubName,tagline,studentCoordinator,studentCoordinatorEmail,facultyCoordinator,facultyCoordinatorEmail,venue,date,time,imageUrl,description,branch,eventMode})
//                     if(res.data === "Success") {
//                         alert("Event Added Successfully")
//                         navigate('/deptclub',{state:{clubData:clubData}})
//                     }
//                     else{
//                         alert("Failed to Add Event")
//                     }
//                 }
//                 catch(err) {
//                     alert("Department Event not added");
//                 }
//             }
//             else if(branch === 'PUC') 
//             {
//                 if(userData.dept !== 'PUC1' && userData.dept !== 'PUC2') 
//                 {
//                     alert("No Access")
//                 }
//                 else{
//                     try {
//                         const res = await axios.post('http://localhost:3001/add/dept/event',{eventName,clubName,tagline,studentCoordinator,studentCoordinatorEmail,facultyCoordinator,facultyCoordinatorEmail,venue,date,time,imageUrl,description,branch,eventMode})
//                         if(res.data === "Success") {
//                             alert("Event Added Successfully")
//                             navigate('/deptclub',{state:{clubData:clubData}})
//                         }
//                         else{
//                             alert("Failed to Add Event")
//                         }
//                     }
//                     catch(err) {
//                         alert("Department Event not added");
//                     }
//                 }
//             }
//             else if(branch !== userData.dept) alert("No Access")
//             else
//             {
//                 try {
//                     const res = await axios.post('http://localhost:3001/add/dept/event',{eventName,clubName,tagline,studentCoordinator,studentCoordinatorEmail,facultyCoordinator,facultyCoordinatorEmail,venue,date,time,imageUrl,description,branch,eventMode})
//                     if(res.data === "Success") 
//                     {
//                         alert("Event Added Successfully")
//                         navigate('/deptclub',{state:{clubData:clubData}})
//                     }
//                     else{
//                         alert("Failed to Add Event")
//                     }
//                 }
                
//                 catch(err) {
//                     alert("Department Event not added");
//                 }
//             }
//         }
    
//     }

//     const handleDeleteEvent = () => {
//         navigate("/deleteevent",{state:{clubData:clubData}})
//     }
    
//     const clearFileInput = () => {
//         const fileInput = document.getElementById("file-input");
//         fileInput.value = ""; 
//     };

//     return (
//         <div className="addEvent">
//             <div className="addevent">
//                 <h1>Add Event</h1>
//                 <div className="eventname">
//                     <input className="add-event-input" type="text" placeholder="Event Name" value={eventName} ref={eventname} onChange={(e)=>setEventName(e.target.value)} required=""/>
//                 </div>
//                 <div>
//                     <input placeholder="Tagline" type="text" ref={taglinee} value={Tagline} onChange={(e)=>setTagline(e.target.value)} />
//                 </div>
//                 {clubName==="DeptClub" ?
//                 (
//                     <div>
//                     <select ref={Branch} value={branchs} onChange={(e) => setBranch(e.target.value)} required="">
//                         <option >Select branch</option><option >PUC</option><option >CSE</option><option >ECE</option><option >EEE</option>
//                         <option >MECH</option><option >CIVIL</option><option >CHEM</option><option>MME</option>
//                     </select>
//                     </div>
//                 ):
//                 (
//                     <div></div>
//                 )
//                 }
//                 <div>
//                     <input className="add-event-input" type="text" placeholder="Student Co-ordinator Name" value={scoordinatorName} onChange={(e) => setScoordinatorName(e.target.value)} required="" ref={scoordinator} />
//                 </div>
//             <div>
//                 <input className="add-event-input" type="text" placeholder="Student Co-ordinator Mail" value={scoordinatorEmail} onChange={(e) => setScoordinatorEmail(e.target.value)} required="" ref={scoordinatoremail} />
//             </div>
//                 <div>
//                 <input className="add-event-input" type="text" placeholder="Faculty Co-ordinator Name"  value={fcoordinatorName} onChange={(e)=>setFcoordinatorName(e.target.value)} required="" ref={fcoordinator}/>
//                 </div>
//                 <div>
//                 <input className="add-event-input" type="text" placeholder="Faculty Co-ordinator Mail" value={fcoordinatorEmail} onChange={(e)=>setFcoordinatorEmail(e.target.value)} required="" ref={fcoordinatoremail}/>
//                 </div>
//                 <div>
//                 <input className="add-event-input" type="text" placeholder="Venue" ref={Venues} value={Venue} onChange={(e)=>setVenue(e.target.value)} required=""/>
//                 </div>
//                 <div>
//                 <input className="add-event-input" type="date"   value={Date} onChange={e => setDate(e.target.value)} required ref={dates}/>
//                 </div>
//                 <div>
//                 <input className="add-event-input" type="time"   value={Time} onChange={e => setTime(e.target.value)} required ref={times}/>
//                 </div>
//                 <div>
//                 <input className="add-event-input" type="text" placeholder="Event Mode"   value={mode} onChange={e => setMode(e.target.value)} required ref={Mode}/>
//                 </div>
//                 <div className="file-input-container">
//                     <label>Poster</label>
//                     <div>
//                         <input ref={fileInputRef} onChange={handleFileChange} id="file-input" type="file" required></input>
//                         <span onClick={clearFileInput} className="clear-file-input">&#10006;</span>

//                         {uploading ? (<Spinner animation="border" role="status">
//                                     <span className="sr-only">Uploading...</span>
//                                 </Spinner>) : 
//                         (<button  onClick={handleUpload}>Upload</button>)}
//                     </div>
//                 </div>
//                 <div>
//                 <textarea type="text" placeholder="Write something about Event"  onChange={(e)=>setDescription(e.target.value)} value={description} className="add-event-input" ref={desc} />
//                 </div>

//                 <button className="addevent-submit-btn" onClick={handleSubmit}>Submit</button>

//                 <div className="delete-event">
//                     <span>Delete an existing Event?</span>
//                     <span onClick={handleDeleteEvent}><button>Delete Event</button></span>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default AddEvent;


import { useRef, useState } from "react";
import "./AddEvent.css";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import getUserInfo from "../utils/userInfo";

const AddEvent = () => {
  const userData = getUserInfo();
  const location = useLocation();
  const clubData = location.state.clubData;
  const clubName = clubData.clubName;
  const navigate = useNavigate();

  const [eventName, setEventName] = useState('');
  const [tagline, setTagline] = useState('');
  const [venue, setVenue] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [studentCoordinatorName, setStudentCoordinatorName] = useState('');
  const [studentCoordinatorEmail, setStudentCoordinatorEmail] = useState('');
  const [facultyCoordinatorName, setFacultyCoordinatorName] = useState('');
  const [facultyCoordinatorEmail, setFacultyCoordinatorEmail] = useState('');
  const [branch, setBranch] = useState('');
  const [mode, setMode] = useState('');

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('image', selectedFile);
      const response = await axios.post('https://eventmanagementsystem-uvm3.onrender.com/api/image', formData);
      setImageUrl(response.data);
    } catch (err) {
      console.error('Error uploading image:', err);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!eventName) alert('Event Name is required');
    if (!tagline) alert('Tagline is required');
    if (!venue) alert('Venue is required');
    if (!date) alert('Date is required');
    if (!time) alert('Time is required');
    if (!studentCoordinatorName) alert('Student Coordinator Name is required');
    if (!studentCoordinatorEmail) alert('Student Coordinator Email is required');
    if (!facultyCoordinatorName) alert('Faculty Coordinator Name is required');
    if (!facultyCoordinatorEmail) alert('Faculty Coordinator Email is required');
    if (!mode) alert('Event Mode is required');
    if (clubName === 'DeptClub' && !branch) alert('Branch is required');

    const eventDetails = {
      eventName,
      clubName,
      tagline,
      studentCoordinator: studentCoordinatorName,
      studentCoordinatorEmail,
      facultyCoordinator: facultyCoordinatorName,
      facultyCoordinatorEmail,
      venue,
      date,
      time,
      imageUrl,
      description,
      eventMode: mode,
      branch,
    };

    try {
      if (clubName !== 'DeptClub') {
        await axios.post('https://eventmanagementsystem-uvm3.onrender.com/add/event', eventDetails);
        alert("Event Added Successfully");
        navigate('/club', { state: { clubData } });
      } else {
        if (userData.isSuperAdmin || (branch === 'PUC' && (userData.dept === 'PUC1' || userData.dept === 'PUC2')) || branch === userData.dept) {
          const response = await axios.post('https://eventmanagementsystem-uvm3.onrender.com/add/dept/event', eventDetails);
          if (response.data === "Success") {
            alert("Event Added Successfully");
            navigate('/deptclub', { state: { clubData } });
          } else {
            alert("Failed to Add Event");
          }
        } else {
          alert("No Access");
        }
      }
    } catch (err) {
      alert("Event not added");
    }
  };

  const handleDeleteEvent = () => {
    navigate("/deleteevent", { state: { clubData } });
  };

  const clearFileInput = () => {
    fileInputRef.current.value = "";
  };

  return (
    <div className="addEvent">
      <div className="addevent">
        <h1>Add Event</h1>
        <form onSubmit={handleSubmit}>
          <input
            className="add-event-input"
            type="text"
            placeholder="Event Name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            required
          />
          <input
            className="add-event-input"
            type="text"
            placeholder="Tagline"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
          />
          {clubName === "DeptClub" && (
            <select
              className="add-event-input"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              required
            >
              <option value="">Select branch</option>
              <option value="PUC">PUC</option>
              <option value="CSE">CSE</option>
              <option value="ECE">ECE</option>
              <option value="EEE">EEE</option>
              <option value="MECH">MECH</option>
              <option value="CIVIL">CIVIL</option>
              <option value="CHEM">CHEM</option>
              <option value="MME">MME</option>
            </select>
          )}
          <input
            className="add-event-input"
            type="text"
            placeholder="Student Co-ordinator Name"
            value={studentCoordinatorName}
            onChange={(e) => setStudentCoordinatorName(e.target.value)}
            required
          />
          <input
            className="add-event-input"
            type="email"
            placeholder="Student Co-ordinator Email"
            value={studentCoordinatorEmail}
            onChange={(e) => setStudentCoordinatorEmail(e.target.value)}
            required
          />
          <input
            className="add-event-input"
            type="text"
            placeholder="Faculty Co-ordinator Name"
            value={facultyCoordinatorName}
            onChange={(e) => setFacultyCoordinatorName(e.target.value)}
            required
          />
          <input
            className="add-event-input"
            type="email"
            placeholder="Faculty Co-ordinator Email"
            value={facultyCoordinatorEmail}
            onChange={(e) => setFacultyCoordinatorEmail(e.target.value)}
            required
          />
          <input
            className="add-event-input"
            type="text"
            placeholder="Venue"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
            required
          />
          <input
            className="add-event-input"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <input
            className="add-event-input"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
          <input
            className="add-event-input"
            type="text"
            placeholder="Event Mode"
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            required
          />
          <div className="file-input-container">
            <label>Poster</label>
            <div>
              <input
                ref={fileInputRef}
                onChange={handleFileChange}
                id="file-input"
                type="file"
                required
              />
              <span onClick={clearFileInput} className="clear-file-input">
                &#10006;
              </span>
              {uploading ? (
                <Spinner animation="border" role="status">
                  <span className="sr-only">Uploading...</span>
                </Spinner>
              ) : (
                <button type="button" onClick={handleUpload}>
                  Upload
                </button>
              )}
            </div>
          </div>
          <textarea
            className="add-event-input"
            placeholder="Write something about Event"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button className="addevent-submit-btn" type="submit">
            Submit
          </button>
        </form>
        <div className="delete-event">
          <span>Delete an existing Event?</span>
          <button onClick={handleDeleteEvent}>Delete Event</button>
        </div>
      </div>
    </div>
  );
};

export default AddEvent;
