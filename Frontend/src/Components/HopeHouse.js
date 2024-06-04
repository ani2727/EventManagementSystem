import React, { useState,useEffect } from 'react';
import "./Ecell.css"
import { FaUserCircle } from "react-icons/fa";
import {Link} from "react-router-dom"
import Carousel from 'react-bootstrap/Carousel';
import { FaWhatsapp } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa';
import { MdEmail } from "react-icons/md";
import axios from 'axios';

const HopeHouse = () => 
{
    const [members,setMembers] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [uploading, setUploading] = useState(false);


    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        const ClubName = 'Ecell';
        try {
            setUploading(true);
          const formData = new FormData();
          formData.append('image', selectedFile);
          formData.append('ClubName', ClubName);
          const res = await axios.post('http://localhost:3001/upload', formData);
          setImageUrl(res.data.imageUrl);
          setSelectedFile(null);
        } catch (err) {
          console.error('Error uploading image:', err);
        } finally{
            setUploading(false);
        }
      };



    useEffect(() => {
    const fetch = async ()=> 
    {
        const ClubName = 'Ecell';
        try{
            await axios.get('http://localhost:3001/teammembers',{ params: { ClubName } })
            .then(res=>{
                console.log(res.data);
                setMembers(res.data.teammember);
            })
        }
        catch(err) {
            console.error('Error Fetching Images');
        }
    }
    fetch();
    },[]);

    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(3); 

    const nextMembers = () => {
        const newStartIndex = startIndex + 1;
        const newEndIndex = endIndex + 1;
        if (newEndIndex < members.length) {
            setStartIndex(newStartIndex);
            setEndIndex(newEndIndex);
        }
    };

    const prevMembers = () => {
        const newStartIndex = startIndex - 1;
        const newEndIndex = endIndex - 1;
        if (newStartIndex >= 0) {
            setStartIndex(newStartIndex);
            setEndIndex(newEndIndex);
        }
    };
    
    return (
        <div class="ecell">
            <nav class="ecell-navbar">
                <div class="ecell-logo"><img src="rgukt-logo.jpeg"  alt=""/></div>
                <div class="ecell-nav-list-items">
                    <ul>
                        <li><Link to="/" class="linkcss"><button>Home</button></Link></li>
                        <li><input type="file" multiple onChange={handleFileChange} /><button onClick={handleUpload}>Upload</button></li>
                        <li><FaUserCircle size={40}/></li>
                    </ul>
                </div>
            </nav>
            <div class="ecell-basar">
                <img src="Slide2.JPG" alt="" />
                <div class="ecell-basar-text">
                    <h1>E-Cell IIIT Basar</h1>
                    <p>Checking the network cables, modem and router. Reconnecting to Wi-Fi.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                </div>
            </div>
            <div className="ecell-events">
                <div><h1>Ecell Events</h1></div>
                <div className="ecell-events-posters">
                    <div className="poster-card"><img src="Sehari.jpeg" alt="" /></div>
                    <div className="poster-card"><img src="Finsara.jpeg" alt="" /></div>
                    <div className="poster-card"><img src="Aloha.jpeg" alt="" /></div>
                    <div className="poster-card"><img src="Anantrya.jpeg" alt="" /></div>
                    <div className="poster-card"><img src="Sehari.jpeg" alt="" /></div>
                    <div className="poster-card"><img src="Finsara.jpeg" alt="" /></div>
                    <div className="poster-card"><img src="Aloha.jpeg" alt="" /></div>
                    <div className="poster-card"><img src="Anantrya.jpeg" alt="" /></div>
                    
                </div>
            </div>

            <div class="whatsecell">
                <h1>What is ECell</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
            
            <div class="team-ecells">
                <div class="team-ecell-header"><h1>Team E-Cell</h1></div>
                <div className="team-ecell">
                    <button onClick={prevMembers} disabled={startIndex === 0}>Previous</button>


                    {members.slice(startIndex, endIndex + 1).map((member, index) => (
                        <div key={index} className="ecell-member">
                            {member.ImageURL ? 
                            (
                                <img src={member.ImageURL} alt="" />
                            ) 
                            :(
                                <div>No Image Available</div>
                            )}
                            <div class="member-name">
                                <span>{member.MemberName}</span>
                                <span>{member.MemberDept}</span>
                            </div>
                        </div>
                    ))}

                    <button onClick={nextMembers} disabled={endIndex === members.length - 1}>Next</button>
                </div>
            </div>
            <div>
                <h1 style={{textAlign:'center'}}>Our Gallery</h1>
            <Carousel class="carousel" style={{width:'100%',borderRadius:'0px',height:'600px'}}>
                <Carousel.Item class="carousel-item">
                    <img class="gallery-image"  src="./Slide1.JPG" alt="First slide" style={{ width: '58%',marginLeft: '300px',marginTop:'30px'}}/>
                    
                </Carousel.Item>
                <Carousel.Item class="carousel-item"> 
                <img class="gallery-image" src="./Slide2.JPG" alt="Second slide" style={{ width: '58%' ,marginLeft: '300px',marginTop:'30px'}}/>
                    
                </Carousel.Item>
                <Carousel.Item class="carousel-item">
                    <img class="gallery-image" src="./Slide3.JPG" alt="Third slide" style={{ width: '58%',marginLeft: '300px',marginTop:'30px' }}/>

                </Carousel.Item>
            </Carousel>
            </div>
            <div class="ecell-footer">
                <div>
                    <ul>
                        <h4>Follow us</h4>
                        <li><FaInstagram size={30}/></li>
                        <li><FaWhatsapp size={30}/></li>
                        <li><FaTwitter size={30}/></li>
                    </ul>
                </div>
                <div class="ecell-contactus">
                    <ul>
                        <h4 >Contact Us</h4>
                        <li><MdEmail size={30}/></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default HopeHouse;




// import "./HopeHouse.css"

// const HopeHouse = () => {
//     return (
//         <div class="hope">
//             <div class="header">
//                 <img src="https://t4.ftcdn.net/jpg/01/23/68/71/360_F_123687102_3rPakqjpruQ7hV0yImMYcSYBXGkTCwE5.jpg" alt="HopeHouse" />
//                 <h1>Hope House - The Ray of Hope</h1>
//             </div>
//             <nav class="nav-bar">
//                 <img src="https://cdns.iconmonstr.com/wp-content/releases/preview/7.1.0/240/iconmonstr-line-three-horizontal-lined.png" alt=""/>
//                 <img src="https://previews.123rf.com/images/giamportone/giamportone2103/giamportone210300889/166486342-login-icon-vector-user-symbol-simple-linear-pictogram-user-interface-account-log-in.jpg" alt="" />
//             </nav>
//             <div class="body">
//                 <h1>Hope House Gallery</h1>
//             </div>
//             <div class="about">
//                 <h1>About Us</h1>
//                 <div class="aboutinfo">
//                 <div class="about-data">
//                     <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. <br></br>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s<br></br>, when an unknown printer took a galley of type and scrambled it to make a type specimen book.<br></br> It has survived not only five centuries, but also the leap into electronic typesetting<br></br>, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets<br></br> containing Lorem Ipsum passages and more recently with desktop publishing software like<br></br> Aldus PageMaker including versions of Lorem Ipsum</p>
//                 </div>
//                     <div class="donationbox">
//                             <div>
//                                 <h1>Total Donations: 485/-</h1>
//                                 <h1>Super Coins: 20⚡</h1>
//                             </div>
//                             <div class="hope-btn">
//                                 <button>View</button>
//                                 <button>Donate</button>
//                             </div>
//                     </div>
                    
//                 </div>
//             </div>
//             <div class="register">
//                <h5>Want to register as a volunteer? </h5> 
//                 <p>Register Now</p>
//             </div>
//         </div>
//     );
// }

// export default HopeHouse;