import { useNavigate,Link } from "react-router-dom";
import getUserInfo from "../utils/userInfo";
import "./Ecell.css"
const Navbar = ({clubData})=>
{

    let admin = false;
    let userData;
    let superAdmin = false;
    const check = ()=>{
        userData = getUserInfo();
        superAdmin = userData.isSuperAdmin;
        const clubId = clubData._id;
        const userClubs = userData.clubs;
    
        userClubs.forEach(element => {
            if(clubId === element.clubId && element.isClubAdmin) {
                admin = true;
            }
        });
    }
    check();

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        navigate("/")
    }
    
    
    const navigate = useNavigate();
    const handleAddMember = () => {
        navigate("/addmember",{state:{clubData:clubData}});
    }

    const handleAddEvent = () => {
        navigate("/addevent",{state:{clubData:clubData}});
    }
    const handleModifyClub = ()=>{
        navigate("/changeclub",{state:{clubData:clubData}})
    }

    return (
        <nav className="ecell-navbar">
                <div className="ecell-logo"><img src={clubData.clubLogo}  alt=""/></div>
                <div className="ecell-nav-list-items">
                    <ul>
                        {clubData.clubName==='HopeHouse'?(<li><button>Donate</button></li>):<li></li>}
                        {admin || superAdmin ?(
                            <li><button onClick={handleAddEvent}>Add Event</button></li>
                        ):<li></li>

                        }
                        {admin || superAdmin?(<li><button onClick={handleAddMember}>Add Member</button></li>):(<li></li>)}
                        {admin || superAdmin?(<li><button onClick={handleModifyClub}>Modify Club</button></li>):(<li></li>)}

                        {
                        userData ? (
                            <div className="dropdown">
                                <button className="dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <img src={userData.imageUrl} style={{width:'60px'}} alt="ProfileImage"/>
                                </button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <Link to="/profile" className="dropdown-item">Profile</Link>
                                    <button className="dropdown-item" onClick={handleLogout} >Logout</button>
                                </div>
                            </div>
                        ) : (
                            <Link to="/signin" className="linkcss"><button className="signin-btn">Sign In</button></Link>
                        )
                        }
                    </ul>
                </div>
            </nav>
    )
}

export default Navbar;