import "./AddMember.css";
import { useRef,useState } from "react";
import { Spinner } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams,useLocation } from 'react-router-dom';


const Addmember = () => 
{

    const location = useLocation();
    const clubName = location.state.Club;

    const [name,setName] = useState('');
    const [id,setId] = useState('');
    const [branch,setBranch] = useState('');
    const [imageUrl,setImageUrl] = useState("https://res.cloudinary.com/dkdslxqqx/image/upload/v1717658764/iwlasfaj6duzq9qw55hy.webp");
    const [uploading,setUploading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [deleteID,setDeleteID] = useState('');
    const [memberPosition,setmemberPosition] = useState('');
    const [email,setEmail] = useState('');

    const Email = useRef();
    const Name = useRef();
    const Id = useRef();
    const Branch = useRef();
    const deleteId = useRef();
    const Position = useRef();
    const navigate = useNavigate();

    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

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

    const handleSubmit = async() => 
    {
        const memberName = Name.current.value;
        const memberId = Id.current.value;
        const memberDept = Branch.current.value;
        const memberPosition = Position.current.value;
        const email = Email.current.value;

        if(clubName.length > 0 && memberName.length>0 && memberId.length>0 && memberDept.length>0 && email.length>0)
        {
            try{
                await axios.post("http://localhost:3001/addmember",{clubName,memberName,memberId,memberPosition,memberDept,imageUrl,email})
                .then(res=>
                    {
                        if(res.data.message === "Failure") alert("User already exists")
                        else if(res.data.message === "Success")
                        {   
                            alert("member Added Successfully")
                            setName('');
                            setId('');
                            setBranch('');
                            setImageUrl('');
                            setmemberPosition('');
                            navigate(`/${clubName}`)
                        }
                        else alert("Member Not Added")

                    });
            }
            catch(err)
            {
                console.log(err);
            }
        }
        else {
            alert("Please fill the all the details");
        }

    }

    const handleDeletemember = async() => {
            let Id = deleteId.current.value;
            Id = Id.trim();
            if(Id.length === 7) 
            {

                try{
                    await axios.post('http://localhost:3001/deletemember',{clubName,Id})
                    .then(res=>{
                        if(res.data === "Success") {
                            alert("member Deleted Successfully");
                            navigate(`/${clubName}`);
                        }
                        else alert("No member Found with the Given Id");
                    })
                }
                catch(err) {
                    console.log(err);
                }
            }
            else {
                alert("Please Enter the Id Properly" );
            }
    }


    const clearFileInput = () => {
        const fileInput = document.getElementById("file-input");
        fileInput.value = ""; 
    };

    return (
        <div className="addmember-container">
            
            <div className="addmember">
                <div><h1>Add member</h1></div>
                <div>
                    <label>Name</label>
                    <input ref={Name} placeholder="Enter member Name" value={name} onChange={(e)=>setName(e.target.value)} type="text" required=""></input>
                </div>
                <div>
                    <label>ID</label>
                    <input ref={Id} placeholder="Enter member ID" value={id} onChange={(e)=>setId(e.target.value)} type="text" required=""></input>
                </div>
                <div>
                    <label>Position</label>
                    <input ref={Position} placeholder="Enter member Position" value={memberPosition} onChange={(e)=>setmemberPosition(e.target.value)} type="text" required=""></input>
                </div>
                <div>
                    <label>Email</label>
                    <input ref={Email} placeholder="Enter Email" value={email} onChange={(e)=>setEmail(e.target.value)} type="text" required=""></input>
                </div>
                <div>
                    <label>Branch</label>
                    <select ref={Branch} value={branch} onChange={(e) => setBranch(e.target.value)} required="">
                        <option >Select branch</option><option >CSE</option><option >ECE</option><option >EEE</option>
                        <option >MECH</option><option >CIVIL</option><option >CHEm</option>
                    </select>
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
                <div class="deletemember">
                    <input ref={deleteId} value={deleteID} onChange={(e)=>setDeleteID(e.target.value)} type="text" placeholder="Ex: B190000"/>
                    <button onClick={handleDeletemember}>Delete member</button>
                </div>
            </div>
        </div>
    );
};

export default Addmember;
