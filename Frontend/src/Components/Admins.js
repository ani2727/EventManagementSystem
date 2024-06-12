import { useEffect, useState } from "react";
import axios from "axios";
import "./Admins.css"
import { Link } from "react-router-dom";

const Admins = () => {
    const [clubadmin, setClubAdmins] = useState([]);
    const [departmentadmin, setDepartmentadmins] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const clubadmins = await axios.get("http://localhost:3001/get/club/admins");
                setClubAdmins(clubadmins.data);
            } catch (err) {
                alert(err);
            }

            try {
                const departmentadmins = await axios.get("http://localhost:3001/get/dept/admins");
                setDepartmentadmins(departmentadmins.data);
            } catch (err) {
                alert(err);
            }
        };

        fetchData();
    }, []);

    return (
        <div class="admins">
            <div>
            <div style={{textAlign:'center'}}><h1>Club Admins</h1></div>
            <div className=" club-admins">
            {clubadmin && clubadmin.length > 0 ? (
                clubadmin.reduce((uniqueAdmins, admin) => {
                    const isDuplicate = uniqueAdmins.some(a => a.studentId === admin.studentId);
                    if (!isDuplicate) {
                        uniqueAdmins.push(admin);
                    }
                    return uniqueAdmins;
                }, []).map((admin, index) => (
                    <div key={index} className="admin-member">
                        <img src={admin.imageUrl} alt="" />
                        <div className="member-name">
                            <span>{admin.userName}</span>
                            <span>{admin.studentId}</span>
                            <span>{admin.dept}</span>
                            {admin.clubs.map((club, clubIndex) => (
                                club.isClubAdmin &&
                                !['CSE', 'ECE', 'EEE', 'CIVIL', 'MECH', 'CHEM', 'MME', 'PUC1', 'PUC2'].includes(club.clubName) && (
                                    <span key={clubIndex}>Admin Of {club.clubName}</span>
                                )
                            ))}
                        </div>
                        <Link to="/addadmin"><button>Manage</button></Link>
                    </div>
                ))
                 ) : (
                <div>There are No Club Admins</div>
            )}

            </div>
            </div>
            <div>
            <div style={{textAlign:'center'}}><h1>Department Admins</h1></div>
            <div className="dept-admins">
            {departmentadmin && departmentadmin.length > 0 ? (
                departmentadmin.reduce((uniqueAdmins, admin) => {
                    const isDuplicate = uniqueAdmins.some(a => a.studentId === admin.studentId);
                    if (!isDuplicate) {
                        uniqueAdmins.push(admin);
                    }
                    return uniqueAdmins;
                }, []).map((admin, index) => (
                    <div key={index} className="admin-member">
                        <img src={admin.imageUrl} alt="" />
                        <div className="member-name">
                            <span>{admin.userName}</span>
                            <span>{admin.studentId}</span>
                            <span>{admin.dept}</span>
                            {admin.clubs.map((club, clubIndex) => (
                                club.isClubAdmin &&
                                ['CSE', 'ECE', 'EEE', 'CIVIL', 'MECH', 'CHEM', 'MME', 'PUC1', 'PUC2'].includes(club.clubName) && (
                                    <span key={clubIndex}>Admin Of {club.clubName}</span>
                                )
                            ))}
                        </div>
                        <Link to="/addadmin"><button>Manage</button></Link>
                    </div>
                ))
            ) : (
                <div>There are No Department Admins</div>
            )}


            </div>
        </div>

        </div>
    );
};

export default Admins;
