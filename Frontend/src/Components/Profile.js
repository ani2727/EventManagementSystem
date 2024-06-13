import { Spinner } from "react-bootstrap";
import axios from "axios";
import React, { useState } from "react";
import "./Profile.css";
import getUserInfo from "../utils/userInfo";

const Profile = () => {
    const userData = getUserInfo();
    const userClubs = userData.clubs;

    const [selectedFile, setSelectedFile] = useState(null);
    const [imageUrl,setImageUrl] = useState('');
    const [uploading,setUploading] = useState(null);

    const handleChangePhoto = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
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
        
        try
        {

            setUploading(false);
            const result = await axios.post('http://localhost:3001/change/userprofile',{imageUrl,userName:userData.userName})
            if(result.data === "Success") 
            {
                alert("Changed Successfully");
            }
            else alert("Sorry! Try uploading again")
        }
        catch(err) {
            alert(err);
        }
    }

    return (
        <div className="profile-container">
            <div className="profile">
                <div>
                    <img src={userData.imageUrl} alt="User Icon" />
                    <label htmlFor="file-input" className="change-photo-label">Change Photo</label>
                    <input
                        id="file-input"
                        type="file"
                        onChange={handleChangePhoto}
                        style={{ display: "none" }}
                    />
                    {selectedFile && (
                        <div>
                            <span>{selectedFile.name}</span>
                            {uploading ? (<Spinner animation="border" role="status">
                                    <span className="sr-only">Uploading...</span>
                                </Spinner>) : 
                        (<button  onClick={handleUpload}>Upload</button>)}
                        </div>
                    )}
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
            </div>
        </div>
    );
};

export default Profile;
