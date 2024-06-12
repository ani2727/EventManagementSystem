import { useEffect, useState } from "react";
import axios from "axios";

const TeamClub = ({ clubData }) => {
    const [teammembers, setMembers] = useState([]);
    const clubName = clubData.clubName;

    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(3);

    const nextMembers = () => {
        const newStartIndex = startIndex + 1;
        const newEndIndex = endIndex + 1;
        if (newEndIndex < teammembers.length) {
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

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await axios.get(`http://localhost:3001/get/club/members?clubName=${clubName}`);
                setMembers(res.data);
                console.log(res.data);
            } catch (err) {
                console.error('Error Fetching Members', err);
            }
        };
        fetch();
    }, [clubName]);

    return (
        <div className="team-ecells">
            <div className="team-ecell-header"><h1>Team {clubName}</h1></div>
            <div className="team-ecell">
                <button onClick={prevMembers} disabled={startIndex === 0}>Previous</button>

                {teammembers && teammembers.slice(startIndex, endIndex + 1).map((member, index) => (
                <div key={index} className="ecell-member">
                    {member.imageUrl ? (
                        <img src={member.imageUrl} alt={member.userName} />
                    ) : (
                        <img src={member.defaultImage} alt={member.userName} />
                    )}
                    <div className="member-name">
                        <span>{member.userName}</span>
                        {member.clubs.filter(club => club.clubName === clubName).map((club, idx) => (
                            <span key={idx}>{club.position}</span>
                        ))}
                        <span>{member.position}</span>
                        <span>{member.studentId}</span>
                        <span>{member.dept}</span>
                    </div>
                </div>
            ))}


                <button onClick={nextMembers} disabled={endIndex >= teammembers.length - 1}>Next</button>
            </div>
        </div>
    );
}

export default TeamClub;
