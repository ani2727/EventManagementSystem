import { useEffect, useState } from "react";
import axios from "axios";

const TeamClub = ()=>
{
    const [members,setMembers] = useState([]);

    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(3); 
    

    const nextMembers = () => {
        const newStartIndex = startIndex + 1;
        const newEndIndex = endIndex + 1;
        if (newEndIndex < members.length) {
            setStartIndex(newStartIndex);
            setEndIndex(newEndIndex);
        }
    };

    const prevMembers = () => {
        const newStartIndex = startIndex - 1;
        const newEndIndex = endIndex - 1;
        if (newStartIndex >= 0) {
            setStartIndex(newStartIndex);
            setEndIndex(newEndIndex);
        }
    };

    useEffect(()=>{
        const fetch = async ()=> 
        {
            const clubName = 'Ecell';
            try{
                await axios.get(`http://localhost:3001/get/club/members?clubName=${clubName}`)
                .then(res=>{
                    setMembers(res.data.teammember);
                })
            }
            catch(err) {
                console.error('Error Fetching Images');
            }
        }
        fetch();
    },[])


    return (
            <div className="team-ecells">
                <div className="team-ecell-header"><h1>Team E-Cell</h1></div>
                <div className="team-ecell">
                    <button onClick={prevMembers} disabled={startIndex === 0}>Previous</button>


                    {members.slice(startIndex, endIndex + 1).map((member, index) => (
                        <div key={index} className="ecell-member">
                            {member.imageUrl ? 
                            (
                                <img src={member.imageUrl} alt="" />
                            ) 
                            :(
                                <img src={member.defaultImage} alt=""/>
                            )}
                            <div class="member-name">
                                <span>{member.memberName}</span>
                                <span>{member.memberPosition}</span>
                                <span>{member.memberId}</span>
                                <span>{member.memberDept}</span>
                                <span>{member.email}</span>
                            </div>
                        </div>
                    ))}

                    <button onClick={nextMembers} disabled={endIndex === members.length - 1}>Next</button>
                </div>
        </div>
    )
}

export default TeamClub;