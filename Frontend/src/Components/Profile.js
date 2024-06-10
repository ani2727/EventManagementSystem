import "./Profile.css";

const Profile = () => 
{
    const userData = JSON.parse(localStorage.getItem('userInfo'))
    return (
        <div class="profile-container">
            <div class="profile">
                <div>
                    <img src="user-icon.webp" alt=""></img>
                </div>
                <div>
                    <label>Name</label>
                    <input type="text" placeholder={userData.email}></input>
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