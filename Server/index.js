const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { GalleryModel } = require('./Models/user'); 
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const userRoutes = require("./Routes/userRoutes")
const cookieParser = require("cookie-parser");


cloudinary.config({
    cloud_name: 'dkdslxqqx',
    api_key: '148895174729774',
    api_secret: 'oEb2xMHTyAv1DDGoSGploWEdBK8'
  });


const app = express();
app.use(cors(
    {
      origin:[""],
      methods:["POST","GET"],
      credentials:true,
    }  
));
app.use(express.json());
app.use(cookieParser())

const dbUrl = "mongodb+srv://anil:anil123@@cluster0.dvkvxb1.mongodb.net/EventManagement?retryWrites=true&w=majority&appName=Cluster0"


mongoose.connect(dbUrl)
.then(()=>console.log("MongoDB connected"))
.catch((e)=>console.log("MongoDB Connection Error",e))

app.get("/",(req,res)=>{
  res.json("Hello");
})



app.use("/auth",userRoutes)
app.use("/get",userRoutes);
app.use("/add",userRoutes);
app.use("/delete",userRoutes);
app.use("/register",userRoutes)
app.use("/change",userRoutes);



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


app.post("/api/image",upload.single('image'),async(req,res) => 
{
    try{
        const result = await cloudinary.uploader.upload(req.file.path);
        res.send(result.secure_url);
    }
    catch(err) 
    {
        console.log(err);
        res.json({message:"Error"})
    }
});


const PORT = 3001;

app.listen(PORT,()=>{
    console.log(`Server is Running at ${PORT}`);
})


// z7rzqrdZavxWYhAv