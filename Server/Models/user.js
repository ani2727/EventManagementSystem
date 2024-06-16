const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
    userName:{
        type:String,
        required: true,
    },
    studentId:{
        type:String,
        required:true,
        
    },
    password:{
        type:String,
        required: true,
    },
    dept:{
        type:String,
        required:true,
    },
    imageUrl:{
        type:String,
    },
    clubs:[
        {
            clubId:{
                type: mongoose.Schema.Types.ObjectId,
                ref:"clubs",
                required:true,
            },
            clubName:{
                type:String,
                required:true,
            },
            position:{
                type:String,
                default:'Member',
            },
            isClubAdmin:{
                type:Boolean,
                required:true,
                default:false,
            }
        }
    ],
    isSuperAdmin:{
        type:Boolean,
        default:false,
    }
});

const DeptAdminSchema = mongoose.Schema(
    {
        dept:{
            type:String,
            required:true,
        },
        admin:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
        }
    }
)

const TeamMembersSchema = new mongoose.Schema({
    clubName:{
        type: String,
        required: true,
    },
    member:{
        type: String,
        required: true,
    },
    position:{
        type:String,
        required:true,
    },
})
const GallerySchema = new mongoose.Schema(
    {
        clubName:String,
        imageUrl:String,
    })
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
        },
        eventMode:{
            type:String,
            required:true,
        }
    })

const ClubSchema = new mongoose.Schema({
    clubName:{
        type:String,
        required:true,
    },
    tagline:{
        type:String,
    },
    description:{
        type:String,
        required:true,
    },
    clubLogo:{
        type:String,
    },
    clubAdmin:{
        type:String,
        required:true,
    },
    clubImage:{
        type:String,
    },
    clubInsta:{
        type:String,
    },
    clubFacebook:{
        type:String,
    },
    clubMail:{
        type:String,
    },
    interview:{
        type:Boolean,
        default:false,
    },
    interviewFor:{
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
        },
        eventMode:{
            type:String,
            required:true,
        }
    })


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

const DeptAdminModel = mongoose.model("departmentadmins",DeptAdminSchema)
const DeptEventsModel = mongoose.model("departmentevents",DeptEventsSchema);
const RegistrationModel = mongoose.model("registrations",RegistrationSchema);
const EventModel = mongoose.model("events",EventSchema);
const GalleryModel = mongoose.model("gallery",GallerySchema);
const TeamMembersModel = mongoose.model("TeamMembers", TeamMembersSchema);
const UserModel = mongoose.model("User", UserSchema);
const ClubModel = mongoose.model("clubs",ClubSchema);

module.exports = { UserModel, TeamMembersModel, GalleryModel,EventModel,RegistrationModel,DeptEventsModel,DeptAdminModel ,ClubModel};
