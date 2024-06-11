import "./Profile.css";
import getUserInfo from "../utils/userInfo";

const Profile = () => {
    const userData = getUserInfo();
    const userClubs = userData.clubs;
    
    return (
        <div className="profile-container">
            <div className="profile">
                <div>
                    <img src="user-icon.webp" alt="User Icon" />
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
                        {
                            userClubs.map((element, index) => (
                                <li key={index}>{element.clubName}</li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Profile;
