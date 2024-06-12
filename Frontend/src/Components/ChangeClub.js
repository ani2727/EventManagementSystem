import { useState, useRef } from "react";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import "./AddMember.css"

const ChangeClub = ()=>
{
    const [clubName,setClubs] = useState('');
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

    const fileInputRef = useRef();
    const coverImageRef = useRef();
    const Insta = useRef()
    const Facebook = useRef();
    const Mail = useRef();
    const Club = useRef();
    const Desc = useRef();

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
          await axios.post(`http://localhost:3001/api/image`, formData)
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
            const res = await axios.post('http://localhost:3001/change/change/club', { clubName, description, imageUrl,coverImage,insta,facebook,mail});
    
            if (res.data === "ClubNotExists") {
                alert("No Club present with the entered ClubName");
            } else if (res.data === "Success") {
                alert("Updated Successfully");
                setClubs(''); 
                setDescription(''); 
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
                    <label>ClubName</label>
                    <input ref={Club} type="text" value={clubName} onChange={(e)=>setClubs(e.target.value)} placeholder="Enter club name" required />
                </div>
                <div>
                    <label>Description</label>
                    <textarea ref={Desc} value={description} onChange={e=>setDescription(e.target.value)} type="text" required placeholder="Describe Club"></textarea>
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
                        <input ref={coverImageRef} onChange={handleFileChanges} id="file-inputs" type="file"></input>
                        <span onClick={clearFileInputs} className="clear-file-input">&#10006;</span>

                        {uploadings ? (<Spinner animation="border" role="status">
                                    <span className="sr-only">Uploading...</span>
                                </Spinner>) : 
                        (<button  onClick={handleUploads}>Upload</button>)}
                    </div>
                </div>
                <div>
                    <label>Club Mail</label>
                    <input ref={Mail} value={mail} onChange={(e)=>setMail(e.target.value)} type="text" placeholder="Email"></input>
                </div>
                <div>
                    <label>Club Insta Handle</label>
                    <input ref={Insta} value={insta} onChange={(e)=>setInsta(e.target.value)} type="text" placeholder="Instagram Link"></input>
                </div>
                <div>
                    <label>Club Facebook Handle</label>
                    <input ref={Facebook} value={facebook} onChange={(e)=>setFacebook(e.target.value)} type="text" placeholder="Password"></input>
                </div>
                <button onClick={handleAddClub}>Add </button>
            </div>
        </div>
    )
}

export default ChangeClub;