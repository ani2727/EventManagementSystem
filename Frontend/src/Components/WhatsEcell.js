

const Whatsecell = ({clubData})=>{
    return (
        <div className="whatsecell">
                <h1>What is {clubData.clubName}</h1>
                <p>{clubData.description}</p>
            </div>
    )
}

export default Whatsecell;