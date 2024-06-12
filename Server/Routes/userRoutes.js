const express = require("express");
const router = express.Router();
const {handleSignin,handleSignup,handleGetAdmins, handleAddAdmins,
    handleDeleteMember,handleAddMember, handleGetClubMembers,
    handleGetGallery,handleAddGallery,handleAddEvent, handleDeptAddEvent,
     handleGetDeptEvents,handleGetClubEvents, handleGetUpcomingEvents,
     handleGetClubPosters,handleEventRegister,handleGetRegisteredUsers,
     handleDeleteEvent,handleGetClubAdmins,handleGetDeptAdmins,handleDeleteAdmin,
    handleAddClub,handleGetClubs,handleChangeDeptAdmin, handleChangeClubAdmin,
    handleChangeClub} = require("../Controllers/userController")


router.route("/signin").post(handleSignin)
router.route("/signup").post(handleSignup)

router.route("/admins").get(handleGetAdmins)
router.route("/admin").post(handleAddAdmins)
router.route("/member").post(handleAddMember)
router.route("/members").post(handleDeleteMember)
router.route("/club/members").get(handleGetClubMembers)
router.route("/gallery").get(handleGetGallery)
router.route("/galleryimage").post(handleAddGallery)
router.route("/event").post(handleAddEvent);
router.route("/dept/event").post(handleDeptAddEvent)
router.route("/dept/club/events").get(handleGetDeptEvents)
router.route("/club/events").get(handleGetClubEvents)
router.route("/upcoming/events").get(handleGetUpcomingEvents)
router.route("/club/posters").get(handleGetClubPosters)
router.route("/events").post(handleEventRegister)
router.route("/users").get(handleGetRegisteredUsers)
router.route("/deleteevents").post(handleDeleteEvent)
router.route("/club/admins").get(handleGetClubAdmins)
router.route("/dept/admins").get(handleGetDeptAdmins)
router.route("/club/admin").post(handleDeleteAdmin)
router.route("/club").post(handleAddClub)
router.route("/clubs").get(handleGetClubs)
router.route("/changedept/admin").post(handleChangeDeptAdmin);
router.route("/changeclub/admin").post(handleChangeClubAdmin);
router.route("/change/club").post(handleChangeClub);

module.exports = router;