import { useState, useRef } from "react";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import "./AddMember.css"
import { useNavigate, useLocation } from "react-router-dom";

const ChangeClub = ()=>
{
    const [description,setDescription] = useState('');
    const [imageUrl,setImageUrl] = useState("");
    const [uploading,setUploading] = useState(false);
    const [uploadings,setUploadings] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedFiles,setSelectedFiles] = useState(null);
    const [coverImage,setCoverImage] = useState('');
    const [insta,setInsta] = useState('');
    const [facebook,setFacebook] = useState('');
    const [mail,setMail] = useState('');
    const [tagline,setTagline] = useState('');
    const [open,setOpen] = useState('');

    const location = useLocation();
    const clubData = location.state.clubData;
    const navigate = useNavigate();

    const fileInputRef = useRef();
    const Tagline = useRef();
    const coverImageRef = useRef();
    const Insta = useRef()
    const Facebook = useRef();
    const Mail = useRef();
    const Desc = useRef();
    const Interview = useRef();
    const Open = useRef();
    const Close = useRef();

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };
    const handleFileChanges = (e) => {
        setSelectedFiles(e.target.files[0]);
    };

    const handleUpload = async () => {
        try {
            setUploading(true);
          const formData = new FormData();
          formData.append('image', selectedFile);
          await axios.post(`https://eventmanagementsystem-uvm3.onrender.com/api/image`, formData)
          .then(res => {
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

      const handleUploads = async () => {
        try {
            setUploadings(true);
          const formData = new FormData();
          formData.append('image', selectedFiles);
          await axios.post(`http://localhost:3001/api/image`, formData)
          .then(res => {
                setCoverImage(res.data);
                
          })

        } 
        catch (err) {
          console.error('Error uploading image:', err);
        } 
        finally{
            setUploadings(false);
        }
      };

    const clearFileInput = () => {
    const fileInput = document.getElementById("file-input");
    const fileInputs = document.getElementById("file-inputs");
    fileInputs.value = "";
    fileInput.value = ""; 
    };
    const clearFileInputs = () => {
        const fileInputs = document.getElementById("file-inputs");
        fileInputs.value = "";
        };

    const handleAddClub = async () => {
        try {
            const res = await axios.post('https://eventmanagementsystem-uvm3.onrender.com/change/change/club', { clubName:clubData.clubName, description, imageUrl,coverImage,insta,facebook,mail,tagline,interviewFor:Interview.current.value,open});
    
            if (res.data === "ClubNotExists") {
                alert("No Club present with the entered ClubName");
            } else if (res.data === "Success") {
                alert("Updated Successfully");
                navigate("/club",{state:{clubData:clubData}})
            } else {
                alert("Try again");
            }
        } catch (err) {
            alert("Error while adding a club");
        }
    };
    

    return(
        <div className="manage-clubs">
            <div className="addmember">
                <div>
                    <h1>Modify Club</h1>
                </div>
                <div>
                    <input type="text" placeholder="Tagline" ref={Tagline} value={tagline} onChange={(e)=>setTagline(e.target.value)}></input>
                </div>
                <div>
                    <textarea ref={Desc} value={description} onChange={e=>setDescription(e.target.value)} type="text" required placeholder="Description"></textarea>
                </div>
                <div className="file-input-container">
                    <label>Club Logo</label>
                    <div>
                        <input ref={fileInputRef} onChange={handleFileChange} id="file-input" type="file"></input>
                        <span onClick={clearFileInput} className="clear-file-input">&#10006;</span>

                        {uploading ? (<Spinner animation="border" role="status">
                                    <span className="sr-only">Uploading...</span>
                                </Spinner>) : 
                        (<button  onClick={handleUpload}>Upload</button>)}
                    </div>
                </div>
                <div className="file-input-container">
                    <label>Club Cover Image</label>
                    <div>
                        <input ref={coverImageRef} placeholder="Club Logo" onChange={handleFileChanges} id="file-inputs" type="file"></input>
                        <span onClick={clearFileInputs} className="clear-file-input">&#10006;</span>

                        {uploadings ? (<Spinner animation="border" role="status">
                                    <span className="sr-only">Uploading...</span>
                                </Spinner>) : 
                        (<button  onClick={handleUploads}>Upload</button>)}
                    </div>
                </div>
                <div>
                    <input ref={Mail} value={mail} onChange={(e)=>setMail(e.target.value)} type="text" placeholder="Email"></input>
                </div>
                <div>
                    <input ref={Insta} value={insta} onChange={(e)=>setInsta(e.target.value)} type="text" placeholder="Instagram"></input>
                </div>
                <div>
                    <input ref={Facebook} value={facebook} onChange={(e)=>setFacebook(e.target.value)} type="text" placeholder="LinkedIn"></input>
                </div>
                <button onClick={handleAddClub}>Update </button>
            </div>
            <div className="addmember">
                <h1>Interview Openings</h1>
                <div>
                    <label>Eligible batches</label>
                    <input ref={Interview} type="text"></input>
                </div>
                <div>
                    <input ref={Open} id="open" name="status" onChange={(e)=>setOpen(e.target.value)} type="radio" value="open"  />
                    <label for="open">Open</label>
                </div>
                <div>
                    <input ref={Close} id="close" name="status" onChange={(e)=>setOpen(e.target.value)} type="radio" value="close" />
                    <label for="close">Close</label>
                </div>
                <button onClick={handleAddClub}>Submit</button>
            </div>
        </div>
    )
}

export default ChangeClub;