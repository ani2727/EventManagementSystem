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
import { useNavigate } from 'react-router-dom';

const CodeClub = () => 
{
    const [members,setMembers] = useState([]);
    const [galleryImages,setGalleryImages] = useState([]);
    const [posters,setPosters] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
    const fetch = async ()=> 
    {
        const ClubName = 'Code Club';
        try{
            await axios.get('http://localhost:3001/teammembers',{ params: { ClubName } })
            .then(res=>{
                setMembers(res.data.teammember);
            })
        }
        catch(err) {
            console.error('Error Fetching Images');
        }

        try{
            await axios.get(`http://localhost:3001/club/posters?ClubName=${ClubName}`)
            .then(res => {
                setPosters(res.data);
            })
        }
        catch(err) {
            console.log(err);
        }

        try{
            await axios.get(`http://localhost:3001/gallery?ClubName=${ClubName}`)
            .then(res=>{
                setGalleryImages(res.data.gallery);
            })
        }
        catch(err) {
            console.log(err);
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

    const handlePoster = (poster) => 
    {
        navigate("/eventdetails",{state: {posterData:poster}});
    }
    
    return (
        <div class="ecell">
            <nav class="ecell-navbar">
                <div class="ecell-logo"><img src="rgukt-logo.jpeg"  alt=""/></div>
                <div class="ecell-nav-list-items">
                    <ul>
                        <li><Link to="/" class="linkcss"><button>Home</button></Link></li>
                        <li><Link to="/addevent" class="linkcss" ><button>Add Event</button></Link></li>
                        <li><Link to="/addmember" class="linkcss"><button>Add Member</button></Link></li>
                        <li><FaUserCircle size={40}/></li>
                    </ul>
                </div>
            </nav>
            <div className="ecell-basar">
                <img src="Slide2.JPG" alt="" />
                <div className="ecell-basar-text">
                    <h1>Code Club IIIT Basar</h1>
                    <p>Checking the network cables, modem and router. Reconnecting to Wi-Fi.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                </div>
            </div>
            <div className="ecell-events">
                <div><h1>Code Club Events</h1></div>
                    <div className="ecell-events-posters">
                    {posters.length > 0 ? 
                    (
                        posters.map((poster) => (
                            <div className="poster-card" onClick={()=>handlePoster(poster)}><img src={poster.PosterUrl} alt="" /></div>
                        ))
                    ):
                    (
                        <div style={{margin:'auto',fontWeight:'bold'}}>No Events Available</div>
                    )
                    }
                </div>
            </div>
            <div class="whatsecell">
                <h1>What is Code Club</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
            
            <div className="team-ecells">
                <div className="team-ecell-header"><h1>Team Code Club</h1></div>
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
                                <span>{member.MemberId}</span>
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
            {galleryImages.length > 0 ? 
                (
                    galleryImages.map((image, index) => (
                        <Carousel.Item key={index} className="carousel-item">
                            <img className="gallery-image" src={image.imageUrl} alt={`Slide ${index + 1}`} style={{ width: '600px',height:'500px',marginLeft: '380px',marginTop:'30px'}}/>
                        </Carousel.Item>
                    ))
                ) : 
                (
                        <Carousel.Item className="carousel-item">
                            <img className="gallery-image"  src="./defaultImage.jpg" alt="No images available" style={{ width: '58%',marginLeft: '300px',marginTop:'30px'}}/>
                        </Carousel.Item>
                )}
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

export default CodeClub;