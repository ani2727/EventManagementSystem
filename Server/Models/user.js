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
    clubName:{
        type: String,
        required: true,
    },
    memberName:{
        type: String,
        required: true,
    },
    memberId:{
        type:String,
        required:true,
    },
    memberPosition:{
        type:String,
        required:true,
    },
    memberDept:{
        type: String,
        required: true,
    },
    imageUrl:{
        type: String,
        required: true,
    },
    email:{
        type:String,
        required:true,
    },

})

const GallerySchema = new mongoose.Schema(
    {
        clubName:String,
        imageUrl:String,
    }
)


const EventSchema = new mongoose.Schema(
    {
        eventName:{
            type:String,
            required: true,
        },
        tagline:{
            type:String,
        },
        clubName:{
            type:String,
            required: true,
        },
        studentCoordinator:{
            type:String,
            required: true,
        },
        studentCoordinatorEmail:{
            type:String,
            required: true,
        },
        facultyCoordinator:{
            type:String,
        },
        facultyCoordinatorEmail:{
            type:String,
        },
        venue:{
            type:String,
            required: true,
        },
        date:{
            type:String,
            required: true,
        },
        time:{
            type:String,
            required: true,
        },
        imageUrl:{
            type:String,
            required:true,
        },
        description: {
            type:String,
        }
    }
)

const DeptEventsSchema = new mongoose.Schema(
    {
        eventName:{
            type:String,
            required: true,
        },
        tagline:{
            type:String,
        },
        clubName:{
            type:String,
            required: true,
        },
        branch:{
            type:String,
            required:true,
        },
        studentCoordinator:{
            type:String,
            required: true,
        },
        studentCoordinatorEmail:{
            type:String,
            required: true,
        },
        facultyCoordinator:{
            type:String,
        },
        facultyCoordinatorEmail:{
            type:String,
        },
        venue:{
            type:String,
            required: true,
        },
        date:{
            type:String,
            required: true,
        },
        time:{
            type:String,
            required: true,
        },
        imageUrl:{
            type:String,
            required:true,
        },
        description: {
            type:String,
        }
    }
)

const AdminSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
        },
        id:{
            type:String,
            required:true,
        },
        dept:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true,
        },
        password:{
            type:String,
            required:true,
        },
        contact:{
            type:String,
            required:true,
        },
        adminOf:{
            type:[String],
            required:true,
        },
        imageUrl:{
            type:String,
        }
    }
)

const RegistrationSchema = new mongoose.Schema(
    {
        email:{
            type:String,
            required:true,
        },
        eventName:{
            type:String,
            required: true,
        },
        clubName:{
            type:String,
            required:true,
        }
    }
)

const AdminModel = mongoose.model("admins",AdminSchema)
const DeptEventsModel = mongoose.model("departmentevents",DeptEventsSchema);
const RegistrationModel = mongoose.model("registrations",RegistrationSchema);
const EventModel = mongoose.model("events",EventSchema);
const GalleryModel = mongoose.model("gallery",GallerySchema);
const TeamMembersModel = mongoose.model("TeamMembers", TeamMembersSchema);
const UserModel = mongoose.model("User", UserSchema);

module.exports = { UserModel, TeamMembersModel, GalleryModel,EventModel,RegistrationModel,DeptEventsModel,AdminModel };
