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
            await axios.post(`http://localhost:3001/api/image`,formData)
            .then(async(res) =>
            {
                const imageUrl = res.data;
                const result = await axios.post(`http://localhost:3001/add/galleryimage`,{clubName,imageUrl})
                setUploading(false);
                if(result.data === "Success") {
                    alert("Image added Successfully");
                    setSelectedFile(null);
                    fileInputRef.current.value = null;
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
        const clubName = 'Ecell'
        const fetch = async()=>
        {
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
    return(
        <div>
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
            <Carousel className="carousel" style={{width:'100%',borderRadius:'0px',height:'600px'}}>
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
            </div>
    )
}

export default Gallery;





