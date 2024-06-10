import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "./Ecell.css"
const Navbar = ({clubData})=>
{

    const navigate = useNavigate();
    const handleAddMember = () => {
        navigate("/addmember",{state:{Club :clubData.clubName}});
    }

    const handleAddEvent = () => {
        console.log(clubData)
        navigate("/addevent",{state:{Club :clubData.clubName}});
    }

    const handleProfile = () => {
        navigate("/profile")
    }

    return (
        <nav class="ecell-navbar">
                <div class="ecell-logo"><img src="rgukt-logo.jpeg"  alt=""/></div>
                <div class="ecell-nav-list-items">
                    <ul>
                        <li><button onClick={handleProfile}>Profile</button></li>
                        <li><button onClick={handleAddEvent}>Add Event</button></li>
                        <li><button onClick={handleAddMember}>Add Member</button></li>
                        <li><FaUserCircle size={40}/></li>
                    </ul>
                </div>
            </nav>
    )
}

export default Navbar;