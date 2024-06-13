import { useState, useRef } from "react";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./AddMember.css"

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
                await axios.post('http://localhost:3001/add/club',{clubName,description,imageUrl,clubAdmin})
                .then(res=>{
                    if(res.data === "ClubExists") alert("A Club Already Exists with this Name")
                    else if(res.data === "Success") alert("Club Added Successfully")
                    else alert("Try again")
                })
                .catch(err=>alert("Error while adding a club"))
        }
        catch(err) {
                alert(err);
        }
    }
    const [isDropdown, setIsDropdown] = useState(true);

    const handleInputChange = (e) => {
        setClubs(e.target.value);
    };

    const toggleInputType = () => {
        setIsDropdown(!isDropdown);
        setClubs(''); 
    };


    return(
        <div className="manage-clubs">
            <div className="addmember">
                <div>
                    <h1>Add Club</h1>
                </div>
                <div>
                    <label>ClubName</label>
                    {isDropdown ? (
                        <select ref={Club} value={clubs} onChange={(e) => setClubs(e.target.value)} required>
                            <option value="">Select club</option>
                            <option value="Ecell">Ecell</option>
                            <option value="TNP">TNP</option>
                            <option value="MathClub">MathClub</option>
                            <option value="CodeClub">CodeClub</option>
                            <option value="HopeHouse">HopeHouse</option>
                            <option value="DeptClub">DeptClub</option>
                        </select>
                    ) : (
                        <input ref={Club} type="text" value={clubs} onChange={handleInputChange} placeholder="Enter club name" required />
                    )}
                    <button onClick={toggleInputType}>
                        {isDropdown ? 'Use Input Field' : 'Use Dropdown'}
                    </button>
                </div>
                <div>
                    <label>Description</label>
                    <textarea ref={Desc} value={desc} onChange={e=>setDescription(e.target.value)} type="text" required placeholder="Enter ClubName"></textarea>
                </div>
                <div>
                    <label>Admin UserName</label>
                    <input type="text" ref={Admin} value={admin} onChange={(e)=>setAdmin(e.target.value)} placeholder="Enter Admin UserName" required/>
                </div>
                <div className="file-input-container">
                    <label>Photo</label>
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