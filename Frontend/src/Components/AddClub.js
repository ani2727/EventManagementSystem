import { useState, useRef } from "react";
import axios from "axios";
import { Spinner } from "react-bootstrap";

const AddClub = ()=>
{
    const [clubs,setClubs] = useState('');
    const [desc,setDescription] = useState('');
    const [imageUrl,setImageUrl] = useState("https://res.cloudinary.com/dkdslxqqx/image/upload/v1717915940/hs5a6by2rnaswjbp2rqo.jpg");
    const [uploading,setUploading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    const fileInputRef = useRef();
    const Club = useRef();
    const Desc = useRef();

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
    const clearFileInput = () => {
    const fileInput = document.getElementById("file-input");
    fileInput.value = ""; 
    };

    const handleAddClub = async()=>{
        const clubName = Club.current.value;
        const description = Desc.current.value;

        try{
                await axios.post('http://localhost:3001/add/club',{clubName,description,imageUrl})
                .then(res=>{
                    if(res.data.message === "ClubExists") alert("ClubName already exists")
                    else alert("Club Added Successfully")
                })
                .catch(err=>alert("Error while adding a club"))
        }
        catch(err) {

        }
    }

    return(
        <div>
            <div className="addmember">
                <div>
                    <label>ClubName</label>
                    <input ref={Club} value={clubs} onChange={e=>setClubs(e.target.value)} type="text" required placeholder="Enter ClubName"></input>
                </div>
                <div>
                    <label>Description</label>
                    <input ref={Desc} value={desc} onChange={e=>setDescription(e.target.value)} type="text" required placeholder="Enter ClubName"></input>
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
                <button onClick={handleAddClub}>Add </button>
            </div>
        </div>
    )
}

export default AddClub;