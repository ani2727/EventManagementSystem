import "./AddMember.css"
import { useState,useRef } from "react";
import axios from "axios";
import { Spinner } from "react-bootstrap";
const AddAdmin = () => 
{

    const [name,setName] = useState('');
    const [id,setId] = useState('');
    const [branch,setBranch] = useState('');
    const [imageUrl,setImageUrl] = useState("https://res.cloudinary.com/dkdslxqqx/image/upload/v1717658764/iwlasfaj6duzq9qw55hy.webp");
    const [uploading,setUploading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [clubName,setClubName] = useState('');
    const [password,setPassword] = useState('');
    const [email,setEmail] = useState('');
    const [contact,setContact] = useState('');
    const [adminid,setAdminId] = useState('');
    const [adminclub,setAdminClub] = useState('');

    const adminId = useRef();
    const adminClub = useRef();
    const Email = useRef();
    const Name = useRef();
    const Contact = useRef();
    const Id = useRef();
    const Branch = useRef();
    const Password = useRef();
    const ClubName = useRef();

    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleSubmit = async() =>
    {

        const name = Name.current.value;
        const id = Id.current.value;
        const dept = Branch.current.value;
        const email = Email.current.value;
        const password = Password.current.value;
        const contact = Contact.current.value;
        const clubName = ClubName.current.value;

        if(name.length>0 && id.length>0 && dept.length>0 && email.length>0 && password.length>0 && contact.length>0 && clubName.length>0 && clubName === 'DeptClub')
        {
            const adminOf = dept;
            try
            {
                await axios.post('http://localhost:3001/add/admin',{name,id,email,password,contact,dept,imageUrl,adminOf})
                .then(res=>{
                    if(res.data.message === "Success") alert("Admin Added Successfully")
                    else alert("Member Not Added Check Server Side Code")
                })
            .catch(err => alert("Admin Not Added"))
            }
            catch(err) {
                console.log(err);
            }
        }
        else if(name.length>0 && id.length>0 && dept.length>0 && email.length>0 && password.length>0 && contact.length>0 && clubName.length>0 && clubName !== 'DeptClub')
        {
            const adminOf = clubName;
            try
            {
                await axios.post('http://localhost:3001/add/admin',{name,id,email,password,contact,dept,imageUrl,adminOf})
                .then(res=>{
                    if(res.data.message === "Success") alert("Admin Added Successfully")
                    else alert("Member Not Added Check Server Side Code")
                })
            .catch(err => alert("Admin Not Added"))
            }
            catch(err) {
                console.log(err);
            }
        }
        else {
            alert("Enter all fields properly");
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
                <div><h1>Add Admin</h1></div>
                <div>
                    <label>Name</label>
                    <input ref={Name} placeholder="Enter member Name" value={name} onChange={(e)=>setName(e.target.value)} type="text" required=""></input>
                </div>
                <div>
                    <label>ID</label>
                    <input ref={Id} placeholder="Enter member ID" value={id} onChange={(e)=>setId(e.target.value)} type="text" required=""></input>
                </div>
                <div>
                    <label>Password</label>
                    <input ref={Password} placeholder="Enter Password" value={password} onChange={(e)=>setPassword(e.target.value)} type="text" required=""></input>
                </div>
                <div>
                    <label>Email</label>
                    <input ref={Email} placeholder="Enter Email" value={email} onChange={(e)=>setEmail(e.target.value)} type="text" required=""></input>
                </div>
                <div>
                    <label>Branch</label>
                    <select ref={Branch} value={branch} onChange={(e) => setBranch(e.target.value)} required="">
                        <option >Select branch</option><option >PUC1</option><option >PUC2</option><option >CSE</option><option >ECE</option><option >EEE</option>
                        <option >MECH</option><option >CIVIL</option><option >CHEM</option>
                    </select>
                </div>
                <div>
                    <label>ClubName</label>
                    <select ref={ClubName} value={clubName} onChange={(e) => setClubName(e.target.value)} required="">
                        <option >Select Club</option><option >Ecell</option><option >CodeClub</option><option >TNP</option>
                        <option >MathClub</option><option >HopeHouse</option><option >DeptClub</option>
                    </select>
                </div>
                <div>
                    <label>Contact</label>
                    <input ref={Contact} placeholder="Enter Phone" value={contact} onChange={(e)=>setContact(e.target.value)} type="text" required=""></input>
                </div>
                
                <div className="file-input-container">
                    <label>Photo</label>
                    <div>
                        <input ref={fileInputRef} onChange={handleFileChange} id="file-input" type="file"></input>
                        <span onClick={clearFileInput} className="clear-file-input">&#10006;</span>

                        {uploading ? (<Spinner animation="border" role="status">
                                    <span className="sr-only">Uploading...</span>
                                </Spinner>) : 
                        (<button  onClick={handleUpload}>Upload</button>)}
                    </div>
                </div>
                <button onClick={handleSubmit}>Submit</button>
            </div>
            <div class="deleteadmin">
                 <div class="addmember">
                    <h1>Delete Admin</h1>
                    <div>
                        <label>Admin ID</label><input ref={adminId} value={adminid} onChange={e=>setAdminId(e.target.value)} type="text" placeholder="Enter Admin ID"></input>
                    </div>
                    <div>
                        <label>Club Name</label><input ref={adminClub} value={adminclub} onChange={e=>setAdminClub(e.target.value)} type="text" placeholder="Enter Admin Club"></input>
                    </div>
                    <button onClick={handleDeleteAdmin}>Delete</button>
                 </div>
                 
            </div>
        </div>
    )
}

export default AddAdmin;