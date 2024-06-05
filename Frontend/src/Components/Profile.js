import "./Profile.css";

const Profile = () => {
    return (
        <div class="profile-container">
            <div class="profile">
                <div>
                    <img src="user-icon.webp"></img>
                </div>
                <div>
                    <label>Name</label>
                    <input type="text" placeholder="Your Name"></input>
                </div>
                <div>
                    <label>ID</label>
                    <input type="text" placeholder="Your Name"></input>
                </div>
                <div>
                    <label>Branch</label>
                    <input type="text" placeholder="Your Name"></input>
                </div>
                <div>
                    <label>Clubs</label>
                    <input type="text" placeholder="Cluber Member of"></input>
                </div>
                
            </div>
        </div>
    )
}

export default Profile;