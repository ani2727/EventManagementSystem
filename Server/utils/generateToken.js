const jwt = require("jsonwebtoken");

const generateToken = (userId,res) =>{
        const token = jwt.sign({userId},"anil_2727",{
            expiresIn:"1h",
        });

        res.cookie("jwt",token,{
            maxAge:60*60*1000,
            httpOnly:true,
            sameSite:"strict",
            secure: false,
        })
}

module.exports = generateToken;
