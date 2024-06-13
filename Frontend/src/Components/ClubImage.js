

const ClubImage = ({clubData})=>{
    return (
        <div className="ecell-basar">
        <div className="ecell-name">
            <h1>{clubData.clubName}<span><h5>-{clubData.tagline}</h5></span></h1>
        </div>
            <img src={clubData.clubImage} alt={`${clubData.clubName} logo`} />
        </div>
    )
}

export default ClubImage