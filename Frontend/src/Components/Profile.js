import { Spinner } from "react-bootstrap";
import axios from "axios";
import React, { useState, useRef } from "react";
import "./Profile.css";
import getUserInfo from "../utils/userInfo";

const Profile = () => {
    const userData = getUserInfo();
    const userClubs = userData.clubs || [];

    const Password = useRef();
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(userData.imageUrl || '');
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef();

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const clearFileInput = () => {
        fileInputRef.current.value = "";
        setSelectedFile(null);
    };

    const handleChange = async () => {
        if (!imageUrl && !Password.current.value) {
            alert("Please enter the fields");
            return;
        }
        
        setUploading(true);
        
        try {
            let updatedImageUrl = imageUrl;

            if (selectedFile) {
                const formData = new FormData();
                formData.append('image', selectedFile);
                const imageUploadResult = await axios.post('https://eventmanagementsystem-uvm3.onrender.com/api/image', formData);
                updatedImageUrl = imageUploadResult.data;
                setImageUrl(updatedImageUrl);
            }

            const result = await axios.post('https://eventmanagementsystem-uvm3.onrender.com/change/userprofile', {
                imageUrl: updatedImageUrl,
                userName: userData.userName,
                password: Password.current.value
            });

            if (result.data === "Success") {
                userData.imageUrl = updatedImageUrl;
                localStorage.setItem('userInfo', JSON.stringify(userData));
                alert("Changed Successfully");
            } else {
                alert("Sorry! Try uploading again");
            }

        } catch (err) {
            alert(err);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="profile-container">
            <div className="profile">
                <div className="file-input-container">
                    <img src={imageUrl} alt="Profile" />
                    <div>
                        <input 
                            style={{ outline: 'none', border: 'none' }} 
                            ref={fileInputRef} 
                            onChange={handleFileChange} 
                            id="file-input" 
                            type="file"
                        />
                        <span onClick={clearFileInput} className="clear-file-input">&#10006;</span>

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
                    <input type="password" ref={Password} />
                        {uploading ? (
                            <Spinner animation="border" role="status">
                                <span className="sr-only">Uploading...</span>
                            </Spinner>
                        ) : (
                            <span 
                                style={{ marginLeft: '9em', fontWeight: 'bold', cursor: 'pointer' }}  
                                onClick={handleChange}
                            >
                                Save Changes
                            </span>
                        )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
