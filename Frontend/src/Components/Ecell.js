import "./Ecell.css"
import Navbar from './Navbar';
import ClubImage from './ClubImage';
import ClubEvents from './ClubEvents';
import Whatsecell from './WhatsEcell';
import TeamClub from './TeamClub';
import Gallery from './Gallery';
import Footer from './Footer';

import { useLocation } from 'react-router-dom';

const Ecell = () => 
{
    const location = useLocation();
    const clubData = location.state ? location.state.clubData : null;

    if (!clubData) {
        return (
            <div className="not-authorized">
                <h1>You're not authorized. Contact your admin.</h1>
            </div>
        );
    }

    return (
        <div className="ecell">
            <Navbar clubData={clubData}/>

            <ClubImage clubData={clubData}/>

            <ClubEvents clubData={clubData}/>

            <Whatsecell clubData={clubData}/>
            
            <TeamClub clubData={clubData}/>

            <Gallery clubData={clubData}/>

            <Footer clubData={clubData}/>
        </div>
    )
}

export default Ecell;
