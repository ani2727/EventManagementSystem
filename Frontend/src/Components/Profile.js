import { Spinner } from "react-bootstrap";
import axios from "axios";
import React, { useState ,useRef} from "react";
import "./Profile.css";
import getUserInfo from "../utils/userInfo";

const Profile = () => {
    const userData = getUserInfo();
    const userClubs = userData.clubs || [];

    const Password = useRef();
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageUrl,setImageUrl] = useState('');
    const [uploading,setUploading] = useState(null);
    const fileInputRef = useRef();

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const clearFileInput = () => {
        const fileInput = document.getElementById("file-input");
        fileInput.value = ""; 
        };

    const handleChange = async()=>{
        if(!imageUrl && !Password.current.value) alert("Please enter the fields")
        else{
            try
            {
                const result = await axios.post('http://localhost:3001/change/userprofile',{imageUrl,userName:userData.userName,password:Password.current.value})
                if(result.data === "Success") 
                {
                    userData.imageUrl = imageUrl;
                    localStorage.setItem('userInfo',JSON.stringify(userData));
                    alert("Changed Successfully");
                }
                else alert("Sorry! Try uploading again")
                setUploading(false);
    
            }
            catch(err) {
                alert(err);
            }
        }
    }

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
            handleChange();
        }
      };

    return (
        <div className="profile-container">
            <div className="profile">
            <div className="file-input-container">
                <img src={userData.imageUrl} alt=""/>
                    <div>
                        <input style={{outline:'none',border:'none'}} ref={fileInputRef} onChange={handleFileChange} id="file-input" type="file"></input>
                        <span onClick={clearFileInput} className="clear-file-input">&#10006;</span>

                        {uploading ? (<Spinner animation="border" role="status">
                                    <span className="sr-only">Uploading...</span>
                                </Spinner>) : 
                        (<span style={{marginLeft:'9em',fontWeight:'bold',cursor:'pointer'}}  onClick={handleUpload}>Upload</span>)}
                    </div>
                </div>
                <div>
                    <label>Name: {userData.userName}</label>
                </div>
                <div>
                    <label>ID: {userData.studentId}</label>
                </div>
                <div>
                    <label>Branch: {userData.dept}</label>
                </div>
                <div>
                    <label>Clubs:</label>
                    <ul>
                        {userClubs.map((element, index) => (
                            <li key={index}>{element.clubName}</li>
                        ))}
                    </ul>
                </div>
                <div>
                <label>Change Password</label>
                <input type="password" ref={Password}></input>
                <button onClick={handleChange}>Change</button>
                </div>
            </div>
           
        </div>
    );
};

export default Profile;
