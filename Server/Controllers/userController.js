
const { axios } = require("axios");
const {UserModel,DeptAdminModel,TeamMembersModel,EventModel,GalleryModel,DeptEventsModel,RegistrationModel,ClubModel} = require("../Models/user")
const generateToken = require("../utils/generateToken")     
const bcrypt = require("bcrypt")


const handleAddClub = async (req, res) => {
    const { clubName, description, imageUrl, clubAdmin } = req.body;

    try {
        const existingClub = await ClubModel.findOne({ clubName });
        if (existingClub) return res.json({ message: "ClubExists" });

        const user = await UserModel.findOne({ userName: clubAdmin });
        if (!user) return res.send('InvalidAdmin');

        const newClub = await ClubModel.create({ clubName, description, imageUrl, clubAdmin: user._id });
        if (newClub) {
            user.clubs.push({ clubId: newClub._id, isClubAdmin: true, clubName});
            await user.save();
            
        }

        return res.json({ club: newClub });
    } catch (err) {
        console.error(err); // Log the error for debugging
        return res.status(500).json({ message: "Failure" });
    }
}


const handleGetClubs = async(req,res) =>{
    try{
            const result = await ClubModel.find({});
            return res.send({result})
    }
    catch(err){
        return res.send("Error");
    }
}

const handleSignin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ userName: email });

        if (user) {
            const result = await bcrypt.compare(password, user.password);
            if (result) {
                generateToken(user._id, res);
                return res.status(200).send(user);
            } else {
                return res.status(401).json({ message: "Invalid credentials" });
            }
        } else {
            return res.status(404).json({ message: "No user exists" });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};



const handleSignup = async(req,res) =>{
    const { email,password,studentId,dept,imageUrl} = req.body;

    try{
        const user = await UserModel.findOne({userName:email})
        if(user) return res.send('UserExists')
        const isAdmin = false;
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const User = await UserModel.create({userName:email,password:hashedPassword,studentId,dept,imageUrl,isAdmin})

        generateToken(User._id,res)

        res.send(User)

    }
    catch(err) {
        return res.send({message:"Signup Failed"})
    }
}

const handleGetAdmins = async(req,res) =>{
    try{
        const result = await AdminModel.find();
        return res.send(result);
    }
    catch(err) {
        return res.send({message:"Error"})
    }
}

const handleAddAdmins = async(req,res) =>{
    try{
        const {name,id} = req.body;

        const user = await UserModel.findOne({userName:name})
        if(!user) return res.send('UserNotExists')

        const club = await ClubModel.findOne({clubName:'DeptClub'})
        user.clubs.push({clubId:club._id,isClubAdmin:true,clubName:id})
        user.save();

        return res.send('Success')
    }
    catch(err) {
        return res.send(err);
    } 
}

const handleAddMember = async(req,res)=>{
    try{
        const {clubName,memberName,memberId,memberPosition,memberDept,imageUrl,email} = req.body;
        const user = await TeamMembersModel.findOne({memberId,clubName});
        if(user) return res.send({message:"Failure"});
        
        await TeamMembersModel.create({clubName,memberName,memberId,memberPosition,memberDept,imageUrl,email})
        return res.send({message:"Success"});
    }
    catch(err) {
        return res.send({message:"Error While Adding Member"})
    }
}

const handleDeleteMember = async(req,res) => {
    try{
        const {clubName,Id} = req.body;
        const user = await TeamMembersModel.findOne({clubName,memberId:Id});
        if(!user) return res.send("Failure");

        await TeamMembersModel.deleteOne({clubName,memberId:Id});
        return res.send("Success");
    }
    catch(err) {
        return res.status(500).send({message:"Error Deleting Member"})
    }
}

const handleGetClubMembers = async(req,res)=> {
    
    const {clubName} = req.query;

    try {
        const teammember = await TeamMembersModel.find({clubName})
        return res.send({ teammember});
        
    } 
    catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
    
}

const handleGetGallery = async(req,res) => {

    const {clubName} = req.query;
    try{
        const gallery = await GalleryModel.find({clubName})
        return res.send({gallery});
    }
    catch(err) {
        return res.send(err);
    }
}

const handleAddGallery = async(req,res) => {
    try{
        const {clubName,imageUrl} =  req.body;
        await GalleryModel.create({clubName,imageUrl})
        return res.send("Success");
    }
    catch(err) {
        return res.send("Error");
    }
}

const handleAddEvent = async(req,res) => 
{
    const {eventName,clubName,tagline,venue,date,time,imageUrl,description,facultyCoordinator,facultyCoordinatorEmail,studentCoordinator,studentCoordinatorEmail} = req.body;
    try{
        await EventModel.create({eventName,clubName,tagline,venue,date,time,imageUrl,facultyCoordinator,facultyCoordinatorEmail,studentCoordinator,studentCoordinatorEmail,description})
        res.status(200).json({message:"Success"})
    }
    catch(err) {
        res.status(500).json({message:"Failure"});
    }
}

const handleDeptAddEvent = async(req,res) => 
{
    const {eventName,clubName,tagline,venue,date,time,imageUrl,description,facultyCoordinator,facultyCoordinatorEmail,studentCoordinator,studentCoordinatorEmail,branch} = req.body;
    console.log(branch)
    try{
        const result = await DeptEventsModel.create({eventName,clubName,tagline,venue,date,time,imageUrl,facultyCoordinator,facultyCoordinatorEmail,studentCoordinator,studentCoordinatorEmail,description,branch})
        if(result) res.send('Success');
        else res.send('Failure')
    }
    catch(err) {
        res.send({message:"Failure"});
    }
}

const handleGetDeptEvents = async(req,res) => 
{
    try {

        const currentDate = new Date();

        const formattedCurrentDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;

        const result = await DeptEventsModel.find({ 
            date: { $gte: formattedCurrentDate },
            branch: { $in: ['PUC', 'CSE', 'ECE', 'EEE', 'MECH', 'CIVIL', 'CHEM', 'METALLURGY'] }
        }).sort({ date: 1 });        
        return res.send(result);
    } 
    catch (err) 
    {
        res.status(500).send("Error"); 
    } 
}

const handleGetClubEvents = async(req,res) => 
{
    try {

        const {clubName} = req.query;
        const currentDate = new Date();
        const formattedCurrentDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
        const result = await EventModel.find({ date: { $gte: formattedCurrentDate },clubName}).sort({ Date: 1 });

        return res.send(result);
    } 
    catch (err) 
    {
        res.status(500).send("Error"); 
    } 
}

const handleGetUpcomingEvents = async(req,res) => 
{
    try {
        const currentDate = new Date();

        const formattedCurrentDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;

        const result = await EventModel.find({ date: { $gte: formattedCurrentDate }}).sort({ Date: 1 });

        return res.send(result);
    } 
    catch (err) 
    {
        res.status(500).send("Error"); 
    } 
}

const handleGetClubPosters = async(req,res) => {
    try{
        const {ClubName} = req.query;
        const result = await EventModel.find({ClubName});
        res.send(result);
    }
    catch(err) {
        res.status(500).send({message:"Error"});
    }
}

const handleEventRegister = async(req,res) => {

    try{
        const {email,eventName,clubName} = req.body;
        const result = await RegistrationModel.findOne({email,eventName,clubName});

        if(!result)
        {
            await RegistrationModel.create({email,eventName,clubName});            
            return res.send({message:"Success"});
        }
        return res.send({message:"Failure"});
    }   
    catch(err){
        return res.send("Error");
    }
}

const handleGetRegisteredUsers = async(req,res)=>{
    try{
        const {clubName,eventName} = req.query;
        const members = await RegistrationModel.find({clubName,eventName});
        return res.send({message:"Success",members});
    }
    catch(err) {
        return res.send(err);
    }
}

const handleDeleteEvent = async(req,res) => {
    try{
        const {eventName,clubName,date,branch} = req.body;
       
        if(branch !== null) 
        {

            const result = await DeptEventsModel.findOne({eventName,date,branch})
            if(!result) return res.send("NotFound")
            await DeptEventsModel.deleteOne({eventName,date,branch})
            return res.send("Success")
        }
        else{
            const result = await EventModel.findOne({eventName,clubName,date})
            if(!result) return res.send("NotFound")
            await EventModel.deleteOne({eventName,clubName,date})
            return res.send("Success")
        }
    }
    catch(err){
        return res.send("Failure")
    }
}

const handleGetClubAdmins = async (req, res) => {
    try {
        const clubs = await ClubModel.find();
        const adminPromises = clubs.map(async (element) => {
            return await UserModel.findOne({ _id: element.clubAdmin });
        });

        const admins = await Promise.all(adminPromises);
        return res.send(admins);
    } catch (err) {
        return res.status(500).send("Error");
    }
};


const handleGetDeptAdmins = async (req, res) => {
    try {
        const data = await DeptAdminModel.find();
        const adminPromises = data.map(async (element) => {
            return await UserModel.findOne({ _id: element.admin });
        });

        const admins = await Promise.all(adminPromises);
        return res.send(admins);
    } catch (err) {
        return res.status(500).send('Error');
    }
};

const handleDeleteAdmin = async(req,res) => {
    
    const {adminOf,id} = req.body;
    try{
            const user = await AdminModel.findOne({adminOf:{ $in: adminOf },id})
            if(!user) return res.send("AdminNotExists")

            await AdminModel.deleteOne({adminOf:{ $in: adminOf },id})
            return res.send("Success")
    }
    catch(err) {
        return res.send("Failure")
    }
}

module.exports = {handleSignin,handleSignup,handleGetAdmins,
    handleAddAdmins,handleAddMember,handleDeleteMember,handleGetClubMembers,
    handleGetGallery,handleAddGallery,handleAddEvent,handleDeptAddEvent,
    handleGetDeptEvents,handleGetClubEvents,handleGetUpcomingEvents,handleGetClubPosters,
    handleEventRegister,handleGetRegisteredUsers,handleDeleteEvent,handleGetClubAdmins,
    handleGetDeptAdmins,handleDeleteAdmin,handleAddClub, handleGetClubs}