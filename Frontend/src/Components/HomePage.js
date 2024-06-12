import Carousal from "./Carousal.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./HomePage.css"
import { FiSearch } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa6";
import { RiTwitterXFill } from "react-icons/ri";
import { FaWhatsapp } from "react-icons/fa";
import { Link,useNavigate } from "react-router-dom";
import { useEffect ,useState} from "react";
import axios from "axios";
import { useRef } from "react";
import getUserInfo from "../utils/userInfo.js";



const HomePage = ()=>
{

    const [posters,setPosters] = useState([]);
    const [searchtext,setSearchtext] = useState('');
    const [clubs,setClubs] = useState([]);

    const searchText = useRef(null);
    const navigate = useNavigate();
    const userData = getUserInfo();
    let admin = '';
    if(userData) admin = userData.isSuperAdmin;

    const handleSearch = (e) => {
        e.preventDefault();
        const search = searchText.current.value.toLowerCase();

        if(search.trim() === '') {
            setPosters(posters);
        }
        else {
            const result = posters.filter(poster => poster.eventName.toLowerCase().includes(search));
            setPosters(result);
        }

    }

    useEffect(() => {
        const fetch = async () =>
        {
            try{
                await axios.get(`http://localhost:3001/get/upcoming/events`)
                .then(res => {
                    setPosters(res.data);
                })
            }
            catch(err) {
                console.log(err);
            }

            try{
                const result = await axios.get('http://localhost:3001/get/clubs')
                setClubs(result.data.result);
            }
            catch(err) {
                alert("Error accessing clubs");
            }

        }
        fetch();
    },[])

    const handleClub = (club)=>
    {        

        if(club.clubName !== 'DeptClub')  navigate('/club',{state:{clubData:club}})
        else navigate('/deptclub',{state:{clubData:club}})
    }

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        navigate("/")
    }
    

    return (
        <div className="home">
            <div className="home-header">
                <div>
                    <img className="logo" src="./rgukt-logo.jpeg" alt="logo" />
                    <div className="search-events-container">
                        <FiSearch/>
                        <input className="search-bar" ref={searchText} value={searchtext} onChange={(e)=>setSearchtext(e.target.value)} placeholder="Search Events"></input>
                    </div>
                    <button className="search-btn" onClick={handleSearch}>Search</button>
                </div>
                <div>
                {admin ? 
                (
                    <>
                        <Link to="/addclub"><button>Manage Clubs</button></Link>
                        <Link to="/admins"><button className="manageadmin-btn">Manage Admin</button></Link>
                    </>
                ) : (
                    <div></div>
                )
                }

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
                </div>
                
            </div>
            <div className="home-body">
                <div className="eventos">
                    <div className="eventos-img"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIO73uGyQvDwF3vOPwU8eDffhD14TKo24_9g&s"  alt=""/></div>
                    <div className="eventos-text"><p>An event management system (EMS) is a comprehensive software solution designed to streamline the planning, organization, 
                        and execution of events of all sizes and types. Whether it's a corporate conference, a wedding, a concert, or a community 
                        fundraiser, an EMS serves as the backbone for ensuring the smooth and successful orchestration of every detail involved.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                         Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
                         dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non 
                         proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p></div>
                    
                </div>
                <div className="carousal"><Carousal/></div>
            </div>
            <div className="upcomingevents">
                <div><h1>Upcoming Events</h1></div>
                <div className="upcoming-events-posters">
                    {posters.length > 0 ?
                    (
                        posters.map((poster,index) => (
                            <div key={index} className="poster-card"><img src={poster.imageUrl} alt=""/></div>
                        ))
                        
                    )
                    :
                    (
                        <div style={{margin:'auto'}}><h4>No Upcoming Events</h4></div>
                    )
                    }
                    
                </div>
            </div>
            <div className="online-events">
                <div><h1 style={{textAlign:'center'}}>Online Events</h1></div>
                    <div className="online-events-posters">
                        {posters.length > 0 ?
                        (
                            posters.map((poster,index) => (
                                <div key={index} className="poster-card"><img src={poster.imageUrl} alt=""/></div>
                            ))
                            
                        )
                        :
                        (
                            <div style={{margin:'auto'}}><h4>No Online Events</h4></div>
                        )
                        }
                    </div>
            </div>
            <div className="clubs">
                <div className="clubs-header"><h1>Explore Club Events</h1></div>
                <div className="club-items" >
                {clubs && clubs.length>0 ?
                (
                    clubs.map((club,index) =>(
                        <div key={index} className="club" onClick={()=>handleClub(club)}>
                           <p><img src={club.clubLogo} alt="" /></p> 
                            <p>{club.clubName}</p>
                        </div>
                    ))
                ):<h2>No Clubs to Display</h2>
                }
                </div>
                
            </div>
            
            <div className="footer-section">
                <div className="footer-info">
                    <ul>
                        <h2 className="footer-head">Info</h2>
                        <li>Formats</li>
                        <li>Compression</li>
                        <li>Pricing</li>
                        <li>Formats</li>
                        <li>Compression</li>
                        <li>Pricing</li>
                    </ul>
                </div>
                <div className="footer-gettingstarted">
                    <ul>
                        <h2 className="footer-head">Discover</h2>
                        <li>Online Events</li>
                        <li>Offline Events</li>
                        <li>Connect with us</li>
                        <li>Events</li>
                        <li>Elements</li>
                    </ul>
                </div>
                <div className="Resources">
                    <ul>
                        <h2 className="footer-head">Resources</h2>
                        <li>API</li>
                        <li>Form Validation</li>
                        <li>Accessibility</li>
                        <li>Market Place</li>
                        <li>Form Validation</li>
                        <li>Accessibility</li>
                        <li>Market Place</li>
                    </ul>
                </div>
                <div className="followus">
                    <ul>
                        <h2 className="footer-head">Follow Us</h2>
                        <li><FaInstagram/></li>
                        <li><RiTwitterXFill/></li>
                        <li><FaWhatsapp /></li>
                    </ul>
                </div>
            </div>
        </div>
        
    ) 
}
export default HomePage;
