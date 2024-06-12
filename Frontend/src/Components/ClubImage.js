

const ClubImage = ({clubData})=>{
    return (
        <div className="ecell-basar">
            <img src={clubData.clubImage} alt={`${clubData.clubName} logo`} />
            <div className="ecell-basar-text">
                <h1>{clubData.clubName}</h1>
                <ul className="ecell-basara-text-links">
                    <li><a href={`mailto:${clubData.clubMail}`}>Mail</a></li>
                    <li><a href={clubData.clubInsta}>Insta</a></li>
                    <li><a href={clubData.clubFacebook}>Facebook</a></li>
                </ul>
            </div>
        </div>


    )
}

export default ClubImage