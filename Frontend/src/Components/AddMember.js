import "./AddMember.css";
import { useRef, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from 'react-router-dom';

const Addmember = () => {
    const location = useLocation();
    const clubData = location.state ? location.state.clubData : null;

    const [name, setName] = useState('');
    const [deleteID, setDeleteID] = useState('');
    const [memberPosition, setmemberPosition] = useState('');

    const Name = useRef();
    const deleteId = useRef();
    const Position = useRef();
    const navigate = useNavigate();

    const handleSubmit = async () => {
        const userName = Name.current.value;
        const position = Position.current.value;

        if (userName.length > 0 && position.length > 0 && clubData && clubData.clubName !== 'DeptClub') {
            try {
                const res = await axios.post("http://localhost:3001/add/member", { userName, clubName: clubData.clubName, position });
                if (res.data === "UserExists") {
                    alert("User already exists");
                } else if (res.data === "Success") {
                    alert("Member added successfully");
                    setName('');
                    setmemberPosition('');
                    navigate('/', { state: { clubData: clubData } });
                } else {
                    alert("Member not added");
                }
            } catch (err) {
                alert(err);
            }
        } else {
            alert("Please fill in all the details");
        }
    }

    const handleDeletemember = async () => {
        let Id = deleteId.current.value;
        Id = Id.trim();
        if (Id && clubData) {
            try {
                const res = await axios.post('http://localhost:3001/delete/members', { clubName: clubData.clubName, Id });
                if (res.data === "Success") {
                    alert("Member deleted successfully");
                    navigate('/club', { state: { clubData: clubData } });
                }
                else if(res.data === "NoClubUser") alert("User Not Exists in this Club") 
                else {
                    alert("No member found with the given ID");
                }
            } catch (err) {
                alert(err);
            }
        } else {
            alert("Please enter the ID properly");
        }
    }

    if (!clubData) {
        return (
            <div>
                <h1>You Are Not Authorized to view this page</h1>
            </div>
        )
    }

    return (
        <div className="addmember-container">
            <div className="addmember">
                <div><h1>Add member</h1></div>
                <div>
                    <input ref={Name} placeholder="Member Name" value={name} onChange={(e) => setName(e.target.value)} type="text" required="" />
                </div>
                <div>
                    <input ref={Position} placeholder="Member Position" value={memberPosition} onChange={(e) => setmemberPosition(e.target.value)} type="text" required="" />
                </div>
                <button onClick={handleSubmit}>Submit</button>
                <div className="deletemember">
                    <div><input ref={deleteId} value={deleteID} onChange={(e) => setDeleteID(e.target.value)} type="text" placeholder="Ex: B190000" /></div>
                    <div><button onClick={handleDeletemember}>Delete</button></div>
                </div>
            </div>
        </div>
    );
};

export default Addmember;
