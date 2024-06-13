import "./AddMember.css"
import { useState,useRef } from "react";
import axios from "axios";
const AddAdmin = () => 
{

    const [name,setName] = useState('');
    const [id,setId] = useState('');

    const Name = useRef();
    const Id = useRef();
  
    const handleSubmit = async() =>
    {

        const userName = Name.current.value;
        const dept = Id.current.value;
        const validDepts = ['PUC1', 'PUC2', 'CSE', 'ECE', 'EEE','CIVIL','MECH','CHEM','MME'];

        if (!validDepts.includes(dept)) {
            try {
                const res = await axios.post('http://localhost:3001/change/changeclub/admin', { userName, dept });
                if (res.data === 'Success') {
                alert('Admin Changed Successfully');
                } else {
                alert('Admin Not Changed');
                }
            } catch (err) {
                alert('Error: ' + err.message);
            }
        }
        else {
            try
            {
                const res = await axios.post('http://localhost:3001/change/changedept/admin',{userName,dept})
                if(res.data === "Success") alert("Admin Changed Succesfully");
                else alert("Admin Not Changed");
            }
            catch(err) {
                alert(err);
            }
        }
            
    }


    return (
        <div className="addmember-container">
            <div className="addmember">
                <div><h1>Change Admin</h1></div>
                <div>
                    <label>UserName</label>
                    <input ref={Name} placeholder="Enter member Name" value={name} onChange={(e)=>setName(e.target.value)} type="text" required=""></input>
                </div>
                <div>
                    <label>Branch</label>
                    <select ref={Id} value={id} onChange={(e) => setId(e.target.value)} required="">
                        <option >Select club</option><option >Ecell</option><option >TNP</option><option >MathClub</option><option >CodeClub</option><option >PUC1</option><option >PUC2</option><option >CSE</option><option >ECE</option><option >EEE</option>
                        <option >MECH</option><option >CIVIL</option><option >CHEM</option><option>MME</option>
                    </select>
                </div>
                
                <button onClick={handleSubmit}>Submit</button>
            </div>
            
        </div>
    )
}

export default AddAdmin;