import "./AddMember.css"
import { useState,useRef } from "react";
import axios from "axios";
const AddAdmin = () => 
{

    const [name,setName] = useState('');
    const [id,setId] = useState('');
    const [branch,setBranch] = useState('');
    const [imageUrl,setImageUrl] = useState("https://res.cloudinary.com/dkdslxqqx/image/upload/v1717658764/iwlasfaj6duzq9qw55hy.webp");
    const [uploading,setUploading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [adminid,setAdminId] = useState('');
    const [adminclub,setAdminClub] = useState('');

    const adminId = useRef();
    const adminClub = useRef();
    const Name = useRef();
    const Id = useRef();
  

    const fileInputRef = useRef();

    const handleSubmit = async() =>
    {

        const name = Name.current.value;
        const id = Id.current.value;

        try
        {
            await axios.post('http://localhost:3001/add/admin',{name,id})
            .then(res=>{
                if(res.data === "Success") alert("Admin Added Successfully")
                else alert("Error While Adding Admin")
            })
        .catch(err => alert("Admin Not Added"))
        }
        catch(err) {
            alert(err);
        }
            
    }

    const handleUpload = async () => {
        try {
            setUploading(true);
          const formData = new FormData();
          formData.append('image', selectedFile);
          await axios.post(`http://localhost:3001/api/image`, formData)
          .then(res => {
                setSelectedFile(null);
                fileInputRef.current.value = null;
                setImageUrl(res.data);
                
          })

        } 
        catch (err) {
          console.error('Error uploading image:', err);
        } 
        finally{
            setUploading(false);
        }
      };

    const handleDeleteAdmin = async() =>
    {
        const adminOf = adminClub.current.value;
        const id = adminId.current.value;
        try{
                const result = await axios.post("http://localhost:3001/delete/club/admin",{adminOf,id})
                if(result.data === "Success") alert("Member Deleted Successfully")
                else alert("Member Not Found")
        }
        catch(err) {
            console.log(err);
        }
    }

      const clearFileInput = () => {
        const fileInput = document.getElementById("file-input");
        fileInput.value = ""; 
    };

    return (
        <div class="addmember-container">
            <div className="addmember">
                <div><h1>Change Admin</h1></div>
                <div>
                    <label>UserName</label>
                    <input ref={Name} placeholder="Enter member Name" value={name} onChange={(e)=>setName(e.target.value)} type="text" required=""></input>
                </div>
                <div>
                    <label>ClubName</label>
                    <input ref={Id} placeholder="Enter member ID" value={id} onChange={(e)=>setId(e.target.value)} type="text" required=""></input>
                </div>
                
                <button onClick={handleSubmit}>Submit</button>
            </div>
            
        </div>
    )
}

export default AddAdmin;