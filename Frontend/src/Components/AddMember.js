import "./AddMember.css";
import { useRef,useState } from "react";
import { Spinner } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';


const AddMember = () => 
{
    let { clubname} = useParams();

    const [name,setName] = useState('');
    const [id,setId] = useState('');
    const [branch,setBranch] = useState('');
    const [club,setClub] = useState('');
    const [imageUrl,setImageUrl] = useState('');
    const [uploading,setUploading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [deleteID,setDeleteID] = useState('');
    const [memberPosition,setMemberPosition] = useState('');


    const Name = useRef();
    const Id = useRef();
    const Branch = useRef();
    const Club = useRef();
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
        const ClubName = Club.current.value;
        const MemberName = Name.current.value;
        const MemberId = Id.current.value;
        const MemberDept = Branch.current.value;
        const MemberPosition = Position.current.value;

        if(ClubName.length > 0 && MemberName.length>0 && MemberId.length>0 && MemberDept.length>0 && imageUrl.length>0)
        {
            try{
                await axios.post("http://localhost:3001/addmember",{ClubName,MemberName,MemberId,MemberPosition,MemberDept,imageUrl})
                .then(res=>
                    {
                        if(res.data.message === "Failure") alert("User already exists")
                        else 
                        {   
                            alert("Member Added Successfully")
                            setName('');
                            setId('');
                            setBranch('');
                            setClub('');
                            setImageUrl('');
                            setMemberPosition('');
                        }
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

    const handleDeleteMember = async() => {
            let Id = deleteId.current.value;
            Id = Id.trim();
            const ClubName = clubname;
            if(Id.length === 7) 
            {

                try{
                    await axios.post('http://localhost:3001/deletemember',{ClubName,Id})
                    .then(res=>{
                        console.log(res.data);
                        if(res.data === "Success") alert("Member Deleted Successfully");
                        else alert("No Member Found with the Given Id");
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
                <div><h1>Add Member</h1></div>
                <div>
                    <label>Name</label>
                    <input ref={Name} placeholder="Enter Member Name" value={name} onChange={(e)=>setName(e.target.value)} type="text" required=""></input>
                </div>
                <div>
                    <label>ID</label>
                    <input ref={Id} placeholder="Enter Member ID" value={id} onChange={(e)=>setId(e.target.value)} type="text" required=""></input>
                </div>
                <div>
                    <label>Position</label>
                    <input ref={Position} placeholder="Enter Member Position" value={memberPosition} onChange={(e)=>setMemberPosition(e.target.value)} type="text" required=""></input>
                </div>
                <div>
                    <label>Branch</label>
                    <select ref={Branch} value={branch} onChange={(e) => setBranch(e.target.value)} required="">
                        <option >Select branch</option><option >CSE</option><option >ECE</option><option >EEE</option>
                        <option >MECH</option><option >CIVIL</option><option >CHEM</option>
                    </select>
                </div>
                <div>
                    <label>ClubName</label>
                    <select ref={Club} value={club} onChange={(e) => setClub(e.target.value)} required="">
                        <option >Select Club</option><option >Ecell</option><option >CodeClub</option><option >MathClub</option>
                        <option >TNP</option><option >HopeHouse</option><option >Dept</option>
                    </select>
                </div>
                <div className="file-input-container">
                    <label>Photo</label>
                    <div>
                        <input ref={fileInputRef} onChange={handleFileChange} id="file-input" type="file" required></input>
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
                    <button onClick={handleDeleteMember}>Delete Member</button>
                </div>
            </div>
        </div>
    );
};

export default AddMember;
