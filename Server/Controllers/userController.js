
const { axios } = require("axios");
const {UserModel,DeptAdminModel,EventModel,GalleryModel,DeptEventsModel,RegistrationModel,ClubModel} = require("../Models/user")
const generateToken = require("../utils/generateToken")     
const bcrypt = require("bcrypt")


const handleAddClub = async (req, res) => {
    const { clubName, description, imageUrl, clubAdmin } = req.body;

    try {
        const existingClub = await ClubModel.findOne({ clubName });
        if (existingClub) return res.send('ClubExists');

        const user = await UserModel.findOne({ userName: clubAdmin });
        if (!user) return res.send('InvalidAdmin');
        const clubImage = 'https://res.cloudinary.com/dkdslxqqx/image/upload/v1718299296/ei1m1qoxr6h9khiqwqx2.jpg'
        const newClub = await ClubModel.create({ clubName, description, clubLogo:imageUrl,clubImage,clubAdmin: user._id });
        if (newClub) {
            user.clubs.push({ clubId: newClub._id, isClubAdmin: true, clubName,position:'Co-ordinator'});
            await user.save();
            
        }

        return res.send('Success');
    } catch (err) {
        return res.status(500).json({ message: "Failure" });
    }
}


const handleGetClubs = async(req,res) =>{
    try{
            const result = await ClubModel.find({});
            return res.send(result)
    }
    catch(err){
        return res.send("Error");
    }
}

const handleSignin = async (req, res) => {
    

    try {
        const { email, password } = req.body;
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
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};



const handleSignup = async(req,res) =>{

    try{
        const { email,password,studentId,dept,imageUrl} = req.body;

        const user = await UserModel.findOne({userName:email})
        if(user) return res.send('UserExists')
        const isAdmin = false;
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const User = await UserModel.create({userName:email,password:hashedPassword,studentId,dept,imageUrl,isSuperAdmin:isAdmin})

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

const handleAddMember = async (req, res) => {
    try {
        const { userName, clubName, position } = req.body;

        const user = await UserModel.findOne({ userName });
        if (!user) return res.send('InvalidUser');

        const club = await ClubModel.findOne({ clubName });
        if (!club) return res.send('InvalidClub');

        const isMember = user.clubs.some(element => element.clubName === clubName);
        if (isMember) return res.send('UserExists');

        user.clubs.push({ clubId: club._id, isClubAdmin: false, position, clubName });
        await user.save();

        return res.send('Success');
    } catch (err) {
        return res.status(500).send({ message: 'Error While Adding Member', error: err.message });
    }
};

const handleDeleteMember = async (req, res) => {
    try {
        const { clubName, Id } = req.body;
        const user = await UserModel.findOne({ studentId: Id });

        if (!user) return res.send('UserNotExists');
        const length = user.clubs.length;
        user.clubs = user.clubs.filter(ele => ele.clubName !== clubName);
        await user.save();
        if(length === user.clubs.length) return res.send("NoClubUser")
        return res.send('Success');
    } catch (err) {
        return res.status(500).send({ message: "Error Deleting Member" });
    }
}


const handleGetClubMembers = async (req, res) => {
    const { clubName } = req.query;
    try {
        const members = await UserModel.find();

        const teamMembers = members.filter(member => 
            member.clubs.some(club => club.clubName === clubName)
        );
        return res.json(teamMembers);
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
    try{
        const {eventName,clubName,tagline,venue,date,time,imageUrl,description,facultyCoordinator,facultyCoordinatorEmail,studentCoordinator,studentCoordinatorEmail,eventMode} = req.body;

        await EventModel.create({eventName,clubName,tagline,venue,date,time,imageUrl,facultyCoordinator,facultyCoordinatorEmail,studentCoordinator,studentCoordinatorEmail,description,eventMode:eventMode.toLowerCase()})
        res.status(200).send("Success")
    }
    catch(err) {
        res.status(500).send("Failure")
    }
}

const handleDeptAddEvent = async (req, res) => {
    const {
        eventName, clubName, tagline, venue, date, time, imageUrl, description, facultyCoordinator,
        facultyCoordinatorEmail, studentCoordinator, studentCoordinatorEmail, branch, eventMode
        } = req.body;

    try {
        const result = await DeptEventsModel.create({
            eventName, clubName, tagline, venue, date, time, imageUrl, description, facultyCoordinator,
            facultyCoordinatorEmail, studentCoordinator, studentCoordinatorEmail, branch, eventMode: eventMode.toLowerCase()
        });

        if (result) {
            return res.status(201).send('Success');
        } else {
            return res.status(500).send('Failure');
        }
    } catch (err) {
        return res.status(500).json({ 
            message: "Internal Server Error", 
            error: err.message 
        });
    }
};




const handleGetDeptEvents = async(req,res) => 
{
    try {

        const currentDate = new Date();

        const formattedCurrentDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;

        const result = await DeptEventsModel.find({ 
            date: { $gte: formattedCurrentDate },
            branch: { $in: ['PUC', 'CSE', 'ECE', 'EEE', 'MECH', 'CIVIL', 'CHEM', 'MME'] }
        }).sort({ date: 1 });        
        return res.send(result);
    } 
    catch (err) 
    {
        res.status(500).send("Error"); 
    } 
}

const handleGetClubEvents = async (req, res) => {
    try {
        const { clubName } = req.query;
        
        const result = await EventModel.find({ clubName }).sort({ createdAt: 1 });

        return res.send(result);
    } 
    catch (err) {
        res.status(500).send("Error");
    }
}


const handleGetOnlineUpcomingEvents = async (req, res) => {
    try {
        const currentDate = new Date();
        const formattedCurrentDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;

        const eventResults = await EventModel.find({ eventMode: 'online', date: { $gte: formattedCurrentDate } }).sort({ createdAt: 1 });
        const deptEventResults = await DeptEventsModel.find({ eventMode: 'online', date: { $gte: formattedCurrentDate } }).sort({ createdAt: 1 });

        const combinedResults = eventResults.concat(deptEventResults);

        return res.send(combinedResults);
    } 
    catch (err) {
        res.status(500).send("Error");
    }
}

const handleGetOfflineUpcomingEvents = async (req, res) => {
    try {
        const currentDate = new Date();
        const formattedCurrentDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;

        const eventResults = await EventModel.find({ eventMode: 'offline', date: { $gte: formattedCurrentDate } }).sort({ createdAt: 1 });
        const deptEventResults = await DeptEventsModel.find({ eventMode: 'offline', date: { $gte: formattedCurrentDate } }).sort({ createdAt: 1 });

        const combinedResults = eventResults.concat(deptEventResults);

        return res.send(combinedResults);
    } 
    catch (err) {
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
        const members = await RegistrationModel.find({eventName});
        return res.send({message:"Success",members});
    }
    catch(err) {
        return res.send(err);
    }
}

const handleDeleteEvent = async(req,res) => {
    try{
        const {eventName,clubName,date,branch} = req.body;
       
        if(clubName === 'DeptClub') 
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
    
    try{
            const {adminOf,id} = req.body;
            const user = await AdminModel.findOne({adminOf:{ $in: adminOf },id})
            if(!user) return res.send("AdminNotExists")

            await AdminModel.deleteOne({adminOf:{ $in: adminOf },id})
            return res.send("Success")
    }
    catch(err) {
        return res.send("Failure")
    }
}

const handleChangeClubAdmin = async (req, res) => {
    try {
      const { userName, dept } = req.body;  
      const clubName = dept;
  
      const user = await UserModel.findOne({ userName });
      if (!user) return res.status(404).send('UserNotExists');
  
      const club = await ClubModel.findOne({ clubName });
      if (!club) return res.status(404).send('ClubNotExists');
  
      if (club.clubAdmin === user._id) return res.send('Success');  
  
      const oldUser = await UserModel.findById(club.clubAdmin);
      if (oldUser) {
        oldUser.clubs = oldUser.clubs.filter(club => club.clubName !== clubName);
        await oldUser.save();
      }
  
      club.clubAdmin = user._id;
      await club.save();
  
      const userClub = user.clubs.find(club => club.clubName === clubName);
      if (userClub) {
        userClub.isClubAdmin = true;
      } else {
        user.clubs.push({ clubId: club._id, isClubAdmin: true, clubName });
      }
      await user.save();
  
      return res.send('Success');
    } 
    catch (err) {
      return res.status(500).send('Error');
    }
  };
  

const handleChangeDeptAdmin = async (req, res) => {
    try {
      const { userName, dept } = req.body;
  
      const user = await UserModel.findOne({ userName });
      if (!user) return res.status(404).send('UserNotExists');
  
      const deptAdmin = await DeptAdminModel.findOne({ dept });
      if (!deptAdmin) return res.status(404).send('DeptNotExists');
  
      const oldUserId = deptAdmin.admin;
  
      if (oldUserId) {
        const oldUser = await UserModel.findById(oldUserId);
        if (oldUser && oldUser.userName === userName) {
            return res.send('Success');
        }
        if (oldUser) {
          oldUser.clubs = oldUser.clubs.filter(club => club.clubName !== dept);
          await oldUser.save();
        }
      }
  
      deptAdmin.admin = user._id;
      await deptAdmin.save();
  
      const club = await ClubModel.findOne({ clubName: 'DeptClub' });

      user.clubs.push({ clubId: club._id, isClubAdmin: true, clubName: dept });
      await user.save();
  
      return res.send('Success');
    } 
    catch (err) 
    {
        return res.status(500).send('Error');
    }
  };
  
const handleChangeClub = async(req,res)=>{

    try{
        const {clubName, description,imageUrl,coverImage,mail,insta,facebook,tagline,interviewFor,open} = req.body;

            const club = await ClubModel.findOne({clubName})
            if(!club) return res.send('ClubNotExists');

            if(description) club.description = description;
            if(imageUrl) club.clubLogo = imageUrl;
            if(coverImage) club.clubImage = coverImage;
            if(mail) club.clubMail = mail;
            if(insta) club.clubInsta = insta;
            if(facebook) club.clubFacebook = facebook;
            if(tagline) club.tagline = tagline;
            if(open === 'open') {
                club.interview = true;
                club.interviewFor = interviewFor;
            }
            else if(open === 'close') {
                club.interview = false;
            }
            await club.save();
            return res.send('Success');
    }
    catch(err) {
            return res.status(500).send('Error')
    }
}

const handleChangeUserProfile = async(req,res)=>
{
    
    try{
        const {imageUrl,userName,password} = req.body;
        const user = await UserModel.findOne({userName});

        if(imageUrl) user.imageUrl = imageUrl;
        if(password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            user.password = hashedPassword;
        }
        await user.save();
       
        return res.send('Success');
    }
    catch(err){
        return res.status(500).send("Bad Request");
    }
}  


module.exports = {handleSignin,handleSignup,handleGetAdmins,
    handleAddAdmins,handleAddMember,handleDeleteMember,handleGetClubMembers,
    handleGetGallery,handleAddGallery,handleAddEvent,handleDeptAddEvent,
    handleGetDeptEvents,handleGetClubEvents,handleGetOnlineUpcomingEvents,handleGetOfflineUpcomingEvents,handleGetClubPosters,
    handleEventRegister,handleGetRegisteredUsers,handleDeleteEvent,handleGetClubAdmins,
    handleGetDeptAdmins,handleDeleteAdmin,handleAddClub, handleGetClubs, handleChangeDeptAdmin,
    handleChangeClubAdmin,handleChangeClub,handleChangeUserProfile}