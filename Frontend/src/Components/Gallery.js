import axios from "axios"
import { useEffect, useState ,useRef} from "react";
import Carousel from 'react-bootstrap/Carousel';
import getUserInfo from "../utils/userInfo";
import { Spinner } from 'react-bootstrap';



const Gallery = ({clubData})=>
{
    const [galleryImages,setGalleryImages] = useState([]);
    const [uploading,setUploading] = useState(false);
    const [selectedFile,setSelectedFile] = useState(null);
    const clubName = clubData.clubName;
    
    const fileInputRef = useRef();
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

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };


        const handleUpload = async() => 
        {
        if(selectedFile != null)
        {
            try
            {

            setUploading(true);
            const formData = new FormData();
            formData.append('image',selectedFile);
            await axios.post(`https://eventmanagementsystem-uvm3.onrender.com/api/image`,formData)
            .then(async(res) =>
            {
                const imageUrl = res.data;
                const result = await axios.post(`https://eventmanagementsystem-uvm3.onrender.com/add/galleryimage`,{clubName,imageUrl})
                setUploading(false);
                if(result.data === "Success") {
                    alert("Image added Successfully");
                    setSelectedFile(null);
                }
                else{
                    alert("Image Not Uploaded, Try again")
                }
                
            })
            }
            catch(err) {
                alert(err);
            }
            
        }
        else alert("Please choose a photo");
    }

    useEffect(() => {
        const fetch = async()=>
        {
            try{
                await axios.get(`https://eventmanagementsystem-uvm3.onrender.com/get/gallery?clubName=${clubName}`)
                .then(res=>{
                    setGalleryImages(res.data.gallery);
                })
            }
            catch(err) {
                console.log(err);
            }
        }
        
        fetch();
    },[clubName]);
    return(
        <div className="ecell-gallery">
            <h1 style={{textAlign:'center'}}>Our Gallery</h1>
            {admin||superAdmin?(
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
            <Carousel className="carousel ecell-gallery" >
                {galleryImages.length > 0 ? 
                    (
                        galleryImages.map((image, index) => (
                            <Carousel.Item key={index} className="carousel-item">
                                <img className="gallery-image" src={image.imageUrl} alt={`Slide ${index + 1}`} style={{ width: '80%',height:'550px',marginLeft:'0em',marginTop:'0.5em'}}/>
                            </Carousel.Item>
                        ))
                    ) : 
                    (
                            <Carousel.Item className="carousel-item">
                                <img className="gallery-image"  src="https://cdn.telanganatoday.com/wp-content/uploads/2022/06/RGUKT-3.jpg" alt="No images available" style={{ width: '80%',height:'550px',marginLeft:'0px',marginTop:'0.5em'}}/>
                            </Carousel.Item>
                    )}
            </Carousel>
            </div>
    )
}

export default Gallery;





