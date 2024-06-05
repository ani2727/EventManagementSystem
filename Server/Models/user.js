const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
    Email:{
        type:String,
        required: true,
        unique: true,
    },
    Password:{
        type:String,
        required: true,
    }
});

// Middleware to hash password before saving
UserSchema.pre('save', async function(next) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.Password, salt);
        this.Password = hashedPassword;
        next();
    } catch(err) {
        next(err);
    }
});

const TeamMembersSchema = new mongoose.Schema({
    ClubName:{
        type: String,
        required: true,
    },
    MemberName:{
        type: String,
        required: true,
    },
    MemberId:{
        type:String,
        required:true,
    },
    MemberPosition:{
        type:String,
        required:true,
    },
    MemberDept:{
        type: String,
        required: true,
    },
    ImageURL:{
        type: String,
        required: true,
    }
});

const GallerySchema = new mongoose.Schema(
    {
        ClubName:String,
        imageUrl:String,
    }
)


const EventSchema = new mongoose.Schema(
    {
        EventName:{
            type:String,
            required: true,
        },
        ClubName:{
            type:String,
            required: true,
        },
        Venue:{
            type:String,
            required: true,
        },
        Date:{
            type:String,
            required: true,
        },
        Time:{
            type:String,
            required: true,
        },
        PosterUrl:{
            type:String,
            required:true,
        },
        Description: {
            type:String,
        }
    }
)

const RegistrationSchema = new mongoose.Schema(
    {
        Email:{
            type:String,
            required:true,
        },
        EventName:{
            type:String,
            required: true,
        },
        ClubName:{
            type:String,
            required:true,
        }
    }
)

const RegistrationModel = mongoose.model("registrations",RegistrationSchema);
const EventModel = mongoose.model("events",EventSchema);
const GalleryModel = mongoose.model("gallery",GallerySchema);
const TeamMembersModel = mongoose.model("TeamMembers", TeamMembersSchema);
const UserModel = mongoose.model("User", UserSchema);

module.exports = { UserModel, TeamMembersModel, GalleryModel,EventModel,RegistrationModel };
