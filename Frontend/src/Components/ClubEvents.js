import { useEffect,useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ClubEvents = () =>
{
    const [posters,setPosters] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>
    {
        const clubName = 'Ecell'
        const fetch = async()=>{
            try{
                const result = await axios.get(`http://localhost:3001/get/club/events?clubName=${clubName}`)
                setPosters(result.data);
            }
            catch(err) {
                console.log(err);
            }
        }
        fetch();

    },[])

    const handlePoster = (poster) => 
    {
        navigate("/eventdetails",{state: {posterData:poster}});
    }
    
    return (
        <div className="ecell-events">
                <div><h1>E-Cell Events</h1></div>
                    <div className="ecell-events-posters">
                    {posters.length > 0 ? 
                    (
                        posters.map((poster,index) => (
                            <div key={index} className="poster-card" onClick={()=>handlePoster(poster)}><img src={poster.imageUrl} alt="" /></div>
                        ))
                    ):
                    (
                        <div style={{margin:'auto',fontWeight:'bold'}}>No Events Available</div>
                    )
                    }
                </div>
            </div>
    )
}

export default ClubEvents;