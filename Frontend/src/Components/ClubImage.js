

const ClubImage = ({clubData})=>{
    return (
        <div className="ecell-basar">
                <img src={clubData.imageUrl} alt="" />
                <div className="ecell-basar-text">
                    <h1>{clubData.clubName}</h1>
                    
                </div>
            </div>
    )
}

export default ClubImage