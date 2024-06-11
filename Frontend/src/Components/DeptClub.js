import React, { useState,useEffect,useRef } from 'react';
import "./Ecell.css"
import Carousel from 'react-bootstrap/Carousel';
import { FaWhatsapp } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa';
import { MdEmail } from "react-icons/md";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import emailjs from '@emailjs/browser';

import { useLocation,Link } from 'react-router-dom';
import getUserInfo from '../utils/userInfo';


const DeptClub = () => 
{

    const location = useLocation();
    const clubData = location.state.clubData;
    const clubName = clubData.clubName;

    let admin = false;
    let userData;
    const check = ()=>{
        userData = getUserInfo();
        const clubId = clubData._id;
        const userClubs = userData.clubs;
    
        userClubs.forEach(element => {
            if(clubId === element.clubId && element.isClubAdmin) {
                admin = true;
            }
        });
    }
    check();

    const [members,setMembers] = useState([]);
    const [galleryImages,setGalleryImages] = useState([]);
    const [posters,setPosters] = useState([]);
    const navigate = useNavigate();
    const form = useRef();

    
    const fileInputRef = useRef();

   const [uploading,setUploading] = useState(false);
   const [selectedFile,setSelectedFile] = useState(null);

   const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
   }

   const handleUpload = async() => 
   {
        if(selectedFile != null)
            {
            try
            {
                setUploading(true);
                const formData = new FormData();
                formData.append('image',selectedFile);
                await axios.post(`http://localhost:3001/api/image`,formData)
                .then(async(res) =>
                {
                    const imageUrl = res.data;
                    await axios.post(`http://localhost:3001/add/galleryimage`,{clubName,imageUrl})
                    .then(res=>alert("Image added Successfully"))
                    .catch(err=>alert("Failed to add Image"))
                    setSelectedFile(null);
                    fileInputRef.current.value = null;
                })
            }
            catch(err) {
            console.log(err)
            }
            finally{
            setUploading(false);
            }
        }
        else alert("Please choose a photo");
    }

    const sendEmail = (e) => {
        e.preventDefault();
    
        emailjs
          .sendForm('service_nmfnxej', 'template_mdb3nra', form.current, {
            publicKey: 'SP7Vld6f5wytgRVLm',
          })
          .then(
            () => {
              alert('SUCCESS!');
              e.target.reset();
            },
            (error) => {
             alert('FAILED...', error.text);
            },
          );
      };


    useEffect(() => {
    const fetch = async ()=> 
    {
        try{
            await axios.get(`http://localhost:3001/get/club/members?clubName=${clubName}`)
            .then(res=>{
                setMembers(res.data.teammember);
            })
        }
        catch(err) {
            alert('Error Fetching Images');
        }

        try{
            const result = await axios.get('http://localhost:3001/get/admins')
            setMembers(result.data);
        }
        catch(err) {
            alert(err)
        }

        try{
            await axios.get(`http://localhost:3001/get/dept/club/events`)
            .then(res => {
                setPosters(res.data);
            })
        }
        catch(err) {
            alert(err)
        }

        try{
            await axios.get(`http://localhost:3001/get/gallery?clubName=${clubName}`)
            .then(res=>{
                setGalleryImages(res.data.gallery);
            })
        }
        catch(err) {
            alert(err)
        }

    }
    fetch();
    },[clubName]);

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        navigate("/")
    }

    const handlePoster = (poster) => 
    {
        navigate("/eventdetails",{state: {posterData:poster}});
    }
    
    const handleAddEvent = () => {
        navigate("/addevent",{state:{clubData:clubData}});
    }
    
    return (
        <div class="ecell">
            <nav class="ecell-navbar">
                <div class="ecell-logo"><img src="rgukt-logo.jpeg"  alt=""/></div>
                <div class="ecell-nav-list-items">
                    <ul>
                        {admin?(<li><button onClick={handleAddEvent}>Add Event</button></li>):(<li></li>)}
                        <div className="dropdown">
                                <button className="dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <img src={userData.imageUrl} style={{width:'60px'}} alt="ProfileImage"/>
                                </button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <Link to="/profile" className="dropdown-item">Profile</Link>
                                    <button className="dropdown-item" onClick={handleLogout} >Logout</button>
                                </div>
                            </div>
                    </ul>
                </div>
            </nav>
            <Carousel class="carousel" style={{width:'100%',borderRadius:'0px',height:'600px'}}>
                {galleryImages.length > 0 ? 
                    (
                        galleryImages.map((image, index) => (
                            <Carousel.Item key={index} className="carousel-item">
                                <img className="gallery-image" src={image.imageUrl} alt={`Slide ${index + 1}`} style={{ width: '800px',height:'550px',marginLeft:'250px',marginTop:'10px'}}/>
                            </Carousel.Item>
                        ))
                    ) : 
                    (
                            <Carousel.Item className="carousel-item">
                                <img className="gallery-image"  src="./defaultImage.jpg" alt="No images available" style={{ width: '58%',marginLeft:'250px',marginTop:'30px'}}/>
                            </Carousel.Item>
                    )}
            </Carousel>
            {admin?(
                    <div>
                    <span class="gallery-upload"><input ref={fileInputRef} onChange={handleFileChange} type="file" required />
                        {uploading ? (
                                <Spinner animation='border' role="status">
                                    <span className="sr-only">Uploading...</span>
                                </Spinner>
                        ):
                        (
                            <button onClick={handleUpload}>Upload</button>
                        )}
                        </span>
                    </div>
            ):(<div></div>)

            }
            <div class="whatsecell">
                <h1>About Engineering Events</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
            <div class="whatsecell">
                <h1>About PUC Events</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
            <div className="ecell-events">
                <div><h1>PUC Events</h1></div>
                    <div className="ecell-events-posters">
                    {posters.length > 0 ? 
                    (
                        posters.filter((poster) => poster.branch === "PUC").map((poster,index) => (
                            <div key={index} className="poster-card" onClick={()=>handlePoster(poster)}><img src={poster.imageUrl} alt="" /></div>
                        ))
                    ):
                    (
                        <div style={{margin:'auto',fontWeight:'bold'}}>No Events Available</div>
                    )
                    }
                </div>
            </div>
            <div className="ecell-events">
                <div><h1>Department of CSE Events</h1></div>
                    <div className="ecell-events-posters">
                    {posters.length > 0 ? 
                    (
                        posters.filter((poster) => poster.branch === "CSE").map((poster,index) => (
                            <div key={index} className="poster-card" onClick={()=>handlePoster(poster)}><img src={poster.imageUrl} alt="" /></div>
                        ))
                    ):
                    (
                        <div style={{margin:'auto',fontWeight:'bold'}}>No Events Available</div>
                    )
                    }
                </div>
            </div>
            <div className="ecell-events">
                <div><h1>Department of ECE Events</h1></div>
                    <div className="ecell-events-posters">
                    {posters.length > 0 ? 
                    (
                        posters.filter((poster) => poster.branch === "ECE").map((poster,index) => (
                            <div key={index} className="poster-card" onClick={()=>handlePoster(poster)}><img src={poster.imageUrl} alt="" /></div>
                        ))
                    ):
                    (
                        <div style={{margin:'auto',fontWeight:'bold'}}>No Events Available</div>
                    )
                    }
                </div>
            </div>
            <div className="ecell-events">
                <div><h1>Department of EEE Events</h1></div>
                    <div className="ecell-events-posters">
                    {posters.length > 0 ? 
                    (
                        posters.filter((poster) => poster.branch === "EEE").map((poster,index) => (
                            <div key={index} className="poster-card" onClick={()=>handlePoster(poster)}><img src={poster.imageUrl} alt="" /></div>
                        ))
                    ):
                    (
                        <div style={{margin:'auto',fontWeight:'bold'}}>No Events Available</div>
                    )
                    }
                </div>
            </div>
            <div className="ecell-events">
                <div><h1>Department of  CIVIL</h1></div>
                    <div className="ecell-events-posters">
                    {posters.length > 0 ? 
                    (
                        posters.filter((poster) => poster.branch === "CIVIL").map((poster,index) => (
                            <div key={index} className="poster-card" onClick={()=>handlePoster(poster)}><img src={poster.imageUrl} alt="" /></div>
                        ))
                    ):
                    (
                        <div style={{margin:'auto',fontWeight:'bold'}}>No Events Available</div>
                    )
                    }
                </div>
            </div>
            <div className="ecell-events">
                <div><h1>Department of MECHANICAL</h1></div>
                    <div className="ecell-events-posters">
                    {posters.length > 0 ? 
                    (
                        posters.filter((poster) => poster.branch === "MECH").map((poster,index) => (
                            <div key={index} className="poster-card" onClick={()=>handlePoster(poster)}><img src={poster.imageUrl} alt="" /></div>
                        ))
                    ):
                    (
                        <div style={{margin:'auto',fontWeight:'bold'}}>No Events Available</div>
                    )
                    }
                </div>
            </div>
            <div className="ecell-events">
                <div><h1>Department of CHEMICAL</h1></div>
                    <div className="ecell-events-posters">
                    {posters.length > 0 ? 
                    (
                        posters.filter((poster) => poster.branch === "CHEM").map((poster,index) => (
                            <div key={index} className="poster-card" onClick={()=>handlePoster(poster)}><img src={poster.imageUrl} alt="" /></div>
                        ))
                    ):
                    (
                        <div style={{margin:'auto',fontWeight:'bold'}}>No Events Available</div>
                    )
                    }
                </div>
            </div>
            <div className="ecell-events">
                <div><h1>Department of METALLURGY</h1></div>
                    <div className="ecell-events-posters">
                    {posters.length > 0 ? 
                    (
                        posters.filter((poster) => poster.branch === "METALLURGY").map((poster,index) => (
                            <div key={index} className="poster-card" onClick={()=>handlePoster(poster)}><img src={poster.imageUrl} alt="" /></div>
                        ))
                    ):
                    (
                        <div style={{margin:'auto',fontWeight:'bold'}}>No Events Available</div>
                    )
                    }
                </div>
            </div>
            <div className="team-ecells">
                <div className="team-ecell-header"><h1>Department Admins</h1></div>
                <div className="team-dept team-ecell">
                    {members && members.length > 0 ? (
                        members.map((member, index) => (
                            <div key={index} className="ecell-member">
                            <img src={member.imageUrl} alt="" />
                            <div class="member-name">
                                <span>{member.name}</span>
                                <span>{member.id}</span>
                                <span>{member.dept}</span>
                                <span>{member.email}</span>
                                <span>{member.contact}</span>
                            </div>
                            </div>
                        ))
                        ) : (
                        <div>No Members Available</div>
                    )}
                </div>
            </div>
            <div class="ecell-footer">
                <div class="follow-us">
                    <h4>Follow us</h4>
                    <ul>
                        <li><FaInstagram size={30}/></li>
                        <li><FaWhatsapp size={30}/></li>
                        <li><FaTwitter size={30}/></li>
                    </ul>
                </div>
                <div class="ecell-contactus">
                    <h4>Contact Us</h4>
                    <ul>
                        <li><MdEmail size={30}/></li>
                    </ul>
                </div>
                <div class="share-thoughts">
                    <h4>Share Your Thoughts</h4>
                    <span>Please provide your thoughts on Ecell development and innovation to explore more</span>
                    <form ref={form} onSubmit={sendEmail}>
                        <textarea name="message" placeholder='Write your Thought you want to share ' />
                        <label>Email</label><input type="email" name="user_email" placeholder='Enter your Email' /> <br/>
                        <label>Phone</label><input type="text" name="user_contact" placeholder='+91 12345 06978' />
                        <button type="submit" value="Send">Submit</button>
                    </form>
                </div>
            </div>
        </div>
)}


export default DeptClub;