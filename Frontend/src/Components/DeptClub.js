import React, { useState,useEffect,useRef } from 'react';
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
import { Spinner } from 'react-bootstrap';
import emailjs from '@emailjs/browser';



const DeptClub = () => 
{
    const [members,setMembers] = useState([]);
    const [galleryImages,setGalleryImages] = useState([]);
    const [posters,setPosters] = useState([]);
    const navigate = useNavigate();
    const form = useRef();
    const forms = useRef();

    const fileInputRef = useRef();

   const [uploading,setUploading] = useState(false);
   const [selectedFile,setSelectedFile] = useState(null);

   const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
   }

   const handleUpload = async() => 
   {
        const clubName = 'deptclub';
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
                    await axios.post(`http://localhost:3001/post/gallery`,{clubName,imageUrl})
                    .then(res=>alert("Image added Successfully"))
                    .catch(err=>alert("Failed to add Image"))
                    setSelectedFile(null);
                    fileInputRef.current.value = null;
                })
            }
            catch(err) {
            console.log("Error thrown")
            console.log(err);
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

      const sendEmails = (e) => {
        e.preventDefault();
    
        emailjs
          .sendForm('service_nmfnxej', 'template_mdb3nra', forms.current, {
            publicKey: 'SP7Vld6f5wytgRVLm',
          })
          .then(
            () => {
              alert('SUCCESS!');
              e.target.reset();
            },
            (error) => {
            },
          );
      };


    useEffect(() => {
    const fetch = async ()=> 
    {
        const clubName = 'deptclub';
        try{
            await axios.get(`http://localhost:3001/club/members?clubName=${clubName}`)
            .then(res=>{
                setMembers(res.data.teammember);
            })
        }
        catch(err) {
            console.error('Error Fetching Images');
        }

        try{
            const result = await axios.get('http://localhost:3001/admins')
            setMembers(result.data);
        }
        catch(err) {
            console.log(err);
        }

        try{
            await axios.get(`http://localhost:3001/dept/club/events`)
            .then(res => {
                setPosters(res.data);
            })
        }
        catch(err) {
            console.log(err);
        }

        try{
            await axios.get(`http://localhost:3001/get/gallery?clubName=${clubName}`)
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

    const handlePoster = (poster) => 
    {
        navigate("/eventdetails",{state: {posterData:poster}});
    }
    
    const handleAddMember = () => {
        navigate("/addmember",{state:{Club :'deptclub'}});
    }

    const handleProfile = () => {
        navigate("/profile")
    }
    const handleAddEvent = () => {
        navigate("/addevent",{state:{Club :'deptclub'}});
    }

    return (
        <div class="ecell">
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
                <div className="team-dept">


                    {members.map((member, index) => (
                        <div key={index} className="ecell-member">
                            <img src={member.imageUrl} alt="" />
                            <div class="member-name">
                                <span>{member.name}</span>
                                <span>{member.id}</span>
                                <span>{member.email}</span>
                                <span>{member.dept}</span>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    )
}

export default DeptClub;