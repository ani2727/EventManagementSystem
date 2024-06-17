import { useState, useRef } from "react";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import "./AddMember.css"
import { useNavigate } from "react-router-dom";

const AddClub = ()=>
{
    const [clubs,setClubs] = useState('');
    const [desc,setDescription] = useState('');
    const [imageUrl,setImageUrl] = useState("https://res.cloudinary.com/dkdslxqqx/image/upload/v1717915940/hs5a6by2rnaswjbp2rqo.jpg");
    const [uploading,setUploading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [admin,setAdmin] = useState('');

    const fileInputRef = useRef();
    const Club = useRef();
    const Desc = useRef();
    const Admin = useRef();
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
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
    const clearFileInput = () => {
    const fileInput = document.getElementById("file-input");
    fileInput.value = ""; 
    };

    const handleAddClub = async()=>{
        const clubName = Club.current.value;
        const description = Desc.current.value;
        const clubAdmin = Admin.current.value;

        try{
                await axios.post('https://eventmanagementsystem-uvm3.onrender.com/add/club',{clubName,description,imageUrl,clubAdmin})
                .then(res=>{
                    if(res.data === "ClubExists") alert("A Club Already Exists with this Name")
                    else if(res.data === "Success") {
                        alert("Club Added Successfully")
                        navigate("/")
                    }
                    else alert("Try again")
                })
                .catch(err=>alert("Error while adding a club"))
        }
        catch(err) {
                alert(err);
        }
    }

    const handleInputChange = (e) => {
        setClubs(e.target.value);
    };

    

    return(
        <div className="manage-clubs">
            <div className="addmember">
                <div>
                    <h1>Add Club</h1>
                </div>
                <div>
                    <input ref={Club} type="text" value={clubs} onChange={handleInputChange} placeholder="Enter club name" required />
                </div>
                <div>
                    <textarea ref={Desc} value={desc} onChange={e=>setDescription(e.target.value)} type="text" required placeholder="Enter ClubName"></textarea>
                </div>
                <div>
                    <input type="text" ref={Admin} value={admin} onChange={(e)=>setAdmin(e.target.value)} placeholder="Enter Admin UserName" required/>
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
                <button onClick={handleAddClub}>Add Club</button>
            </div>
        </div>
    )
}

export default AddClub;