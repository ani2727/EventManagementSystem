const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { UserModel, TeamMembersModel, GalleryModel,PosterModel,AddEventModel,RegistrationModel } = require('./Models/user'); // Adjust the path if necessary
const bcrypt = require("bcrypt");
const multer = require('multer');
const { FaRegWindowClose } = require("react-icons/fa");
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dkdslxqqx',
    api_key: '148895174729774',
    api_secret: 'oEb2xMHTyAv1DDGoSGploWEdBK8'
  });


const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/EventManagement")
.then(res => console.log("MongoDB Connected"))
.catch(err => console.log("MongoDB Connection Error"))

app.post("/signup",async(req,res)=>{
    const {Email,Password} = req.body;
    console.log(req.body);

    try {
        const data = await UserModel.findOne({ Email});
        if (data) return res.send({message:"User Already Exists"})
        await UserModel.create({ Email, Password });
        return res.send({ success: true, message: "User created Successfully" });
    } 
    catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: "Please Enter Details Properly" });
    }
    
});
app.post("/signin", async (req, res) => {
    const { Email, Password } = req.body;

    try {
        const user = await UserModel.findOne({ Email });
        if (user) {
            bcrypt.compare(Password, user.Password, (err, result) => {
                if (result) {
                    res.send({ message: "Success" });
                } else {
                    res.send({ message: "Failure" });
                }
            });
        } else {
            res.status(500).json({ message: "No user exists" });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: "Invalid Login" });
    }
});

app.get("/teammembers", async(req,res)=> {
    
    const ClubName = req.query.ClubName;

    try {
        const teammember = await TeamMembersModel.find({ClubName})
        return res.send({ teammember});
        
    } 
    catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
    
})

const upload = multer({ dest: 'uploads/' });

app.post("/upload", upload.single('image'), async (req, res) => {
    try {
        const {ClubName} = req.body;
        const result = await cloudinary.uploader.upload(req.file.path);

        await GalleryModel.create({ ClubName: ClubName,imageUrl: result.secure_url });
        res.json({ imageUrl: result.secure_url });
    } 
    catch (err) {
      console.error('Error uploading file:', err);
      res.status(500).json({ error: 'Error uploading file' });
    }
  });

app.get('/gallery',async(req,res) => {

    const {ClubName} = req.query;
    try{
        const gallery = await GalleryModel.find({ClubName})
        return res.send({gallery});
    }
    catch(err) {
        return res.status(500).send(err);
    }
})

app.post("/posters",upload.single('image'), async(req,res) => {
    
    try 
    {
        const {ClubName }= req.body;
        const result = await cloudinary.uploader.upload(req.file.path);

        await PosterModel.create({ClubName:ClubName,posterUrl: result.secure_url});
        res.json({posterUrl: result.secure_url});
    }
    catch(err){
        return res.status(500).json({err});
    }
})


app.get('/posters',async(req,res) => {
    const {ClubName} = req.query;
    try{
        const posters = await PosterModel.find({ClubName})
        return res.send(posters);
    }
    catch(err) {
        console.log("Error Accessing posters",err);
        return res.send("Error Accessing Posters");
    }
})

app.post('/addevent',async(req,res) => 
{
    const {EventName,ClubName,Venue,Dats,Tims,imageUrl,Description} = req.body;

    try{
        await AddEventModel.create({EventName,ClubName,Venue,Date:Dats,Time:Tims,PosterUrl:imageUrl,Description})
        res.status(200).json({message:"Success"})
    }
    catch(err) {
        res.status(500).json({message:"Failure"});
    }
})

app.get("/events",async(req,res) => {
    try {

        const currentDate = new Date();
    const formattedCurrentDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;

    const result = await AddEventModel.find({ Date: { $gte: formattedCurrentDate }}).sort({ Date: 1 });

        res.send(result);
    } 
    catch (err) 
    {
        res.status(500).send("Error"); 
    } 
})


app.post("/api/image",upload.single('image'),async(req,res) => 
{
    try{
        const result = await cloudinary.uploader.upload(req.file.path);
        res.send(result.secure_url);
    }
    catch(err) {
        res.json({message:"Error"})
    }
});

app.get("/club/posters",async(req,res) => {
    try{
        const {ClubName} = req.query;
        const result = await AddEventModel.find({ClubName});
        res.send(result);
    }
    catch(err) {
        console.log(err);
        res.status(500).send({message:"Error"});
    }
})

app.post("/deleteevent",async(req,res) => {
    try{
        const {EventName,ClubName,Date} = req.body;

        const result = await AddEventModel.findOne({EventName,ClubName,Date})
        if(!result) return res.send("Failure");
        await AddEventModel.deleteOne({EventName,ClubName,Date});
        return res.send("Success");
    }
    catch(err){
        console.log(err);
    }
})

app.post("/event/register",async(req,res) => {

    try{
        const {Email,EventName,ClubName} = req.body;
        const result = await RegistrationModel.findOne({Email,EventName,ClubName});

        if(!result)
        {
            await RegistrationModel.create({Email,EventName,ClubName});
            return res.send({message:"Success"});
        }
        return res.send({message:"Failure"});
    }   
    catch(err){
        return res.send("Error");
    }
})



const PORT = 3001;

app.listen(PORT,()=>{
    console.log(`Server is Running at ${PORT}`);
})