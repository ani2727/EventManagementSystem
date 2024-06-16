import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./EventDetails.css";
import { useState, useEffect } from "react";
import getUserInfo from "../utils/userInfo";

const defaultImageUrl = 'https://res.cloudinary.com/dkdslxqqx/image/upload/v1717658764/iwlasfaj6duzq9qw55hy.webp';

const EventDetails = () => {
  const location = useLocation();
  const posterData = location.state?.posterData;
  const [members, setMembers] = useState([]);
  const navigate = useNavigate();

  const [isPopupOpen, setPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupImage, setPopupImage] = useState('');
  const [header, setHeader] = useState('');

  const openPopup = (head, message, imageUrl = defaultImageUrl) => {
    setPopupMessage(message);
    setPopupImage(imageUrl);
    setHeader(head);
    setPopupOpen(true);
  }

  const closePopup = () => {
    setPopupOpen(false);
    navigate(-1)
  }

  const userData = getUserInfo();

  const handleRegister = async () => {
    const email = userData.userName + "@rgukt.ac.in";
    const clubName = posterData?.clubName;
    const eventName = posterData?.eventName;
    if (email.length > 0 && email.endsWith("@rgukt.ac.in")) {
      try {
        const res = await axios.post("http://localhost:3001/register/events", {
          email,
          eventName,
          clubName,
        });
        if (res.data.message === "Success") 
        {
          openPopup('Thank You!', 'Registration Successful!','https://res.cloudinary.com/dkdslxqqx/image/upload/v1718458077/404-tick_e51zjo.png');
        } 
        else {
          openPopup('', 'You have already registered for this event','https://res.cloudinary.com/dkdslxqqx/image/upload/v1718458077/404-tick_e51zjo.png');
        }
      } catch (err) {
        alert(err);
      }
    } 
  };

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const clubName = posterData?.clubName;
        const eventName = posterData?.eventName;
        if (clubName && eventName) {
          const res = await axios.get(`http://localhost:3001/register/users?clubName=${clubName}&eventName=${eventName}`);
          if (isMounted) {
            setMembers(res.data.members);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [posterData?.clubName, posterData?.eventName]);

  if (!posterData) {
    return <div>Error: Poster data not found.</div>;
  }

  return (
    <>
      {isPopupOpen ? (
        <div className='popup-container'>
          <div className="popup open-popup">
            <img src={popupImage} alt='Success' />
            <h2>{header}</h2>
            <p>{popupMessage}</p>
            <button type='button' className="popup-btn" onClick={closePopup}>OK</button>
          </div>
        </div>
      ) : (
        <div className="event-details-container">
          <div className="event-details">
            <h1 className="event-title">{posterData.eventName}</h1>
            <div className="event-info">
              <div className="info-item">
                <span className="info-label">Club Name:</span>
                <span className="info-value">{posterData.clubName}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Venue:</span>
                <span className="info-value">{posterData.venue}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Date:</span>
                <span className="info-value">{posterData.date}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Time:</span>
                <span className="info-value">{posterData.time}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Student Coordinator:</span>
                <span className="info-value">{posterData.studentCoordinator}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Student Coordinator Email:</span>
                <span className="info-value">{posterData.studentCoordinatorEmail}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Faculty Coordinator:</span>
                <span className="info-value">{posterData.facultyCoordinator}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Faculty Coordinator Email:</span>
                <span className="info-value">{posterData.facultyCoordinatorEmail}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Agenda:</span>
                <span className="info-value">{posterData.description}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Mode:</span>
                <span className="info-value">{posterData.eventMode}</span>
              </div>
            </div>
            <button onClick={handleRegister} className="register-btn">
              Register
            </button>
          </div>
          <div className="registered-members">
            <h3>Registered Members</h3>
            {members.length > 0 ? (
              <ul>
                {members.map((member, index) => (
                  <li key={index} style={{ listStyleType: "decimal" }} className="member-email">
                    {member.email}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No Members Registered For this event</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default EventDetails;
