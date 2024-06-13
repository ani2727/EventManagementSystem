import HomePage from "./Components/HomePage";
import Ecell from "./Components/Ecell"
import DeptClub from "./Components/DeptClub"
import Signin from "./Components/Signin"
import AddAdmin from "./Components/AddAdmin"
import EventDetails from "./Components/EventDetails"
import AddMember from "./Components/AddMember"
import AddEvent from "./Components/AddEvent";
import Profile from "./Components/Profile"
import DeleteEvent from "./Components/DeleteEvent"
import AddClub from "./Components/AddClub";
import Admins from "./Components/Admins";
import "./index.css"
import "./Components/HomePage.css"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {ProtectedRoute,ProtectedClubs} from "./Components/authorization/ProtectedRoute";
import ChangeClub from "./Components/ChangeClub";

const App = ()=>{
  return (
    <div className="app">
      
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/club" element={<ProtectedRoute><Ecell /></ProtectedRoute>} />
            <Route path="/deptclub" element={<ProtectedRoute><DeptClub /></ProtectedRoute>} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/manageadmin" element={<ProtectedClubs><AddAdmin/></ProtectedClubs>} />
            <Route path="/eventdetails" element={<EventDetails/>} />
            <Route path="/addmember" element={<AddMember/>} />
            <Route path="/addevent" element={<AddEvent/>} />
            <Route path="/deleteevent" element={<DeleteEvent/>} />
            <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>} />
            <Route path="/addclub" element={<ProtectedClubs><AddClub /></ProtectedClubs>} />
            <Route path="/admins" element={<ProtectedClubs><Admins /></ProtectedClubs>} />
            <Route path="/changeclub" element={<ProtectedClubs><ChangeClub /></ProtectedClubs>} />
          </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App; 