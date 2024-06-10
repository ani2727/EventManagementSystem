
const getUserInfo = ()=>{
    try {
        return JSON.parse(localStorage.getItem('userInfo'));
    } catch (error) {
        console.error("Error parsing userInfo:", error);
    }
    
}

export default getUserInfo;